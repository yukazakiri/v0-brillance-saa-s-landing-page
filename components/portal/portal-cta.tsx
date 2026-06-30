"use client"

import Link from "next/link"

import { ArrowRight, ExternalLink } from "lucide-react"

import { portalDemo } from "@/lib/portal/demo-data"
import { Button } from "@/components/ui/button"

export default function PortalCTA() {
  const { cta } = portalDemo

  return (
    <section id="portal-cta" className="grain relative isolate overflow-hidden bg-[#081928] py-24 text-white md:py-32">
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C79244]/25 blur-3xl" />
      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl font-serif text-5xl font-semibold tracking-tight md:text-7xl">{cta.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">{cta.subheading}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="portal-breathe h-14 rounded-none bg-[#C79244] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1a3a52] hover:bg-[#d7a257]">
            <Link href={cta.primary.href} target="_blank">
              {cta.primary.label}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 rounded-none border-white/20 bg-white/5 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white/10 hover:text-white">
            <Link href={cta.secondary.href} target="_blank">
              {cta.secondary.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
