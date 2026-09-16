"use client"

import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Settings } from "@/lib/sanity/types"

interface AcademicsAdmissionsBannerProps {
  settings?: Settings
}

export default function AcademicsAdmissionsBanner({ settings }: AcademicsAdmissionsBannerProps) {
  const primaryContact =
    settings?.contactDirectory?.find((c) => Boolean(c.phone || c.email)) ??
    settings?.contactDirectory?.[0]

  const phone = primaryContact?.phone || "+63 74 442 2222"
  const email = primaryContact?.email || "admissions@dccp.edu.ph"
  const address =
    settings?.institutionProfile?.address ||
    "Data Center College of the Philippines, Baguio City, Philippines"

  return (
    <section className="w-full bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-border bg-card p-8 sm:p-12 md:flex-row md:items-center">
          <div className="max-w-[620px]">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Direct Admissions Consultation
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have questions about courses or enrollment?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Whether you are a student planning your future or a parent comparing educational
              pathways, our Baguio admissions counselors are here to walk you through curriculum
              details, voucher requirements, and schedules.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="size-3.5 text-secondary" />
                <span className="font-mono">{phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="size-3.5 text-secondary" />
                <span>{email}</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-secondary" />
                <span>Baguio City Campus</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8">
              <Link href="/apply">Apply for Admission</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8">
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>Call Admissions</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
