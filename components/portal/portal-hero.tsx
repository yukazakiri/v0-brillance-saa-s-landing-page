"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { HeroSection } from "@/lib/sanity/types"
import { getImageUrl } from "@/lib/sanity/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"

interface PortalHeroProps {
  data: HeroSection
  softwareName: string
  softwareVersion?: string
}

export default function PortalHero({ data, softwareName, softwareVersion }: PortalHeroProps) {
  const {
    eyebrow,
    heading,
    subheading,
    heroLayout,
    heroImages,
    heroImage,
    ctas,
  } = data

  // Logic to handle multiple stacked images if present in heroImages
  const stackedImages = heroLayout === "single" 
    ? [heroImage] 
    : heroImages?.sort((a, b) => (a.order || 0) - (b.order || 0)).map(h => h.image) || []

  // Embla Carousel setup - The Proxy Interaction Layer
  // We use loop: true to allow infinite cycling through the stack
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden">
      {/* Background Blobs matching original layout */}
      <div
        aria-hidden
        className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block pointer-events-none"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(210,50%,30%,.08)_0,hsla(210,50%,30%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(34,50%,60%,.06)_0,hsla(34,50%,60%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(210,50%,30%,.04)_0,hsla(210,50%,30%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-28 lg:pt-36 pb-12">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/5 border border-[var(--primary)]/10 rounded-full mb-6 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]"></span>
              {eyebrow}
            </div>
          )}
          
          <h1 className="text-balance text-4xl font-serif text-[var(--foreground)] font-semibold md:text-5xl lg:text-7xl">
            {heading}
          </h1>
          
          {subheading && (
            <p className="text-[var(--muted-foreground)] mx-auto my-8 max-w-2xl text-lg md:text-xl leading-relaxed">
              {subheading}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              {ctas.map((cta, idx) => {
                const href = cta.url || (cta.page?._ref ? `/pages/${cta.page._ref}` : "#")
                const Icon = cta.linkType === "email" ? null : cta.linkType === "external" ? ExternalLink : ArrowRight

                return (
                  <Button
                    key={idx}
                    asChild
                    size="lg"
                    className={cn(
                      "rounded-none font-bold uppercase tracking-wider text-xs px-8 h-14",
                      cta.style === "primary" 
                        ? "bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" 
                        : "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5"
                    )}
                  >
                    <Link href={href} target={cta.openInNewTab ? "_blank" : undefined}>
                      {cta.label}
                      {Icon && <Icon className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3D Stacked Carousel Container */}
      <div className="mx-auto 2xl:max-w-7xl mt-4 pb-20 relative h-[400px] lg:h-[600px] w-full perspective-distant">
        
        {/* Interaction Layer (Proxy Embla) - Only rendered if more than 1 image */}
        {stackedImages.length > 1 && (
          <div className="absolute inset-0 z-50 opacity-0" ref={emblaRef}>
            <div className="flex w-full h-full touch-pan-y">
              {stackedImages.map((_, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 h-full cursor-grab active:cursor-grabbing" />
              ))}
            </div>
          </div>
        )}

        {/* Visual Layer (3D Stack) */}
        <div className="w-full h-full flex justify-center items-center pointer-events-none">
          {stackedImages.map((img, idx) => {
            if (!img) return null
            
            const total = stackedImages.length;
            // Calculate position relative to selected index, handling wrap-around logic for the visual stack
            // We want: 0=Center, 1=Right, Total-1=Left
            
            // Normalize the index difference to handle the infinite loop visual effect
            let diff = (idx - selectedIndex) % total;
            if (diff < 0) diff += total;
            
            let transformStyle = {};
            let zIndex = 0;
            let opacity = 0;
            
            // Active / Center
            if (diff === 0) {
              zIndex = 30;
              opacity = 1;
              transformStyle = { transform: 'translate3d(0, 0, 0) scale(1) rotateX(20deg)' };
            } 
            // Next / Right
            else if (diff === 1) {
              zIndex = 20;
              opacity = 0.6;
              transformStyle = { transform: 'translate3d(60px, 40px, -100px) scale(0.9) rotateY(-10deg) rotateX(20deg)' };
            } 
            // Previous / Left (effectively the last item in the sequence relative to current)
            else if (diff === total - 1) {
              zIndex = 20;
              opacity = 0.6;
              transformStyle = { transform: 'translate3d(-60px, 40px, -100px) scale(0.9) rotateY(10deg) rotateX(20deg)' };
            } 
            // Back / Hidden (everything else)
            else {
              zIndex = 10;
              opacity = 0;
              transformStyle = { transform: 'translate3d(0, 80px, -200px) scale(0.8)' };
            }

            // If there are only 2 images, adjust logic to avoid "Left" position conflict or handle it gracefully
            if (total === 2 && diff === 1) {
               // For 2 images, index 1 serves as both "Next" and "Prev". Let's put it to the right visually.
               zIndex = 20;
               opacity = 0.6;
               transformStyle = { transform: 'translate3d(60px, 40px, -100px) scale(0.9) rotateY(-10deg) rotateX(20deg)' };
            }

            return (
              <div 
                key={idx} 
                className="absolute transition-all duration-700 ease-in-out transform-style-3d w-full max-w-[300px] sm:max-w-[500px] lg:max-w-[900px] px-4"
                style={{
                  zIndex,
                  opacity,
                  ...transformStyle
                }}
              >
                <div className="relative w-full aspect-[16/10] rounded-2xl border-[3px] border-white/80 shadow-2xl overflow-hidden bg-[#1a3a52]">
                  <Image
                    src={getImageUrl(img)}
                    alt={img.alt || softwareName}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  {/* Glassy reflection/overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/40 to-transparent mix-blend-multiply pointer-events-none" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
