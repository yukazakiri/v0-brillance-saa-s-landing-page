"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

import type { Persona } from "@/lib/portal/demo-data"

interface PortalContextValue {
  persona: Persona
  setPersona: (p: Persona) => void
  togglePersona: () => void
}

const PortalContext = createContext<PortalContextValue | null>(null)

export function PortalProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("student")

  const value = useMemo<PortalContextValue>(
    () => ({
      persona,
      setPersona,
      togglePersona: () => setPersona((p) => (p === "student" ? "faculty" : "student")),
    }),
    [persona],
  )

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext)
  if (!ctx) {
    throw new Error("usePortal must be used within a PortalProvider")
  }
  return ctx
}
