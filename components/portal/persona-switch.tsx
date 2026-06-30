"use client"

import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2 } from "lucide-react"

import { portalDemo } from "@/lib/portal/demo-data"

import { usePortal } from "./portal-context"
import PersonaToggle from "./persona-toggle"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function PersonaSwitch() {
  const { persona, setPersona } = usePortal()
  const current = portalDemo.personas[persona]
  const rootRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.from(".persona-panel", {
        autoAlpha: 0,
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      })
    },
    { scope: rootRef },
  )

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.fromTo(
        ".persona-item",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.05, ease: "power2.out" },
      )
    },
    { scope: listRef, dependencies: [persona], revertOnUpdate: true },
  )

  return (
    <section id="personas" ref={rootRef} className="bg-[#F7F5F3] py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="persona-panel mx-auto max-w-4xl rounded-[2rem] border border-[#1a3a52]/10 bg-white p-6 shadow-xl md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C79244]">Choose your view</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#1a3a52] md:text-5xl">
                Built for {current.label.toLowerCase()}s.
              </h2>
              <p className="mt-3 text-lg text-[#605A57]">{current.tagline}</p>
            </div>
            <PersonaToggle value={persona} onChange={setPersona} />
          </div>

          <div ref={listRef} className="mt-8 grid gap-3 md:grid-cols-2">
            {current.highlights.map((item) => (
              <div key={item} className="persona-item flex items-start gap-3 rounded-xl bg-[#F7F5F3] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#C79244]" />
                <span className="text-sm leading-6 text-[#1a3a52]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
