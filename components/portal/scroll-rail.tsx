"use client"

import { cn } from "@/lib/utils"

interface ScrollRailItem {
  id: string
  label: string
}

interface ScrollRailProps {
  items: ScrollRailItem[]
  activeId: string
  className?: string
}

export default function ScrollRail({ items, activeId, className }: ScrollRailProps) {
  return (
    <nav
      aria-label="Portal showcase sections"
      className={cn(
        "pointer-events-auto fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            className="group flex items-center justify-end gap-2"
          >
            <span className="rounded-full bg-[#1a3a52] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full border border-[#1a3a52]/30 bg-white transition-all",
                active && "h-8 rounded-full border-[#C79244] bg-[#C79244]",
              )}
            />
          </a>
        )
      })}
    </nav>
  )
}
