import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "./client";
import type { SanityImage } from "./types";

const builder = imageUrlBuilder(client);
const FALLBACK_IMAGE = "/hero-images/maincampus.png";

/**
 * Build an image URL from a Sanity image source
 * Handles external URLs, resolved asset URLs, and image references
 */
export function buildImageUrl(
  source?: SanityImageSource | SanityImage | any,
  width?: number,
  height?: number
): string | null {
  if (!source) return null;

  // Check for external URL (used by many Sanity schemas for external images)
  if (typeof source === "object" && "externalUrl" in source && source.externalUrl) {
    return source.externalUrl;
  }

  // Check if we already have a resolved URL from the query
  if (typeof source === "object" && "asset" in source && source.asset) {
    if ("url" in source.asset) {
      return source.asset.url ?? null;
    }
  }

  // Fallback to building URL with imageUrlBuilder
  try {
    let imageBuilder = builder.image(source);

    if (width) imageBuilder = imageBuilder.width(width);
    if (height) imageBuilder = imageBuilder.height(height);
    if (width && height) imageBuilder = imageBuilder.fit("crop");

    return imageBuilder.url();
  } catch (error) {
    console.error("Failed to build Sanity image URL", error);
    return null;
  }
}

/**
 * Get an image URL with a fallback
 */
export function getImageUrl(
  source?: SanityImageSource | SanityImage,
  width?: number,
  height?: number
): string {
  return buildImageUrl(source, width, height) ?? FALLBACK_IMAGE;
}

/**
 * Get the alt text from a Sanity image
 */
export function getImageAlt(image?: SanityImage, fallback = ""): string {
  return image?.alt ?? fallback;
}
