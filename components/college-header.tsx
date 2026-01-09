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

interface CollegeHeaderProps {
  settings: Settings;
}

export default function CollegeHeader({ settings }: CollegeHeaderProps) {
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

      if (currentScrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const logoUrl =
    getImageUrl(settings.logos?.primary, 192, 192) ||
    settings.logos?.primary?.externalUrl ||
    "/android-chrome-192x192.png";

  const logoAlt =
    settings.logos?.primary?.alt ||
    `${settings.shortTitle || settings.siteTitle} Logo`;

  return (
    <>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/*
        Fixed Header Implementation
        - Always fixed to viewport top
        - Transparent initially, white/blur on scroll
        - No positional transitions (prevents vibration)
        - Full width (no "floating island" width jumps)
      */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out ${scrolled
            ? "bg-[#F7F5F3]/95 backdrop-blur-md shadow-md border-b border-[rgba(26,58,82,0.06)]"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        {/* UTILITY BAR (Top Hat) */}
        {/* Collapses height and opacity on scroll */}
        <div
          className={`w-full overflow-hidden bg-[#F7F5F3] transition-all duration-500 ease-in-out md:block hidden border-b border-[rgba(26,58,82,0.1)] ${scrolled ? "max-h-0 opacity-0" : "max-h-[50px] opacity-100"
            }`}
        >
          <div className="max-w-[1350px] mx-auto px-4 sm:px-8 py-2 flex justify-between items-center text-[11px] uppercase tracking-widest font-medium text-[#605A57]">
            <div className="flex gap-6">
              <Link
                href="/faculty"
                className="hover:text-[#1a3a52] transition-colors duration-200"
              >
                Faculty
              </Link>
              <Link
                href="/alumni"
                className="hover:text-[#1a3a52] transition-colors duration-200"
              >
                Alumni
              </Link>
              <Link
                href="/parents"
                className="hover:text-[#1a3a52] transition-colors duration-200"
              >
                Parents
              </Link>
            </div>
            <div className="flex gap-6">
              <ViewTransitionLink
                href="/portal"
                className="flex items-center gap-1 hover:text-[#1a3a52] transition-colors duration-200"
                transitionType="slide"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Portal Login
              </ViewTransitionLink>
              <span>+63 74 442 2222</span>
            </div>
          </div>
        </div>

        {/* MAIN HEADER CONTENT */}
        <div className="w-full">
          <div
            className={`max-w-[1350px] mx-auto px-4 sm:px-8 flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled ? "h-16" : "h-20"
              }`}
          >
            {/* Logo Section */}
            <ViewTransitionLink
              href="/"
              className="flex items-center gap-3 group"
              transitionType="slide-reverse"
            >
              <div className="relative">
                <Image
                  src={logoUrl || "/android-chrome-192x192.png"}
                  className={`object-contain transition-all duration-500 ease-in-out group-hover:scale-105 ${scrolled
                      ? "h-8 w-8 sm:h-10 sm:w-10"
                      : "h-10 w-10 sm:h-12 sm:w-12"
                    }`}
                  alt={logoAlt}
                  width={192}
                  height={192}
                />
              </div>
              <div className="flex flex-col">
                {/* Main Title */}
                <span className="text-primary text-xl font-bold leading-tight font-serif tracking-tight">
                  Data Center College
                </span>

                {/* Subtitle Lines */}
                <span
                  className="text-foreground/80 text-lg font-semibold leading-none italic -mt-1"
                  style={{
                    fontFamily: "'Brush Script MT ",
                  }}
                >
                  of The Philippines
                  <span
                    className="ml-2 text-muted-foreground text-[8px] font-medium leading-tight tracking-wide mt-0.5"
                    style={{
                      fontFamily: "ui-sans-serif",
                    }}
                  >
                    of Baguio City, Inc.
                  </span>
                </span>
              </div>
            </ViewTransitionLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {[
                { href: "/about", label: "About" },
                { href: "/academics", label: "Academics" },
                { href: "/news", label: "News and Announcements" },
              ].map((link) =>
                link.href === "/about" ? (
                  <ViewTransitionLink
                    key={link.href}
                    href={link.href}
                    className={`text-[#1a3a52] hover:text-[#C79244] transition-all duration-300 relative group py-2 font-medium ${scrolled ? "text-xs" : "text-sm"
                      }`}
                    transitionType="slide"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C79244] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </ViewTransitionLink>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[#1a3a52] hover:text-[#C79244] transition-all duration-300 relative group py-2 font-medium ${scrolled ? "text-xs" : "text-sm"
                      }`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C79244] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </Link>
                ),
              )}
              <ApplyButton
                variant="default"
                size="header"
                className="ml-4"
                onClick={() => setApplicationModalOpen(true)}
              >
                Apply Now
              </ApplyButton>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1a3a52] hover:bg-black/5 rounded-md transition-all duration-200 hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 hover:rotate-90"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <ApplicationModal
        isOpen={applicationModalOpen}
        onOpenChange={setApplicationModalOpen}
      />
    </>
  );
}