// Unified Posts - Combines Sanity CMS articles and Facebook posts
// into a single, sorted feed

import type { Article } from "@/lib/sanity/types";
import type { NormalizedFacebookPost } from "@/lib/facebook/types";

// Unified post type that represents both Sanity articles and Facebook posts
export type UnifiedPost = {
  id: string;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  date: string;
  author: string;
  category: string;
  slug: string;
  permalink: string | null;
  source: "sanity" | "facebook";
  // Facebook-specific fields
  facebookData?: {
    type: "photo" | "video" | "link" | "status" | "album" | "share";
    likes: number;
    comments: number;
    shares: number;
    attachments: NormalizedFacebookPost["attachments"];
    isShared: boolean;
    sharedFrom?: {
      id?: string;
      name?: string;
    };
    originalPost?: {
      id?: string;
      message?: string;
      permalink?: string;
      image?: string;
      author?: {
        id?: string;
        name?: string;
      };
    };
  };
  // Sanity-specific fields
  sanityData?: {
    publishedAt: string | null;
    tags: string[];
  };
};

// Date formatter for consistent date handling
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/**
 * Parse date string to Date object
 */
function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date(0) : date;
}

/**
 * Format date for display
 */
export function formatUnifiedDate(dateString: string): string {
  const date = parseDate(dateString);
  return dateFormatter.format(date);
}

/**
 * Get relative time string
 */
export function getRelativeTime(dateString: string): string {
  const date = parseDate(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return dateFormatter.format(date);
}

/**
 * Convert Sanity Article to UnifiedPost
 */
export function articleToUnifiedPost(article: Article): UnifiedPost {
  return {
    id: `sanity-${article.id}`,
    title: article.title,
    excerpt: article.excerpt,
    content: article.excerpt, // Use excerpt as content preview
    image: article.image,
    date: article.date || new Date().toISOString(),
    author: article.author || "Editorial Team",
    category: article.category || "News",
    slug: article.slug,
    permalink: null,
    source: "sanity",
    sanityData: {
      publishedAt: article.date || null,
      tags: article.tags || [],
    },
  };
}

/**
 * Convert Facebook Post to UnifiedPost
 */
export function facebookPostToUnifiedPost(
  post: NormalizedFacebookPost,
): UnifiedPost {
  // Generate a slug from the post ID
  const slug = `fb-${post.id}`;

  // Use message as title (truncate if needed)
  const title = post.message
    ? post.message.length > 80
      ? post.message.slice(0, 77) + "..."
      : post.message
    : "Facebook Update";

  // Use message as excerpt
  const excerpt = post.message || "View this post on Facebook";

  // Determine category based on post type
  let category = "Social Media";
  if (post.isShared) {
    category = "Shared Post";
  } else if (post.type === "photo") {
    category = "Photo";
  } else if (post.type === "video") {
    category = "Video";
  } else if (post.type === "link") {
    category = "Link";
  }

  return {
    id: `facebook-${post.id}`,
    title,
    excerpt,
    content: post.message,
    image: post.image,
    date: post.createdAt,
    author:
      post.isShared && post.sharedFrom?.name
        ? `Shared from ${post.sharedFrom.name}`
        : "Facebook",
    category,
    slug,
    permalink: post.permalink,
    source: "facebook",
    facebookData: {
      type: post.type,
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
      attachments: post.attachments,
      isShared: post.isShared,
      sharedFrom: post.sharedFrom,
      originalPost: post.originalPost,
    },
  };
}

/**
 * Combine and sort posts from multiple sources
 */
export function combineAndSortPosts(
  articles: Article[],
  facebookPosts: NormalizedFacebookPost[],
): UnifiedPost[] {
  // Convert all articles to unified posts
  const unifiedArticles = articles.map(articleToUnifiedPost);

  // Convert all Facebook posts to unified posts
  const unifiedFacebookPosts = facebookPosts.map(facebookPostToUnifiedPost);

  // Combine all posts
  const allPosts = [...unifiedArticles, ...unifiedFacebookPosts];

  // Sort by date (most recent first)
  allPosts.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return allPosts;
}

/**
 * Filter posts by source
 */
export function filterBySource(
  posts: UnifiedPost[],
  source: "sanity" | "facebook" | "all",
): UnifiedPost[] {
  if (source === "all") return posts;
  return posts.filter((post) => post.source === source);
}

/**
 * Filter posts by category
 */
export function filterByCategory(
  posts: UnifiedPost[],
  category: string,
): UnifiedPost[] {
  if (category === "all") return posts;
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

/**
 * Get unique categories from posts
 */
export function getUniqueCategories(posts: UnifiedPost[]): string[] {
  const categories = new Set(
    posts.map((post) => post.category.toLowerCase()).filter(Boolean),
  );
  return Array.from(categories);
}

/**
 * Get Facebook posts with images for Bento grid
 */
export function getFacebookPostsWithImages(
  posts: UnifiedPost[],
): UnifiedPost[] {
  return posts.filter(
    (post) => post.source === "facebook" && post.image && post.image.length > 0,
  );
}

/**
 * Check if a post is from Facebook
 */
export function isFacebookPost(post: UnifiedPost): boolean {
  return post.source === "facebook";
}

/**
 * Check if a post is from Sanity
 */
export function isSanityPost(post: UnifiedPost): boolean {
  return post.source === "sanity";
}

/**
 * Get the link for a post
 * Returns internal link for all posts (including Facebook)
 */
export function getPostLink(post: UnifiedPost): string {
  return `/news/${post.slug}`;
}

/**
 * Check if link should open in new tab
 * Now returns false since all posts open internally
 */
export function shouldOpenInNewTab(post: UnifiedPost): boolean {
  return false;
}

/**
 * Get the external/source link for a post
 * Returns the original Facebook permalink for Facebook posts
 */
export function getSourceLink(post: UnifiedPost): string | null {
  if (post.source === "facebook" && post.permalink) {
    return post.permalink;
  }
  return null;
}

/**
 * Check if post is a shared post
 */
export function isSharedPost(post: UnifiedPost): boolean {
  return post.source === "facebook" && post.facebookData?.isShared === true;
}

/**
 * Get shared from information
 */
export function getSharedFrom(
  post: UnifiedPost,
): { id?: string; name?: string } | undefined {
  if (post.source === "facebook" && post.facebookData?.isShared) {
    return post.facebookData.sharedFrom;
  }
  return undefined;
}
