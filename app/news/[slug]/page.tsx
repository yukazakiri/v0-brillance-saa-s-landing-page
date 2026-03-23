import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Facebook,
  Hash,
  Share2,
  Tag as TagIcon,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import { getFacebookConfig, getFacebookPosts } from "@/lib/facebook";
import type { NormalizedFacebookPost } from "@/lib/facebook/types";
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
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={value?.alt || "News article image"}
            className="w-full rounded-2xl shadow-md"
          />
          {value?.credit && (
            <figcaption className="text-sm text-muted-foreground italic mt-2 px-2">
              📷 {value.credit}
            </figcaption>
          )}
          {value?.caption && (
            <figcaption className="text-sm text-foreground mt-1 px-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    facebook: ({ value }) => {
      if (!value || !value.url) return null;
      
      return (
        <aside className="my-8 bg-muted border-l-4 border-primary p-6 rounded-r-lg">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
            <span>📱 Facebook Post</span>
          </div>
          <div className="flex justify-center overflow-x-auto">
            <div style={{ minWidth: "100%", maxWidth: "500px" }}>
              <iframe
                src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(value.url)}&width=500&show_text=true`}
                width="100%"
                height="400"
                style={{
                  border: "none",
                  overflow: "hidden",
                  borderRadius: "var(--radius)",
                }}
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Post"
              />
            </div>
          </div>
          <a 
            href={value.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-primary hover:underline"
          >
            View on Facebook →
          </a>
        </aside>
      );
    },
    embed: ({ value }) => {
      if (!value || !value.url) return null;
      
      // Handle Facebook embeds (for generic embed type)
      if (value.url.includes("facebook.com")) {
        return (
          <aside className="my-8 bg-muted border-l-4 border-primary p-6 rounded-r-lg">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
              <span>📱 Facebook Post</span>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <div style={{ minWidth: "100%", maxWidth: "500px" }}>
                <iframe
                  src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(value.url)}&width=500&show_text=true`}
                  width="100%"
                  height="400"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    borderRadius: "var(--radius)",
                  }}
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Post"
                />
              </div>
            </div>
            <a 
              href={value.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-primary hover:underline"
            >
              View on Facebook →
            </a>
          </aside>
        );
      }
      
      // Handle YouTube embeds
      if (value.url.includes("youtube.com") || value.url.includes("youtu.be")) {
        let videoId = "";
        if (value.url.includes("youtube.com")) {
          videoId = new URL(value.url).searchParams.get("v") || "";
        } else {
          videoId = value.url.split("/").pop() || "";
        }
        
        if (!videoId) return null;
        
        return (
          <figure className="my-8 bg-card p-4 rounded-lg border border-border">
            <div className="aspect-video w-full rounded-md overflow-hidden shadow-md bg-foreground/10">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video embed"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <figcaption className="text-sm text-muted-foreground text-center mt-3">
              🎥 YouTube Video
            </figcaption>
          </figure>
        );
      }
      
      // Generic iframe embed
      return (
        <figure className="my-8 bg-card p-4 rounded-lg border border-border">
          <div className="aspect-video w-full rounded-md overflow-hidden shadow-md bg-foreground/10">
            <iframe
              src={value.url}
              title="Embedded content"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <figcaption className="text-sm text-muted-foreground text-center mt-3">
            🔗 Embedded Content
          </figcaption>
        </figure>
      );
    },
  },
  unknownBlockType: ({ value }) => {
    console.warn(`Unknown block type: ${value._type}`);
    return null;
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-7 text-base">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-5 mb-3 leading-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2 leading-tight">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-4 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : ""}
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
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
  const sanityParams = slugs.map((slug) => ({ slug }));

  // Add Facebook post slugs if configured
  const config = getFacebookConfig();
  if (config) {
    try {
      const { posts } = await getFacebookPosts({ limit: 20 });
      const facebookParams = posts.map((post) => ({
        slug: `fb-${post.id}`,
      }));
      return [...sanityParams, ...facebookParams];
    } catch (error) {
      console.error("Error fetching Facebook posts for static params:", error);
    }
  }

  return sanityParams;
}

async function getPost(slug: string): Promise<SanityPost | null> {
  return fetchPostBySlug(slug);
}

// Check if slug is for a Facebook post
function isFacebookSlug(slug: string): boolean {
  return slug.startsWith("fb-");
}

// Extract Facebook post ID from slug
function getFacebookIdFromSlug(slug: string): string {
  return slug.replace("fb-", "");
}

// Fetch a specific Facebook post by ID
async function getFacebookPost(
  postId: string,
): Promise<NormalizedFacebookPost | null> {
  const config = getFacebookConfig();
  if (!config) return null;

  try {
    // Fetch all posts and find the one we need
    // In production, you might want to cache this or use a direct API call
    const { posts } = await getFacebookPosts({ limit: 50 });
    return posts.find((p) => p.id === postId) || null;
  } catch (error) {
    console.error("Error fetching Facebook post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Handle Facebook posts
  if (isFacebookSlug(slug)) {
    const facebookId = getFacebookIdFromSlug(slug);
    const fbPost = await getFacebookPost(facebookId);
    if (!fbPost) return {};

    const baseUrl = getSiteBaseUrl();
    const canonicalUrl = baseUrl ? `${baseUrl}/news/${slug}` : `/news/${slug}`;

    return {
      title: fbPost.message
        ? fbPost.message.slice(0, 60) + "..."
        : "Facebook Post",
      description: fbPost.message || "A post from Facebook",
      alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
      openGraph: {
        title: fbPost.message
          ? fbPost.message.slice(0, 60) + "..."
          : "Facebook Post",
        description: fbPost.message || "A post from Facebook",
        url: canonicalUrl,
        type: "article",
        images: fbPost.image
          ? [
              {
                url: fbPost.image,
                width: 1200,
                height: 630,
                alt: "Facebook post image",
              },
            ]
          : undefined,
      },
    };
  }

  // Handle Sanity posts
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
  const settings = await fetchSettings();

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline:
      "Empowering the next generation of IT professionals, business leaders, and innovators",
  };

  // Handle Facebook posts
  if (isFacebookSlug(slug)) {
    const facebookId = getFacebookIdFromSlug(slug);
    const fbPost = await getFacebookPost(facebookId);

    if (!fbPost) {
      notFound();
    }

    return (
      <FacebookPostPage post={fbPost} settings={siteSettings} slug={slug} />
    );
  }

  // Handle Sanity posts
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

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

      {/* Hero Image Section - Full Width */}
      <section className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-background">
        <div className="relative w-full h-full">
          <img
            src={heroMedia}
            alt={post.featuredImage?.alt || post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </section>

      {/* Article Header Section - Separate */}
      <div className="w-full bg-background py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          {/* Article Header */}
          <header className="border-b border-border/50 pb-10 w-full">
            <div className="w-full space-y-6">
              {/* Breadcrumb Navigation */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
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
          </header>

          <div className="w-full flex flex-col gap-8">
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

            <article className="w-full space-y-4 text-[#433C38]">
              {Array.isArray(post.content) && post.content.length > 0 ? (
                <PortableText
                  value={post.content}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-muted-foreground">Details for this announcement will be available soon.</p>
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

// Facebook Post Page Component
function FacebookPostPage({
  post,
  settings,
  slug,
}: {
  post: NormalizedFacebookPost;
  settings: Settings;
  slug: string;
}) {
  const publishedDate = dateFormatter.format(new Date(post.createdAt));
  const categoryLabel = post.isShared
    ? "Shared Post"
    : formatCategoryLabel(post.type);
  const authorName =
    post.isShared && post.sharedFrom?.name
      ? `Shared from ${post.sharedFrom.name}`
      : "Facebook";
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = baseUrl ? `${baseUrl}/news/${slug}` : `/news/${slug}`;
  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(
        post.message?.slice(0, 100) || "Facebook Post",
      )}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
    },
  ];

  return (
    <>
      <CollegeHeader settings={settings} />

      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden mt-16 sm:mt-20">
        {post.image ? (
          <img
            src={post.image}
            alt={post.message?.slice(0, 60) || "Facebook post"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1877f2] to-[#0d5bbf] flex items-center justify-center">
            <Facebook className="w-24 h-24 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Facebook Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="px-4 py-2 bg-[#1877f2] text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 shadow-lg">
            <Facebook className="w-4 h-4" />
            Facebook
          </div>
        </div>
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
                  {post.message?.slice(0, 50) || "Facebook Post"}
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
                  {post.message
                    ? post.message.slice(0, 100) +
                      (post.message.length > 100 ? "..." : "")
                    : "Facebook Post"}
                </h1>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Facebook className="w-4 h-4 text-[#1877f2]" />
                  <span>{authorName}</span>
                </div>

                {/* Shared From Info */}
                {post.isShared && post.sharedFrom?.name && (
                  <div className="flex items-center gap-3 p-4 bg-[#f7f5f3] rounded-lg border border-[rgba(26,58,82,0.12)]">
                    <Share2 className="w-5 h-5 text-[#1877f2]" />
                    <div>
                      <p className="text-sm font-medium text-[#1a3a52]">
                        Shared from{" "}
                        <span className="text-[#1877f2]">
                          {post.sharedFrom.name}
                        </span>
                      </p>
                      {post.originalPost?.author && (
                        <p className="text-xs text-[#605A57] mt-1">
                          Original by {post.originalPost.author.name}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="w-full max-w-[820px] mx-auto flex flex-col gap-8">
            {/* Post Content */}
            <article className="prose prose-neutral prose-lg max-w-none text-[#433C38]">
              {post.message ? (
                <p className="whitespace-pre-wrap">{post.message}</p>
              ) : (
                <p className="text-muted-foreground italic">
                  This post doesn't have text content.
                </p>
              )}
            </article>

            {/* Original Post (for shared posts) */}
            {post.isShared && post.originalPost && (
              <div className="border border-[rgba(26,58,82,0.12)] rounded-lg overflow-hidden bg-[#f7f5f3]">
                <div className="p-4 bg-[#1a3a52]/5 border-b border-[rgba(26,58,82,0.12)]">
                  <p className="text-sm font-medium text-[#1a3a52] flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Original Post
                  </p>
                </div>
                {post.originalPost.image && (
                  <img
                    src={post.originalPost.image}
                    alt="Original post"
                    className="w-full max-h-[400px] object-cover"
                  />
                )}
                {post.originalPost.message && (
                  <div className="p-4">
                    <p className="text-sm text-[#433C38] line-clamp-4">
                      {post.originalPost.message}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-[rgba(55,50,47,0.12)]">
              <span className="text-sm text-[#605A57]">
                <strong className="text-[#1a3a52]">{post.likes}</strong> likes
              </span>
              {post.comments > 0 && (
                <span className="text-sm text-[#605A57]">
                  <strong className="text-[#1a3a52]">{post.comments}</strong>{" "}
                  comments
                </span>
              )}
              {post.shares > 0 && (
                <span className="text-sm text-[#605A57]">
                  <strong className="text-[#1a3a52]">{post.shares}</strong>{" "}
                  shares
                </span>
              )}
            </div>

            {/* View on Facebook Button */}
            {post.permalink && (
              <div className="flex justify-center">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877f2] text-white text-sm font-semibold rounded-full hover:bg-[#1877f2]/90 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  View on Facebook
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Share Links */}
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

      <FooterSection settings={settings} />
    </>
  );
}
