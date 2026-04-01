"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type React from "react";

import { AnimatePresence, motion } from "motion/react";

import { MediaSkeleton } from "@/components/ui/media-skeleton";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEventListener } from "@/hooks/useEventListener";
import { cn } from "@/lib/utils";

type VideoWithSkeletonProps = React.ComponentProps<"video"> & {
  wrapperClassName?: string;
  fallbackLabel?: string;
  autoPlayOnHover?: boolean;
  enableModal?: boolean;
};

export function VideoWithSkeleton({
  className,
  fallbackLabel = "Video unavailable",
  onClick,
  onError,
  onLoadedData,
  autoPlayOnHover = true,
  enableModal = false,
  src,
  wrapperClassName,
  ...props
}: VideoWithSkeletonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsOpen(false);
    setIsLoaded(false);
    setHasError(false);
    setIsPlaying(false);

    return () => setMounted(false);
  }, [src]);

  useClickOutside({
    ref: modalRef,
    callback: () => setIsOpen(false),
  });

  useEventListener("scroll", () => isOpen && setIsOpen(false));

  useEffect(() => {
    if (!isOpen || !modalVideoRef.current) return;

    pauseVideo();
    const modalVideo = modalVideoRef.current;
    void modalVideo.play().catch(() => {});
  }, [isOpen]);

  const playVideo = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const openModal = (event?: React.MouseEvent<HTMLElement>) => {
    if (!enableModal) return;
    event?.stopPropagation();
    setIsOpen(true);
  };

  const inlineVideo = (
    <div
      className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}
      onMouseEnter={() => {
        if (autoPlayOnHover) void playVideo();
      }}
      onMouseLeave={() => {
        if (autoPlayOnHover) pauseVideo();
      }}
      onClick={(event) => {
        if (enableModal) {
          openModal(event);
        }
      }}
    >
      {!isLoaded && !hasError ? <MediaSkeleton /> : null}

      {src && !hasError ? (
        <video
          {...props}
          ref={videoRef}
          src={src}
          className={cn(
            "h-full w-full cursor-zoom-in object-cover transition-opacity duration-500",
            isLoaded ? "visible opacity-100" : "invisible opacity-0",
            className,
          )}
          muted
          loop
          playsInline
          preload={props.preload ?? "metadata"}
          onLoadedData={(event) => {
            setIsLoaded(true);
            onLoadedData?.(event);
          }}
          onError={(event) => {
            setHasError(true);
            onError?.(event);
          }}
          onClick={(event) => {
            if (enableModal) {
              openModal(event);
            }
            onClick?.(event);
          }}
        />
      ) : null}

      {!hasError ? (
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          {enableModal
            ? isPlaying
              ? "Playing"
              : "Hover or tap to focus"
            : isPlaying
              ? "Playing"
              : "Hover to play"}
        </div>
      ) : null}

      {hasError || !src ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.88),_rgba(231,229,228,0.84),_rgba(214,211,209,0.95))] px-6 text-center">
          <span className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {fallbackLabel}
          </span>
        </div>
      ) : null}
    </div>
  );

  if (!mounted) return inlineVideo;

  const modal = createPortal(
    <AnimatePresence>
      {enableModal && isOpen && src ? (
        <>
          <motion.button
            type="button"
            aria-label="Close video preview"
            className="fixed inset-0 z-40 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              ref={modalRef}
              className="pointer-events-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            >
              <video
                ref={modalVideoRef}
                src={src}
                className="h-auto max-h-[90vh] w-full bg-black"
                controls
                autoPlay
                playsInline
                preload="auto"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              />
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );

  return (
    <>
      {inlineVideo}
      {modal}
    </>
  );
}
