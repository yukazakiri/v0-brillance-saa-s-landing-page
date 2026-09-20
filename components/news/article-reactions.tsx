"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type React from "react";
import {
  Check,
  Copy,
  Heart,
  Lightbulb,
  PartyPopper,
  Share2,
  Sparkles,
} from "lucide-react";

import {
  ARTICLE_REACTION_KINDS,
  type ArticleReactionIdentity,
  type ArticleReactionKind,
  type ArticleReactionState,
} from "@/lib/sanity/reaction-types";
import { cn } from "@/lib/utils";

export interface ReactionConfig {
  label: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  badgeBg: string;
}

const REACTION_CONFIGS: Record<ArticleReactionKind, ReactionConfig> = {
  like: {
    label: "Like",
    emoji: "❤️",
    icon: Heart,
    activeBg: "bg-rose-50 dark:bg-rose-950/40",
    activeBorder: "border-rose-400 dark:border-rose-700",
    activeText: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300",
  },
  clap: {
    label: "Clap",
    emoji: "👏",
    icon: Sparkles,
    activeBg: "bg-amber-50 dark:bg-amber-950/40",
    activeBorder: "border-amber-400 dark:border-amber-700",
    activeText: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
  },
  inspired: {
    label: "Insightful",
    emoji: "💡",
    icon: Lightbulb,
    activeBg: "bg-sky-50 dark:bg-sky-950/40",
    activeBorder: "border-sky-400 dark:border-sky-700",
    activeText: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300",
  },
  proud: {
    label: "Celebrate",
    emoji: "🎉",
    icon: PartyPopper,
    activeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    activeBorder: "border-emerald-400 dark:border-emerald-700",
    activeText: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
  },
};

type ArticleReactionsProps = {
  identity: ArticleReactionIdentity;
  initialState: ArticleReactionState;
  className?: string;
  showFloatingDock?: boolean;
};

function getTotal(counts: ArticleReactionState["counts"]) {
  return ARTICLE_REACTION_KINDS.reduce(
    (total, kind) => total + (counts[kind] || 0),
    0,
  );
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
  showFloatingDock = true,
}: ArticleReactionsProps) {
  const [state, setState] = useState<ArticleReactionState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activePop, setActivePop] = useState<ArticleReactionKind | null>(null);
  const [isPending, startTransition] = useTransition();
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const endpoint = useMemo(() => buildReactionQuery(identity), [identity]);

  // Load visitor state
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

  // Track scroll position for floating dock visibility
  useEffect(() => {
    if (!showFloatingDock) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling 400px down, hide when within 300px of page bottom
      const pastTop = scrollY > 450;
      const notAtBottom = scrollY + windowHeight < documentHeight - 600;

      setScrolledPastHeader(pastTop && notAtBottom);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showFloatingDock]);

  function selectReaction(kind: ArticleReactionKind) {
    if (!state.available || isPending) return;

    const previousState = state;
    const nextKind = state.selected === kind ? null : kind;
    const optimisticCounts = { ...state.counts };

    if (state.selected && typeof optimisticCounts[state.selected] === "number") {
      optimisticCounts[state.selected] = Math.max(
        0,
        optimisticCounts[state.selected] - 1,
      );
    }
    if (nextKind) {
      optimisticCounts[nextKind] = (optimisticCounts[nextKind] || 0) + 1;
      setActivePop(nextKind);
      setTimeout(() => setActivePop(null), 650);
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
          error instanceof Error
            ? error.message
            : "Reaction could not be saved.",
        );
      }
    });
  }

  async function handleCopyLink() {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      setCopiedLink(false);
    }
  }

  return (
    <>
      {/* 1. In-Article Reaction Section (Modern Blog Style) */}
      <section
        aria-labelledby="article-reactions-heading"
        className={cn(
          "rounded-[calc(var(--radius)+1rem)] border border-border bg-card/60 p-6 sm:p-8 backdrop-blur-sm shadow-sm transition-all",
          className,
        )}
      >
        <div className="flex flex-col gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <h3
                id="article-reactions-heading"
                className="font-serif text-2xl font-semibold tracking-tight text-foreground"
              >
                Enjoyed this story?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Leave a reaction to let the author and campus know your thoughts.
              </p>
            </div>
            {state.total > 0 && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {state.total} {state.total === 1 ? "reaction" : "reactions"}
              </span>
            )}
          </div>

          {/* Reaction Buttons Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
            {ARTICLE_REACTION_KINDS.map((kind) => {
              const config = REACTION_CONFIGS[kind];
              const Icon = config.icon;
              const isSelected = state.selected === kind;
              const isPopping = activePop === kind;
              const count = state.counts[kind] || 0;

              return (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={!state.available || isPending}
                  onClick={() => selectReaction(kind)}
                  className={cn(
                    "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 select-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
                    isSelected
                      ? cn(
                          config.activeBg,
                          config.activeBorder,
                          config.activeText,
                          "shadow-sm ring-1 ring-primary/20",
                        )
                      : "border-border bg-background text-foreground/85 hover:border-border/80 hover:bg-muted/50",
                  )}
                >
                  {/* Emoji / Icon */}
                  <span
                    className={cn(
                      "text-lg transition-transform duration-200 group-hover:scale-110",
                      isPopping && "animate-bounce",
                    )}
                    role="img"
                    aria-hidden="true"
                  >
                    {config.emoji}
                  </span>

                  {/* Label */}
                  <span className="font-medium text-xs sm:text-sm">
                    {config.label}
                  </span>

                  {/* Counter Pill */}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums transition-colors",
                      isSelected
                        ? config.badgeBg
                        : "bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground",
                    )}
                  >
                    {count}
                  </span>

                  {/* "+1" Float Pop Feedback */}
                  {isPopping && (
                    <span className="pointer-events-none absolute -top-4 right-1/2 translate-x-1/2 text-xs font-bold text-primary animate-out fade-out slide-out-to-top-3 duration-500">
                      +1
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {!state.available && state.message ? (
            <p className="rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-xs leading-relaxed text-muted-foreground">
              {state.message}
            </p>
          ) : null}

          {errorMessage ? (
            <p className="text-xs font-medium text-destructive" role="status">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </section>

      {/* 2. Floating Quick Reaction Dock (Medium/Substack Style) */}
      {showFloatingDock && (
        <aside
          aria-label="Quick reactions"
          className={cn(
            "fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ease-out sm:bottom-8",
            scrolledPastHeader
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-12 opacity-0 pointer-events-none",
          )}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-3 py-1.5 shadow-2xl backdrop-blur-md">
            {ARTICLE_REACTION_KINDS.map((kind) => {
              const config = REACTION_CONFIGS[kind];
              const isSelected = state.selected === kind;
              const count = state.counts[kind] || 0;

              return (
                <button
                  key={kind}
                  type="button"
                  aria-label={`${config.label} (${count})`}
                  title={`${config.label} (${count})`}
                  disabled={!state.available || isPending}
                  onClick={() => selectReaction(kind)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150 active:scale-90",
                    isSelected
                      ? cn(config.activeBg, config.activeText, "font-semibold")
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <span className="text-base leading-none">{config.emoji}</span>
                  {count > 0 && (
                    <span className="tabular-nums text-[11px]">{count}</span>
                  )}
                </button>
              );
            })}

            <div className="mx-1 h-4 w-px bg-border" />

            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy article link"
              aria-label="Copy article link"
              className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none"
            >
              {copiedLink ? (
                <Check className="size-3.5 text-green-600" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
