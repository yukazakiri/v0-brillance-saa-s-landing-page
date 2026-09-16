"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react"
import { usePathname, useRouter } from "next/navigation"

export type TransitionDirection = "forward" | "back" | "fade"

interface TransitionOptions {
  direction?: TransitionDirection
}

interface ViewTransitionContextValue {
  startViewTransition: (callback: () => void, options?: TransitionOptions) => void
  isTransitioning: boolean
  getDirectionForRoute: (targetPath: string) => TransitionDirection
}

const ROUTE_RANK: Record<string, number> = {
  "/": 0,
  "/about": 1,
  "/academics": 2,
  "/courses": 2.5,
  "/news": 3,
  "/faculty": 4,
  "/parents": 5,
  "/alumni": 6,
  "/portal": 7,
}

export function computeTransitionDirection(currentPath: string, targetPath: string): TransitionDirection {
  if (currentPath === targetPath) return "fade"
  if (targetPath === "/") return "back"
  if (currentPath === "/") return "forward"

  const currentRank = ROUTE_RANK[currentPath] ?? (currentPath.startsWith("/courses") ? 2.5 : 1)
  const targetRank = ROUTE_RANK[targetPath] ?? (targetPath.startsWith("/courses") ? 2.5 : 1)

  return targetRank < currentRank ? "back" : "forward"
}

const ViewTransitionContext = createContext<ViewTransitionContextValue>({
  startViewTransition: (cb) => cb(),
  isTransitioning: false,
  getDirectionForRoute: () => "forward",
})

export function useViewTransition() {
  return useContext(ViewTransitionContext)
}

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPathnameRef = useRef(pathname)
  const finishTransitionRef = useRef<(() => void) | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [, startReactTransition] = useTransition()

  const historyIndexRef = useRef<number>(0)
  const isNavigatingRef = useRef<boolean>(false)

  useEffect(() => {
    currentPathnameRef.current = pathname

    if (finishTransitionRef.current) {
      finishTransitionRef.current()
      finishTransitionRef.current = null
    }
    setIsTransitioning(false)
    isNavigatingRef.current = false
  }, [pathname])

  const getDirectionForRoute = useCallback(
    (targetPath: string): TransitionDirection => {
      return computeTransitionDirection(currentPathnameRef.current || "/", targetPath)
    },
    []
  )

  const startViewTransition = useCallback(
    (callback: () => void, options?: TransitionOptions) => {
      if (typeof document === "undefined" || !("startViewTransition" in document)) {
        callback()
        return
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        callback()
        return
      }

      const direction = options?.direction || "forward"
      document.documentElement.setAttribute("data-transition-direction", direction)
      setIsTransitioning(true)
      isNavigatingRef.current = true

      historyIndexRef.current += 1
      try {
        window.history.replaceState(
          { ...window.history.state, __dccp_idx: historyIndexRef.current },
          ""
        )
      } catch {
      }

      const transition = (document as unknown as {
        startViewTransition: (cb: () => Promise<void>) => { finished: Promise<void> }
      }).startViewTransition(() => {
        return new Promise<void>((resolve) => {
          const timer = setTimeout(() => {
            if (finishTransitionRef.current) {
              finishTransitionRef.current = null
              resolve()
              setIsTransitioning(false)
              document.documentElement.removeAttribute("data-transition-direction")
            }
          }, 650)

          finishTransitionRef.current = () => {
            clearTimeout(timer)
            resolve()
          }

          startReactTransition(() => {
            callback()
          })
        })
      })

      transition.finished
        .catch(() => {})
        .finally(() => {
          setIsTransitioning(false)
          document.documentElement.removeAttribute("data-transition-direction")
        })
    },
    []
  )

  useEffect(() => {
    if (typeof window === "undefined" || !("startViewTransition" in document)) {
      return
    }

    try {
      const state = window.history.state
      if (!state || typeof state.__dccp_idx !== "number") {
        window.history.replaceState({ ...state, __dccp_idx: 0 }, "")
        historyIndexRef.current = 0
      } else {
        historyIndexRef.current = state.__dccp_idx
      }
    } catch {
    }

    const handlePopState = (event: PopStateEvent) => {
      if (isNavigatingRef.current) return

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) return

      const targetIdx = event.state?.__dccp_idx
      let direction: TransitionDirection = "back"

      if (typeof targetIdx === "number") {
        if (targetIdx < historyIndexRef.current) {
          direction = "back"
        } else if (targetIdx > historyIndexRef.current) {
          direction = "forward"
        } else {
          direction = computeTransitionDirection(currentPathnameRef.current, window.location.pathname)
        }
        historyIndexRef.current = targetIdx
      } else {
        direction = computeTransitionDirection(currentPathnameRef.current, window.location.pathname)
      }

      document.documentElement.setAttribute("data-transition-direction", direction)
      setIsTransitioning(true)

      const transition = (document as unknown as {
        startViewTransition: (cb: () => Promise<void>) => { finished: Promise<void> }
      }).startViewTransition(() => {
        return new Promise<void>((resolve) => {
          const timer = setTimeout(() => {
            if (finishTransitionRef.current) {
              finishTransitionRef.current = null
              resolve()
              setIsTransitioning(false)
              document.documentElement.removeAttribute("data-transition-direction")
            }
          }, 650)

          finishTransitionRef.current = () => {
            clearTimeout(timer)
            resolve()
          }
        })
      })

      transition.finished
        .catch(() => {})
        .finally(() => {
          setIsTransitioning(false)
          document.documentElement.removeAttribute("data-transition-direction")
        })
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return

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

      if (target.target && target.target !== "_self") return
      if (target.hasAttribute("download")) return

      const href = target.getAttribute("href")
      if (!href) return

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return
      }

      try {
        const url = new URL(href, window.location.href)
        if (url.origin !== window.location.origin) return

        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          url.hash
        ) {
          return
        }

        const explicitDirection = target.getAttribute("data-transition-direction") as
          | TransitionDirection
          | null

        const direction: TransitionDirection =
          explicitDirection ||
          (target.getAttribute("data-transition-back") === "true"
            ? "back"
            : computeTransitionDirection(currentPathnameRef.current, url.pathname))

        e.preventDefault()
        startViewTransition(
          () => {
            router.push(url.pathname + url.search + url.hash)
          },
          { direction }
        )
      } catch {
      }
    }

    document.addEventListener("click", handleDocumentClick)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [router, startViewTransition])

  return (
    <ViewTransitionContext.Provider
      value={{ startViewTransition, isTransitioning, getDirectionForRoute }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 right-0 z-[9999] h-[2.5px] transition-opacity duration-300 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-[#C79244] to-transparent animate-pulse" />
      </div>

      {children}
    </ViewTransitionContext.Provider>
  )
}
