import Link from "next/link"
import { ArrowRight, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react"

import ContactForm from "@/components/contact-form"
import type { Settings } from "@/lib/sanity/types"

interface ContactSectionProps {
  settings?: Settings | null
  className?: string
}

export default function ContactSection({ settings, className }: ContactSectionProps) {
  const primaryAddress =
    settings?.addresses?.find((a) => Boolean(a.address))?.address ||
    "123 Education Street, Baguio City, Philippines 2600"

  const primaryContact =
    settings?.contactDirectory?.find((c) => Boolean(c.email || c.phone)) ??
    settings?.contactDirectory?.[0]

  const phone = primaryContact?.phone || "+63 (74) 442-1234"
  const email = primaryContact?.email || "baguio-campus@dccph.edu.ph"
  const hours = primaryContact?.hours || "Mon - Fri: 8:00 AM - 5:00 PM (PHT)"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`w-full scroll-mt-20 border-b border-border bg-background/50 relative overflow-hidden ${
        className || ""
      }`}
    >
      {/* Decorative ambient background accents */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-foreground shadow-xs mb-4">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            <span>Admissions & Inquiries</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Connect With DCCP
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground"
          >
            Start your conversation with <span className="text-secondary italic">our team.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-sans">
            Have questions about admissions, degree programs, or campus life? Send us a
            message directly, or reach out to our admissions office in Baguio City.
          </p>
        </div>

        {/* Content Grid: Contact Details (Left) & Form (Right) */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Office Info & Quick Contact */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="font-serif text-2xl text-foreground font-normal">
                Admissions Office
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                Our counselors are available to guide you through enrollment requirements,
                scholarship applications, and course selection.
              </p>

              <div className="space-y-4 pt-2">
                {/* Address */}
                <div className="flex items-start gap-3.5 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary border border-secondary/25 transition-transform duration-200 group-hover:scale-105">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Campus Address</div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed">
                      {primaryAddress}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary border border-secondary/25 transition-transform duration-200 group-hover:scale-105">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Email Inquiries</div>
                    <a
                      href={`mailto:${email}`}
                      className="text-primary hover:text-secondary hover:underline transition-colors mt-0.5 inline-block font-mono text-xs"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary border border-secondary/25 transition-transform duration-200 group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Hotline & Phone</div>
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="text-primary hover:text-secondary hover:underline transition-colors mt-0.5 inline-block font-mono text-xs"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary border border-secondary/25 transition-transform duration-200 group-hover:scale-105">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Admissions Hours</div>
                    <div className="text-muted-foreground mt-0.5 leading-relaxed text-xs">
                      {hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action card: Apply directly */}
            <div className="rounded-2xl border border-secondary/35 bg-gradient-to-br from-card via-card to-secondary/10 p-6 sm:p-8 shadow-xs">
              <h4 className="font-serif text-xl font-normal text-foreground">
                Ready to submit an official application?
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                You can complete your enrollment application online through our admissions
                portal with document attachments.
              </p>
              <Link
                href="/apply"
                className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-secondary transition-colors group"
              >
                <span>Go to Online Application</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: The Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
