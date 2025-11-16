import { groq } from "next-sanity";

import { client } from "./client";
import { getImageUrl } from "./image";
import type { Article, SanityPost, Settings } from "./types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const POST_PROJECTION = groq`{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "slug": coalesce(slug.current, _id),
  excerpt,
  content[] {
    ...,
    _type == "image" => {
      ...,
      "asset": asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      externalUrl
    }
  },
  postKind,
  contentFocus,
  priority,
  category,
  tags,
  publishedAt,
  updatedAt,
  author,
  "authors": authors[]->{ _id, name },
  status,
  featuredImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    alt,
    caption,
    credit,
    externalUrl
  },
  "featured": coalesce(featured, false),
  "primaryCategory": primaryCategory->{ _id, title },
  audiences,
  channels,
  activationWindow,
  cta,
  seo {
    metaTitle,
    metaDescription,
    metaImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      externalUrl
    },
    canonicalUrl
  }
}`;

// Fetch all posts regardless of status in development
// In production, you can add status filter back if needed
const ALL_POSTS_QUERY = groq`
  *[_type == "post"]
  | order(publishedAt desc)
  ${POST_PROJECTION}
`;

const LATEST_POSTS_QUERY = groq`
  *[_type == "post"]
  | order(publishedAt desc)[0...$limit]
  ${POST_PROJECTION}
`;

const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]
  ${POST_PROJECTION}
`;

const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`;

function formatCategory(post: SanityPost): string {
  // Priority: primaryCategory -> postKind -> category (legacy) -> "General"
  if (post.primaryCategory?.title) {
    return post.primaryCategory.title;
  }
  if (post.postKind) {
    const kindLabels: Record<string, string> = {
      news: "News",
      story: "Feature Story",
      announcement: "Announcement",
      alert: "Alert",
    };
    return kindLabels[post.postKind] || post.postKind;
  }
  if (post.category) {
    return post.category.charAt(0).toUpperCase() + post.category.slice(1);
  }
  return "General";
}

function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}


function mapPostToArticle(post: SanityPost): Article {
  // Get author name: prefer authors array, fallback to legacy author field
  const authorName =
    post.authors && post.authors.length > 0
      ? post.authors.map(a => a.name).join(", ")
      : post.author ?? "Editorial Team";

  return {
    id: post._id,
    slug: post.slug,
    category: formatCategory(post),
    title: post.title,
    excerpt: post.excerpt ?? "",
    date: formatDate(post.publishedAt),
    author: authorName,
    image: getImageUrl(post.featuredImage, 1200, 800),
    featured: Boolean(post.featured),
    tags: post.tags ?? [],
    seo: {
      title: post.seo?.metaTitle,
      description: post.seo?.metaDescription,
      image: post.seo?.metaImage ? (getImageUrl(post.seo.metaImage, 1200, 630) ?? undefined) : undefined,
    },
  };
}

export async function fetchAllPosts(): Promise<Article[]> {
  const posts = await client.fetch<SanityPost[]>(ALL_POSTS_QUERY);
  return posts.map(mapPostToArticle);
}

export async function fetchLatestPosts(limit = 4): Promise<Article[]> {
  const posts = await client.fetch<SanityPost[]>(LATEST_POSTS_QUERY, { limit });
  return posts.map(mapPostToArticle);
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!slug) return null;
  return client.fetch<SanityPost | null>(POST_BY_SLUG_QUERY, { slug });
}

export async function fetchPostSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return results.map(result => result.slug);
}

// Global Settings Query
const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    _id,
    _type,
    siteTitle,
    shortTitle,
    tagline,
    logos {
      primary {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt,
        externalUrl
      },
      horizontal {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt,
        externalUrl
      },
      icon {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt,
        externalUrl
      }
    },
    themeColors,
    contactDirectory,
    addresses,
    campusLocations[]->{ _id, name },
    socialLinks,
    defaultSeo {
      metaTitle,
      metaDescription,
      keywords,
      shareImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt,
        externalUrl
      }
    },
    emergencyAlert,
    governance,
    analytics
  }
`;

export async function fetchSettings(): Promise<Settings | null> {
  try {
    const settings = await client.fetch<Settings | null>(SETTINGS_QUERY);
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
