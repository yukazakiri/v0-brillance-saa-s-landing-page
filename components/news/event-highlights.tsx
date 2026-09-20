"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type React from "react";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { buildImageUrl } from "@/lib/sanity/image";
import type {
  SanityEventHighlights,
  SanityHighlightPhoto,
} from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export interface EventHighlightsProps {
  highlights?: SanityEventHighlights | null;
  className?: string;
  articleTitle?: string;
}

type HighlightPhotoItem = {
  photo: SanityHighlightPhoto;
  previewUrl: string;
  fullUrl: string;
  alt: string;
  caption: string | null;
  credit: string | null;
};

const PREVIEW_PHOTO_LIMIT = 5;
const SWIPE_THRESHOLD = 48;

function getTrimmedText(value?: string) {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : null;
}

function getPhotoAlt(
  photo: SanityHighlightPhoto,
  index: number,
  articleTitle?: string,
) {
  return (
    getTrimmedText(photo.alt) ||
    `${articleTitle || "Event highlights"} photo ${index + 1}`
  );
}

function getPhotoKey(item: HighlightPhotoItem, index: number) {
  return item.photo._key || `${item.previewUrl}-${index}`;
}

function getPreviewGridClass(photoCount: number) {
  if (photoCount === 1) return "grid gap-3";
  if (photoCount === 2) return "grid gap-3 sm:grid-cols-2";
  if (photoCount === 3) {
    return "grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)] md:grid-rows-2";
  }
  if (photoCount === 4) return "grid gap-3 sm:grid-cols-2";
  return "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2";
}

function getPreviewTileClass(photoCount: number, index: number) {
  if (photoCount === 1) return "aspect-[16/10]";
  if (photoCount === 3 && index === 0) {
    return "aspect-[16/10] md:row-span-2 md:aspect-auto";
  }
  if (photoCount >= 5 && index === 0) {
    return "aspect-[16/10] sm:col-span-2 lg:row-span-2 lg:aspect-auto";
  }
  return "aspect-[4/3]";
}

function EventHighlightsLightbox({
  activeIndex,
  activePhoto,
  galleryTitle,
  isOpen,
  isZoomed,
  onClose,
  onGoToIndex,
  onNext,
  onPrevious,
  onToggleZoom,
  photos,
}: {
  activeIndex: number;
  activePhoto: HighlightPhotoItem;
  galleryTitle: string;
  isOpen: boolean;
  isZoomed: boolean;
  onClose: () => void;
  onGoToIndex: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleZoom: () => void;
  photos: HighlightPhotoItem[];
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const totalPhotos = photos.length;

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const start = touchStart.current;
      const touch = event.changedTouches[0];
      touchStart.current = null;

      if (!start || !touch || totalPhotos < 2) return;

      const horizontalDistance = touch.clientX - start.x;
      const verticalDistance = touch.clientY - start.y;

      if (
        Math.abs(horizontalDistance) < SWIPE_THRESHOLD ||
        Math.abs(horizontalDistance) < Math.abs(verticalDistance)
      ) {
        return;
      }

      if (horizontalDistance > 0) {
        onPrevious();
      } else {
        onNext();
      }
    },
    [onNext, onPrevious, totalPhotos],
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-highlights-lightbox-title"
      className="fixed inset-0 z-50 flex h-dvh w-screen overflow-hidden bg-[#14110F]/95 text-white"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-black/35 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Event highlights
            </p>
            <h2
              id="event-highlights-lightbox-title"
              className="truncate font-serif text-lg text-white sm:text-2xl"
            >
              {galleryTitle}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              {activeIndex + 1} / {totalPhotos}
            </span>
            <button
              type="button"
              onClick={onToggleZoom}
              aria-label={isZoomed ? "Return photo to fit view" : "Zoom photo"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Maximize2 aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close highlights gallery"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex h-full w-full items-center justify-center px-4 pb-40 pt-24 sm:px-8 md:pb-52",
          isZoomed && "cursor-zoom-out overflow-auto",
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={onToggleZoom}
          className="group relative flex max-h-full max-w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={isZoomed ? "Return photo to fit view" : "Zoom photo"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activePhoto.fullUrl}
            alt={activePhoto.alt}
            className={cn(
              "max-h-[calc(100dvh-15rem)] max-w-full object-contain shadow-[0_28px_90px_rgba(0,0,0,0.48)] transition-transform duration-300 md:max-h-[calc(100dvh-18rem)]",
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
            )}
          />
        </button>
      </div>

      {totalPhotos > 1 ? (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Show previous highlight photo"
            className="absolute left-3 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:inline-flex"
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Show next highlight photo"
            className="absolute right-3 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:inline-flex"
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </button>
        </>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/45 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex min-h-10 flex-col justify-center gap-1">
            {activePhoto.caption ? (
              <p className="font-serif text-base italic leading-snug text-white sm:text-lg">
                {activePhoto.caption}
              </p>
            ) : (
              <p className="text-sm italic text-white/55">No caption provided.</p>
            )}
            {activePhoto.credit ? (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                📷 {activePhoto.credit}
              </p>
            ) : null}
          </div>

          {totalPhotos > 1 ? (
            <div
              aria-label="Highlight photo thumbnails"
              className="hidden gap-2 overflow-x-auto pb-1 md:flex"
            >
              {photos.map((photo, index) => (
                <button
                  key={getPhotoKey(photo, index)}
                  type="button"
                  onClick={() => onGoToIndex(index)}
                  aria-label={`Open photo ${index + 1}`}
                  aria-current={activeIndex === index}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border bg-white/10 transition",
                    activeIndex === index
                      ? "border-white opacity-100"
                      : "border-white/15 opacity-60 hover:opacity-100",
                  )}
                >
                  <ImageWithSkeleton src={photo.previewUrl} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function EventHighlights({
  highlights,
  className,
  articleTitle,
}: EventHighlightsProps) {
  const sourcePhotos = highlights?.photos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const photos = useMemo<HighlightPhotoItem[]>(() => {
    if (!sourcePhotos?.length) return [];

    return sourcePhotos.reduce<HighlightPhotoItem[]>((items, photo, index) => {
      const previewUrl = buildImageUrl(photo, 800, 600);
      const fullUrl = buildImageUrl(photo, 1920, 1080) || previewUrl;

      if (!previewUrl || !fullUrl) return items;

      items.push({
        photo,
        previewUrl,
        fullUrl,
        alt: getPhotoAlt(photo, index, articleTitle),
        caption: getTrimmedText(photo.caption),
        credit: getTrimmedText(photo.credit),
      });

      return items;
    }, []);
  }, [articleTitle, sourcePhotos]);

  const totalPhotos = photos.length;
  const previewPhotos = photos.slice(0, PREVIEW_PHOTO_LIMIT);
  const remainingPhotos = Math.max(totalPhotos - PREVIEW_PHOTO_LIMIT, 0);
  const galleryTitle = getTrimmedText(highlights?.heading) || "Event Highlights";
  const activePhoto = photos[activeIndex] || photos[0];

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      if (totalPhotos === 0) return;
      setActiveIndex(index);
      setIsZoomed(false);
    },
    [totalPhotos],
  );

  const goToPrevious = useCallback(() => {
    if (totalPhotos === 0) return;
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? totalPhotos - 1 : currentIndex - 1,
    );
    setIsZoomed(false);
  }, [totalPhotos]);

  const goToNext = useCallback(() => {
    if (totalPhotos === 0) return;
    setActiveIndex((currentIndex) =>
      currentIndex === totalPhotos - 1 ? 0 : currentIndex + 1,
    );
    setIsZoomed(false);
  }, [totalPhotos]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, goToNext, goToPrevious, isOpen]);

  if (!highlights?.photos || highlights.photos.length === 0 || totalPhotos === 0) {
    return null;
  }

  function openLightbox(index: number) {
    setActiveIndex(index);
    setIsOpen(true);
    setIsZoomed(false);
  }

  return (
    <>
      <section
        className={cn(
          "rounded-[28px] border border-[rgba(55,50,47,0.12)] bg-[#FCFAF7] p-5 sm:p-7",
          className,
        )}
        aria-labelledby="event-highlights-heading"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex max-w-2xl flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6B635D]">
                Event highlights
              </span>
              <h2
                id="event-highlights-heading"
                className="font-serif text-2xl text-[#37322F] sm:text-3xl"
              >
                {galleryTitle}
              </h2>
              {highlights.description ? (
                <p className="text-sm leading-6 text-[#6B635D]">
                  {highlights.description}
                </p>
              ) : null}
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(55,50,47,0.16)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#37322F] shadow-[0_10px_30px_rgba(55,50,47,0.06)]">
              <Camera aria-hidden="true" className="size-4" />
              {totalPhotos} Photo{totalPhotos === 1 ? "" : "s"}
            </div>
          </div>

          <div className={getPreviewGridClass(totalPhotos)}>
            {previewPhotos.map((photo, index) => {
              const isSinglePhoto = totalPhotos === 1;
              const isLastPreviewTile = index === previewPhotos.length - 1;
              const shouldShowMoreOverlay =
                totalPhotos >= PREVIEW_PHOTO_LIMIT && isLastPreviewTile;

              return (
                <button
                  key={getPhotoKey(photo, index)}
                  type="button"
                  onClick={() => openLightbox(index)}
                  aria-label={`Open ${galleryTitle} photo ${index + 1} of ${totalPhotos}`}
                  className={cn(
                    "group relative min-h-0 overflow-hidden rounded-[24px] border border-[rgba(55,50,47,0.12)] bg-white text-left shadow-[0_16px_42px_rgba(55,50,47,0.08)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37322F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAF7]",
                    getPreviewTileClass(totalPhotos, index),
                  )}
                >
                  <ImageWithSkeleton
                    src={photo.previewUrl}
                    alt={photo.alt}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                    fallbackLabel="Photo unavailable"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />

                  {shouldShowMoreOverlay ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 px-4 text-center text-white backdrop-blur-[2px]">
                      {remainingPhotos > 0 ? (
                        <span className="font-serif text-3xl italic leading-none sm:text-4xl">
                          +{remainingPhotos}
                        </span>
                      ) : null}
                      <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                        {remainingPhotos > 0
                          ? `+${remainingPhotos} Photo${remainingPhotos === 1 ? "" : "s"}`
                          : `View all ${totalPhotos} photos`}
                      </span>
                      {remainingPhotos > 0 ? (
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                          View all {totalPhotos} photos
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                    <div className="min-w-0">
                      {photo.caption ? (
                        <p className="line-clamp-2 font-serif text-base italic leading-snug sm:text-lg">
                          {photo.caption}
                        </p>
                      ) : (
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                          Highlight photo {index + 1}
                        </p>
                      )}
                      {photo.credit ? (
                        <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                          📷 {photo.credit}
                        </p>
                      ) : null}
                    </div>

                    {isSinglePhoto ? (
                      <span className="shrink-0 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                        Click to expand
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {isMounted && activePhoto
        ? createPortal(
            <EventHighlightsLightbox
              activeIndex={activeIndex}
              activePhoto={activePhoto}
              galleryTitle={galleryTitle}
              isOpen={isOpen}
              isZoomed={isZoomed}
              onClose={closeLightbox}
              onGoToIndex={goToIndex}
              onNext={goToNext}
              onPrevious={goToPrevious}
              onToggleZoom={() => setIsZoomed((currentValue) => !currentValue)}
              photos={photos}
            />,
            document.body,
          )
        : null}
    </>
  );
}

export default EventHighlights;
