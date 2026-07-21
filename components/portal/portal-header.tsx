"use client"

import { ExternalLink, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"

interface PortalHeaderProps {
  portalHref?: string
  supportHref?: string
}

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Portal tour", href: "#portal-tour" },
  { label: "Get started", href: "#getting-started" },
]

export default function PortalHeader({
  portalHref = "https://portal.dccp.edu.ph",
  supportHref = "#portal-support",
}: PortalHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-0">
        <Link
          href="/portal"
          className="group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          aria-label="DCCPHub student portal home"
        >
          <span className="block font-serif text-3xl leading-none tracking-[-0.03em] text-primary transition-colors group-hover:text-secondary">
            DCCPHub
          </span>
          <span className="mt-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Student portal
          </span>
        </Link>

        <nav aria-label="Student portal page" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
          <span className="h-7 w-px bg-border" aria-hidden="true" />
          <Link
            href={supportHref}
            className="rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            Support
          </Link>
          <Button asChild className="h-11 rounded-sm px-6 text-xs font-semibold uppercase tracking-[0.14em]">
            <a href={portalHref} target="_blank" rel="noopener noreferrer">
              Open student portal
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-sm border border-border text-primary transition-colors hover:border-secondary hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="portal-mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="portal-mobile-navigation"
          aria-label="Student portal mobile navigation"
          className="border-t border-border bg-background px-5 py-6 sm:px-8 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-4 font-serif text-2xl text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={supportHref}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-4 font-serif text-2xl text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Support
            </Link>
            <Button asChild className="mt-5 h-12 rounded-sm text-xs font-semibold uppercase tracking-[0.14em]">
              <a href={portalHref} target="_blank" rel="noopener noreferrer">
                Open student portal
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
