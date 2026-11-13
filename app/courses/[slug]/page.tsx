import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "next-sanity"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react"

import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { buildImageUrl } from "@/lib/sanity/image"
import {
  fetchCourseBySlug,
  fetchCourseSlugs,
  fetchSettings,
} from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import { cn } from "@/lib/utils"

export const revalidate = 60

const CATEGORY_META: Record<
  string,
  { label: string; badge: string; color: string }
> = {
  ched: {
    label: "CHED College Degree",
    badge: "Bachelor Degree",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  },
  tesda: {
    label: "TESDA Technical-Vocational",
    badge: "National Certificate NC II",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  shs: {
    label: "Senior High School",
    badge: "DepEd Track",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  },
  short: {
    label: "Short Course",
    badge: "Certificate Program",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
}

export async function generateStaticParams() {
  const slugs = await fetchCourseSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await fetchCourseBySlug(slug)
  if (!course) return {}

  const title =
    course.seo?.metaTitle || `${course.title} | Data Center College`
  const description =
    course.seo?.metaDescription ||
    course.summary ||
    `Explore ${course.title} curriculum, tuition, and admissions at Data Center College of The Philippines Baguio.`
  const ogImage = buildImageUrl(course.seo?.shareImage ?? course.heroImage)
  const ogAlt =
    course.seo?.shareImage?.alt ?? course.heroImage?.alt ?? course.title

  return {
    title,
    description,
    openGraph: ogImage
      ? {
          title,
          description,
          images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
        }
      : undefined,
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [course, settings] = await Promise.all([
    fetchCourseBySlug(slug),
    fetchSettings(),
  ])

  if (!course) notFound()

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  }

  const primaryContact =
    siteSettings.contactDirectory?.find((contact) =>
      Boolean(contact.phone || contact.email),
    ) ?? siteSettings.contactDirectory?.[0]

  const admissionsPhone =
    course.admissionsContact?.phone ?? primaryContact?.phone
  const admissionsEmail =
    course.admissionsContact?.email ?? primaryContact?.email

  const categoryInfo =
    CATEGORY_META[course.offeringCategory] ?? {
      label: "Academic Program",
      badge: "Accredited Offering",
      color: "bg-primary/10 text-primary border-primary/20",
    }

  const duration =
    course.duration ?? course.trainingHours ?? "Inquire with admissions"
  const isDegree = Boolean(course.creditHours)
  const studyLoad = isDegree
    ? `${course.creditHours} Total Units`
    : course.trainingHours ?? "Standard Load"

  const applyHref = course.cta?.url || "/apply"
  const applyLabel = course.cta?.label || "Apply for Admission"
  const isExternalApplyLink = /^https?:\/\//.test(applyHref)

  const syllabusUrl = course.syllabus?.asset?.url

  const allCareerRoles = Array.from(
    new Set([
      ...(course.careerPaths || []),
      ...(course.outcomes || []),
    ]),
  )

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="min-h-screen w-full pt-24 bg-background">
        {/* Editorial Dossier Header */}
        <section className="border-b border-border bg-background">
          {/* Metadata Ticker */}
          <div className="border-b border-border/70 bg-muted/20">
            <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:px-8 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-2">
                <Link href="/" className="hover:text-foreground transition-colors">
                  HOME
                </Link>
                <span>/</span>
                <Link href="/courses" className="hover:text-foreground transition-colors">
                  PROSPECTUS
                </Link>
                <span>/</span>
                <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">
                  {course.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary font-bold">DISCIPLINE DOSSIER</span>
                <span className="text-border">|</span>
                <span>VOL. 2026</span>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-18">
            <div className="max-w-[1040px]">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={cn("inline-flex items-center border px-3 py-1 text-xs font-mono uppercase tracking-widest font-semibold", categoryInfo.color)}>
                  {categoryInfo.label}
                </span>

                {course.credential && (
                  <span className="border border-border bg-background font-mono text-xs uppercase px-2.5 py-1 font-semibold text-foreground">
                    {course.credential}
                  </span>
                )}

                {course.badge && (
                  <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-mono uppercase font-bold text-amber-800 dark:text-amber-300">
                    <Sparkles className="size-3.5" />
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                {course.title}
              </h1>

              {course.summary && (
                <p className="mt-6 max-w-[75ch] text-pretty text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground font-sans">
                  {course.summary}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-none px-7 font-mono uppercase text-xs tracking-wider font-semibold">
                  {isExternalApplyLink ? (
                    <a href={applyHref} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <span>{applyLabel}</span>
                      <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    <Link href={applyHref} className="gap-2">
                      <span>{applyLabel}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </Button>

                {admissionsEmail && (
                  <Button asChild size="lg" variant="outline" className="rounded-none border-border px-6 font-mono uppercase text-xs tracking-wider font-semibold">
                    <a href={`mailto:${admissionsEmail}`} className="gap-2">
                      <Mail className="size-4" />
                      <span>Inquire with Admissions</span>
                    </a>
                  </Button>
                )}

                {syllabusUrl && (
                  <Button asChild size="lg" variant="ghost" className="rounded-none px-4 font-mono uppercase text-xs tracking-wider text-muted-foreground hover:text-foreground">
                    <a href={syllabusUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <Download className="size-4" />
                      <span>Download Syllabus (PDF)</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Key Metrics Ledger Bar */}
        <section aria-label="Program highlights and key metrics" className="border-b border-border bg-muted/20">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border px-4 sm:px-6 md:grid-cols-4 md:px-8 py-2">
            {[
              { label: "Duration", value: duration, icon: Clock },
              { label: "Curriculum Load", value: studyLoad, icon: GraduationCap },
              { label: "Delivery Mode", value: course.deliveryMode || "On Campus", icon: MapPin },
              { label: "Credential Awarded", value: course.credential || categoryInfo.badge, icon: Award },
            ].map(({ label, value, icon: Icon }, idx) => (
              <div
                key={label}
                className={cn(
                  "py-5 sm:py-6 flex flex-col justify-center",
                  idx > 0 && "sm:pl-6"
                )}
              >
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Icon className="size-3.5 text-secondary" />
                  <span>{label}</span>
                </div>
                <div className="mt-1.5 font-serif text-lg sm:text-xl font-bold text-foreground">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Editorial Navigation */}
        <nav aria-label="Section navigation" className="sticky top-16 sm:top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1280px] gap-6 overflow-x-auto px-4 py-3 sm:px-6 md:px-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <a href="#overview" className="hover:text-foreground transition-colors shrink-0 font-semibold text-foreground">
              Overview
            </a>
            {course.curriculumStructure && course.curriculumStructure.length > 0 && (
              <a href="#curriculum" className="hover:text-foreground transition-colors shrink-0">
                Curriculum Roadmap
              </a>
            )}
            {allCareerRoles.length > 0 && (
              <a href="#careers" className="hover:text-foreground transition-colors shrink-0">
                Career Pathways
              </a>
            )}
            {course.admissionsRequirements && course.admissionsRequirements.length > 0 && (
              <a href="#requirements" className="hover:text-foreground transition-colors shrink-0">
                Requirements
              </a>
            )}
            {(course.tuition || course.financialAidHighlight) && (
              <a href="#tuition-aid" className="hover:text-foreground transition-colors shrink-0">
                Tuition & Aid
              </a>
            )}
            {course.relatedOfferings && course.relatedOfferings.length > 0 && (
              <a href="#related" className="hover:text-foreground transition-colors shrink-0">
                Related Disciplines
              </a>
            )}
          </div>
        </nav>

        <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 flex flex-col gap-16 md:gap-24">
          <section id="overview" className="scroll-mt-36">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
              <div className="flex flex-col gap-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                    Dossier Section 01 // Scope & Objectives
                  </span>
                  <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    Discipline Overview & Capability
                  </h2>
                </div>

                {course.overview && course.overview.length > 0 ? (
                  <div className="prose prose-neutral max-w-none text-base leading-relaxed text-foreground/90 sm:text-lg [&_p]:leading-relaxed font-sans">
                    <PortableText value={course.overview} />
                  </div>
                ) : (
                  <p className="text-base leading-relaxed text-foreground sm:text-lg font-sans">
                    {course.summary || course.description || "Comprehensive hands-on training and academic curriculum designed for regional and national industry readiness."}
                  </p>
                )}

                {course.highlights && course.highlights.length > 0 && (
                  <div className="border border-border bg-muted/15 p-6 sm:p-8">
                    <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-foreground mb-4">
                      <Sparkles className="size-5 text-secondary" />
                      Key Curriculum Highlights
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 font-sans">
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      Core Learning Outcomes
                    </h3>
                    <ul className="grid gap-3">
                      {course.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-3 border border-border bg-background p-4 text-sm sm:text-base text-foreground/90 font-sans">
                          <span className="font-mono text-xs font-bold text-secondary px-2 py-0.5 bg-secondary/10 mt-0.5 shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sticky Dossier Snapshot Sidebar */}
              <aside className="flex flex-col gap-6">
                <div className="border border-border bg-background p-6 flex flex-col gap-5 sticky top-36">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block mb-1">
                      OFFICIAL DOSSIER
                    </span>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Prospectus Snapshot
                    </h3>
                  </div>

                  <div className="flex flex-col divide-y divide-border text-xs font-mono">
                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground uppercase">Study Level</span>
                      <span className="font-bold text-foreground uppercase">{course.level || "Tertiary"}</span>
                    </div>

                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground uppercase">Delivery Mode</span>
                      <span className="font-bold text-foreground">{course.deliveryMode || "On Campus"}</span>
                    </div>

                    {course.majors && course.majors.length > 0 && (
                      <div className="py-2.5 flex flex-col gap-1">
                        <span className="text-muted-foreground uppercase">Specializations</span>
                        <div className="flex flex-wrap gap-1 mt-1 font-sans">
                          {course.majors.map((major) => (
                            <span key={major} className="border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-foreground">
                              {major}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.intakeSchedule && (
                      <div className="py-2.5 flex justify-between gap-3">
                        <span className="text-muted-foreground uppercase">Next Intake</span>
                        <span className="font-bold text-foreground">{course.intakeSchedule}</span>
                      </div>
                    )}

                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground uppercase">Campus</span>
                      <span className="font-bold text-foreground">Baguio City Main</span>
                    </div>

                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground uppercase">Voucher Status</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {course.scholarshipsAvailable ? "100% Eligible" : "Inquire"}
                      </span>
                    </div>
                  </div>

                  <Button asChild className="w-full rounded-none font-mono uppercase text-xs tracking-wider">
                    <Link href={applyHref}>Apply for this Program</Link>
                  </Button>
                </div>

                {course.targetAudience && course.targetAudience.length > 0 && (
                  <div className="border border-border bg-muted/20 p-5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block mb-2">
                      Intended Candidates
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-sans">
                      {course.targetAudience.map((audience) => (
                        <span key={audience} className="border border-border bg-background px-2.5 py-1 text-xs text-foreground">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </section>

          {/* Curriculum Roadmap — Editorial Syllabus Ledger */}
          {course.curriculumStructure && course.curriculumStructure.length > 0 && (
            <section id="curriculum" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  Dossier Section 02 // Academic Structure
                </span>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Curriculum Roadmap & Progression
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch] font-sans">
                  Step-by-step progress from foundational concepts to advanced laboratory simulations and supervised on-the-job training.
                </p>
              </div>

              <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4 border-y border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
                {course.curriculumStructure.map((stage, idx) => (
                  <div key={idx} className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-border pb-3 mb-4">
                        <span className="font-mono text-xs font-bold text-secondary">
                          STAGE 0{idx + 1}
                        </span>
                        <span className="font-serif text-base font-bold text-foreground">
                          {stage.term || `Term ${idx + 1}`}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                        {stage.description || "Core competencies, hands-on laboratory exercises, and prerequisite progression."}
                      </p>
                    </div>

                    {stage.subjects && stage.subjects.length > 0 && (
                      <div className="mt-6 pt-3 border-t border-border/60">
                        <span className="font-mono text-[10px] uppercase font-semibold tracking-wider text-muted-foreground block mb-2">
                          Key Modules:
                        </span>
                        <div className="flex flex-wrap gap-1 font-sans">
                          {stage.subjects.map((sub, sIdx) => (
                            <span key={sIdx} className="border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-foreground">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Career Pathways — Editorial Role Matrix */}
          {allCareerRoles.length > 0 && (
            <section id="careers" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  Dossier Section 03 // Industry Outcomes
                </span>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Career Pathways & Real-World Roles
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch] font-sans">
                  Curated directly with regional industry and corporate partners so graduates qualify immediately for in-demand roles.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allCareerRoles.map((role, idx) => (
                  <div key={idx} className="flex items-start gap-3 border border-border p-4 hover:border-foreground/50 transition-colors">
                    <span className="font-mono text-xs font-bold text-secondary mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base font-bold text-foreground leading-snug">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enrollment Requirements — Editorial Checklist */}
          {course.admissionsRequirements && course.admissionsRequirements.length > 0 && (
            <section id="requirements" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  Dossier Section 04 // Admissions Docket
                </span>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Enrollment Requirements & Deadlines
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch] font-sans">
                  Submit clear copies or present originals to the Baguio admissions office for qualification evaluation.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {course.admissionsRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 border border-border p-4">
                    <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground/90 leading-snug font-sans">
                      {req}
                    </span>
                  </div>
                ))}
              </div>

              {course.applicationDeadlines && course.applicationDeadlines.length > 0 && (
                <div className="mt-6 border border-border bg-muted/20 p-5 flex flex-wrap items-center gap-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Calendar className="size-4 text-secondary" />
                    Application Timeline:
                  </span>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-sans">
                    {course.applicationDeadlines.map((deadline, dIdx) => (
                      <span key={dIdx} className="font-medium text-foreground">
                        {deadline}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Tuition & Financial Aid — Editorial Ledger Table */}
          {(course.tuition || course.financialAidHighlight || course.scholarshipsAvailable) && (
            <section id="tuition-aid" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                  Dossier Section 05 // Financial Transparency
                </span>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Tuition Matrix, Scholarships & Voucher Grants
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch] font-sans">
                  DCCP maintains accessible education through government subsidy partnerships and flexible semester terms.
                </p>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {course.tuition && (
                  <div className="border border-border bg-background p-6 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Tuition Structure & Terms
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-foreground mt-2">
                        Transparent Installment Terms
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans">
                        {course.tuition}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Baguio Admissions Office</span>
                      <span className="font-bold text-foreground">Installments Available</span>
                    </div>
                  </div>
                )}

                {(course.financialAidHighlight || course.scholarshipsAvailable) && (
                  <div className="border border-secondary/40 bg-secondary/5 p-6 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                        <Sparkles className="size-3.5" />
                        Government Subsidies & Grants
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-foreground mt-2">
                        {course.offeringCategory === "shs"
                          ? "100% DepEd PEAC Voucher Accepted"
                          : course.offeringCategory === "tesda"
                          ? "TESDA TWSP / STEP Vouchers"
                          : "CHED UniFAST & TES Grants"}
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans">
                        {course.financialAidHighlight ||
                          "Students in this program are eligible to apply for government educational subsidies and institutional merit grants."}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-secondary/20 flex items-center justify-between">
                      {admissionsEmail ? (
                        <Button asChild size="sm" variant="outline" className="rounded-none border-secondary/40 font-mono text-xs uppercase">
                          <a href={`mailto:${admissionsEmail}?subject=Inquiry: Financial Aid for ${course.title}`}>
                            Inquire for Scholarships
                          </a>
                        </Button>
                      ) : (
                        <Button asChild size="sm" variant="outline" className="rounded-none border-border font-mono text-xs uppercase">
                          <Link href="/apply">Ask Admissions Desk</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Related Offerings */}
          {course.relatedOfferings && course.relatedOfferings.length > 0 && (
            <section id="related" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                    Compare Disciplines
                  </span>
                  <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground">
                    Related Academic Offerings
                  </h2>
                </div>
                <Button variant="outline" size="sm" asChild className="rounded-none font-mono text-xs uppercase">
                  <Link href="/courses">All Programs</Link>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {course.relatedOfferings.map((related) => (
                  <div
                    key={related._id}
                    className="flex flex-col justify-between border border-border p-6 hover:border-foreground/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {related.title}
                      </h3>
                    </div>
                    <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                      <Button variant="ghost" size="sm" asChild className="p-0 hover:bg-transparent text-foreground hover:text-primary gap-1 font-mono text-xs uppercase">
                        <Link href={`/courses/${related.slug.current}`}>
                          <span>Read Dossier</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom CTA Spread */}
        <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col md:flex-row md:items-center md:justify-between gap-8 px-4 sm:px-6 md:px-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                Begin Your Journey
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Join Data Center College Baguio.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                Start your application online or speak with our admissions advisors for guidance on credit evaluation and voucher subsidies.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-none px-8 font-mono uppercase text-xs tracking-wider font-semibold">
                <Link href={applyHref}>Start Application</Link>
              </Button>
              {admissionsPhone && (
                <Button asChild size="lg" variant="outline" className="rounded-none border-border px-6 font-mono uppercase text-xs tracking-wider font-semibold">
                  <a href={`tel:${admissionsPhone}`} className="gap-2">
                    <Phone className="size-4" />
                    <span>Call ({admissionsPhone})</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}
