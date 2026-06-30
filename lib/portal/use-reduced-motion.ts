"use client"

import { useEffect, useState } from "react"

/**
 * Tracks the user's `prefers-reduced-motion` setting and keeps it in sync
 * if the OS-level preference changes while the page is mounted.
 *
 * Components consuming this should short-circuit 3D transforms, scroll-linked
 * motion, and auto-animations when this returns `true`.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return reduced
}
