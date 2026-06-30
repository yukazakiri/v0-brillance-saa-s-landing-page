"use client"

import { useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface CountUpProps {
  value: number
  suffix?: string
  /** Number of decimals to display. */
  decimals?: number
  durationMs?: number
  className?: string
}

export default function CountUp({
  value,
  suffix,
  decimals = 0,
  durationMs = 1600,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const format = (num: number) =>
        `${num.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix ?? ""}`

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) {
        el.textContent = format(value)
        return
      }

      const state = { value: 0 }
      gsap.to(state, {
        value,
        duration: durationMs / 1000,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = format(state.value)
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })
    },
    { scope: ref, dependencies: [value, suffix, decimals, durationMs], revertOnUpdate: true },
  )

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
