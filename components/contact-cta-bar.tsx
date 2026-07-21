"use client"

import { Mail, MessageSquareText, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ContactCtaBarProps = {
  title?: string
  subtitle?: string
  phone?: string
  email?: string
  showSms?: boolean
  className?: string
  dense?: boolean
}
export default function ContactCtaBar({
  title = "Need help choosing a program?",
  subtitle = "Talk to admissions and we’ll help you find the best fit.",
  phone,
  email,
  showSms = true,
  className,
  dense = false,
}: ContactCtaBarProps) {
  if (!phone && !email) return null

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-sm",
        dense ? "px-4 py-4" : "px-5 py-6 sm:px-6",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="text-foreground font-serif text-lg sm:text-xl font-semibold tracking-tight">
            {title}
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-[52ch]">
            {subtitle}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {phone && (
            <Button asChild className="gap-2">
              <a href={`tel:${phone}`}>
                <Phone className="w-4 h-4" />
                Call
              </a>
            </Button>
          )}
          {email && (
            <Button asChild variant="outline" className="gap-2">
              <a href={`mailto:${email}`}>
                <Mail className="w-4 h-4" />
                Email
              </a>
            </Button>
          )}
          {showSms && phone && (
            <Button asChild variant="ghost" className="gap-2">
              <a href={`sms:${phone}`}>
                <MessageSquareText className="w-4 h-4" />
                Text
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
