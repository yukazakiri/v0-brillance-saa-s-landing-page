"use client";

import { useMemo, useState } from "react";
import type React from "react";

import { buildBlurPreviewUrl } from "@/lib/media-preview";
import { cn } from "@/lib/utils";

type ImageWithSkeletonProps = React.ComponentProps<"img"> & {
  wrapperClassName?: string;
  fallbackLabel?: string;
};

export function ImageWithSkeleton({
  alt,
  className,
  fallbackLabel = "Image unavailable",
  onError,
  onLoad,
  src,
  wrapperClassName,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const blurSrc = useMemo(
    () => buildBlurPreviewUrl(typeof src === "string" ? src : null),
    [src],
  );

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}
    >
      {blurSrc && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blurSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full scale-110 object-cover blur-2xl saturate-125 transition-opacity duration-700 ease-out",
            isLoaded ? "opacity-0" : "opacity-100",
          )}
        />
      ) : null}

      {!isLoaded && !hasError ? (
        <div className="absolute inset-0 bg-stone-100/40 backdrop-blur-[2px] transition-opacity duration-500" />
      ) : null}

      {src && !hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...props}
          src={src}
          alt={alt}
          loading={props.loading ?? "lazy"}
          decoding={props.decoding ?? "async"}
          className={cn(
            "h-full w-full object-cover transition-all duration-700 ease-out",
            isLoaded ? "visible opacity-100" : "invisible opacity-0",
            className,
          )}
          onLoad={(event) => {
            setIsLoaded(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setHasError(true);
            onError?.(event);
          }}
        />
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
}
