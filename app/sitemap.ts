import type { MetadataRoute } from "next";

import { getSiteBaseUrl } from "@/lib/seo";
import { fetchPostSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteBaseUrl();
  const [postSlugs] = await Promise.all([
    fetchPostSlugs(),
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
    "/programs",
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

  return [...staticRoutes, ...newsRoutes];
}
