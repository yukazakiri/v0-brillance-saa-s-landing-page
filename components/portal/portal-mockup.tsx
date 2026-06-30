"use client"

import type { MockupKey } from "@/lib/portal/demo-data"

import MockupDashboard from "./mockup-dashboard"
import MockupFaculty from "./mockup-faculty"
import MockupLms from "./mockup-lms"

export default function PortalMockup({ type }: { type: MockupKey }) {
  if (type === "faculty") return <MockupFaculty />
  if (type === "lms") return <MockupLms />
  return <MockupDashboard />
}
