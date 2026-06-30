"use client"

import { type ReactNode, useRef } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

type GsapEditorialRevealProps = {
  children: ReactNode
  className?: string
}

export default function GsapEditorialReveal({ children, className }: GsapEditorialRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          motionOK: "(prefers-reduced-motion: no-preference)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduceMotion = context.conditions?.reduceMotion
          const targets = gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]", root)

          if (reduceMotion) {
            gsap.set(targets, { autoAlpha: 1, y: 0, clearProps: "transform,visibility" })
            return
          }

          gsap.fromTo(
            targets,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: { each: 0.08, from: "start" },
              clearProps: "transform,visibility",
            },
          )
        },
      )

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
