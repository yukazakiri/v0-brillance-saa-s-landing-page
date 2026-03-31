import { getImageUrl } from "@/lib/sanity/image";
import type { Settings } from "@/lib/sanity/types";
import Image from "next/image";
import Link from "next/link";
import ViewTransitionLink from "./view-transition-link";
import { ApplyButton } from "@/components/ui/apply-button";

interface CollegeHeaderProps {
  settings: Settings;
}

export default function CollegeHeader({ settings }: CollegeHeaderProps) {
  const logoUrl =
    getImageUrl(settings.logos?.primary, 192, 192) ||
    settings.logos?.primary?.externalUrl ||
    "/android-chrome-192x192.png";

  const logoAlt =
    settings.logos?.primary?.alt ||
    `${settings.shortTitle || settings.siteTitle} Logo`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F7F5F3]/95 backdrop-blur-md shadow-md border-b border-[rgba(26,58,82,0.06)]">
      <div className="w-full">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          {/* Logo Section */}
          <ViewTransitionLink
            href="/"
            className="flex items-center gap-3 group"
            transitionType="slide-reverse"
          >
            <div className="relative">
              <Image
                src={logoUrl || "/android-chrome-192x192.png"}
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain group-hover:scale-105 transition-transform"
                alt={logoAlt}
                width={192}
                height={192}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-lg font-bold leading-tight font-serif tracking-tight">
                Data Center College
              </span>
              <span
                className="text-foreground/80 text-base font-semibold leading-none italic -mt-1"
                style={{
                  fontFamily: "'Brush Script MT'",
                }}
              >
                of The Philippines
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
                  className="text-[#1a3a52] hover:text-[#C79244] transition-all duration-300 relative group py-2 font-medium text-sm"
                  transitionType="slide"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C79244] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </ViewTransitionLink>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#1a3a52] hover:text-[#C79244] transition-all duration-300 relative group py-2 font-medium text-sm"
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
            >
              Apply Now
            </ApplyButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#1a3a52] hover:bg-black/5 rounded-md transition-all duration-200"
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
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
