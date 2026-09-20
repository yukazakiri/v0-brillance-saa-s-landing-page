import {
  ExternalLink,
  Facebook,
  Hash,
  Share2,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import CollegeHeader from "@/components/college-header";
import { ArticleAuthorCard } from "@/components/news/article-author-card";
import { ArticleReadMore } from "@/components/news/article-read-more";
import { ArticleReactions } from "@/components/news/article-reactions";
import { ArticleShareActions } from "@/components/news/article-share-actions";
import {
  ArticleTableOfContents,
  type TocItem,
} from "@/components/news/article-table-of-contents";
import { EventHighlights } from "@/components/news/event-highlights";
import FooterSection from "@/components/footer-section";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { MuxVideoPlayer } from "@/components/ui/mux-video-player";
import { getFacebookConfig, getFacebookPosts } from "@/lib/facebook";
import type { NormalizedFacebookPost } from "@/lib/facebook/types";
import {
  buildMuxMp4Url,
  buildMuxStreamUrl,
  buildMuxThumbnailUrl,
  getMuxStatusValue,
  getMuxVideoAsset,
  isMuxVideoReady,
  type MuxPortableValue,
} from "@/lib/mux-video";
import {
  getCloudinaryPhotoUrl,
  getFirstGalleryMedia,
  getFirstGalleryPhoto,
  isGalleryVideo,
} from "@/lib/sanity/photo-gallery";
import { buildImageUrl } from "@/lib/sanity/image";
import {
  fetchArticleReactionTotals,
  type ArticleReactionIdentity,
  type ArticleReactionState,
} from "@/lib/sanity/reactions";
import {
  fetchAdjacentPosts,
  fetchPhotoGalleriesByPostId,
  fetchPostBySlug,
  fetchPostSlugs,
  fetchSettings,
} from "@/lib/sanity/queries";
import { VideoWithSkeleton } from "@/components/ui/video-with-skeleton";
import type { AdjacentPosts, SanityPost, Settings } from "@/lib/sanity/types";
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const revalidate = 60;

function renderMuxVideoFigure(
  value: MuxPortableValue | null | undefined,
  fallbackTitle: string,
  credit?: string | null,
) {
  const asset = getMuxVideoAsset(value);
  const normalizedCredit = credit?.trim();
  const videoTitle = value?.title || value?.alt || fallbackTitle;
  const status = getMuxStatusValue(asset?.status);
  const isReady = isMuxVideoReady(value);

  if (!asset?.playbackId || !isReady) {
    return (
      <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex aspect-video w-full items-center justify-center bg-stone-100 px-6 text-center">
          <div className="flex max-w-md flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Video processing
            </span>
            <span className="text-sm text-muted-foreground">
              {status
                ? `This Mux video is currently ${status}. Please check back soon.`
                : "This Mux video is not ready yet. Please check back soon."}
            </span>
          </div>
        </div>
        {normalizedCredit ? (
          <figcaption className="px-4 py-3 text-center text-sm italic text-muted-foreground">
            <span>🎬 {normalizedCredit}</span>
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md">
        <MuxVideoPlayer
          playbackId={asset.playbackId}
          thumbnailTime={asset.thumbTime}
          videoTitle={videoTitle}
        />
      </div>
      {normalizedCredit ? (
        <figcaption className="mt-2 px-2 text-center text-sm italic text-muted-foreground">
          <span>🎬 {normalizedCredit}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function getPlainText(children: any): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children
      .map((c) => (typeof c === "string" ? c : getPlainText(c?.props?.children || c)))
      .join("");
  }
  if (typeof children === "object" && children?.props?.children) {
    return getPlainText(children.props.children);
  }
  return String(children);
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractTableOfContents(content?: any[]): TocItem[] {
  if (!Array.isArray(content)) return [];
  const items: TocItem[] = [];
  content.forEach((block) => {
    if (block?._type === "block" && (block.style === "h2" || block.style === "h3")) {
      const text = (block.children || [])
        .map((c: any) => c.text || "")
        .join("")
        .trim();
      if (text) {
        const id = slugifyHeading(text);
        if (id) {
          items.push({
            id,
            text,
            level: block.style === "h2" ? 2 : 3,
          });
        }
      }
    }
  });
  return items;
}

function calculateReadingTime(content?: any[], excerpt?: string): number {
  let wordCount = 0;
  if (excerpt) {
    wordCount += excerpt.split(/\s+/).filter(Boolean).length;
  }
  if (Array.isArray(content)) {
    content.forEach((block) => {
      if (block?._type === "block" && Array.isArray(block.children)) {
        block.children.forEach((c: any) => {
          if (c?.text) {
            wordCount += c.text.split(/\s+/).filter(Boolean).length;
          }
        });
      }
    });
  }
  return Math.max(1, Math.ceil(wordCount / 180));
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const dimensions = value?.asset?.metadata?.dimensions;
      const isPortrait = dimensions
        ? dimensions.height > dimensions.width
        : false;

      const imageUrl = value
        ? buildImageUrl(value, 1200, isPortrait ? 1600 : 800)
        : null;
      if (!imageUrl) return null;

      return (
        <figure className={isPortrait ? "my-5" : "my-10"}>
          <img
            src={imageUrl}
            alt={value?.alt || "News article image"}
            className="w-full rounded-[calc(var(--radius)+0.5rem)] shadow-xl"
          />
          {(value?.credit || value?.caption) && (
            <figcaption className="mt-3 px-1 text-sm italic leading-6 text-muted-foreground">
              {value.caption && <span>{value.caption}</span>}
              {value.caption && value.credit && <span> • </span>}
              {value.credit && <span>📷 {value.credit}</span>}
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
    muxVideo: ({ value }) => renderMuxVideoFigure(value, "News video"),
    "mux.video": ({ value }) => renderMuxVideoFigure(value, "News video"),
    video: ({ value }) => {
      if (!value || !getMuxVideoAsset(value)) return null;
      return renderMuxVideoFigure(value, "News video");
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
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-serif text-xl leading-9 text-foreground sm:text-[1.35rem] sm:leading-10">
        {children}
      </p>
    ),
    h1: ({ children }) => {
      const text = getPlainText(children);
      const id = slugifyHeading(text);
      return (
        <h1
          id={id || undefined}
          className="mb-5 mt-12 scroll-mt-28 text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const text = getPlainText(children);
      const id = slugifyHeading(text);
      return (
        <h2
          id={id || undefined}
          className="mb-4 mt-12 scroll-mt-28 text-balance font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = getPlainText(children);
      const id = slugifyHeading(text);
      return (
        <h3
          id={id || undefined}
          className="mb-3 mt-10 scroll-mt-28 font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-secondary pl-5 font-serif text-2xl italic leading-10 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-3 font-serif text-xl leading-8 text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-3 font-serif text-xl leading-8 text-foreground">
        {children}
      </ol>
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
        className="text-primary underline decoration-secondary/60 underline-offset-4 transition-colors hover:text-secondary"
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

function formatPostKindLabel(kind?: string | null) {
  if (!kind) return "News";

  const labels: Record<string, string> = {
    news: "News",
    story: "Feature Story",
    announcement: "Announcement",
    alert: "Alert",
  };

  return labels[kind] ?? formatCategoryLabel(kind);
}

function getSiteBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://dccp.edu.ph";
}

function getNewsPostUrl(baseUrl: string, slug: string) {
  return baseUrl ? `${baseUrl}/news/${slug}` : `/news/${slug}`;
}

function getNewsPlayerUrl(baseUrl: string, slug: string) {
  return `${baseUrl}/news/${slug}/player`;
}

function getPostVideoSocialData(post: SanityPost, baseUrl: string) {
  const asset = getMuxVideoAsset(post.video);

  if (!asset?.playbackId || !isMuxVideoReady(post.video)) {
    return null;
  }

  const playerUrl = getNewsPlayerUrl(baseUrl, post.slug);

  return {
    playbackId: asset.playbackId,
    mp4Url: buildMuxMp4Url(asset.playbackId),
    playerUrl,
    streamUrl: buildMuxStreamUrl(asset.playbackId),
    thumbnailUrl: buildMuxThumbnailUrl(asset.playbackId, asset.thumbTime),
  };
}

function getVideoObjectJsonLd({
  post,
  baseUrl,
  description,
}: {
  post: SanityPost;
  baseUrl: string;
  description: string;
}) {
  const video = getPostVideoSocialData(post, baseUrl);

  if (!video) return null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: post.video?.title || post.video?.alt || post.title,
    description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: post.publishedAt,
    embedUrl: video.playerUrl,
    contentUrl: video.mp4Url,
    publisher: baseUrl
      ? {
          "@type": "Organization",
          name: "Data Center College of the Philippines",
          url: baseUrl,
        }
      : undefined,
  };
}

function getJsonLdMarkup(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
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
    const canonicalUrl = getNewsPostUrl(baseUrl, slug);

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
        siteName: "Data Center College of the Philippines",
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
      twitter: {
        card: "summary_large_image",
        title: fbPost.message
          ? fbPost.message.slice(0, 60) + "..."
          : "Facebook Post",
        description: fbPost.message || "A post from Facebook",
        images: fbPost.image ? [fbPost.image] : undefined,
        creator: "@dccp_baguio",
      },
    };
  }

  // Handle Sanity posts
  const post = await fetchPostBySlug(slug);
  if (!post) return {};

  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = getNewsPostUrl(baseUrl, post.slug);
  const videoSocialData = getPostVideoSocialData(post, baseUrl);
  const ogImage = buildImageUrl(post.seo?.metaImage ?? post.featuredImage);
  const socialImage = ogImage ?? videoSocialData?.thumbnailUrl;
  const title = post.seo?.metaTitle ?? post.title;
  const description =
    post.seo?.metaDescription ??
    post.excerpt ??
    "Read the latest news and updates from Data Center College of the Philippines.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Data Center College of the Philippines",
      images: socialImage
        ? [
            {
              url: socialImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
      videos: videoSocialData
        ? [
            {
              url: videoSocialData.mp4Url,
              secureUrl: videoSocialData.mp4Url,
              type: "video/mp4",
              width: 1280,
              height: 720,
            },
          ]
        : undefined,
      publishedTime: post.publishedAt,
      authors:
        post.authors && post.authors.length > 0
          ? post.authors
              .map((author) => author.fullName || author.preferredName)
              .filter((name): name is string => Boolean(name))
          : post.author
            ? [post.author]
            : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
      creator: "@dccp_baguio",
    },
    other: videoSocialData
      ? {
          "og:video": videoSocialData.mp4Url,
          "og:video:url": videoSocialData.mp4Url,
          "og:video:secure_url": videoSocialData.mp4Url,
          "og:video:type": "video/mp4",
          "og:video:width": "1280",
          "og:video:height": "720",
        }
      : undefined,
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

  const reactionIdentity: ArticleReactionIdentity = {
    source: "sanity",
    sourceId: post._id,
    slug: post.slug,
    title: post.title,
  };
  const [relatedGalleries, initialReactionState, adjacentPosts] =
    await Promise.all([
      fetchPhotoGalleriesByPostId(post._id),
      fetchArticleReactionTotals(reactionIdentity),
      fetchAdjacentPosts(post.publishedAt),
    ]);

  const tocItems = extractTableOfContents(post.content);
  const readingTimeMinutes = calculateReadingTime(post.content, post.excerpt);
  const primaryAuthor =
    post.authors && post.authors.length > 0 ? post.authors[0] : null;
  const authorAvatarUrl = primaryAuthor?.headshot
    ? buildImageUrl(primaryAuthor.headshot, 120, 120)
    : null;

  const heroImage = buildImageUrl(post.featuredImage);
  const heroMedia = heroImage ?? "/hero-images/maincampus.png";
  const publishedDate = post.publishedAt
    ? dateFormatter.format(new Date(post.publishedAt))
    : "Coming soon";
  const categoryLabel =
    post.primaryCategory?.title ||
    formatPostKindLabel(post.postKind) ||
    formatCategoryLabel(post.category);
  const authorName =
    primaryAuthor?.preferredName ||
    primaryAuthor?.fullName ||
    post.author ||
    "Editorial Team";
  const authorSubtitle =
    primaryAuthor?.titles?.[0] ||
    primaryAuthor?.roleType ||
    "Campus Dispatch";
  const summaryText =
    post.seo?.metaDescription ??
    post.excerpt ??
    "Stay informed with the latest updates from Data Center College.";
  const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
  const baseUrl = getSiteBaseUrl();
  const canonicalUrl = getNewsPostUrl(baseUrl, post.slug);
  const videoStructuredData = getVideoObjectJsonLd({
    post,
    baseUrl,
    description: summaryText,
  });
  // Prepare share text with hashtags
  const hashtagsText =
    tags.length > 0
      ? " " + tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ")
      : " #DatalCenterCollege #DCCP";
  const shareText = `${post.title} - ${summaryText.substring(0, 100)}${summaryText.length > 100 ? "..." : ""}${hashtagsText}`;
  const linkedinTitle = post.title;
  const linkedinSummary = summaryText.substring(0, 200);

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}&quote=${encodeURIComponent(post.title)}`,
      title: "Share on Facebook",
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(shareText)}`,
      title: "Share on Twitter",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
      title: "Share on LinkedIn",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${post.title}\n\n${summaryText}\n\n${canonicalUrl}`)}`,
      title: "Share on WhatsApp",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${post.title}\n\n${summaryText}\n\nRead more: ${canonicalUrl}`)}`,
      title: "Share via Email",
    },
  ];

  return (
    <>
      {videoStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getJsonLdMarkup(videoStructuredData),
          }}
        />
      ) : null}
      <CollegeHeader settings={siteSettings} />

      <main className="bg-background pt-28 sm:pt-32 lg:pt-36">
        <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:pb-28">
          <header className="mx-auto max-w-[760px] pb-8">
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <Link
                href="/news"
                className="hover:text-foreground transition-colors"
              >
                News
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="truncate max-w-[240px] text-foreground font-medium">
                {post.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/news?category=${encodeURIComponent(categoryLabel.toLowerCase())}`}
                className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary transition-colors hover:text-primary"
              >
                {categoryLabel}
              </Link>
              <span className="h-1 w-1 rounded-full bg-border" />
              <time className="text-xs text-muted-foreground" dateTime={post.publishedAt}>
                {publishedDate}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="text-xs text-muted-foreground">
                    Updated {dateFormatter.format(new Date(post.updatedAt))}
                  </span>
                </>
              ) : null}
            </div>

            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {summaryText ? (
              <p className="mt-6 font-serif text-xl leading-relaxed text-muted-foreground sm:text-2xl sm:leading-[1.5]">
                {summaryText}
              </p>
            ) : null}

            {/* Author Byline */}
            <div className="mt-8 flex items-center gap-3.5">
              {authorAvatarUrl ? (
                <img
                  src={authorAvatarUrl}
                  alt={authorName}
                  className="size-11 rounded-full border border-border object-cover shadow-sm"
                />
              ) : (
                <div className="flex size-11 items-center justify-center rounded-full border border-border bg-secondary/15 text-foreground">
                  <User className="size-5 text-muted-foreground" aria-hidden="true" />
                </div>
              )}
              <div>
                <p className="font-serif text-base font-semibold leading-tight text-foreground">
                  {authorName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {authorSubtitle}
                </p>
              </div>
            </div>

            {/* Quick Share Actions Bar */}
            <ArticleShareActions
              url={canonicalUrl}
              title={post.title}
              summary={summaryText}
              readingTimeMinutes={readingTimeMinutes}
              className="mt-8"
            />
          </header>

          <figure className="mx-auto max-w-[960px] overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border border-border bg-card shadow-xl">
            <img
              src={heroMedia}
              alt={post.featuredImage?.alt || post.title}
              className="aspect-[16/10] w-full object-cover"
            />
            {post.featuredImage?.caption || post.featuredImage?.credit ? (
              <figcaption className="border-t border-border bg-card px-5 py-3 text-sm italic leading-6 text-muted-foreground">
                {post.featuredImage.caption ? <span>{post.featuredImage.caption}</span> : null}
                {post.featuredImage.caption && post.featuredImage.credit ? <span> · </span> : null}
                {post.featuredImage.credit ? <span>📷 {post.featuredImage.credit}</span> : null}
              </figcaption>
            ) : null}
          </figure>

          <div className="mx-auto mt-12 flex w-full max-w-[760px] flex-col gap-10 sm:mt-16">
            {/* Table of Contents */}
            {tocItems.length > 1 ? (
              <ArticleTableOfContents items={tocItems} />
            ) : null}

            {post.video
              ? renderMuxVideoFigure(post.video, post.title, post.videoCredit)
              : null}

            <article className="w-full text-foreground">
              {Array.isArray(post.content) && post.content.length > 0 ? (
                <div className="[&>figure]:break-inside-avoid">
                  <PortableText
                    value={post.content}
                    components={portableTextComponents}
                  />
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Details for this announcement will be available soon.
                </p>
              )}
            </article>

            <ArticleReactions
              identity={reactionIdentity}
              initialState={initialReactionState}
            />

            {post.eventHighlights ? (
              <EventHighlights
                highlights={post.eventHighlights}
                articleTitle={post.title}
              />
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6 text-xs font-medium text-foreground">
                <span className="mr-1 text-muted-foreground">Topics:</span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    <Hash className="size-3" />
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <ArticleAuthorCard author={primaryAuthor} fallbackName={authorName} />

            <ArticleReadMore adjacent={adjacentPosts} />

            <div className="border-t border-border pt-6 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.3em]">
                Share this story
              </h3>
              <div className="flex flex-wrap gap-3">
                {shareLinks.map((share) => (
                  <a
                    key={share.label}
                    href={share.href}
                    target="_blank"
                    rel="noreferrer"
                    title={share.title}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {share.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>

            {relatedGalleries.length > 0 ? (
              <section className="rounded-[calc(var(--radius)+1.4rem)] border border-border bg-card p-5 sm:p-7">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      Related Gallery
                    </span>
                    <h2 className="text-2xl font-serif text-foreground">
                      Photo references for this article
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                      If this article or event has linked albums, you can open
                      them below to browse the photos and media captured for it.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedGalleries.map((gallery) => {
                      const coverAsset =
                        getFirstGalleryPhoto(gallery) ||
                        getFirstGalleryMedia(gallery);
                      const coverUrl = getCloudinaryPhotoUrl(coverAsset);
                      const coverIsVideo = isGalleryVideo(coverAsset);
                      const itemCount = Array.isArray(gallery.photos)
                        ? gallery.photos.length
                        : 0;

                      return (
                        <Link
                          key={gallery._id}
                          href={`/gallery/${gallery.slug.current}`}
                          className="group overflow-hidden rounded-[calc(var(--radius)+1rem)] border border-border bg-background transition-transform duration-300 hover:-translate-y-1"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                            {coverUrl ? (
                              coverIsVideo ? (
                                <VideoWithSkeleton
                                  src={coverUrl}
                                  aria-label={gallery.title}
                                  className="transition-transform duration-500 group-hover:scale-105"
                                  fallbackLabel="No preview"
                                />
                              ) : (
                                <ImageWithSkeleton
                                  src={coverUrl}
                                  alt={gallery.title}
                                  className="transition-transform duration-500 group-hover:scale-105"
                                  fallbackLabel="No cover"
                                />
                              )
                            ) : (
                              <div className="flex h-full items-center justify-center bg-stone-100 text-xs font-semibold uppercase tracking-[0.24em] text-[#6B635D]">
                                No cover
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                              <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                                  {itemCount} item{itemCount === 1 ? "" : "s"}
                                </p>
                                <h3 className="mt-1 text-xl font-serif leading-tight">
                                  {gallery.title}
                                </h3>
                              </div>
                              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
                                Open
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-4 p-5">
                            <p className="text-sm leading-6 text-muted-foreground">
                              {gallery.summary ||
                                "Open this gallery to browse the media captured for this event."}
                            </p>
                            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                              View photo album
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  );
}

// Facebook Post Page Component
async function FacebookPostPage({
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
  const canonicalUrl = getNewsPostUrl(baseUrl, slug);
  const fbShareText = `${post.message?.slice(0, 100) || "Facebook Post"} - From Data Center College of the Philippines #DCCP`;
  const fbShareEmail = `Check this out from Data Center College:\n\n${post.message || "A post from Data Center College"}\n\n${canonicalUrl}`;
  const reactionIdentity: ArticleReactionIdentity = {
    source: "facebook",
    sourceId: post.id,
    slug,
    title: post.message?.slice(0, 100) || "Facebook Post",
  };
  const initialReactionState: ArticleReactionState =
    await fetchArticleReactionTotals(reactionIdentity);

  const shareLinks = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}&quote=${encodeURIComponent(post.message?.slice(0, 80) || "Check this out")}`,
      title: "Share on Facebook",
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(fbShareText)}`,
      title: "Share on Twitter",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
      title: "Share on LinkedIn",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${post.message?.slice(0, 100) || "Check this out"}\n\n${canonicalUrl}`)}`,
      title: "Share on WhatsApp",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent("Check this out from Data Center College")}&body=${encodeURIComponent(fbShareEmail)}`,
      title: "Share via Email",
    },
  ];

  const readingTimeMinutes = Math.max(
    1,
    Math.ceil((post.message || "").split(/\s+/).filter(Boolean).length / 180),
  );

  return (
    <>
      <CollegeHeader settings={settings} />

      <main className="bg-background pt-28 sm:pt-32 lg:pt-36">
        <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:pb-28">
          <header className="mx-auto max-w-[760px] pb-8">
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <Link
                href="/news"
                className="hover:text-foreground transition-colors"
              >
                News
              </Link>
              <span className="text-muted-foreground/40">/</span>
              <span className="truncate max-w-[240px] text-foreground font-medium">
                {post.message?.slice(0, 50) || "Facebook Post"}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                {categoryLabel}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <time className="text-xs text-muted-foreground" dateTime={post.createdAt}>
                {publishedDate}
              </time>
            </div>

            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {post.message
                ? post.message.slice(0, 100) +
                  (post.message.length > 100 ? "..." : "")
                : "Facebook Post"}
            </h1>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full border border-border bg-secondary/15 text-foreground">
                <Facebook className="size-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-base font-semibold leading-tight text-foreground">
                  {authorName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Campus Social Post
                </p>
              </div>
            </div>

            {/* Shared From Info */}
            {post.isShared && post.sharedFrom?.name && (
              <div className="mt-6 flex items-center gap-3 rounded-[calc(var(--radius)+0.5rem)] border border-border bg-card p-4">
                <Share2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Shared from{" "}
                    <span className="text-primary">
                      {post.sharedFrom.name}
                    </span>
                  </p>
                  {post.originalPost?.author && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Original by {post.originalPost.author.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            <ArticleShareActions
              url={canonicalUrl}
              title={post.message?.slice(0, 100) || "Facebook Post"}
              readingTimeMinutes={readingTimeMinutes}
              className="mt-8"
            />
          </header>

          <figure className="mx-auto max-w-[960px] overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border border-border bg-card shadow-xl">
            {post.image ? (
              <img
                src={post.image}
                alt={post.message?.slice(0, 60) || "Facebook post"}
                className="aspect-[3/2] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[3/2] w-full items-center justify-center bg-primary/10">
                <Facebook className="w-24 h-24 text-primary/30" />
              </div>
            )}
          </figure>

          <div className="mx-auto mt-12 flex w-full max-w-[760px] flex-col gap-10 sm:mt-16">
            {/* Post Content */}
            <article className="text-foreground">
              {post.message ? (
                <p className="whitespace-pre-wrap font-serif text-xl leading-9 text-foreground sm:text-[1.35rem] sm:leading-10">
                  {post.message}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  This post doesn't have text content.
                </p>
              )}
            </article>

            {/* Original Post (for shared posts) */}
            {post.isShared && post.originalPost && (
              <div className="overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border border-border bg-card">
                <div className="border-b border-border bg-primary/5 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
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
                    <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">
                      {post.originalPost.message}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 border-y border-border py-4">
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{post.likes}</strong> likes
              </span>
              {post.comments > 0 && (
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{post.comments}</strong>{" "}
                  comments
                </span>
              )}
              {post.shares > 0 && (
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{post.shares}</strong>{" "}
                  shares
                </span>
              )}
            </div>

            <ArticleReactions
              identity={reactionIdentity}
              initialState={initialReactionState}
            />

            {/* View on Facebook Button */}
            {post.permalink && (
              <div className="flex justify-center">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Facebook className="w-4 h-4" />
                  View on Facebook
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Share Links */}
            <div className="border-t border-border pt-6 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.3em]">
                Share this story
              </h3>
              <div className="flex flex-wrap gap-3">
                {shareLinks.map((share) => (
                  <a
                    key={share.label}
                    href={share.href}
                    target="_blank"
                    rel="noreferrer"
                    title={share.title}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {share.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection settings={settings} />
    </>
  );
}
