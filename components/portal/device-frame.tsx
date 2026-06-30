"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface DeviceFrameProps {
  variant?: "laptop" | "phone" | "tablet"
  className?: string
  children: ReactNode
}

/**
 * Wraps a mockup in an illustrative device frame. The frame itself is pure
 * CSS/SVG so it scales crisply at any size. Children fill the screen area.
 */
export default function DeviceFrame({
  variant = "laptop",
  className,
  children,
}: DeviceFrameProps) {
  if (variant === "phone") {
    return (
      <div
        className={cn(
          "relative rounded-[2rem] border-[6px] border-[#1a3a52] bg-[#1a3a52] shadow-navy-deep",
          "aspect-[9/19] overflow-hidden",
          className,
        )}
      >
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/20" />
        <div className="h-full w-full rounded-[1.5rem] overflow-hidden">{children}</div>
      </div>
    )
  }

  if (variant === "tablet") {
    return (
      <div
        className={cn(
          "relative rounded-[1.25rem] border-[5px] border-[#1a3a52] bg-[#1a3a52] shadow-navy-deep",
          "aspect-[4/3] overflow-hidden",
          className,
        )}
      >
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    )
  }

  // laptop
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-[1rem] border-[3px] border-[#1a3a52] bg-[#1a3a52] shadow-navy-deep overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0f2538] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e06c5a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0b341]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5ab564]" />
          <span className="ml-3 text-[10px] font-medium uppercase tracking-widest text-white/40">
            dccp.edu.ph/portal
          </span>
        </div>
        <div className="overflow-hidden">{children}</div>
      </div>
      {/* Hinge + base */}
      <div className="mx-auto h-1.5 w-[108%] -translate-x-[3.5%] rounded-b-xl bg-gradient-to-b from-[#16304a] to-[#0f2538]" />
      <div className="mx-auto h-1 w-[30%] rounded-b-md bg-[#0b1d2e]" />
    </div>
  )
}
