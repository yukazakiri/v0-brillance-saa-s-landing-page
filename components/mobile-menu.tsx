"use client"

import Link from "next/link"
import { useEffect } from "react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#programs", label: "Programs" },
    { href: "/#admissions", label: "Admissions" },
    { href: "/news", label: "News" },
    { href: "/#campus-life", label: "Campus" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden flex flex-col bg-background transition-all duration-500 ease-out ${
        isOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
      }`}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-primary text-xl font-bold tracking-tight font-sans">DCCPH</span>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border hover:bg-muted active:scale-95 transition-all duration-300"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col justify-center px-6 -mt-8">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`group py-3 border-b border-border/50 transition-all duration-500 ease-out ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{
              transitionDelay: isOpen ? `${index * 50 + 100}ms` : "0ms",
            }}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-4xl sm:text-5xl font-serif font-medium text-foreground group-hover:text-primary group-active:text-primary transition-colors duration-300">
                {link.label}
              </span>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors duration-300">
                0{index + 1}
              </span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="px-6 pb-8">
        <Link
          href="/#contact"
          onClick={onClose}
          className={`block w-full py-4 bg-primary text-primary-foreground text-center text-base font-semibold rounded-full transition-all duration-500 ease-out hover:bg-primary/90 active:scale-[0.98] ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
        >
          Apply Now
        </Link>
        <p
          className={`text-center text-xs text-muted-foreground mt-4 tracking-wide transition-all duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: isOpen ? "600ms" : "0ms" }}
        >
          Start your journey today
        </p>
      </div>
    </div>
  )
}
