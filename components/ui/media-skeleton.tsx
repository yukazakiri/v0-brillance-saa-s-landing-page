"use client"

import { cn } from "@/lib/utils"

type MediaSkeletonProps = {
  className?: string
}

export function MediaSkeleton({ className }: MediaSkeletonProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-stone-100", className)} aria-hidden="true">
      <svg
        className="h-full w-full animate-pulse"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect width="400" height="300" fill="#E7E5E4" />
        <rect x="24" y="28" width="112" height="18" rx="9" fill="#D6D3D1" />
        <rect x="24" y="58" width="176" height="12" rx="6" fill="#D6D3D1" />
        <rect x="24" y="78" width="148" height="12" rx="6" fill="#D6D3D1" />
        <rect x="24" y="224" width="148" height="12" rx="6" fill="#D6D3D1" />
        <rect x="24" y="244" width="112" height="12" rx="6" fill="#D6D3D1" />
        <circle cx="310" cy="120" r="34" fill="#D6D3D1" />
        <path d="M297 104L329 120L297 136V104Z" fill="#F5F5F4" />
        <rect x="0" y="0" width="400" height="300" fill="url(#media-skeleton-shimmer)" />
        <defs>
          <linearGradient id="media-skeleton-shimmer" x1="-160" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E7E5E4" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FAFAF9" stopOpacity="0.9" />
            <stop offset="1" stopColor="#E7E5E4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
