"use client"

import { useState } from "react"

import { Quote } from "lucide-react"

import { portalDemo } from "@/lib/portal/demo-data"
import { cn } from "@/lib/utils"

export default function TestimonialSpotlight() {
  const [activeId, setActiveId] = useState(portalDemo.testimonials[0]?.id ?? "")
  const active = portalDemo.testimonials.find((item) => item.id === activeId) ?? portalDemo.testimonials[0]!
  const marquee = [...portalDemo.testimonials, ...portalDemo.testimonials]

  return (
    <section id="voices" className="overflow-hidden bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C79244]">Campus voices</p>
          <Quote className="mx-auto mt-6 h-10 w-10 text-[#1a3a52]/15" />
          <blockquote className="mt-6 font-serif text-3xl leading-tight text-[#1a3a52] md:text-5xl">
            “{active.quote}”
          </blockquote>
          <div className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-[#C79244]">{active.name}</div>
          <div className="mt-1 text-sm text-[#605A57]">{active.program}</div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {portalDemo.testimonials.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition-all",
                  active.id === item.id
                    ? "border-[#C79244] bg-[#1a3a52] text-white shadow-gold-soft"
                    : "border-[#1a3a52]/10 bg-[#F7F5F3] text-[#1a3a52] hover:border-[#C79244]",
                )}
                aria-label={`Read testimonial from ${item.name}`}
              >
                {item.name.charAt(0)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 flex overflow-hidden border-y border-[#1a3a52]/10 bg-[#F7F5F3] py-4">
        <div className="portal-marquee flex min-w-max gap-4">
          {marquee.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="w-80 rounded-xl bg-white px-5 py-4 text-sm text-[#605A57] shadow-sm">
              “{item.quote}”
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
