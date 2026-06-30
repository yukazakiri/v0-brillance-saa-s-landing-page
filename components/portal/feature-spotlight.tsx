"use client"

import { useRef, useState } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { portalDemo } from "@/lib/portal/demo-data"
import { cn } from "@/lib/utils"

import AnnotationPin from "./annotation-pin"
import DeviceFrame from "./device-frame"
import { Icon } from "./icon"
import PortalMockup from "./portal-mockup"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function FeatureSpotlight() {
  const [activeId, setActiveId] = useState(portalDemo.features[0]?.id ?? "")
  const active = portalDemo.features.find((feature) => feature.id === activeId) ?? portalDemo.features[0]!
  const rootRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.from(".feature-copy > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      })

      ScrollTrigger.batch(".feature-card", {
        start: "top 82%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            x: -18,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          })
        },
      })
    },
    { scope: rootRef },
  )

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced || !previewRef.current) return

      gsap.fromTo(
        previewRef.current,
        { autoAlpha: 0, y: 22, rotateY: 10, scale: 0.98, transformPerspective: 1400 },
        { autoAlpha: 1, y: 0, rotateY: 0, scale: 1, duration: 0.48, ease: "power3.out" },
      )
    },
    { scope: previewRef, dependencies: [active.id], revertOnUpdate: true },
  )

  return (
    <section id="features" ref={rootRef} className="overflow-hidden border-y border-[rgba(26,58,82,0.12)] bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16">
          <div className="feature-copy">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C79244]">Feature spotlight</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#1a3a52] md:text-5xl">
              The portal explains itself the moment you use it.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#605A57]">
              Each workflow is built around the daily academic tasks that matter most: grades, enrollment, LMS access, analytics, messaging, and fees.
            </p>

            <div className="mt-8 space-y-2">
              {portalDemo.features.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveId(feature.id)}
                  className={cn(
                    "feature-card group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                    active.id === feature.id
                      ? "border-[#1a3a52] bg-[#1a3a52] text-white shadow-navy-deep"
                      : "border-[rgba(26,58,82,0.12)] bg-white/70 text-[#1a3a52] hover:border-[#C79244]/60 hover:bg-white",
                  )}
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg", active.id === feature.id ? "bg-[#C79244] text-[#1a3a52]" : "bg-[#F7F5F3] text-[#C79244]") }>
                    <Icon glyph={feature.iconKey} />
                  </span>
                  <span className="font-semibold">{feature.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <DeviceFrame className="shadow-gold-soft">
              <div
                ref={previewRef}
                key={active.id}
                className="relative aspect-[16/10] overflow-hidden"
              >
                <PortalMockup type={active.mockupKey} />
                {active.annotations.map((pin, idx) => (
                  <AnnotationPin key={pin.id} index={idx + 1} label={pin.label} x={pin.x} y={pin.y} />
                ))}
              </div>
            </DeviceFrame>
            <div className="mt-6 rounded-2xl border border-[rgba(26,58,82,0.12)] bg-white/70 p-6 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold text-[#1a3a52]">{active.label}</h3>
              <p className="mt-3 leading-7 text-[#605A57]">{active.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
