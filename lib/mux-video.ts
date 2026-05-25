import type { SanityMuxVideo, SanityMuxVideoAsset } from "@/lib/sanity/types";

export type MuxPortableValue = SanityMuxVideo & {
  url?: string;
};

export function getMuxVideoAsset(video?: MuxPortableValue | null) {
  return video?.asset ?? video?.video?.asset ?? null;
}

export function getMuxStatusValue(
  status?: SanityMuxVideoAsset["status"],
): string {
  if (!status) return "";
  if (typeof status === "string") return status;
  return status.phase ?? status.state ?? "";
}

export function isMuxVideoReady(video?: MuxPortableValue | null) {
  const asset = getMuxVideoAsset(video);
  const status = getMuxStatusValue(asset?.status).toLowerCase();

  return Boolean(asset?.playbackId) && (!status || status === "ready");
}

export function buildMuxThumbnailUrl(
  playbackId: string,
  thumbnailTime?: number | null,
) {
  const params = new URLSearchParams();

  if (typeof thumbnailTime === "number" && Number.isFinite(thumbnailTime)) {
    params.set("time", String(thumbnailTime));
  }

  const query = params.toString();
  return `https://image.mux.com/${playbackId}/thumbnail.jpg${query ? `?${query}` : ""}`;
}

export function buildMuxStreamUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8`;
}

export function buildMuxMp4Url(playbackId: string, rendition = "medium") {
  return `https://stream.mux.com/${playbackId}/${rendition}.mp4`;
}
