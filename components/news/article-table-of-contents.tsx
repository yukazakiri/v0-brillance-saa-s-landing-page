import Link from "next/link";

import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ArticleTableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function ArticleTableOfContents({
  items,
  className,
}: ArticleTableOfContentsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-[calc(var(--radius)+0.75rem)] border border-border bg-card p-6 sm:p-8",
        className,
      )}
    >
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
        Contents
      </h2>
      <ol className="mt-4 space-y-2.5">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "font-serif text-base leading-snug sm:text-lg",
              item.level === 3 && "ml-4 text-sm sm:text-base",
            )}
          >
            <Link
              href={`#${item.id}`}
              className="inline-flex items-baseline gap-2 text-foreground/85 transition-colors hover:text-primary hover:underline hover:decoration-secondary hover:underline-offset-4"
            >
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
