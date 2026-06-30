"use client"

import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

interface AnnotationPinProps {
  index: number
  label: string
  /** Horizontal position as a percentage (0-100). */
  x: number
  /** Vertical position as a percentage (0-100). */
  y: number
  /** When true, the pin is revealed (animation plays). */
  active?: boolean
}

export default function AnnotationPin({
  index,
  label,
  x,
  y,
  active = true,
}: AnnotationPinProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.fromTo(
        rootRef.current,
        { autoAlpha: 0, scale: 0.72 },
        {
          autoAlpha: active ? 1 : 0,
          scale: active ? 1 : 0.72,
          duration: 0.42,
          delay: 0.08 * index,
          ease: "back.out(1.7)",
        },
      )
      gsap.fromTo(
        ".annotation-label",
        { x: -6, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: active ? 1 : 0,
          duration: 0.3,
          delay: 0.1 * index,
          ease: "power2.out",
        },
      )
    },
    { scope: rootRef, dependencies: [active, index], revertOnUpdate: true },
  )

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#C79244] bg-[#1a3a52] text-[11px] font-bold text-white shadow-lg",
            active && "pin-pulse",
          )}
        >
          {index}
        </span>
        <span className="annotation-label whitespace-nowrap rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-[#1a3a52] shadow-md">
          {label}
        </span>
      </div>
    </div>
  )
}
