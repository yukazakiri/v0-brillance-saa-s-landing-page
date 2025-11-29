import type { SanityImage } from "./types"

const FALLBACK_IMAGE = "/hero-images/maincampus.png"

/**
 * Build an image URL from a Sanity image source
 * Handles external URLs and resolved asset URLs from queries
 */
export function buildImageUrl(source?: SanityImage | any, width?: number, height?: number): string | null {
  if (!source) return null

  // Check for external URL (used by many Sanity schemas for external images)
  if (typeof source === "object" && "externalUrl" in source && source.externalUrl) {
    return source.externalUrl
  }

  // Check if we already have a resolved URL from the query
  if (typeof source === "object" && "asset" in source && source.asset) {
    if ("url" in source.asset && source.asset.url) {
      let url = source.asset.url
      // Add width/height parameters if provided
      if (width || height) {
        const params = new URLSearchParams()
        if (width) params.set("w", width.toString())
        if (height) params.set("h", height.toString())
        if (width && height) params.set("fit", "crop")
        url = `${url}?${params.toString()}`
      }
      return url
    }
  }

  // If source is already a string URL
  if (typeof source === "string") {
    return source
  }

  return null
}

/**
 * Get an image URL with a fallback
 */
export function getImageUrl(source?: SanityImage | any, width?: number, height?: number): string {
  return buildImageUrl(source, width, height) ?? FALLBACK_IMAGE
}

/**
 * Get the alt text from a Sanity image
 */
export function getImageAlt(image?: SanityImage, fallback = ""): string {
  return image?.alt ?? fallback
}
