import type { Metadata } from "next";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import NewsPageContent from "@/components/news-page-content";
import { getFacebookPosts } from "@/lib/facebook";
import { combineAndSortPosts } from "@/lib/unified-posts";
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
  const [articles, settings, facebookPostsResult] = await Promise.all([
    fetchAllPosts().catch((error) => {
      console.error("Error fetching Sanity news:", error);
      return [] as Article[];
    }),
    fetchSettings().catch((error) => {
      console.error("Error fetching site settings:", error);
      return null;
    }),
    getFacebookPosts({ limit: 10 }).catch((error) => {
      console.error("Error fetching Facebook news:", error);
      return { posts: [] };
    }),
  ]);

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline:
      "Empowering the next generation of IT professionals, business leaders, and innovators",
  };

  const unifiedPosts = combineAndSortPosts(articles, facebookPostsResult.posts);

  return (
    <>
      <CollegeHeader settings={siteSettings} />
      <NewsPageContent posts={unifiedPosts} settings={siteSettings} />
      <FooterSection settings={siteSettings} />
    </>
  );
}
