import { ArrowLeft, Calendar, Hash, Tag as TagIcon, User } from "lucide-react";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import { buildImageUrl } from "@/lib/sanity/image";
import {
  fetchPostBySlug,
  fetchPostSlugs,
  fetchSettings,
} from "@/lib/sanity/queries";
import type { SanityPost, Settings } from "@/lib/sanity/types";
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value ? buildImageUrl(value, 900, 600) : null;
      if (!imageUrl) return null;
      return (
        <img
          src={imageUrl}
          alt={value?.alt || "News article image"}
          className="w-full rounded-2xl shadow-md"
        />
      );
    },
  },
};

function formatCategoryLabel(category?: string | null) {
  if (!category) return "News";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getSiteBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "";
}

export async function generateStaticParams() {
  const slugs = await fetchPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getPost(slug: string): Promise<SanityPost | null> {
  return fetchPostBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return {};

  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = baseUrl ? `${baseUrl}/news/${post.slug}` : undefined;
  const ogImage = buildImageUrl(post.seo?.metaImage ?? post.featuredImage);

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt ?? undefined,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title: post.seo?.metaTitle ?? post.title,
      description: post.seo?.metaDescription ?? post.excerpt ?? undefined,
      url: canonicalUrl,
      type: "article",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), fetchSettings()]);

  if (!post) {
    notFound();
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline:
      "Empowering the next generation of IT professionals, business leaders, and innovators",
  };

  const heroImage = buildImageUrl(post.featuredImage);
  const heroMedia = heroImage ?? "/hero-images/maincampus.png";
  const publishedDate = post.publishedAt
    ? dateFormatter.format(new Date(post.publishedAt))
    : "Coming soon";
  const categoryLabel = formatCategoryLabel(post.category);
  const authorName = post.author || "Editorial Team";
  const summaryText =
    post.seo?.metaDescription ??
    post.excerpt ??
    "Stay informed with the latest updates from Data Center College.";
  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = baseUrl
    ? `${baseUrl}/news/${post.slug}`
    : `/news/${post.slug}`;
  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(
        post.title,
      )}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
    },
  ];

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden mt-16 sm:mt-20">
        <img
          src={heroMedia}
          alt={post.featuredImage?.alt || post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 py-10">
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-10">
          {/* Article Header */}
          <header className="border-b border-border/50 pb-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb Navigation */}
              <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <span className="text-muted-foreground/50">/</span>
                <Link
                  href="/news"
                  className="hover:text-foreground transition-colors"
                >
                  News
                </Link>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-foreground truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                    {categoryLabel}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-xs text-muted-foreground">
                    {publishedDate}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-[1.15] tracking-tight text-foreground">
                  {post.title}
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  {summaryText}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <User className="w-4 h-4" />
                  <span>{authorName}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="w-full max-w-[820px] mx-auto flex flex-col gap-8">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#4A403B]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(55,50,47,0.18)] bg-[#FCFAF7]"
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <article className="prose prose-neutral prose-lg max-w-none text-[#433C38]">
              {Array.isArray(post.content) && post.content.length > 0 ? (
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              ) : (
                <p>Details for this announcement will be available soon.</p>
              )}
            </article>

            <div className="border-t border-[rgba(55,50,47,0.12)] pt-6 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[#6B635D] uppercase tracking-[0.3em]">
                Share this story
              </h3>
              <div className="flex flex-wrap gap-3">
                {shareLinks.map((share) => (
                  <a
                    key={share.label}
                    href={share.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(55,50,47,0.2)] text-sm font-semibold text-[#37322F] hover:bg-[#37322F] hover:text-white transition-colors"
                  >
                    {share.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection settings={siteSettings} />
    </>
  );
}
