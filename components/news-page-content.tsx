"use client";

import { ArrowUpRight, CalendarDays, Facebook, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Settings } from "@/lib/sanity/types";
import type { UnifiedPost } from "@/lib/unified-posts";
import {
  formatUnifiedDate,
  getPostLink,
  isFacebookPost,
} from "@/lib/unified-posts";

interface NewsPageContentProps {
  posts: UnifiedPost[];
  settings: Settings;
}

function formatCategoryLabel(category?: string | null) {
  if (!category) return "Campus news";
  return category
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function PostMeta({ post }: { post: UnifiedPost }) {
  const facebookPost = isFacebookPost(post);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
      <span>{formatCategoryLabel(post.category)}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden="true" className="size-3.5" />
        <time dateTime={post.date}>{formatUnifiedDate(post.date)}</time>
      </span>
      {facebookPost ? (
        <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
          <Facebook aria-hidden="true" className="size-3.5" />
          Facebook
        </span>
      ) : null}
    </div>
  );
}

export default function NewsPageContent({
  posts,
  settings,
}: NewsPageContentProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const values = new Map<string, string>();
    posts.forEach((post) => {
      const category = post.category?.trim();
      if (category) values.set(category.toLowerCase(), category);
    });
    return Array.from(values.entries()).sort((a, b) =>
      a[1].localeCompare(b[1]),
    );
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" ||
        post.category?.toLowerCase() === selectedCategory;
      const searchableText = [
        post.title,
        post.excerpt,
        post.author,
        post.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });
  }, [posts, query, selectedCategory]);

  const [featuredPost, ...storyPosts] = filteredPosts;
  const hasFilters = Boolean(query.trim()) || selectedCategory !== "all";

  function resetFilters() {
    setQuery("");
    setSelectedCategory("all");
  }

  return (
    <main className="w-full pt-16 sm:pt-20">
      <section
        aria-labelledby="newsroom-heading"
        className="border-y border-border"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-18 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(320px,0.84fr)] lg:items-end lg:gap-16">
            <div>
              <Badge
                variant="outline"
                className="bg-card px-3 py-1 text-muted-foreground"
              >
                DCCP Newsroom
              </Badge>
              <h1
                id="newsroom-heading"
                className="mt-5 max-w-[12ch] text-balance font-serif text-5xl font-semibold leading-[0.92] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Stories that keep our{" "}
                <mark className="box-decoration-clone bg-secondary/15 px-1 text-foreground">
                  campus connected.
                </mark>
              </h1>
            </div>

            <div className="border-t border-border pt-6 lg:border-t-0 lg:pt-0">
              <p className="max-w-[48ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Official announcements, student achievements, campus events, and
                community stories from{" "}
                <strong className="font-medium text-foreground">
                  {settings.shortTitle || "Data Center College"}
                </strong>
                .
              </p>
              <div className="mt-7 flex items-baseline gap-3">
                <span className="font-serif text-4xl font-semibold tracking-tight text-foreground">
                  {posts.length}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  published {posts.length === 1 ? "story" : "stories"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Browse news" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 md:px-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div>
              <label
                htmlFor="news-search"
                className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
              >
                Search the newsroom
              </label>
              <div className="relative mt-3">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="news-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search stories, events, or topics"
                  className="h-11 rounded-none border-x-0 border-t-0 bg-transparent pl-10 pr-10 shadow-none"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Browse by topic
              </p>
              <div
                className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
                aria-label="News topics"
              >
                <Button
                  type="button"
                  size="sm"
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  aria-pressed={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                  className="shrink-0 rounded-full"
                >
                  All stories
                </Button>
                {categories.map(([value, label]) => (
                  <Button
                    key={value}
                    type="button"
                    size="sm"
                    variant={selectedCategory === value ? "default" : "outline"}
                    aria-pressed={selectedCategory === value}
                    onClick={() => setSelectedCategory(value)}
                    className="shrink-0 rounded-full"
                  >
                    {formatCategoryLabel(label)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
            <p
              className="text-sm text-muted-foreground"
              aria-live="polite"
              aria-atomic="true"
            >
              Showing{" "}
              <strong className="font-medium text-foreground">
                {filteredPosts.length}
              </strong>{" "}
              {filteredPosts.length === 1 ? "story" : "stories"}
              {query.trim() ? " for “" + query.trim() + "”" : ""}
            </p>
            {hasFilters ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
              >
                Reset filters
                <X aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-label="News results" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
          {!featuredPost ? (
            <div className="border-y border-border py-16 text-center sm:py-20">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                No matching stories
              </p>
              <h2 className="mx-auto mt-4 max-w-[18ch] text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Try another topic or a broader search.
              </h2>
              {hasFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-7"
                  onClick={resetFilters}
                >
                  Show all news
                </Button>
              ) : null}
            </div>
          ) : (
            <>
              <article
                className={
                  "grid gap-8 border-y border-border py-8 sm:py-10 " +
                  (featuredPost.image
                    ? "lg:grid-cols-[minmax(0,1.06fr)_minmax(340px,0.94fr)] lg:items-center lg:gap-14"
                    : "")
                }
              >
                {featuredPost.image ? (
                  <Link
                    href={getPostLink(featuredPost)}
                    className="group block overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    <img
                      src={featuredPost.image}
                      alt=""
                      className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                ) : null}

                <div>
                  <Badge variant="outline" className="mb-5 bg-card">
                    Featured story
                  </Badge>
                  <PostMeta post={featuredPost} />
                  <h2 className="mt-4 max-w-[20ch] text-pretty font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    <Link
                      href={getPostLink(featuredPost)}
                      className="decoration-secondary decoration-2 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {featuredPost.title || "Campus update"}
                    </Link>
                  </h2>
                  {featuredPost.excerpt ? (
                    <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
                      {featuredPost.excerpt}
                    </p>
                  ) : null}
                  <Button asChild variant="outline" size="lg" className="mt-7">
                    <Link href={getPostLink(featuredPost)}>
                      Read the full story
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>

              {storyPosts.length ? (
                <div className="mt-14 grid gap-x-10 md:grid-cols-2">
                  {storyPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className="group grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-t border-border py-7 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-5 sm:py-8"
                    >
                      <span className="pt-1 font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <PostMeta post={post} />
                        <h2 className="mt-3 text-pretty font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                          <Link
                            href={getPostLink(post)}
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {post.title || "Campus update"}
                          </Link>
                        </h2>
                        {post.excerpt ? (
                          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>
                        ) : null}
                        <Link
                          href={getPostLink(post)}
                          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-4 hover:decoration-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {isFacebookPost(post) ? "Open update" : "Read story"}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 motion-safe:transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
