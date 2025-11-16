import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { groq } from "next-sanity";

import { client } from "./client";
import type { Article, SanityPost } from "./types";

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE = "/hero-images/maincampus.png";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const POST_PROJECTION = groq`{
  _id,
  title,
  "slug": coalesce(slug.current, _id),
  excerpt,
  content,
  category,
  tags,
  publishedAt,
  author,
  status,
  featuredImage,
  "featured": coalesce(featured, false),
  seo {
    metaTitle,
    metaDescription,
    metaImage
  }
}`;

const ALL_POSTS_QUERY = groq`
  *[_type == "post" && status == "published"]
  | order(publishedAt desc)
  ${POST_PROJECTION}
`;

const LATEST_POSTS_QUERY = groq`
  *[_type == "post" && status == "published"]
  | order(publishedAt desc)[0...$limit]
  ${POST_PROJECTION}
`;

const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && status == "published" && slug.current == $slug][0]
  ${POST_PROJECTION}
`;

const POST_SLUGS_QUERY = groq`
  *[_type == "post" && status == "published" && defined(slug.current)]{
    "slug": slug.current
  }
`;

function formatCategory(category?: string | null): string {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}

function imageUrl(source?: SanityImageSource): string {
  if (!source) return FALLBACK_IMAGE;
  try {
    return builder.image(source).width(1200).height(800).fit("crop").url() ?? FALLBACK_IMAGE;
  } catch (error) {
    console.error("Failed to build Sanity image URL", error);
    return FALLBACK_IMAGE;
  }
}

function mapPostToArticle(post: SanityPost): Article {
  return {
    id: post._id,
    slug: post.slug,
    category: formatCategory(post.category),
    title: post.title,
    excerpt: post.excerpt ?? "",
    date: formatDate(post.publishedAt),
    author: post.author ?? "Editorial Team",
    image: post.featuredImage ? imageUrl(post.featuredImage) : FALLBACK_IMAGE,
    featured: Boolean(post.featured),
    tags: post.tags ?? [],
    seo: {
      title: post.seo?.metaTitle,
      description: post.seo?.metaDescription,
      image: post.seo?.metaImage ? imageUrl(post.seo?.metaImage) : undefined,
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
