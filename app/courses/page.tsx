import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { fetchCourses, fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import { getImageUrl, getImageAlt } from "@/lib/sanity/image"
import CollegeHeader from "@/components/college-header"
import CourseCatalog from "@/components/course-catalog"
import FooterSection from "@/components/footer-section"
import { Button } from "@/components/ui/button"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Academic Prospectus & Curriculum Index | Data Center College Baguio",
  description:
    "Official academic prospectus of Data Center College of The Philippines Baguio City. Explore accredited college degrees, TESDA technical-vocational diplomas, and senior high school pathways.",
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [courses, settings, resolvedSearchParams] = await Promise.all([
    fetchCourses(),
    fetchSettings(),
    searchParams ?? Promise.resolve(undefined),
  ])

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  }

  const primaryContact =
    siteSettings.contactDirectory?.find((contact) => Boolean(contact.phone || contact.email)) ??
    siteSettings.contactDirectory?.[0]

  const initialCategory =
    typeof resolvedSearchParams?.category === "string" ? resolvedSearchParams.category : undefined

  // Cover story course (BSIT or first featured)
  const coverCourse =
    courses.find((c) => c.slug === "bs-information-technology") ||
    courses.find((c) => c.featured) ||
    courses[0]

  const coverImageUrl = coverCourse
    ? getImageUrl(coverCourse.heroImage, 1200, 750)
    : "/placeholder.svg?height=750&width=1200"
  const coverImageAlt = coverCourse
    ? getImageAlt(coverCourse.heroImage, coverCourse.title)
    : "DCCP Academic Program"

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="min-h-screen w-full pt-20 bg-background text-foreground">
        {/* ================================================================= */}
        {/* EDITORIAL MASTHEAD & PROSPECTUS COVER */}
        {/* ================================================================= */}
        <header className="border-b border-border bg-background">
          {/* Masthead Utility Ticker / Registration Stamp */}
          <div className="border-b border-border/80 bg-muted/30">
            <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:px-8 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">DCCP BAGUIO CITY</span>
                <span className="hidden sm:inline text-border">|</span>
                <span className="hidden sm:inline">OFFICIAL ACADEMIC PROSPECTUS</span>
                <span className="text-border">|</span>
                <span>VOL. 2026–2027</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3 text-secondary" />
                  SESSION ROAD, BAGUIO CITY
                </span>
                <span className="hidden md:inline text-border">|</span>
                <span className="hidden md:inline font-semibold text-primary">CHED · TESDA · DEPED ACCREDITED</span>
              </div>
            </div>
          </div>

          {/* Main Editorial Hero Spread */}
          <div className="mx-auto w-full max-w-[1280px] px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16 md:px-8">
            <div className="flex flex-col gap-6">
              {/* Editorial Kicker */}
              <div className="flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-secondary" />
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  Field Guide & Curriculum Journal
                </span>
              </div>

              {/* Publication Headline in Instrument Serif */}
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.02] max-w-5xl">
                The Disciplines of Practical Mastery.
              </h1>

              {/* Sub-editorial Narrative */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                <p className="md:col-span-8 text-pretty text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground font-sans">
                  A definitive catalog of government-accredited 4-year bachelor degrees, TESDA technical-vocational qualifications, and DepEd-recognized Senior High School career strands. Designed for immediate employment, technological fluency, and regional leadership in Northern Luzon.
                </p>

                <div className="md:col-span-4 flex flex-col justify-end gap-2 text-xs text-muted-foreground border-l border-border/80 pl-4">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Now Enrolling for Academic Year 2026–2027
                  </div>
                  <p className="text-[12px] leading-normal">
                    DepEd PEAC vouchers accepted in full. Free tuition for qualified public Junior High completers.
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Ledger Ticker: 4 Pillars Divided by Hairline Borders */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border border-y border-border py-4">
              <div className="flex flex-col gap-1 pr-4 py-2 sm:py-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-semibold">
                  01 / DEGREE TRACKS
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                  CHED Recognized
                </span>
                <span className="text-xs text-muted-foreground">
                  4-Year Bachelor Degrees in IT, Business & Hospitality
                </span>
              </div>

              <div className="flex flex-col gap-1 px-0 sm:px-4 py-2 sm:py-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-semibold">
                  02 / TECHNICAL-VOCATIONAL
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                  TESDA Assessment Center
                </span>
                <span className="text-xs text-muted-foreground">
                  NC II & NC III National Competency Certifications
                </span>
              </div>

              <div className="flex flex-col gap-1 px-0 sm:px-4 py-2 sm:py-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-semibold">
                  03 / SECONDARY EDUCATION
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                  100% DepEd Voucher
                </span>
                <span className="text-xs text-muted-foreground">
                  Zero Tuition ESC Subsidies for Senior High School
                </span>
              </div>

              <div className="flex flex-col gap-1 pl-0 sm:pl-4 py-2 sm:py-0">
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-semibold">
                  04 / INDUSTRY APPRENTICESHIP
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                  480+ Hours Practicum
                </span>
                <span className="text-xs text-muted-foreground">
                  Supervised on-the-job training with regional partners
                </span>
              </div>
            </div>

            {/* ============================================================= */}
            {/* EDITORIAL COVER STORY SPREAD (Flagship Discipline Spotlight) */}
            {/* ============================================================= */}
            {coverCourse && (
              <div className="mt-12 rounded-none border border-border bg-muted/20 p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Editorial Image with Caption */}
                  <div className="lg:col-span-7 flex flex-col gap-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-muted">
                      <img
                        src={coverImageUrl}
                        alt={coverImageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1">
                          COVER STORY // FLAGSHIP
                        </span>
                        <span className="bg-background/90 backdrop-blur-xs text-foreground font-mono text-[10px] uppercase font-semibold px-2 py-1 border border-border">
                          {coverCourse.credential}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono uppercase text-muted-foreground tracking-wide flex items-center justify-between">
                      <span>DCCP Baguio Software Engineering & Networking Laboratories</span>
                      <span className="text-foreground font-semibold">Volume 2026</span>
                    </p>
                  </div>

                  {/* Right: Editorial Narrative Column */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold block mb-1">
                        Featured Academic Discipline
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        {coverCourse.title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-sans">
                      {coverCourse.description || coverCourse.summary}
                    </p>

                    {/* Editorial Stats Strip */}
                    <div className="grid grid-cols-3 gap-3 border-y border-border py-3 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground block">Duration</span>
                        <span className="font-semibold text-foreground">{coverCourse.duration}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground block">Curriculum</span>
                        <span className="font-semibold text-foreground">{coverCourse.creditHours ? `${coverCourse.creditHours} Units` : coverCourse.trainingHours}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground block">Tuition / Aid</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Vouchers OK</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button asChild size="default" className="rounded-none px-6 font-semibold gap-2">
                        <Link href={`/courses/${coverCourse.slug}`}>
                          <span>Read Full Curriculum Dossier</span>
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="default" className="rounded-none border-border">
                        <a href="#curriculum-index">
                          <span>Browse All Offerings</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ================================================================= */}
        {/* THE CURRICULUM JOURNAL & ACADEMIC INDEX SECTION */}
        {/* ================================================================= */}
        <section id="curriculum-index" aria-labelledby="program-directory-heading" className="w-full">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-16 md:px-8">
            <CourseCatalog
              courses={courses}
              initialCategory={initialCategory}
              contact={{ phone: primaryContact?.phone, email: primaryContact?.email }}
            />
          </div>
        </section>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}

