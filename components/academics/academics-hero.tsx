import Link from "next/link"
import { Award, Briefcase, GraduationCap, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AcademicsHero() {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs font-medium text-foreground shadow-xs">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="font-mono uppercase tracking-wider text-muted-foreground">
              Academics & Curricula
            </span>
            <span className="text-border">|</span>
            <span className="text-secondary font-medium">Baguio City Campus</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-[900px] font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Practical knowledge for real careers.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-[660px] text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            At Data Center College of The Philippines, we bridge foundational education with
            hands-on industry competencies. Designed for student ambition and parent peace of mind.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <a href="#offerings">Explore Offerings</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <a href="#parents-guide">Parent & Student Guide</a>
            </Button>
          </div>

          {/* Minimalist Trust & Pillar Highlights */}
          <div className="mt-16 grid w-full max-w-[1040px] grid-cols-2 gap-4 border-t border-border pt-10 sm:grid-cols-4 sm:gap-6 text-left">
            <div className="flex flex-col gap-2 rounded-lg p-2">
              <div className="flex items-center gap-2 text-primary">
                <Award className="size-4 shrink-0 text-secondary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Recognized
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                CHED recognized degrees & TESDA accredited TVET training.
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-2">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="size-4 shrink-0 text-secondary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Vouchers & Aid
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                UniFAST, PEAC ESC vouchers, & flexible installment options.
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-2">
              <div className="flex items-center gap-2 text-primary">
                <Briefcase className="size-4 shrink-0 text-secondary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Industry OJT
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hands-on internship placement with established regional partners.
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-2">
              <div className="flex items-center gap-2 text-primary">
                <GraduationCap className="size-4 shrink-0 text-secondary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Dual Pathway
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ladderized credits from Senior High / TESDA into full degrees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
