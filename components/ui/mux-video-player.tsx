"use client";

import type React from "react";

import MuxPlayer from "@mux/mux-player-react";

import { cn } from "@/lib/utils";

type MuxVideoPlayerProps = Omit<
  React.ComponentProps<typeof MuxPlayer>,
  "playbackId" | "poster"
> & {
  playbackId?: string | null;
  poster?: string | null;
  thumbnailTime?: number | null;
  videoTitle?: string;
  wrapperClassName?: string;
  fallbackLabel?: string;
};

function buildMuxPosterUrl(playbackId: string, thumbnailTime?: number | null) {
  const params = new URLSearchParams();

  if (typeof thumbnailTime === "number" && Number.isFinite(thumbnailTime)) {
    params.set("time", String(thumbnailTime));
  }

  const query = params.toString();
  return `https://image.mux.com/${playbackId}/thumbnail.jpg${query ? `?${query}` : ""}`;
}

export function MuxVideoPlayer({
  accentColor,
  className,
  fallbackLabel = "Video unavailable",
  metadata,
  playbackId,
  poster,
  streamType,
  thumbnailTime,
  videoTitle,
  wrapperClassName,
  ...props
}: MuxVideoPlayerProps) {
  if (!playbackId) {
    return (
      <div
        className={cn(
          "flex h-full min-h-56 w-full items-center justify-center bg-stone-100 px-6 text-center",
          wrapperClassName,
        )}
      >
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  const posterUrl = poster ?? buildMuxPosterUrl(playbackId, thumbnailTime);

  return (
    <div className={cn("h-full w-full overflow-hidden bg-black", wrapperClassName)}>
      <MuxPlayer
        {...props}
        playbackId={playbackId}
        poster={posterUrl}
        streamType={streamType ?? "on-demand"}
        accentColor={accentColor ?? "#1a3a52"}
        metadata={
          metadata ?? (videoTitle ? { video_title: videoTitle } : undefined)
        }
        className={cn("h-full w-full", className)}
      />
    </div>
  );
}
