"use client";

import {
  ArrowRight,
  Calendar,
  Facebook,
  Filter,
  ImageIcon,
  Newspaper,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import FooterSection from "@/components/footer-section";
import GsapEditorialReveal from "@/components/gsap-editorial-reveal";
import type { Settings } from "@/lib/sanity/types";
import type { UnifiedPost } from "@/lib/unified-posts";
import {
  formatUnifiedDate,
  getPostLink,
  getRelativeTime,
  getSharedFrom,
  isFacebookPost,
  isSharedPost,
} from "@/lib/unified-posts";

const FALLBACK_CATEGORIES = [
  "announcement",
  "events",
  "achievement",
  "news",
  "alert",
  "social media",
];

function formatCategoryLabel(category: string) {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function PostLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function NewsImage({
  post,
  featured = false,
}: {
  post: UnifiedPost;
  featured?: boolean;
}) {
  if (post.image) {
    return (
      <Image
        src={post.image}
        alt={post.title || "News image"}
        fill
        sizes={
          featured
            ? "(min-width: 1024px) 620px, 92vw"
            : "(min-width: 768px) 360px, 92vw"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="grid h-full place-items-center bg-muted text-primary/35">
      {isFacebookPost(post) ? (
        <Facebook className="size-10" />
      ) : (
        <ImageIcon className="size-10" />
      )}
    </div>
  );
}

function MediaStrip({
  posts,
  galleryImages = [],
}: {
  posts: UnifiedPost[];
  galleryImages?: UnifiedPost[];
}) {
  const combinedImages = [...posts, ...galleryImages]
    .filter((post) => post.image)
    .slice(0, 6);

  if (!combinedImages.length) return null;

  return (
    <section className="w-full border-x border-b border-border/70 bg-muted/45 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-border pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
              Media references
            </p>
            <h2 className="mt-4 font-serif text-5xl font-medium leading-none tracking-[-0.055em] text-primary">
              Recent campus frames.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            A visual index of recent social and official media used across the
            newsroom.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {combinedImages.map((item, index) => {
            const link = getPostLink(item);
            const featured = index === 0;

            return (
              <PostLink
                key={item.id}
                href={link}
                className={`group relative overflow-hidden border border-border bg-card ${featured ? "col-span-2 row-span-2 aspect-square md:col-span-2" : "aspect-square"}`}
              >
                <NewsImage post={item} featured={featured} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="line-clamp-2 text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {isFacebookPost(item)
                      ? getRelativeTime(item.date)
                      : item.date}
                  </p>
                </div>
              </PostLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface NewsPageContentProps {
  posts: UnifiedPost[];
  facebookImages: UnifiedPost[];
  galleryPosts?: UnifiedPost[];
  settings: Settings;
  showFooter?: boolean;
}

export default function NewsPageContent({
  posts,
  facebookImages,
  galleryPosts = [],
  settings,
  showFooter = true,
}: NewsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryOptions = useMemo(() => {
    const unique = new Set(
      posts.map((post) => post.category?.toLowerCase()).filter(Boolean),
    );
    return unique.size ? Array.from(unique) : FALLBACK_CATEGORIES;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter(
      (post) => post.category?.toLowerCase() === selectedCategory,
    );
  }, [posts, selectedCategory]);

  const leadPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1);

  return (
    <GsapEditorialReveal className="w-full">
      <main className="w-full">
        <section className="relative isolate w-full overflow-hidden border-x border-b border-border/70 bg-primary px-5 py-16 text-primary-foreground sm:px-8 lg:px-12 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--primary-foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_oklch,var(--primary-foreground)_6%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
          <div className="absolute left-0 top-0 -z-10 h-full w-28 bg-accent/20 [clip-path:polygon(0_0,100%_0,44%_100%,0_100%)]" />
          <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div data-gsap-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground/65">
                The DCCP news desk
              </p>
              <h1 className="mt-5 max-w-4xl text-balance font-serif text-6xl font-medium leading-[0.84] tracking-[-0.065em] text-primary-foreground sm:text-7xl lg:text-8xl">
                Campus news, edited for students first.
              </h1>
            </div>

            <div
              data-gsap-reveal
              className="grid gap-5 lg:grid-cols-[1fr_260px]"
            >
              <p className="max-w-2xl text-pretty text-lg leading-8 text-primary-foreground/72 sm:text-xl">
                Follow announcements, achievements, advisories, events, and
                social updates from{" "}
                {settings.shortTitle || "Data Center College"}
                in one editorial front page.
              </p>
              <div className="border border-primary-foreground/15 bg-primary-foreground/8 p-5 backdrop-blur">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground/65">
                  <Newspaper className="size-4 text-accent" />
                  Current issue
                </div>
                <p className="mt-5 font-serif text-5xl leading-none tracking-[-0.06em] text-primary-foreground">
                  {filteredPosts.length.toString().padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
                  visible updates
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 border border-border bg-card p-4 shadow-[8px_8px_0_color-mix(in_oklch,var(--primary)_7%,transparent)] lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
              <Filter className="size-4 text-accent" />
              Browse by section
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`border px-4 py-2 text-sm font-bold transition-colors ${selectedCategory === "all" ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-primary hover:border-accent"}`}
              >
                All
              </button>
              {categoryOptions.map((category) => {
                const isSelected = selectedCategory === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`border px-4 py-2 text-sm font-bold transition-colors ${isSelected ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-primary hover:border-accent"}`}
                  >
                    {formatCategoryLabel(category)}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto w-full max-w-[1320px]">
            {!posts.length ? (
              <div
                data-gsap-reveal
                className="border border-border bg-card p-10"
              >
                <h2 className="font-serif text-4xl text-primary">
                  No posts available yet.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Publish official posts or connect Facebook content to populate
                  this newsroom.
                </p>
              </div>
            ) : !filteredPosts.length ? (
              <div
                data-gsap-reveal
                className="border border-border bg-card p-10"
              >
                <h2 className="font-serif text-4xl text-primary">
                  No posts found in this category.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Try another category or view all updates.
                </p>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
                {leadPost && (
                  <PostLink
                    href={getPostLink(leadPost)}
                    className="group block"
                  >
                    <article
                      data-gsap-reveal
                      className="border border-border bg-card shadow-[14px_14px_0_color-mix(in_oklch,var(--primary)_8%,transparent)]"
                    >
                      <div className="grid lg:grid-cols-[1fr_0.78fr]">
                        <div className="relative aspect-[16/11] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[560px]">
                          <NewsImage post={leadPost} featured />
                          <div className="absolute left-4 top-4 bg-accent px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-accent-foreground">
                            Lead story
                          </div>
                        </div>
                        <div className="flex flex-col justify-between border-t border-border p-6 lg:border-l lg:border-t-0 lg:p-8">
                          <div>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                              <span>
                                {formatCategoryLabel(leadPost.category)}
                              </span>
                              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                              <span>{formatUnifiedDate(leadPost.date)}</span>
                              {isFacebookPost(leadPost) && (
                                <Facebook className="size-3.5 text-[#1877f2]" />
                              )}
                            </div>
                            {isSharedPost(leadPost) && (
                              <p className="mt-3 flex items-center gap-2 text-xs text-[#1877f2]">
                                <Share2 className="size-3.5" /> Shared from{" "}
                                {getSharedFrom(leadPost)?.name || "Facebook"}
                              </p>
                            )}
                            <h2 className="mt-6 font-serif text-5xl font-medium leading-[0.96] tracking-[-0.055em] text-primary transition-colors group-hover:text-accent sm:text-6xl">
                              {leadPost.title}
                            </h2>
                            <p className="mt-6 line-clamp-5 text-base leading-8 text-muted-foreground">
                              {leadPost.excerpt ||
                                leadPost.content ||
                                "Open this update for the full announcement."}
                            </p>
                          </div>
                          <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary group-hover:text-accent">
                            Continue reading
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </PostLink>
                )}

                <aside className="grid content-start gap-0 border border-border bg-card">
                  <div className="border-b border-border p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                      More from the desk
                    </p>
                    <h2 className="mt-3 font-serif text-4xl font-medium leading-none tracking-[-0.05em] text-primary">
                      Latest briefs
                    </h2>
                  </div>
                  {secondaryPosts.map((post, index) => {
                    const postLink = getPostLink(post);
                    const fbPost = isFacebookPost(post);
                    return (
                      <PostLink
                        key={post.id}
                        href={postLink}
                        className="group block border-b border-border last:border-b-0"
                      >
                        <article
                          data-gsap-reveal
                          className="grid gap-5 p-5 transition-all duration-300 hover:bg-muted/45 md:grid-cols-[110px_1fr]"
                        >
                          <div className="relative min-h-[110px] overflow-hidden bg-muted">
                            <NewsImage post={post} />
                            <span className="absolute left-2 top-2 bg-background px-2 py-1 font-serif text-2xl leading-none tracking-[-0.05em] text-primary">
                              {String(index + 2).padStart(2, "0")}
                            </span>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                              <Calendar className="size-3.5" />
                              <span>{formatUnifiedDate(post.date)}</span>
                              <span>/</span>
                              <span>{formatCategoryLabel(post.category)}</span>
                              {fbPost && (
                                <Facebook className="size-3.5 text-[#1877f2]" />
                              )}
                            </div>
                            <h2 className="mt-4 font-serif text-2xl font-medium leading-tight tracking-[-0.035em] text-primary group-hover:text-accent">
                              {post.title}
                            </h2>
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                              {post.excerpt ||
                                post.content ||
                                "Open this update for more details."}
                            </p>
                          </div>
                        </article>
                      </PostLink>
                    );
                  })}
                </aside>
              </div>
            )}
          </div>
        </section>

        <MediaStrip posts={facebookImages} galleryImages={galleryPosts} />
      </main>

      {showFooter && <FooterSection settings={settings} />}
    </GsapEditorialReveal>
  );
}
