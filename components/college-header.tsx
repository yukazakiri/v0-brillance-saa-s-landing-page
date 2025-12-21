"use client"

import { getImageUrl } from "@/lib/sanity/image"
import type { Settings } from "@/lib/sanity/types"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import MobileMenu from "./mobile-menu"

interface CollegeHeaderProps {
  settings: Settings
}

export default function CollegeHeader({ settings }: CollegeHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logoUrl =
    getImageUrl(settings.logos?.primary, 192, 192) ||
    settings.logos?.primary?.externalUrl ||
    "/android-chrome-192x192.png"

  const logoAlt = settings.logos?.primary?.alt || `${settings.shortTitle || settings.siteTitle} Logo`

  return (
    <>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* 
        Positioned Absolute to overlay the Hero Section initially.
        Fits within the parent container (1400px) because it's relative to that container.
      */}
      <header
        className={`absolute top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled
          ? "fixed top-0 max-w-[1400px] left-1/2 -translate-x-1/2 bg-[#F7F5F3]/95 backdrop-blur-md shadow-sm border-b border-[rgba(26,58,82,0.1)]"
          : "bg-transparent"
          }`}
      >

        {/* UTILITY BAR (Top Hat) - Hidden on scroll to save space, or keep distinct style */}
        <div className={`w-full border-b border-[rgba(26,58,82,0.1)] ${scrolled ? "hidden md:block h-0 opacity-0 overflow-hidden" : "h-[43px] opacity-100 py-2"} transition-all duration-300 hidden md:block bg-[#F7F5F3]`}>
          <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-center text-[11px] uppercase tracking-widest font-medium text-[#605A57]">
            <div className="flex gap-6">
              <Link href="/faculty" className="hover:text-[#1a3a52] transition-colors">Faculty</Link>
              <Link href="/alumni" className="hover:text-[#1a3a52] transition-colors">Alumni</Link>
              <Link href="/parents" className="hover:text-[#1a3a52] transition-colors">Parents</Link>
            </div>
            <div className="flex gap-6">
              <Link href="/portal" className="flex items-center gap-1 hover:text-[#1a3a52] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                Portal Login
              </Link>
              <span>+63 74 442 2222</span>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="w-full">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src={logoUrl || "/android-chrome-192x192.png"}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform group-hover:scale-105"
                  alt={logoAlt}
                  width={192}
                  height={192}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl md:text-2xl text-[#1a3a52] leading-none tracking-tight group-hover:opacity-80 transition-opacity">
                  Data Center <span className="italic">College</span>
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[#605A57] uppercase mt-0.5">
                  of the Philippines
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { href: "/about", label: "About" },
                { href: "/#programs", label: "Academics" },
                { href: "/#admissions", label: "Admissions" },
                { href: "/#campus", label: "Campus Life" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#1a3a52] hover:text-[#C79244] transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C79244] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/#contact"
                className="ml-4 px-6 py-2.5 bg-[#1a3a52] text-white text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#1a3a52]/90 transition-all hover:shadow-md"
              >
                Apply Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1a3a52] hover:bg-black/5 rounded-md transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

      </header>
    </>
  )
}
