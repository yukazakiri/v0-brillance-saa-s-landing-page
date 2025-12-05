"use client"

import type { Settings } from "@/lib/sanity/types"
import { useEffect, useState } from "react"
import Link from "next/link"

interface CollegeHeroProps {
  settings: Settings
}

export default function CollegeHero({ settings }: CollegeHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const campusImages = [
    {
      src: "/hero-images/maincampus.png",
      alt: "Main Campus - Baguio City",
      caption: "Main Campus",
    },
    {
      src: "/hero-images/old-building.png",
      alt: "Heritage Building",
      caption: "Heritage Building",
    },
    {
      src: "/hero-images/image.png",
      alt: "World-Class Facilities",
      caption: "Modern Facilities",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % campusImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [campusImages.length])

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {campusImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100svh] px-6 sm:px-10 md:px-16 lg:px-20 pb-16 pt-32">
        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Decorative Accent Line */}
          <div
            className={`w-16 h-1 bg-accent mb-8 transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 scale-x-100 origin-left" : "opacity-0 scale-x-0"
            }`}
          />

          {/* Establishment Year */}
          <div
            className={`mb-6 transition-all duration-700 delay-150 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-accent font-sans text-sm font-semibold tracking-[0.3em] uppercase">
              Est. 2011 — Baguio City, Philippines
            </span>
          </div>

          {/* Main Title */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="font-serif text-foreground">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight">
                Data Center
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight mt-1">
                College
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl font-normal italic text-muted-foreground mt-4">
                of the Philippines
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <p
            className={`mt-8 max-w-xl text-muted-foreground font-sans text-base sm:text-lg leading-relaxed transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {settings.tagline ||
              "Empowering the next generation of IT professionals and business leaders through excellence in education."}
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold text-sm tracking-wide uppercase rounded-full transition-all duration-300 hover:bg-secondary hover:shadow-lg hover:scale-105"
            >
              Apply Now
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="/#programs"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground/30 text-foreground font-semibold text-sm tracking-wide uppercase rounded-full transition-all duration-300 hover:border-accent hover:text-accent backdrop-blur-sm"
            >
              Explore Programs
            </Link>
          </div>
        </div>

        {/* Bottom Row: Stats + Controls */}
        <div
          className={`mt-16 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            {[
              { value: "14+", label: "Years" },
              { value: "15K+", label: "Alumni" },
              { value: "95%", label: "Employed" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-accent font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-muted-foreground font-sans text-xs sm:text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Slide Controls */}
          <div className="flex items-center gap-4">
            {/* Caption */}
            <span className="hidden sm:inline-flex items-center gap-3 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-foreground font-sans text-sm">{campusImages[activeSlide].caption}</span>
            </span>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {campusImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-8 bg-accent" : "w-2.5 bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 delay-700 hidden md:flex ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
