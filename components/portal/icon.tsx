"use client"

import {
  BarChart,
  BookOpen,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Layers,
  LifeBuoy,
  MessageSquare,
  Shield,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react"

import type { IconKey } from "@/lib/portal/demo-data"
import { cn } from "@/lib/utils"

const ICONS: Record<IconKey, LucideIcon> = {
  graduationCap: GraduationCap,
  users: Users,
  bookOpen: BookOpen,
  lifeBuoy: LifeBuoy,
  calendar: Calendar,
  clipboardCheck: ClipboardCheck,
  barChart: BarChart,
  messageSquare: MessageSquare,
  wallet: Wallet,
  shield: Shield,
  zap: Zap,
  layers: Layers,
}

interface IconProps {
  glyph: IconKey
  className?: string
}

export function Icon({ glyph, className }: IconProps) {
  const Cmp = ICONS[glyph]
  return <Cmp className={cn("h-5 w-5", className)} />
}
