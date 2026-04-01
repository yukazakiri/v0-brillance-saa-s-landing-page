import type { CloudinaryAsset, SanityPhotoGallery } from "./types";
import { optimizeCloudinaryDelivery } from "@/lib/media-preview";

const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "webm", "m4v", "ogv", "ogg"]);

export function getCloudinaryPhotoUrl(
  photo?: CloudinaryAsset | null,
): string | null {
  const secureUrl = photo?.secure_url?.trim();
  if (secureUrl) {
    return optimizeCloudinaryDelivery(secureUrl, {
      format: "auto",
      quality: "auto",
    });
  }

  const url = photo?.url?.trim();
  if (url) {
    return optimizeCloudinaryDelivery(url, {
      format: "auto",
      quality: "auto",
    });
  }

  return null;
}

export function isGalleryVideo(photo?: CloudinaryAsset | null): boolean {
  if (!photo) return false;

  const format = photo.format?.trim().toLowerCase();
  if (format && VIDEO_EXTENSIONS.has(format)) return true;

  const mediaUrl = getCloudinaryPhotoUrl(photo);
  if (!mediaUrl) return false;

  const normalizedUrl = mediaUrl.split("?")[0]?.toLowerCase() || "";
  return Array.from(VIDEO_EXTENSIONS).some((extension) =>
    normalizedUrl.endsWith(`.${extension}`),
  );
}

export function getFirstGalleryPhoto(
  gallery?: Pick<SanityPhotoGallery, "photos"> | null,
): CloudinaryAsset | null {
  if (!gallery?.photos?.length) return null;

  return (
    gallery.photos.find(
      (photo) =>
        !isGalleryVideo(photo) && Boolean(getCloudinaryPhotoUrl(photo)),
    ) ?? null
  );
}

export function getFirstGalleryMedia(
  gallery?: Pick<SanityPhotoGallery, "photos"> | null,
): CloudinaryAsset | null {
  if (!gallery?.photos?.length) return null;

  return (
    gallery.photos.find((photo) => Boolean(getCloudinaryPhotoUrl(photo))) ??
    null
  );
}
