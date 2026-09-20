import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { buildImageUrl } from "@/lib/sanity/image";
import type { AdjacentPosts, AdjacentPostSummary } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export interface ArticleReadMoreProps {
  adjacent: AdjacentPosts;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function ArticleNavCard({
  post,
  direction,
}: {
  post: AdjacentPostSummary;
  direction: "previous" | "next";
}) {
  const imageUrl = post.featuredImage
    ? buildImageUrl(post.featuredImage, 600, 400)
    : null;
  const isPrevious = direction === "previous";
  const label = isPrevious ? "Previous Post" : "Next Post";
  const dateStr = post.publishedAt
    ? dateFormatter.format(new Date(post.publishedAt))
    : "";

  return (
    <Link
      href={`/news/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <ImageWithSkeleton
            src={imageUrl}
            alt={post.title}
            className="transition-transform duration-500 group-hover:scale-105"
            fallbackLabel="No preview"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/15 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            DCCP Dispatch
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {isPrevious ? <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> : null}
            <span>{label}</span>
            {!isPrevious ? <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /> : null}
          </div>

          <h4 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary sm:text-2xl">
            {post.title}
          </h4>

          {post.excerpt ? (
            <p className="mt-2 line-clamp-2 font-serif text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}
        </div>

        {dateStr ? (
          <time
            className="mt-6 text-xs text-muted-foreground"
            dateTime={post.publishedAt}
          >
            {dateStr}
          </time>
        ) : null}
      </div>
    </Link>
  );
}

export function ArticleReadMore({ adjacent, className }: ArticleReadMoreProps) {
  const hasPrevious = Boolean(adjacent?.previous);
  const hasNext = Boolean(adjacent?.next);

  if (!hasPrevious && !hasNext) {
    return null;
  }

  return (
    <section aria-labelledby="read-more-heading" className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Continue reading
        </span>
        <h3
          id="read-more-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-foreground"
        >
          Read More
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {adjacent.previous ? (
          <ArticleNavCard post={adjacent.previous} direction="previous" />
        ) : (
          <div className="hidden rounded-[calc(var(--radius)+1rem)] border border-dashed border-border/60 p-6 md:flex md:items-center md:justify-center md:text-sm md:text-muted-foreground">
            Earliest publication in this series.
          </div>
        )}

        {adjacent.next ? (
          <ArticleNavCard post={adjacent.next} direction="next" />
        ) : (
          <div className="hidden rounded-[calc(var(--radius)+1rem)] border border-dashed border-border/60 p-6 md:flex md:items-center md:justify-center md:text-sm md:text-muted-foreground">
            Latest publication in this series.
          </div>
        )}
      </div>
    </section>
  );
}
