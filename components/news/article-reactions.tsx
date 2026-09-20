"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type React from "react";
import { Heart, Lightbulb, PartyPopper } from "lucide-react";

import {
  ARTICLE_REACTION_KINDS,
  type ArticleReactionIdentity,
  type ArticleReactionKind,
  type ArticleReactionState,
} from "@/lib/sanity/reaction-types";
import { cn } from "@/lib/utils";

const REACTION_LABELS: Record<
  ArticleReactionKind,
  { label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }
> = {
  inspired: { label: "Inspired", shortLabel: "Inspire", icon: Lightbulb },
  proud: { label: "DCCP proud", shortLabel: "Proud", icon: PartyPopper },
  helpful: { label: "Helpful", shortLabel: "Helpful", icon: Heart },
};

type ArticleReactionsProps = {
  identity: ArticleReactionIdentity;
  initialState: ArticleReactionState;
  className?: string;
};

function getTotal(counts: ArticleReactionState["counts"]) {
  return ARTICLE_REACTION_KINDS.reduce((total, kind) => total + counts[kind], 0);
}

function buildReactionQuery(identity: ArticleReactionIdentity) {
  const params = new URLSearchParams({
    source: identity.source,
    sourceId: identity.sourceId,
    slug: identity.slug,
    title: identity.title,
  });

  return `/api/article-reactions?${params.toString()}`;
}

export function ArticleReactions({
  className,
  identity,
  initialState,
}: ArticleReactionsProps) {
  const [state, setState] = useState<ArticleReactionState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const endpoint = useMemo(() => buildReactionQuery(identity), [identity]);

  useEffect(() => {
    let isActive = true;

    async function loadVisitorState() {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        const nextState = (await response.json()) as ArticleReactionState;
        if (!isActive) return;
        setState(nextState);
        setErrorMessage(null);
      } catch {
        if (isActive) {
          setErrorMessage("We could not load your reaction yet.");
        }
      }
    }

    loadVisitorState();

    return () => {
      isActive = false;
    };
  }, [endpoint]);

  function selectReaction(kind: ArticleReactionKind) {
    if (!state.available || isPending) return;

    const previousState = state;
    const nextKind = state.selected === kind ? null : kind;
    const optimisticCounts = { ...state.counts };

    if (state.selected) {
      optimisticCounts[state.selected] = Math.max(0, optimisticCounts[state.selected] - 1);
    }
    if (nextKind) {
      optimisticCounts[nextKind] += 1;
    }

    setState({
      ...state,
      counts: optimisticCounts,
      selected: nextKind,
      total: getTotal(optimisticCounts),
    });
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/article-reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...identity, reactionKind: nextKind }),
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Reaction could not be saved.");
        }

        setState(payload as ArticleReactionState);
      } catch (error) {
        setState(previousState);
        setErrorMessage(
          error instanceof Error ? error.message : "Reaction could not be saved.",
        );
      }
    });
  }

  return (
    <section
      aria-labelledby="article-reactions-heading"
      className={cn(
        "rounded-[calc(var(--radius)+1rem)] border border-border bg-card px-5 py-5 shadow-lg sm:px-6",
        className,
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Audience pulse
          </p>
          <h2
            id="article-reactions-heading"
            className="mt-2 font-serif text-2xl leading-none tracking-tight text-foreground"
          >
            How did this story land?
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground" aria-live="polite">
            {state.total > 0
              ? `${state.total} ${state.total === 1 ? "reader has" : "readers have"} reacted.`
              : "Be the first to react."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:min-w-[24rem]">
          {ARTICLE_REACTION_KINDS.map((kind) => {
            const config = REACTION_LABELS[kind];
            const Icon = config.icon;
            const isSelected = state.selected === kind;

            return (
              <button
                key={kind}
                type="button"
                aria-pressed={isSelected}
                disabled={!state.available || isPending}
                onClick={() => selectReaction(kind)}
                className={cn(
                  "group inline-flex min-h-24 flex-col items-center justify-center gap-2 rounded-[calc(var(--radius)+0.5rem)] border px-3 py-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-60",
                  isSelected
                    ? "border-secondary bg-secondary text-secondary-foreground shadow-md"
                    : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-secondary/70 hover:bg-secondary/10",
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={cn(
                    "size-5 transition-transform duration-200 group-hover:scale-110",
                    isSelected ? "text-secondary-foreground" : "text-secondary",
                  )}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  {config.shortLabel}
                </span>
                <span className="font-serif text-2xl leading-none" aria-label={`${state.counts[kind]} ${config.label} reactions`}>
                  {state.counts[kind]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!state.available && state.message ? (
        <p className="mt-4 rounded-[var(--radius)] border border-border bg-background px-4 py-3 text-sm leading-6 text-muted-foreground">
          {state.message}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 text-sm font-medium text-destructive" role="status">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
