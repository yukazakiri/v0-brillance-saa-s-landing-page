"use client"

import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Mobile Menu Backdrop - only blur the background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer - clean, sharp, no blur */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-card z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <span className="text-primary-foreground text-sm font-bold">DC</span>
            </div>
            <div className="flex flex-col">
              <div className="text-foreground text-base font-bold font-sans">DCCPH</div>
              <div className="text-muted-foreground text-xs font-sans">Baguio City</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link
            href="/programs"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={onClose}
          >
            Programs
          </Link>
          <Link
            href="/about"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={onClose}
          >
            About Us
          </Link>
          <Link
            href="/news"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={onClose}
          >
            News
          </Link>
          <a
            href="#faculty"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={onClose}
          >
            Faculty & Staff
          </a>
          <a
            href="#contact"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={onClose}
          >
            Contact
          </a>
        </nav>

        {/* Apply Now CTA - Fixed at bottom */}
        <div className="border-t border-border px-6 py-5 bg-muted/30">
          <button
            onClick={onClose}
            className="w-full px-5 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-base font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            Apply Now
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
            Start your journey with us today
          </p>
        </div>
      </div>
    </>
  )
}
