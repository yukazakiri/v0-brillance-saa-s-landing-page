import type { Metadata } from "next";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import NewsPageContent from "@/components/news-page-content";
import { getFacebookPosts } from "@/lib/facebook";
import type {
  FacebookPageInfo,
  NormalizedFacebookPost,
} from "@/lib/facebook/types";
import {
  combineAndSortPosts,
  getFacebookPostsWithImages,
} from "@/lib/unified-posts";
import { buildImageUrl } from "@/lib/sanity/image";
import { fetchAllPosts, fetchSettings } from "@/lib/sanity/queries";
import type { Article, Settings } from "@/lib/sanity/types";

// Revalidate page every 60 seconds to pick up new Sanity content
export const revalidate = 60;

function getSiteBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://dccp.edu.ph";
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  const baseUrl = getSiteBaseUrl();
  const siteName = settings?.shortTitle || "DCCP";
  const title = `News & Updates | ${siteName}`;
  const description =
    settings?.defaultSeo?.metaDescription ||
    settings?.tagline ||
    "Read the latest official news, announcements, stories, and campus updates from Data Center College of the Philippines.";
  const imageUrl =
    buildImageUrl(settings?.defaultSeo?.shareImage) ||
    `${baseUrl}/hero-images/maincampus.png`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical: `${baseUrl}/news` },
    openGraph: {
      type: "website",
      locale: "en_PH",
      url: `${baseUrl}/news`,
      title,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} News and Updates`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@dccp_baguio",
    },
  };
}

export default async function NewsPage() {
  let articles: Article[] = [];
  let settings = null;
  let articleGalleryPosts: any[] = [];

  let facebookPostsResult: {
    posts: NormalizedFacebookPost[];
    pageInfo: FacebookPageInfo | null;
    hasNext: boolean;
    hasPrevious: boolean;
  } = {
    posts: [],
    pageInfo: null,
    hasNext: false,
    hasPrevious: false,
  };

  try {
    const [sanityData, fbData] = await Promise.all([
      Promise.all([fetchAllPosts(), fetchSettings()]),
      getFacebookPosts({ limit: 10 }),
    ]);
    [articles, settings] = sanityData;
    facebookPostsResult = fbData;

    // Create unified posts from articles with featured images for the gallery
    // These will be added to Facebook images in the BentoGrid
    articleGalleryPosts = articles
      .filter((article) => article.image) // Only include articles with featured images
      .slice(0, 8)
      .map((article) => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        content: null,
        image: article.image,
        date: article.date,
        author: article.author,
        category: article.category,
        slug: article.slug,
        permalink: `/news/${article.slug}`,
        source: "sanity" as const,
      }));

    console.log(
      "[v0] Gallery posts created from articles:",
      articleGalleryPosts.length,
      "Articles with images:",
      articles.filter((a) => a.image).length,
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Continue with empty data if fetch fails
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline:
      "Empowering the next generation of IT professionals, business leaders, and innovators",
  };

  // Combine and sort all posts
  const unifiedPosts = combineAndSortPosts(articles, facebookPostsResult.posts);

  // Get Facebook posts with images for Bento grid
  const facebookPostsWithImages = getFacebookPostsWithImages(unifiedPosts);

  return (
    <>
      <CollegeHeader settings={siteSettings} />
      <NewsPageContent
        posts={unifiedPosts}
        facebookImages={facebookPostsWithImages}
        galleryPosts={articleGalleryPosts}
        settings={siteSettings}
        showFooter={false}
      />
      <FooterSection settings={siteSettings} />
    </>
  );
}
