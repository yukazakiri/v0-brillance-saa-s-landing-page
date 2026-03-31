"use client";

import { getImageUrl } from "@/lib/sanity/image";
import type { Settings } from "@/lib/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./mobile-menu";
import ViewTransitionLink from "./view-transition-link";
import ApplicationModal from "./application-modal";
import { ApplyButton } from "@/components/ui/apply-button";

interface CollegeHeaderClientProps {
  settings: Settings;
}

export default function CollegeHeaderClient({ settings }: CollegeHeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50; // Standard threshold

      if (currentScrollY > scrollThreshold && !scrolled) {
        setScrolled(true);
      } else if (currentScrollY <= scrollThreshold && scrolled) {
        setScrolled(false);
      }
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
      ticking = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            {settings.logo && (
              <Image
                src={getImageUrl(settings.logo)}
                alt={settings.siteName || "Logo"}
                width={40}
                height={40}
                className="w-10 h-10"
              />
            )}
            <span className="hidden sm:inline font-semibold text-sm">{settings.siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/news"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              News
            </Link>
            <Link
              href="/programs"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ApplyButton onClick={() => setApplicationModalOpen(true)} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          settings={settings}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Application Modal */}
      <ApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
      />
    </header>
  );
}
