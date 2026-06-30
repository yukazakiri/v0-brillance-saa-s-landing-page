"use client"

import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { portalDemo } from "@/lib/portal/demo-data"

import { Icon } from "./icon"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function OverviewSection() {
  const { overview } = portalDemo
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.from(".overview-heading > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      })

      ScrollTrigger.batch(".overview-card", {
        start: "top 82%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 28,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
          })
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="overview" ref={rootRef} className="relative overflow-hidden border-y border-[#1a3a52]/10 bg-[#F7F5F3] py-20 md:py-28">
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overview-heading relative mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#1a3a52] md:text-5xl">
              {overview.title}
            </h2>
          <p className="mt-5 text-lg leading-8 text-[#605A57]">{overview.description}</p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {overview.pillars.map((pillar) => (
            <div key={pillar.id} className="overview-card group rounded-2xl border border-[#1a3a52]/10 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a3a52] text-[#C79244] shadow-navy-deep">
                <Icon glyph={pillar.iconKey} className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1a3a52]">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#605A57]">{pillar.description}</p>
              <div className="mt-6 h-0.5 w-0 bg-[#C79244] transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
