"use client"

import { useEffect } from "react"

const INJECT_URL = "https://cdn.botpress.cloud/webchat/v3.5/inject.js"
const CONFIG_URL =
  "https://files.bpcontent.cloud/2025/03/12/02/20250312025656-J40NI3RT.js"

// Guard: only initialize once per browser session regardless of navigation
let initialized = false

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Avoid adding the same script twice
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement("script")
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.body.appendChild(s)
  })
}

export default function BotpressLoader() {
  useEffect(() => {
    if (initialized) return
    initialized = true

    // Load inject.js first, then config — guaranteed sequential
    loadScript(INJECT_URL)
      .then(() => {
        // Sanity-check: window.botpress must exist before config runs
        if (typeof window !== "undefined" && (window as any).botpress) {
          return loadScript(CONFIG_URL)
        }
        // Fallback: retry after a short delay if botpress isn't ready yet
        return new Promise<void>((resolve) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (
              typeof window !== "undefined" &&
              (window as any).botpress
            ) {
              clearInterval(interval)
              loadScript(CONFIG_URL).then(resolve).catch(console.error)
            } else if (attempts > 20) {
              clearInterval(interval)
              console.warn("[Botpress] window.botpress not found after retries")
              resolve()
            }
          }, 200)
        })
      })
      .catch((err) => {
        console.error("[Botpress] Script load error:", err)
        // Reset on error so it can retry on next navigation
        initialized = false
      })
  }, [])

  return null
}
