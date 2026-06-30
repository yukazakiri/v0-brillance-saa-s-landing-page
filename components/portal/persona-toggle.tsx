"use client"

import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import type { Persona } from "@/lib/portal/demo-data"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

interface PersonaToggleProps {
  value: Persona
  onChange: (value: Persona) => void
  className?: string
}

export default function PersonaToggle({ value, onChange, className }: PersonaToggleProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(".persona-pill", {
        xPercent: value === "faculty" ? 100 : 0,
        duration: 0.36,
        ease: "power3.out",
      })
    },
    { scope: rootRef, dependencies: [value], revertOnUpdate: true },
  )

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-grid grid-cols-2 overflow-hidden rounded-full border border-[#1a3a52]/10 bg-white p-1 shadow-lg",
        className,
      )}
    >
      <span className="persona-pill pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-[#C79244]" />
      {(["student", "faculty"] as const).map((persona) => (
        <button
          key={persona}
          type="button"
          onClick={() => onChange(persona)}
          className={cn(
            "relative z-10 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
            value === persona ? "text-[#1a3a52]" : "text-[#605A57] hover:text-[#1a3a52]",
          )}
        >
          {persona}
        </button>
      ))}
    </div>
  )
}
