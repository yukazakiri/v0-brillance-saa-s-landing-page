import {
  Award,
  CalendarDays,
  Check,
  ExternalLink,
  Headphones,
  Library,
  LockKeyhole,
  Phone,
} from "lucide-react"
import Image from "next/image"

import FooterSection from "@/components/footer-section"
import PortalHeader from "@/components/portal/portal-header"
import { Button } from "@/components/ui/button"
import type { Settings, StudentPortalPage } from "@/lib/sanity/types"

interface StudentPortalLandingProps {
  page: StudentPortalPage
  settings: Settings
}

const experienceRows = [
  {
    number: "01",
    title: "Classes & schedule",
    description:
      "See your classes, weekly schedule, and important dates in one clear view.",
    highlights: ["Daily schedule and calendar", "Course announcements", "Upcoming assignments"],
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Grades & attendance",
    description:
      "Follow your academic standing with current grades and attendance records.",
    highlights: ["Real-time grade updates", "Attendance overview", "Submission history"],
    icon: Award,
  },
  {
    number: "03",
    title: "Campus resources",
    description:
      "Reach the learning materials, services, and support that keep you moving.",
    highlights: ["Library and digital resources", "Forms and student services", "Campus updates"],
    icon: Library,
  },
]

const tourCallouts = [
  {
    title: "Personal overview",
    description: "Classes, credits, attendance, and GPA at a glance.",
  },
  {
    title: "Quick actions",
    description: "The tools you use most are always within easy reach.",
  },
  {
    title: "Today’s schedule",
    description: "Know what is next, where to go, and what is due.",
  },
]

const startSteps = [
  {
    number: "01",
    title: "Sign in",
    description: "Use your DCCP student account credentials to access the portal securely.",
  },
  {
    number: "02",
    title: "Explore",
    description: "Review your classes, schedule, announcements, grades, and resources.",
  },
  {
    number: "03",
    title: "Stay on track",
    description: "Check in regularly to follow deadlines, progress, and campus updates.",
  },
]

export default function StudentPortalLanding({ page, settings }: StudentPortalLandingProps) {
  const portalHref =
    page.accessInfo?.accessLink ||
    page.hero?.ctas?.find((cta) => cta.url)?.url ||
    "https://portal.dccp.edu.ph"
  const primaryContact =
    settings.contactDirectory?.find((contact) => contact.email || contact.phone) ??
    settings.contactDirectory?.[0]
  const supportEmail = page.supportInfo?.supportEmail || primaryContact?.email
  const supportPhone = primaryContact?.phone
  const supportHref = supportEmail
    ? `mailto:${supportEmail}`
    : supportPhone
      ? `tel:${supportPhone}`
      : "#portal-support"

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <PortalHeader portalHref={portalHref} supportHref={supportHref} />

      <main className="w-full flex-1">
        <section aria-labelledby="portal-hero-heading" className="border-b border-border">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.78fr_1.42fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24 xl:px-0">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                DCCPHub student portal
              </p>
              <h1
                id="portal-hero-heading"
                className="mt-6 text-balance font-serif text-5xl leading-[0.92] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[5.25rem]"
              >
                Your academic journey, all in one place.
              </h1>
              <div className="mt-7 h-0.5 w-12 bg-secondary" aria-hidden="true" />
              <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                {page.hero?.subheading ||
                  "A secure, mobile-ready home for your classes, grades, schedules, attendance, and campus resources."}
              </p>
              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-14 rounded-sm px-7 text-xs font-semibold uppercase tracking-[0.14em]">
                  <a href={portalHref} target="_blank" rel="noopener noreferrer">
                    Open student portal
                    <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
                <a
                  href={supportHref}
                  className="rounded-sm text-sm font-medium text-primary underline decoration-secondary underline-offset-8 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  Need help signing in?
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-sm border border-border bg-card">
              <Image
                src="/images/student-portal-dashboard.png"
                alt="DCCPHub student dashboard with classes, grades, attendance, assignments, calendar, and announcements"
                width={1536}
                height={1024}
                loading="eager"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section id="features" aria-labelledby="portal-features-heading" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-0">
            <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  Everything students need
                </p>
                <h2
                  id="portal-features-heading"
                  className="mt-5 max-w-2xl text-balance font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-foreground sm:text-6xl"
                >
                  Focus on learning. We’ll handle the rest.
                </h2>
              </div>
              <p className="max-w-lg text-base leading-7 text-muted-foreground lg:justify-self-end">
                {page.overview?.overviewDescription ||
                  "DCCPHub brings academics, campus tools, and important updates together in one place so you can stay organized and informed."}
              </p>
            </div>

            <div>
              {experienceRows.map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.number}
                    className="grid gap-6 border-b border-border py-9 sm:grid-cols-[3rem_3.5rem_1fr] lg:grid-cols-[3rem_4.5rem_1.15fr_1fr] lg:items-start lg:gap-8"
                  >
                    <p className="font-serif text-3xl text-secondary">{item.number}</p>
                    <Icon className="size-9 text-primary" strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <h3 className="font-serif text-3xl leading-none text-primary">{item.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                    <ul className="space-y-2.5 sm:col-start-3 lg:col-start-4">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="mt-1 size-3.5 shrink-0 text-secondary" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="portal-tour" aria-labelledby="portal-tour-heading" className="scroll-mt-24 bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-0">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_2.15fr_0.72fr] lg:items-center lg:gap-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Built for students</p>
                <h2 id="portal-tour-heading" className="mt-5 font-serif text-4xl leading-[0.96] tracking-[-0.03em] sm:text-5xl">
                  A clear view of your academic world.
                </h2>
                <div className="mt-9 space-y-7">
                  {tourCallouts.map((callout) => (
                    <div key={callout.title} className="border-t border-secondary/45 pt-4">
                      <h3 className="font-serif text-xl text-secondary">{callout.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-primary-foreground/75">{callout.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-sm border border-primary-foreground/20 bg-background">
                <Image
                  src="/images/student-portal-dashboard.png"
                  alt="A guided look at the DCCPHub student dashboard"
                  width={1536}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>

              <div className="space-y-7 lg:self-end lg:pb-10">
                <div className="border-t border-secondary/45 pt-4">
                  <h3 className="font-serif text-xl text-secondary">Stay on track</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                    Check your calendar, announcements, and recent activity.
                  </p>
                </div>
                <div className="border-t border-secondary/45 pt-4">
                  <h3 className="font-serif text-xl text-secondary">Everything in one place</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                    Navigate academics, resources, and support from one secure home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="getting-started" aria-labelledby="getting-started-heading" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 xl:px-0">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Getting started</p>
              <h2 id="getting-started-heading" className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
                Three simple steps.
              </h2>
            </div>
            <ol className="mt-12 grid gap-9 md:grid-cols-3 md:gap-0">
              {startSteps.map((step, index) => (
                <li key={step.number} className="px-5 text-center md:border-r md:border-border md:px-9 md:last:border-r-0">
                  <p className="font-serif text-3xl text-secondary">{step.number}</p>
                  <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="portal-support" aria-label="Portal help and security" className="border-b border-border bg-muted/35">
          <div className="mx-auto grid w-full max-w-6xl divide-y divide-border px-5 py-8 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10 xl:px-0">
            <div className="flex gap-4 py-5 md:px-7">
              <LockKeyhole className="size-7 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Secure by design</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Your student information stays protected.</p>
              </div>
            </div>
            <div className="flex gap-4 py-5 md:px-7">
              <Headphones className="size-7 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">We’re here to help</h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Get help with account access or portal concerns.</p>
              </div>
            </div>
            <div className="flex gap-4 py-5 md:px-7">
              <Phone className="size-7 shrink-0 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Need assistance?</h2>
                {supportPhone ? (
                  <a href={`tel:${supportPhone}`} className="mt-1 block text-xs leading-5 text-primary hover:text-secondary">
                    {supportPhone}
                  </a>
                ) : null}
                {supportEmail ? (
                  <a href={`mailto:${supportEmail}`} className="block break-all text-xs leading-5 text-primary hover:text-secondary">
                    {supportEmail}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="portal-closing-heading" className="bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-7 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Ready when you are</p>
              <h2 id="portal-closing-heading" className="mt-3 font-serif text-3xl tracking-[-0.025em] sm:text-4xl">
                Take control of your academic journey.
              </h2>
            </div>
            <Button asChild size="lg" className="h-13 shrink-0 rounded-sm bg-secondary px-7 text-xs font-semibold uppercase tracking-[0.14em] text-foreground hover:bg-secondary/90">
              <a href={portalHref} target="_blank" rel="noopener noreferrer">
                Open student portal
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <FooterSection settings={settings} />
    </div>
  )
}
