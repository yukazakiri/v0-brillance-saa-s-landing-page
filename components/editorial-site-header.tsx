import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/sanity/image"
import type { Settings } from "@/lib/sanity/types"

type EditorialSiteHeaderProps = {
  settings: Settings
}

const navItems = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/programs", label: "Programs" },
  { href: "/news", label: "News" },
  { href: "/_gallery", label: "Gallery" },
]

export default function EditorialSiteHeader({ settings }: EditorialSiteHeaderProps) {
  const logoUrl =
    getImageUrl(settings.logos?.primary, 192, 192) ||
    settings.logos?.primary?.externalUrl ||
    "/android-chrome-192x192.png"
  const logoAlt = settings.logos?.primary?.alt || `${settings.shortTitle || settings.siteTitle || "College"} logo`
  const shortTitle = settings.shortTitle || "Data Center College"
  const siteTitle = settings.siteTitle || "Data Center College of The Philippines"

  return (
    <header className="sticky top-0 z-50 w-full border-x border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${siteTitle} homepage`}>
          <span className="grid size-12 shrink-0 place-items-center border border-primary/15 bg-card shadow-[5px_5px_0_color-mix(in_oklch,var(--primary)_9%,transparent)] transition-transform duration-300 group-hover:-translate-y-0.5">
            <Image src={logoUrl} alt={logoAlt} width={34} height={34} className="size-8 object-contain" />
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate font-serif text-xl leading-none tracking-tight text-primary">{shortTitle}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.26em] text-secondary">Baguio City, Inc.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[12px] font-bold uppercase tracking-[0.16em] text-primary/75 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/portal" className="hidden text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary md:inline-flex">
            Portal
          </Link>
          <Button asChild className="h-11 rounded-none bg-accent px-5 font-bold text-accent-foreground shadow-[5px_5px_0_color-mix(in_oklch,var(--primary)_16%,transparent)] hover:bg-accent/90">
            <Link href="/apply">Apply</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
