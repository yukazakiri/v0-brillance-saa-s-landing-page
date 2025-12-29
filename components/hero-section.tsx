'use client'

import { cn } from "@/lib/utils"
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import ViewTransitionLink from './view-transition-link'
import type { HeroSection as HeroSectionType } from "@/lib/sanity/types"
import { getImageUrl } from "@/lib/sanity/image"
import useEmblaCarousel from "embla-carousel-react"

const menuItems = [
  { name: 'Student Portal', href: '#' },
  { name: 'Faculty Portal', href: '#' },
  { name: 'LMS', href: '#' },
  { name: 'Library', href: '#' },
]

interface HeroSectionProps {
  data?: HeroSectionType;
  softwareName?: string;
  softwareVersion?: string;
}

export default function HeroSection({ data, softwareName }: HeroSectionProps) {
  const [menuState, setMenuState] = useState(false)

  // Use Sanity data if available, otherwise fallback to hardcoded defaults
  const heading = data?.heading || "Welcome to DCCPHub"
  const subheading = data?.subheading || "Your centralized gateway to academic resources, student services, and faculty tools. Access everything you need for your journey at Data Center College."
  const eyebrow = data?.eyebrow || "Official Portal"
  
  // Use primary hero image from Sanity or fallback
  const primaryImage = data?.heroLayout === "single" ? data?.heroImage : data?.heroImages?.find(img => img.isPrimary)?.image
  
  // Logic to handle multiple stacked images if present in heroImages
  const stackedImages = data?.heroLayout === "single" 
    ? (primaryImage ? [primaryImage] : []) 
    : data?.heroImages?.sort((a, b) => (a.order || 0) - (b.order || 0)).map(h => h.image) || []

  // Default image if no images from Sanity
  const hasImages = stackedImages.length > 0;
  const defaultImage = "/hero-images/image.png";

  // Embla Carousel setup - The Proxy Interaction Layer
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

  // Process heading to highlight software name if present
  // This simplistic replacement mimics the design: "Welcome to <span...>DCCPHub</span>"
  const highlightText = softwareName || "DCCPHub"
  const headingParts = heading.split(highlightText)
  const renderedHeading = headingParts.length > 1 ? (
    <>
      {headingParts[0]}
      <span className="text-[#C79244] italic">{highlightText}</span>
      {headingParts[1]}
    </>
  ) : (
    heading
  )

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] z-50">
        {/* Architectural vertical lines that match the layout */}
        <div className="absolute left-0 top-0 w-[1px] h-full bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-[1px] h-full bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] pointer-events-none z-10" />

        {/* Top Utility Belt */}
        <div className="w-full bg-[#1a3a52] py-2 px-6 hidden lg:block border-x border-transparent relative mx-auto">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <span className="text-[10px] text-white/50 uppercase tracking-[0.25em] font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C79244] animate-pulse"></span>
              Student & Faculty Gateway
            </span>
            <div className="flex gap-6">
              <Link href="#" className="text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors font-bold">Support</Link>
              <Link href="#" className="text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors font-bold border-l border-white/10 pl-6">Admissions</Link>
            </div>
          </div>
        </div>

        <nav
          data-state={menuState && 'active'}
          className="w-full border-b border-[rgba(26,58,82,0.08)] bg-[#F7F5F3]/95 backdrop-blur-md transition-all duration-300 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-20 lg:h-[100px]">

              {/* Desktop Left Nav */}
              <div className="hidden lg:flex items-center gap-10 h-full">
                <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2">
                  Portal Home
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
                </Link>
                <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2">
                  Faculty
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
                </Link>
              </div>

              {/* Center Branding */}
              <ViewTransitionLink
                href="/"
                aria-label="home"
                className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center gap-4 transition-all hover:scale-[1.03] duration-500 group"
                transitionType="slide-reverse">
                <div className="flex flex-col items-center">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a52] tracking-tight leading-none group-hover:text-[#C79244] transition-colors">DCCPHub</span>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-[1px] w-4 bg-[#C79244]/40"></div>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#605A57] font-bold">Data Center College</span>
                    <div className="h-[1px] w-4 bg-[#C79244]/40"></div>
                  </div>
                </div>
              </ViewTransitionLink>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="lg:hidden relative z-20 text-[#1a3a52] hover:bg-[#1a3a52]/5 p-2 rounded-lg transition-colors border border-[rgba(26,58,82,0.1)]">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-300" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-300" />
              </button>

              {/* Desktop Right Nav & CTAs */}
              <div className="hidden lg:flex items-center gap-10 h-full">
                <div className="flex items-center gap-10 border-r border-[rgba(26,58,82,0.1)] pr-10 h-10">
                  <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2">
                    LMS
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
                  </Link>
                  <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2">
                    Library
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
                  </Link>
                </div>

                <div className="flex items-center gap-6">
                  <Link href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a3a52] hover:opacity-70 transition-opacity">
                    Sign In
                  </Link>
                  <Button size="sm" className="bg-[#1a3a52] hover:bg-[#1a3a52]/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] px-8 rounded-none h-11 transition-all border border-[#1a3a52] hover:-translate-y-0.5">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <div className="in-data-[state=active]:block lg:hidden hidden w-full bg-[#F7F5F3] border-t border-[rgba(26,58,82,0.12)] shadow-2xl animate-in slide-in-from-top duration-500 overflow-hidden">
            <div className="p-10 space-y-10">
              <ul className="space-y-8">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-2xl font-serif text-[#1a3a52] hover:text-[#C79244] transition-colors block border-b border-[rgba(26,58,82,0.08)] pb-6 flex justify-between items-center group">
                      {item.name}
                      <span className="text-xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="grid gap-4 pt-6">
                <Button className="w-full bg-[#1a3a52] text-white rounded-none h-14 uppercase tracking-[0.3em] text-[10px] font-bold">Registration</Button>
                <Button variant="outline" className="w-full border-[rgba(26,58,82,0.2)] text-[#1a3a52] rounded-none h-14 uppercase tracking-[0.3em] text-[10px] font-bold">Portal Login</Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div
          aria-hidden
          className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block">
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(210,50%,30%,.08)_0,hsla(210,50%,30%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(34,50%,60%,.06)_0,hsla(34,50%,60%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(210,50%,30%,.04)_0,hsla(210,50%,30%,.02)_80%,transparent_100%)]" />
        </div>

        <section className="bg-[#F7F5F3]/50 overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 lg:pt-24">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a3a52]/5 border border-[#1a3a52]/10 rounded-full mb-6 text-[#1a3a52] text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C79244]"></span>
                {eyebrow}
              </div>
              <h1 className="text-balance text-4xl font-serif text-[#1a3a52] font-semibold md:text-5xl lg:text-7xl">
                {renderedHeading}
              </h1>
              <p className="text-[#605A57] mx-auto my-8 max-w-2xl text-lg md:text-xl">
                {subheading}
              </p>

              <div className="flex justify-center gap-4">
                {data?.ctas ? (
                  data.ctas.map((cta, idx) => {
                    const href = cta.url || (cta.page?._ref ? `/pages/${cta.page._ref}` : "#")
                    return (
                      <Button
                        key={idx}
                        asChild
                        size="lg"
                        className={cn(
                          "bg-[#1a3a52] hover:bg-[#1a3a52]/90 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5",
                          cta.style !== "primary" && "bg-transparent border border-[#1a3a52] text-[#1a3a52] hover:bg-[#1a3a52]/5 shadow-none"
                        )}
                      >
                        <Link href={href} target={cta.openInNewTab ? "_blank" : undefined}>
                          <span className="btn-label">{cta.label}</span>
                        </Link>
                      </Button>
                    )
                  })
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#1a3a52] hover:bg-[#1a3a52]/90 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <Link href="#">
                      <span className="btn-label">Student Login</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto 2xl:max-w-7xl mt-12 pb-20 relative h-[400px] lg:h-[600px] w-full perspective-distant">
            {/* Interaction Layer (Proxy Embla) */}
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
              {!hasImages ? (
                // Fallback Layout if no images
                <div 
                  className="absolute transition-all duration-700 ease-in-out transform-style-3d w-full max-w-[300px] sm:max-w-[500px] lg:max-w-[900px] px-4 z-30"
                  style={{ transform: 'translate3d(0, 0, 0) scale(1) rotateX(20deg)' }}
                >
                  <div className="relative w-full aspect-[16/10] rounded-2xl border-[3px] border-white/80 shadow-2xl overflow-hidden bg-[#1a3a52]">
                    <Image
                      className="object-cover opacity-90"
                      src={defaultImage}
                      alt="DCCPHub Dashboard"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52] to-transparent mix-blend-multiply opacity-60" />
                  </div>
                </div>
              ) : (
                stackedImages.map((img, idx) => {
                  if (!img) return null
                  
                  const total = stackedImages.length;
                  // Use embla's selectedIndex state
                  const diff = (idx - selectedIndex + total) % total;
                  
                  let transformStyle = {};
                  let zIndex = 0;
                  let opacity = 0;
                  
                  if (diff === 0) {
                    // Center (Active)
                    zIndex = 30;
                    opacity = 1;
                    transformStyle = { transform: 'translate3d(0, 0, 0) scale(1) rotateX(20deg)' };
                  } else if (diff === 1) {
                    // Right (Next)
                    zIndex = 20;
                    opacity = 0.6;
                    transformStyle = { transform: 'translate3d(60px, 40px, -100px) scale(0.9) rotateY(-8deg) rotateX(20deg)' };
                  } else if (diff === total - 1) {
                    // Left (Prev)
                    zIndex = 20;
                    opacity = 0.6;
                    transformStyle = { transform: 'translate3d(-60px, 40px, -100px) scale(0.9) rotateY(8deg) rotateX(20deg)' };
                  } else {
                    // Back / Hidden
                    zIndex = 10;
                    opacity = 0;
                    transformStyle = { transform: 'translate3d(0, 80px, -200px) scale(0.8)' };
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
                          alt={img.alt || softwareName || "Hero Image"}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52] to-transparent mix-blend-multiply opacity-40" />
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </section>
        <section className="bg-[#F7F5F3] relative z-10 py-16 border-t border-[rgba(26,58,82,0.1)]">
          <div className="m-auto max-w-5xl px-6">
            <h2 className="text-center text-[#1a3a52] text-sm font-bold uppercase tracking-widest mb-12">Integrated Learning Systems</h2>
            <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-semibold text-[#1a3a52]"><div className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center text-white text-xs">C</div> Canvas LMS</div>
              <div className="flex items-center gap-2 font-semibold text-[#1a3a52]"><div className="w-8 h-8 bg-[#2D73B9] rounded flex items-center justify-center text-white text-xs">Z</div> Zoom</div>
              <div className="flex items-center gap-2 font-semibold text-[#1a3a52]"><div className="w-8 h-8 bg-[#EA4335] rounded flex items-center justify-center text-white text-xs">G</div> Google Workspace</div>
              <div className="flex items-center gap-2 font-semibold text-[#1a3a52]"><div className="w-8 h-8 bg-[#0078D4] rounded flex items-center justify-center text-white text-xs">M</div> Microsoft 365</div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
