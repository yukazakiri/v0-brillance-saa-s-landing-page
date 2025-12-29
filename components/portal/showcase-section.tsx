"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { SoftwareShowcaseSection } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

interface ShowcaseSectionProps {
  data: SoftwareShowcaseSection;
}

export default function ShowcaseSection({ data }: ShowcaseSectionProps) {
  const { showcaseTitle, showcaseSubtitle, showcaseType, mediaItems } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length,
    );
  };

  return (
    <section className="w-full py-16 md:py-24 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
            {showcaseTitle}
          </h2>
          {showcaseSubtitle && (
            <p className="text-lg text-muted-foreground max-w-[800px]">
              {showcaseSubtitle}
            </p>
          )}
        </div>

        {showcaseType === "carousel" && mediaItems.length > 0 && (
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-border shadow-2xl aspect-[16/9] relative group">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 ease-in-out",
                    idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0",
                  )}
                >
                  {item.image ? (
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.image.alt || item.title || ""}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  ) : item.videoUrl ? (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <iframe
                        src={item.videoUrl} // Simple embed logic, might need refinement for actual providers
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ) : null}

                  {/* Caption Overlay */}
                  {(item.title || item.description) && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                      {item.title && (
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="text-sm text-white/90">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Controls */}
              <div className="absolute inset-0 z-20 flex items-center justify-between p-4 pointer-events-none">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full  backdrop-blur-sm pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full  backdrop-blur-sm pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-4">
              {mediaItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative w-20 h-12 md:w-28 md:h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                    idx === activeIndex
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  {item.image && (
                    <Image
                      src={getImageUrl(item.image)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  )}
                  {item.videoUrl && !item.image && (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Play className="w-4 h-4 text-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {showcaseType === "gallery" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mediaItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
              >
                {item.image && (
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.image.alt || ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium px-4 text-center">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
