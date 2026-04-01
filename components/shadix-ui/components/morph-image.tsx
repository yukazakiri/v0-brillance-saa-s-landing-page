"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type React from "react";

import { AnimatePresence, motion, type Transition } from "motion/react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useEventListener } from "@/hooks/useEventListener";
import { buildBlurPreviewUrl } from "@/lib/media-preview";
import { cn } from "@/lib/utils";

const transition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
  type: "spring",
  stiffness: 120,
  damping: 15,
};

const MorphImage: React.FC<React.ComponentProps<typeof motion.img>> = ({
  src,
  className,
  alt,
  onClick,
  onError,
  onLoad,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const blurSrc = useMemo(
    () => buildBlurPreviewUrl(typeof src === "string" ? src : null),
    [src],
  );

  useEffect(() => {
    setMounted(true);
    setIsLoaded(false);
    setHasError(false);

    return () => setMounted(false);
  }, [src]);

  useClickOutside({
    ref: imageRef,
    callback: () => setIsOpen(false),
  });

  useEventListener("scroll", () => isOpen && setIsOpen(false));

  const modalLayoutId = props.layoutId || "morph-image";

  const openModal = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setIsOpen(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    onClick?.(e);
  };

  if (!mounted) return null;

  const thumbnail = (
    <div
      className="relative h-full w-full cursor-zoom-in"
      onClick={(e) => openModal(e)}
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
        <div className="absolute inset-0 bg-stone-100/40 backdrop-blur-[2px]" />
      ) : null}
      <motion.img
        src={src}
        alt={alt}
        layoutId={modalLayoutId}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-full h-full object-cover object-center not-prose cursor-zoom-in transition-all duration-700 ease-out",
          isLoaded ? "visible opacity-100" : "invisible opacity-0",
          className,
        )}
        onClick={(e) => openModal(e)}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setHasError(true);
          onError?.(e);
        }}
        transition={transition}
        {...props}
      />
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.88),_rgba(231,229,228,0.84),_rgba(214,211,209,0.95))] px-6 text-center">
          <span className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Image unavailable
          </span>
        </div>
      ) : null}
    </div>
  );

  const modal = createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/80 cursor-pointer"
            initial={{ opacity: 0, pointerEvents: "none" }}
            animate={{ opacity: 1, pointerEvents: "auto" }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            onClick={() => setIsOpen(false)}
            transition={transition}
          />
          <motion.div
            key="container"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <motion.img
              ref={imageRef as React.RefObject<HTMLImageElement>}
              src={src}
              alt={alt}
              layoutId={modalLayoutId}
              className={cn(
                "object-cover object-center max-w-[90vw] max-h-[90vh] pointer-events-auto cursor-zoom-out rounded-lg overflow-hidden",
              )}
              onClick={(e) => handleClick(e)}
              transition={transition}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <picture className="w-full h-full">{thumbnail}</picture>
      {modal}
    </div>
  );
};

export default MorphImage;
