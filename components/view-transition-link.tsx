"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface ViewTransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
  transitionType?: "slide" | "slide-reverse" | "fade" | "none"
}

export default function ViewTransitionLink({ 
  href, 
  children, 
  className, 
  onClick,
  style,
  transitionType = "slide"
}: ViewTransitionLinkProps) {
  const router = useRouter()

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Close mobile menu if callback provided
    onClick?.()

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || transitionType === "none") {
      router.push(href)
      return
    }

    // Fallback for browsers without View Transitions API
    if (!document.startViewTransition) {
      router.push(href)
      return
    }

    // Set data attribute for reverse transitions
    if (transitionType === "slide-reverse") {
      document.documentElement.setAttribute('data-reverse', 'true')
    } else {
      document.documentElement.removeAttribute('data-reverse')
    }

    // Use View Transitions API with different animation types
    const transition = document.startViewTransition(() => {
      router.push(href)
    })

    try {
      await transition.finished
    } catch (error) {
      console.error("View transition failed:", error)
      // Fallback navigation if transition fails
      router.push(href)
    } finally {
      // Clean up data attribute
      document.documentElement.removeAttribute('data-reverse')
    }
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </Link>
  )
}