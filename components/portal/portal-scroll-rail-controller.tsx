"use client"

import { useEffect, useState } from "react"

import ScrollRail from "./scroll-rail"

const items = [
  { id: "portal-hero", label: "Hero" },
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "showcase", label: "Showcase" },
  { id: "personas", label: "Roles" },
  { id: "start", label: "Start" },
  { id: "requirements", label: "Specs" },
]

export default function PortalScrollRailController() {
  const [activeId, setActiveId] = useState(items[0]!.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return <ScrollRail items={items} activeId={activeId} />
}
