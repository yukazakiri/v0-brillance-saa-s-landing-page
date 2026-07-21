import type { MetadataRoute } from "next";

import { getSiteBaseUrl } from "@/lib/seo";
import { fetchCourseSlugs, fetchPostSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteBaseUrl();
  const [postSlugs, courseSlugs] = await Promise.all([
    fetchPostSlugs(),
    fetchCourseSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/academics",
    "/alumni",
    "/apply",
    "/courses",
    "/faculty",
    "/news",
    "/parents",
    "/portal",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes, ...newsRoutes];
}
