"use client"

import type { Settings } from "@/lib/sanity/types"
import { useEffect, useState } from "react"
import Link from "next/link"

interface CollegeHeroProps {
  settings: Settings
}

export default function CollegeHero({ settings }: CollegeHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0)

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
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % campusImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [campusImages.length])

  return (
    <section className="w-full relative min-h-[650px] sm:min-h-[750px] flex flex-col justify-center overflow-hidden border-b border-[rgba(26,58,82,0.12)]">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {campusImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* GRADIENT OVERLAY - The "Gradient Background" effect */}
        {/* This gradient fades from the page background color (#F7F5F3) to transparent, allowing text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F5F3] via-[#F7F5F3]/80 to-[#F7F5F3]/20 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F3] via-transparent to-transparent sm:hidden" /> {/* Mobile readability boost */}
      </div>


      {/* DECORATIVE SIDES (Floating above background) */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-12 border-r border-[rgba(26,58,82,0.12)] z-10 overflow-hidden">
        <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]" />
          ))}
        </div>
      </div>
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-12 border-l border-[rgba(26,58,82,0.12)] z-10 overflow-hidden">
        <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]" />
          ))}
        </div>
      </div>


      {/* CONTENT LAYER */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-20 lg:px-24 flex flex-col justify-center items-start h-full">
        <div className="max-w-3xl flex flex-col items-start gap-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F7F5F3]/80 backdrop-blur-md border border-[rgba(26,58,82,0.1)] rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1a3a52]"></span>
            <span className="text-[#1a3a52] text-xs font-semibold uppercase tracking-wider">Est. 2011 — Baguio City</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[#1a3a52] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Data Center <br />
            <span className="italic text-[#1a3a52]/80">College</span> <br />
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2">of the Philippines</span>
          </h1>

          {/* Tagline */}
          <p className="text-[#605A57] text-lg sm:text-xl leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 font-medium">
            {settings.tagline || "Empowering the next generation of IT professionals and business leaders through excellence in education."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Link href="/#contact" className="group px-8 py-4 bg-[#1a3a52] text-white font-medium rounded-md hover:bg-[#1a3a52]/90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Apply Now
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/#programs" className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-[rgba(26,58,82,0.2)] text-[#1a3a52] font-medium rounded-md hover:bg-white/80 transition-all hover:shadow-md">
              Explore Programs
            </Link>
          </div>

        </div>
      </div>

      {/* BOTTOM STATS - Floating Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[rgba(26,58,82,0.12)] bg-[#F7F5F3]/90 backdrop-blur-md">
        <div className="grid grid-cols-3 divide-x divide-[rgba(26,58,82,0.12)] max-w-7xl mx-auto border-x border-[rgba(26,58,82,0.12)] lg:border-none">
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "15k+", label: "Successful Alumni" },
            { value: "100%", label: "Committed to Growth" },
          ].map((stat, i) => (
            <div key={i} className="py-6 px-4 flex flex-col items-center justify-center text-center hover:bg-white/50 transition-colors">
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1a3a52]">{stat.value}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#605A57] mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE CONTROLS (Bottom Right) */}
      <div className="absolute bottom-24 right-8 lg:right-20 z-20 hidden sm:flex items-center gap-4 animate-in fade-in duration-1000 delay-500">
        <div className="bg-white/90 backdrop-blur-md border border-[rgba(26,58,82,0.1)] px-4 py-2 rounded-full shadow-lg">
          <span className="text-[#1a3a52] text-xs font-semibold tracking-wide uppercase">{campusImages[activeSlide].caption}</span>
        </div>
        <div className="flex gap-2">
          {campusImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm ${idx === activeSlide ? 'w-8 bg-[#1a3a52]' : 'w-2 bg-[#1a3a52]/40 hover:bg-[#1a3a52]/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
