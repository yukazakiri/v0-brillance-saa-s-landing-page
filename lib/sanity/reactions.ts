import "server-only";

import { createHash, randomUUID } from "crypto";

import { groq } from "next-sanity";

import { getFacebookConfig, getFacebookPosts } from "@/lib/facebook";

import { client } from "./client";
import {
  ARTICLE_REACTION_KINDS,
  type ArticleReactionCounts,
  type ArticleReactionIdentity,
  type ArticleReactionKind,
  type ArticleReactionState,
  type ArticleReactionSource,
} from "./reaction-types";

export const ARTICLE_REACTION_COOKIE = "dccp_article_visitor";

export { ARTICLE_REACTION_KINDS } from "./reaction-types";
export type {
  ArticleReactionCounts,
  ArticleReactionIdentity,
  ArticleReactionKind,
  ArticleReactionSource,
  ArticleReactionState,
} from "./reaction-types";

type ReactionSummaryDocument = {
  _id: string;
  counts?: Partial<ArticleReactionCounts>;
};

type ReactionVoteDocument = {
  _id: string;
  _rev: string;
  reactionKind?: ArticleReactionKind;
};

const ZERO_COUNTS: ArticleReactionCounts = {
  inspired: 0,
  proud: 0,
  helpful: 0,
};

const SUMMARY_QUERY = groq`*[_id == $summaryId][0]{
  _id,
  counts
}`;

const VOTE_QUERY = groq`*[_id == $voteId][0]{
  _id,
  _rev,
  reactionKind
}`;

const PUBLISHED_POST_IDENTITY_QUERY = groq`*[
  _type == "post" &&
  _id == $sourceId &&
  slug.current == $slug &&
  (status == "published" || !defined(status) || (status == "scheduled" && dateTime(coalesce(publishedAt, _createdAt)) <= now()))
][0]{
  _id,
  title,
  "slug": slug.current
}`;

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 40);
}

export function createArticleVisitorId() {
  return randomUUID();
}

export function isArticleReactionKind(value: unknown): value is ArticleReactionKind {
  return (
    typeof value === "string" &&
    ARTICLE_REACTION_KINDS.includes(value as ArticleReactionKind)
  );
}

export function getArticleReactionDocumentIds(identity: ArticleReactionIdentity) {
  const cleanId = identity.sourceId.replace(/^drafts\./, "");
  const summaryKey = digest(`${identity.source}:${cleanId}:${identity.slug}`);

  return {
    summaryId: `articleReactionSummary.${summaryKey}`,
    summaryKey,
  };
}

export function getArticleReactionVoteId(summaryKey: string, visitorId: string) {
  return `articleReactionVote.${summaryKey}.${digest(visitorId)}`;
}

function normalizeCounts(counts?: Partial<ArticleReactionCounts>): ArticleReactionCounts {
  return ARTICLE_REACTION_KINDS.reduce<ArticleReactionCounts>((normalized, kind) => {
    const value = counts?.[kind];
    normalized[kind] = typeof value === "number" && value > 0 ? value : 0;
    return normalized;
  }, { ...ZERO_COUNTS });
}

function getTotal(counts: ArticleReactionCounts) {
  return ARTICLE_REACTION_KINDS.reduce((total, kind) => total + counts[kind], 0);
}

function getMissingWriteTokenState(counts: ArticleReactionCounts): ArticleReactionState {
  return {
    available: false,
    counts,
    selected: null,
    total: getTotal(counts),
    message: "Reactions are read-only until a server Sanity write token is configured.",
  };
}

export function hasArticleReactionWriteToken() {
  return Boolean(process.env.SANITY_API_TOKEN);
}

export async function validateArticleReactionIdentity(identity: ArticleReactionIdentity) {
  if (!identity.sourceId || !identity.slug || !identity.title) return false;

  if (identity.source === "sanity") {
    const cleanId = identity.sourceId.replace(/^drafts\./, "");
    const post = await client.fetch<{ _id: string } | null>(
      groq`*[
        _type == "post" &&
        (_id == $sourceId || _id == $cleanId || _id == "drafts." + $cleanId) &&
        (slug.current == $slug || _id == $slug)
      ][0]{
        _id,
        title,
        "slug": slug.current
      }`,
      {
        sourceId: identity.sourceId,
        cleanId,
        slug: identity.slug,
      },
    );
    return Boolean(post?._id);
  }

  if (identity.source === "facebook") {
    const config = getFacebookConfig();
    if (!config) return true;

    try {
      const { posts } = await getFacebookPosts({ limit: 50 });
      return posts.some(
        (post) => post.id === identity.sourceId && `fb-${post.id}` === identity.slug,
      );
    } catch {
      return true;
    }
  }

  return false;
}

export async function fetchArticleReactionState(
  identity: ArticleReactionIdentity,
  visitorId?: string | null,
): Promise<ArticleReactionState> {
  const { summaryId, summaryKey } = getArticleReactionDocumentIds(identity);
  const voteId = visitorId ? getArticleReactionVoteId(summaryKey, visitorId) : null;

  const [summary, vote] = await Promise.all([
    client.fetch<ReactionSummaryDocument | null>(SUMMARY_QUERY, { summaryId }),
    voteId
      ? client.fetch<ReactionVoteDocument | null>(VOTE_QUERY, { voteId })
      : Promise.resolve(null),
  ]);
  const counts = normalizeCounts(summary?.counts);
  const selected = isArticleReactionKind(vote?.reactionKind) ? vote.reactionKind : null;

  if (!hasArticleReactionWriteToken()) {
    return getMissingWriteTokenState(counts);
  }

  return {
    available: true,
    counts,
    selected,
    total: getTotal(counts),
  };
}

export async function fetchArticleReactionTotals(
  identity: ArticleReactionIdentity,
): Promise<ArticleReactionState> {
  return fetchArticleReactionState(identity, null);
}

export async function updateArticleReaction({
  identity,
  nextKind,
  visitorId,
}: {
  identity: ArticleReactionIdentity;
  nextKind: ArticleReactionKind | null;
  visitorId: string;
}): Promise<ArticleReactionState> {
  if (!hasArticleReactionWriteToken()) {
    const currentState = await fetchArticleReactionState(identity, visitorId);
    return getMissingWriteTokenState(currentState.counts);
  }

  const isValidArticle = await validateArticleReactionIdentity(identity);
  if (!isValidArticle) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  const { summaryId, summaryKey } = getArticleReactionDocumentIds(identity);
  const voteId = getArticleReactionVoteId(summaryKey, visitorId);
  const currentVote = await client.fetch<ReactionVoteDocument | null>(VOTE_QUERY, {
    voteId,
  });
  const currentKind = isArticleReactionKind(currentVote?.reactionKind)
    ? currentVote.reactionKind
    : null;

  if (currentKind === nextKind) {
    return fetchArticleReactionState(identity, visitorId);
  }

  const inc = ARTICLE_REACTION_KINDS.reduce<Record<string, number>>((payload, kind) => {
    let amount = 0;
    if (currentKind === kind) amount -= 1;
    if (nextKind === kind) amount += 1;
    if (amount !== 0) payload[`counts.${kind}`] = amount;
    return payload;
  }, {});

  const now = new Date().toISOString();
  let transaction = client
    .transaction()
    .createIfNotExists({
      _id: summaryId,
      _type: "articleReactionSummary",
      source: identity.source,
      sourceId: identity.sourceId,
      slug: identity.slug,
      title: identity.title,
      counts: ZERO_COUNTS,
      total: 0,
      createdAt: now,
      updatedAt: now,
    })
    .patch(summaryId, (patch) =>
      patch
        .set({
          source: identity.source,
          sourceId: identity.sourceId,
          slug: identity.slug,
          title: identity.title,
          updatedAt: now,
        })
        .setIfMissing({ counts: ZERO_COUNTS, total: 0 })
        .inc({ ...inc, total: nextKind ? (currentKind ? 0 : 1) : -1 }),
    );

  if (!nextKind && currentVote?._rev) {
    transaction = transaction.patch(voteId, (patch) =>
      patch.ifRevisionId(currentVote._rev).unset(["reactionKind"]).set({ updatedAt: now }),
    );
  } else if (nextKind && currentVote?._rev) {
    transaction = transaction.patch(voteId, (patch) =>
      patch.ifRevisionId(currentVote._rev).set({ reactionKind: nextKind, updatedAt: now }),
    );
  } else if (nextKind) {
    transaction = transaction.create({
      _id: voteId,
      _type: "articleReactionVote",
      summary: { _type: "reference", _ref: summaryId },
      source: identity.source,
      sourceId: identity.sourceId,
      slug: identity.slug,
      reactionKind: nextKind,
      createdAt: now,
      updatedAt: now,
    });
  }

  await transaction.commit({ visibility: "sync" });

  return fetchArticleReactionState(identity, visitorId);
}
