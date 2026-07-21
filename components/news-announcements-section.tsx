import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/sanity/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

function StoryMeta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
      <span>{article.category || "Campus news"}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
      <time dateTime={article.date}>{formatDate(article.date)}</time>
    </div>
  );
}

export default function NewsAnnouncementsSection({
  articles,
}: {
  articles: Article[];
}) {
  if (!articles.length) return null;

  const [leadArticle, ...latestArticles] = articles.slice(0, 4);

  return (
    <section
      id="news"
      aria-labelledby="news-heading"
      className="w-full scroll-mt-24 border-y border-border"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-18 md:px-8 md:py-24">
        <div className="grid gap-8 border-b border-border pb-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.56fr)] md:items-end md:gap-16 md:pb-14">
          <div>
            <Badge
              variant="outline"
              className="bg-card px-3 py-1 text-muted-foreground"
            >
              Newsroom
            </Badge>
            <h2
              id="news-heading"
              className="mt-5 max-w-[13ch] text-balance font-serif text-5xl font-semibold leading-[0.94] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Campus life,{" "}
              <mark className="box-decoration-clone bg-secondary/15 px-1 text-foreground">
                in focus.
              </mark>
            </h2>
          </div>

          <div>
            <p className="max-w-[48ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Follow the people, achievements, announcements, and moments
              shaping the DCCP Baguio community.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-6">
              <Link href="/news">
                View all news
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(330px,0.82fr)] lg:gap-14">
          <article className="group">
            {leadArticle.image ? (
              <Link
                href={"/news/" + leadArticle.slug}
                className="block overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <img
                  src={leadArticle.image}
                  alt=""
                  className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
                />
              </Link>
            ) : null}
            <div
              className={
                leadArticle.image ? "mt-6" : "border-t border-border pt-6"
              }
            >
              <StoryMeta article={leadArticle} />
              <h3 className="mt-3 max-w-[22ch] text-pretty font-serif text-3xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                <Link
                  href={"/news/" + leadArticle.slug}
                  className="decoration-secondary decoration-2 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {leadArticle.title}
                </Link>
              </h3>
              {leadArticle.excerpt ? (
                <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {leadArticle.excerpt}
                </p>
              ) : null}
            </div>
          </article>

          <div
            className="border-b border-border"
            aria-label="More recent stories"
          >
            <div className="flex items-center justify-between border-t border-border py-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Also making news
              </p>
              <span className="font-mono text-xs text-muted-foreground">
                {String(latestArticles.length).padStart(2, "0")}
              </span>
            </div>

            {latestArticles.map((article, index) => (
              <article
                key={article.id}
                className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-t border-border py-6 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-5 sm:py-7"
              >
                <span className="pt-1 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <StoryMeta article={article} />
                  <h3 className="mt-3 text-pretty font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                    <Link
                      href={"/news/" + article.slug}
                      className="group/link inline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {article.title}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-2 inline size-4 text-muted-foreground motion-safe:transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </h3>
                  {article.excerpt ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
