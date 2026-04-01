import type { Settings } from "@/lib/sanity/types"
import { buildImageUrl } from "@/lib/sanity/image"

export function getSiteBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://dccp.edu.ph"
}

export function getAbsoluteUrl(path = "") {
  const baseUrl = getSiteBaseUrl()
  return path ? `${baseUrl}${path}` : baseUrl
}

export function getSeoDescription(
  settings?: Settings | null,
  fallback?: string,
) {
  return (
    fallback ||
    settings?.defaultSeo?.metaDescription ||
    settings?.tagline ||
    "Explore official albums, event coverage, campus moments, and student life at Data Center College of the Philippines."
  )
}

export function getSeoKeywords(
  settings?: Settings | null,
  extras: string[] = [],
) {
  const baseKeywords = settings?.defaultSeo?.keywords || [
    "Data Center College",
    "DCCP",
    "Baguio City",
    "Photo Gallery",
    "Campus Events",
  ]

  return Array.from(new Set([...baseKeywords, ...extras]))
}

export function getSeoImage(
  settings?: Settings | null,
  fallback?: string | null,
) {
  return (
    fallback ||
    buildImageUrl(settings?.defaultSeo?.shareImage) ||
    getAbsoluteUrl("/hero-images/maincampus.png")
  )
}

export function getTwitterHandle(settings?: Settings | null) {
  const twitterLink = settings?.socialLinks?.find(
    (link) => link.platform?.toLowerCase() === "twitter" || link.platform?.toLowerCase() === "x",
  )

  if (twitterLink?.handle) {
    return twitterLink.handle.startsWith("@")
      ? twitterLink.handle
      : `@${twitterLink.handle}`
  }

  return "@dccp_official"
}
