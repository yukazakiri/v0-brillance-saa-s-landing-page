"use client"

import Link from "next/link"

import { ArrowRight } from "lucide-react"

import { portalDemo } from "@/lib/portal/demo-data"
import { Button } from "@/components/ui/button"

export default function GettingStartedTimeline() {
  const { gettingStarted } = portalDemo

  return (
    <section id="start" className="bg-[#F7F5F3] py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-[#1a3a52] md:text-5xl">{gettingStarted.title}</h2>
          <p className="mt-5 text-lg leading-8 text-[#605A57]">{gettingStarted.description}</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[#1a3a52]/10 md:block" />
          <div className="space-y-5">
            {gettingStarted.steps.map((step) => (
              <div key={step.stepNumber} className="relative rounded-2xl border border-[#1a3a52]/10 bg-white p-6 shadow-sm md:ml-16">
                <div className="absolute -left-[4.65rem] top-6 hidden h-12 w-12 items-center justify-center rounded-full bg-[#1a3a52] font-serif text-2xl text-[#C79244] shadow-navy-deep md:flex">
                  {step.stepNumber}
                </div>
                <div className="flex gap-4 md:hidden">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a3a52] font-serif text-xl text-[#C79244]">{step.stepNumber}</span>
                  <h3 className="font-serif text-2xl font-semibold text-[#1a3a52]">{step.title}</h3>
                </div>
                <h3 className="hidden font-serif text-2xl font-semibold text-[#1a3a52] md:block">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#605A57]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="rounded-none bg-[#1a3a52] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#143047]">
            <Link href={portalDemo.cta.primary.href} target="_blank">
              Start now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
