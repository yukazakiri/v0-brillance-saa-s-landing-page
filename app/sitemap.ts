import type { MetadataRoute } from "next";

import { getSiteBaseUrl } from "@/lib/seo";
import { fetchPhotoGallerySlugs, fetchPostSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteBaseUrl();
  const [postSlugs, gallerySlugs] = await Promise.all([
    fetchPostSlugs(),
    fetchPhotoGallerySlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/academics",
    "/alumni",
    "/apply",
    "/courses",
    "/faculty",
    "/gallery",
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

  const galleryRoutes: MetadataRoute.Sitemap = gallerySlugs.map((slug) => ({
    url: `${baseUrl}/gallery/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...newsRoutes, ...galleryRoutes];
}
