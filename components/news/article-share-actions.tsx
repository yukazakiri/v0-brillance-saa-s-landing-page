"use client";

import { Check, Copy, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface ArticleShareActionsProps {
  url: string;
  title: string;
  summary?: string;
  readingTimeMinutes?: number;
  className?: string;
}

export function ArticleShareActions({
  url,
  title,
  summary = "",
  readingTimeMinutes,
  className,
}: ArticleShareActionsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback if clipboard API unavailable
      setCopied(false);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(
    summary ? `${title} — ${summary.slice(0, 120)}` : title,
  );

  const shareTargets = [
    {
      name: "Twitter / X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: Share2,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-y border-border py-4 text-xs text-muted-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold uppercase tracking-[0.2em] text-foreground">
          Share
        </span>
        <div className="flex items-center gap-1.5">
          {shareTargets.map((target) => {
            const Icon = target.icon;
            return (
              <a
                key={target.name}
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${target.name}`}
                aria-label={`Share on ${target.name}`}
                className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon className="size-3.5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {readingTimeMinutes ? (
          <span className="rounded-full bg-secondary/20 px-2.5 py-1 font-medium text-foreground">
            {readingTimeMinutes} min read
          </span>
        ) : null}

        <button
          type="button"
          onClick={handleCopyLink}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            copied && "border-green-600 bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",
          )}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-green-600 dark:text-green-400" aria-hidden="true" />
              <span>Link copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden="true" />
              <span>Copy link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
