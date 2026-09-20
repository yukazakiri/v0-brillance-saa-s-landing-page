import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ARTICLE_REACTION_COOKIE,
  createArticleVisitorId,
  fetchArticleReactionState,
  isArticleReactionKind,
  updateArticleReaction,
  type ArticleReactionIdentity,
  type ArticleReactionSource,
} from "@/lib/sanity/reactions";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function isReactionSource(value: unknown): value is ArticleReactionSource {
  return value === "sanity" || value === "facebook";
}

function getIdentityFromSearchParams(searchParams: URLSearchParams): ArticleReactionIdentity | null {
  const source = searchParams.get("source");
  const sourceId = searchParams.get("sourceId");
  const slug = searchParams.get("slug");
  const title = searchParams.get("title");

  if (!isReactionSource(source) || !sourceId || !slug || !title) return null;

  return { source, sourceId, slug, title };
}

function getCookieOptions() {
  return {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

async function getOrCreateVisitorId() {
  const cookieStore = await cookies();
  const existingVisitorId = cookieStore.get(ARTICLE_REACTION_COOKIE)?.value;

  if (existingVisitorId) {
    return { cookieStore, visitorId: existingVisitorId, shouldSetCookie: false };
  }

  return {
    cookieStore,
    visitorId: createArticleVisitorId(),
    shouldSetCookie: true,
  };
}

function jsonWithVisitorCookie(
  body: unknown,
  visitorId: string,
  shouldSetCookie: boolean,
  init?: ResponseInit,
) {
  const response = NextResponse.json(body, init);

  if (shouldSetCookie) {
    response.cookies.set(ARTICLE_REACTION_COOKIE, visitorId, getCookieOptions());
  }

  return response;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const identity = getIdentityFromSearchParams(url.searchParams);

  if (!identity) {
    return NextResponse.json({ error: "Invalid article reaction target." }, { status: 400 });
  }

  const { visitorId, shouldSetCookie } = await getOrCreateVisitorId();

  try {
    const state = await fetchArticleReactionState(identity, visitorId);
    return jsonWithVisitorCookie(state, visitorId, shouldSetCookie);
  } catch (error) {
    console.error("Error loading article reactions:", error);
    return jsonWithVisitorCookie(
      {
        available: false,
        counts: { like: 0, clap: 0, inspired: 0, proud: 0 },
        selected: null,
        total: 0,
        message: "Reactions are temporarily unavailable.",
      },
      visitorId,
      shouldSetCookie,
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = body as Partial<ArticleReactionIdentity> & { reactionKind?: unknown };

  if (
    !isReactionSource(payload.source) ||
    typeof payload.sourceId !== "string" ||
    typeof payload.slug !== "string" ||
    typeof payload.title !== "string"
  ) {
    return NextResponse.json({ error: "Invalid article reaction target." }, { status: 400 });
  }

  const nextKind = payload.reactionKind === null ? null : payload.reactionKind;
  if (nextKind !== null && !isArticleReactionKind(nextKind)) {
    return NextResponse.json({ error: "Invalid reaction type." }, { status: 400 });
  }

  const { visitorId, shouldSetCookie } = await getOrCreateVisitorId();

  try {
    const state = await updateArticleReaction({
      identity: {
        source: payload.source,
        sourceId: payload.sourceId,
        slug: payload.slug,
        title: payload.title,
      },
      nextKind,
      visitorId,
    });

    return jsonWithVisitorCookie(state, visitorId, shouldSetCookie);
  } catch (error) {
    if (error instanceof Error && error.message === "ARTICLE_NOT_FOUND") {
      return jsonWithVisitorCookie(
        { error: "Article is not published or is no longer available." },
        visitorId,
        shouldSetCookie,
        { status: 404 },
      );
    }

    console.error("Error saving article reaction:", error);
    return jsonWithVisitorCookie(
      { error: "Reactions are temporarily unavailable." },
      visitorId,
      shouldSetCookie,
      { status: 503 },
    );
  }
}
