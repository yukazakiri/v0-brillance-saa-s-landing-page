import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EditorialHeroProps = {
  eyebrow: string
  title: string
  description: string
  meta?: string
  actions?: Array<{ href: string; label: string; variant?: "primary" | "outline" }>
}

export function EditorialHero({ eyebrow, title, description, meta, actions = [] }: EditorialHeroProps) {
  return (
    <section className="relative isolate w-full overflow-hidden border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--primary)_6%,transparent)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_oklch,var(--primary)_4%,transparent)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.95fr_0.55fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-balance font-serif text-6xl font-medium leading-[0.86] tracking-[-0.065em] text-primary sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          {actions.length > 0 && (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {actions.map((action) => (
                <Button
                  key={action.href}
                  asChild
                  variant={action.variant === "outline" ? "outline" : "default"}
                  className={cn(
                    "h-13 rounded-none px-7 font-bold",
                    action.variant === "outline"
                      ? "border-primary/25 bg-background/80 text-primary hover:bg-card"
                      : "bg-accent text-accent-foreground shadow-[6px_6px_0_color-mix(in_oklch,var(--primary)_16%,transparent)] hover:bg-accent/90",
                  )}
                >
                  <Link href={action.href}>
                    {action.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="border border-primary/15 bg-card p-6 shadow-[12px_12px_0_color-mix(in_oklch,var(--primary)_8%,transparent)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Page note</p>
          <p className="mt-5 font-serif text-3xl leading-none tracking-[-0.04em] text-primary">{meta || "Designed as a clear admissions decision page."}</p>
        </div>
      </div>
    </section>
  )
}

type EditorialCardProps = {
  eyebrow?: string
  title: string
  description: string
  href?: string
  children?: React.ReactNode
  className?: string
}

export function EditorialCard({ eyebrow, title, description, href, children, className }: EditorialCardProps) {
  const content = (
    <article className={cn("group flex h-full flex-col border border-border bg-card p-6 transition-all duration-300 hover:border-accent/70 hover:shadow-[10px_10px_0_color-mix(in_oklch,var(--primary)_8%,transparent)]", className)}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">{eyebrow}</p>}
      <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-[-0.04em] text-primary">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
      {children}
      {href && (
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-primary group-hover:text-accent">
          Open
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </article>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

export function EditorialCTA() {
  return (
    <section className="w-full border-x border-b border-border/70 bg-background px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
        <div>
          <p className="font-serif text-3xl leading-none tracking-[-0.035em] text-primary">Need help choosing a path?</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with programs, then apply when your shortlist is clear.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="h-12 rounded-none border-primary/25 bg-background px-6 font-bold text-primary hover:bg-card">
            <Link href="/programs">Compare Programs</Link>
          </Button>
          <Button asChild className="h-12 rounded-none bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
