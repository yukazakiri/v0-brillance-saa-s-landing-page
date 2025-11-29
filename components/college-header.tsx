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
      setScrolled(window.scrollY > 20)
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

      <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div
          className={`max-w-6xl mx-auto rounded-full border transition-all duration-500 ease-out ${
            scrolled
              ? "bg-background/95 backdrop-blur-md border-border shadow-sm"
              : "bg-background/80 backdrop-blur-sm border-border/50"
          }`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <Image
                src={logoUrl || "/android-chrome-192x192.png"}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-border shadow-sm"
                alt={logoAlt}
                width={192}
                height={192}
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-sm sm:text-base tracking-tight text-primary">
                  {settings.shortTitle || "DCCPH"}
                </span>
                <span className="hidden sm:block text-[10px] text-muted-foreground font-medium -mt-0.5">
                  Baguio City
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {[
                { href: "/about", label: "About" },
                { href: "/#programs", label: "Programs" },
                { href: "/#admissions", label: "Admissions" },
                { href: "/news", label: "News" },
                { href: "/#campus-life", label: "Campus" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop CTA */}
              <Link
                href="/#contact"
                className="hidden sm:flex px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors duration-300"
              >
                Apply Now
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-full hover:bg-muted/50 active:scale-95 transition-all duration-300"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ease-out origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ease-out ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ease-out origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
