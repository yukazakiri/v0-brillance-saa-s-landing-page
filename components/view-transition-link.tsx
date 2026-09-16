"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  TransitionDirection,
  useViewTransition,
} from "@/components/view-transitions/view-transition-provider"

interface ViewTransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
  transitionType?: "slide" | "slide-reverse" | "fade" | "none"
  [key: string]: unknown
}

export default function ViewTransitionLink({
  href,
  children,
  className,
  onClick,
  style,
  transitionType = "slide",
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter()
  const { startViewTransition } = useViewTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.()

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }

    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return
    }

    e.preventDefault()

    if (transitionType === "none") {
      router.push(href)
      return
    }

    const direction: TransitionDirection =
      transitionType === "slide-reverse"
        ? "back"
        : transitionType === "fade"
        ? "fade"
        : "forward"

    startViewTransition(
      () => {
        router.push(href)
      },
      { direction }
    )
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      data-transition-direction={
        transitionType === "slide-reverse"
          ? "back"
          : transitionType === "fade"
          ? "fade"
          : "forward"
      }
      {...props}
    >
      {children}
    </Link>
  )
}
