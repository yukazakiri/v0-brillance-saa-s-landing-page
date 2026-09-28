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
  CreditCard,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
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
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto w-full max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-20">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-foreground transition-colors">
                Courses
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[280px] sm:max-w-none">
                {course.title}
              </span>
            </div>

            <div className="max-w-[1040px]">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-tight", categoryInfo.color)}>
                  {categoryInfo.label}
                </span>

                {course.credential && (
                  <Badge variant="outline" className="font-mono text-xs uppercase px-2.5 py-0.5">
                    {course.credential}
                  </Badge>
                )}

                {course.badge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                    <Sparkles className="size-3.5" />
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                {course.title}
              </h1>

              {course.summary && (
                <p className="mt-6 max-w-[75ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                  {course.summary}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-xl px-6 font-semibold">
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
                  <Button asChild size="lg" variant="outline" className="rounded-xl px-5">
                    <a href={`mailto:${admissionsEmail}`} className="gap-2">
                      <Mail className="size-4" />
                      <span>Inquire with Admissions</span>
                    </a>
                  </Button>
                )}

                {syllabusUrl && (
                  <Button asChild size="lg" variant="ghost" className="rounded-xl px-4 text-muted-foreground hover:text-foreground">
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

        <section aria-label="Program highlights and key metrics" className="border-b border-border bg-card">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-8">
            {[
              { label: "Duration", value: duration, icon: Clock },
              { label: "Curriculum Load", value: studyLoad, icon: GraduationCap },
              { label: "Delivery Mode", value: course.deliveryMode || "On Campus", icon: MapPin },
              { label: "Credential Awarded", value: course.credential || categoryInfo.badge, icon: Award },
            ].map(({ label, value, icon: Icon }, idx) => (
              <div
                key={label}
                className={cn(
                  "py-6 sm:py-8 flex flex-col justify-center",
                  idx % 2 === 1 && "border-l border-border pl-4 sm:pl-6",
                  idx > 1 && "border-t border-border md:border-t-0",
                  idx > 0 && "md:border-l md:border-border md:pl-8"
                )}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Icon className="size-3.5 text-primary" />
                  <span>{label}</span>
                </div>
                <div className="mt-2 font-serif text-lg sm:text-xl font-bold text-foreground">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="Section navigation" className="sticky top-16 sm:top-20 z-30 border-b border-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1240px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 md:px-8 text-xs font-medium text-muted-foreground">
            <a href="#overview" className="rounded-md px-3 py-1.5 hover:bg-muted hover:text-foreground transition-colors shrink-0">
              Overview
            </a>
            {course.curriculumStructure && course.curriculumStructure.length > 0 && (
              <a href="#curriculum" className="rounded-md px-3 py-1.5 hover:bg-muted hover:text-foreground transition-colors shrink-0">
                Curriculum Roadmap
              </a>
            )}
            {allCareerRoles.length > 0 && (
              <a href="#careers" className="rounded-md px-3 py-1.5 hover:bg-muted hover:text-foreground transition-colors shrink-0">
                Careers & Outcomes
              </a>
            )}
            <a href="#tuition" className="rounded-md px-3 py-1.5 hover:bg-muted hover:text-foreground transition-colors shrink-0">
              Tuition & Subsidies
            </a>
            {course.admissionsRequirements && course.admissionsRequirements.length > 0 && (
              <a href="#requirements" className="rounded-md px-3 py-1.5 hover:bg-muted hover:text-foreground transition-colors shrink-0">
                Requirements
              </a>
            )}
            {course.relatedOfferings && course.relatedOfferings.length > 0 && (
              <a href="#related" className="rounded-md px-3 py-1.5 hover:bg-muted hover:text-foreground transition-colors shrink-0">
                Related Programs
              </a>
            )}
          </div>
        </nav>

        <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 flex flex-col gap-16 md:gap-24">
          <section id="overview" className="scroll-mt-36">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Program Overview
                  </span>
                  <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    What this program prepares you for
                  </h2>
                </div>

                {course.overview && course.overview.length > 0 ? (
                  <div className="prose prose-neutral max-w-none text-base leading-relaxed text-foreground/90 sm:text-lg [&_p]:leading-relaxed">
                    <PortableText value={course.overview} />
                  </div>
                ) : (
                  <p className="text-base leading-relaxed text-foreground sm:text-lg">
                    {course.summary || course.description || "Comprehensive hands-on training and academic curriculum designed for regional and national industry readiness."}
                  </p>
                )}

                {course.highlights && course.highlights.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
                    <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-foreground mb-4">
                      <Sparkles className="size-5 text-primary" />
                      Key Program Highlights
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
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
                        <li key={idx} className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-4 text-sm sm:text-base text-foreground/90">
                          <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10 mt-0.5">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <aside className="flex flex-col gap-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col gap-5">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    Fast Facts
                  </h3>

                  <div className="flex flex-col divide-y divide-border text-xs">
                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground">Study Level</span>
                      <span className="font-semibold text-foreground uppercase">{course.level || "Tertiary"}</span>
                    </div>

                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-semibold text-foreground">{course.deliveryMode || "On Campus"}</span>
                    </div>

                    {course.majors && course.majors.length > 0 && (
                      <div className="py-2.5 flex flex-col gap-1">
                        <span className="text-muted-foreground">Specializations</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.majors.map((major) => (
                            <span key={major} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                              {major}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.intakeSchedule && (
                      <div className="py-2.5 flex justify-between gap-3">
                        <span className="text-muted-foreground">Next Intake</span>
                        <span className="font-semibold text-foreground">{course.intakeSchedule}</span>
                      </div>
                    )}

                    <div className="py-2.5 flex justify-between gap-3">
                      <span className="text-muted-foreground">Campus</span>
                      <span className="font-semibold text-foreground">Baguio City Main</span>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={applyHref}>Apply for this Program</Link>
                  </Button>
                </div>

                {course.targetAudience && course.targetAudience.length > 0 && (
                  <div className="rounded-2xl border border-border bg-muted/30 p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Target Audience
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {course.targetAudience.map((audience) => (
                        <span key={audience} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </section>

          {course.curriculumStructure && course.curriculumStructure.length > 0 && (
            <section id="curriculum" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Academic Structure
                </span>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Curriculum Roadmap
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch]">
                  Step-by-step progress from foundational concepts to advanced lab simulations and supervised on-the-job training.
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {course.curriculumStructure.map((stage, idx) => (
                  <div key={idx} className="relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-border pb-3 mb-4">
                        <span className="font-mono text-xs font-bold text-primary">
                          Stage {idx + 1}
                        </span>
                        <span className="font-serif text-lg font-bold text-foreground">
                          {stage.term || `Term ${idx + 1}`}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {stage.description || "Core competencies, hands-on laboratory exercises, and prerequisite progression."}
                      </p>
                    </div>

                    {stage.subjects && stage.subjects.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/60">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground block mb-1.5">
                          Key Modules:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {stage.subjects.map((sub, sIdx) => (
                            <span key={sIdx} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground">
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

          {allCareerRoles.length > 0 && (
            <section id="careers" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Employment Opportunities
                </span>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Career Pathways & Real-World Roles
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch]">
                  Our programs are curated with regional industry partners so graduates qualify immediately for in-demand roles.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allCareerRoles.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Briefcase className="size-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground leading-snug">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section id="tuition" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
            <div className="rounded-3xl border border-border bg-muted/20 p-6 sm:p-10 md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12 items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                    <ShieldCheck className="size-4" />
                    Transparent Tuition & Financial Aid
                  </span>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Clear tuition with accessible subsidies
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Data Center College participates in government financial assistance programs including CHED UniFAST, Tertiary Education Subsidy (TES), and DepEd PEAC ESC vouchers to ensure education is within reach.
                  </p>

                  {course.financialAidHighlight && (
                    <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-sm text-foreground/90">
                      <strong className="block text-xs uppercase tracking-wider text-primary mb-1">
                        Scholarship Highlight
                      </strong>
                      {course.financialAidHighlight}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm flex flex-col gap-5">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      Tuition & Training Cost
                    </span>
                    <div className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                      {course.tuition || "Contact Admissions"}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      Installment payment plans available
                    </span>
                  </div>

                  <div className="border-t border-border pt-4 flex flex-col gap-2.5 text-xs">
                    {admissionsPhone && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Inquiries:</span>
                        <a href={`tel:${admissionsPhone}`} className="font-semibold text-primary hover:underline">
                          {admissionsPhone}
                        </a>
                      </div>
                    )}
                    {admissionsEmail && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Admissions Desk:</span>
                        <a href={`mailto:${admissionsEmail}`} className="font-semibold text-primary hover:underline">
                          {admissionsEmail}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button asChild size="lg" className="w-full">
                    <Link href={applyHref}>Apply for Enrollment</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {course.admissionsRequirements && course.admissionsRequirements.length > 0 && (
            <section id="requirements" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Admissions Checklist
                </span>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Enrollment Requirements
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-[65ch]">
                  Submit clear copies or present originals to the Baguio admissions office for registration.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {course.admissionsRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground/90 leading-snug pt-1">
                      {req}
                    </span>
                  </div>
                ))}
              </div>

              {course.applicationDeadlines && course.applicationDeadlines.length > 0 && (
                <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5 flex flex-wrap items-center gap-6">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                    <Calendar className="size-4 text-primary" />
                    Application Timeline:
                  </span>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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

          {course.relatedOfferings && course.relatedOfferings.length > 0 && (
            <section id="related" className="scroll-mt-36 border-t border-border pt-12 md:pt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Compare Programs
                  </span>
                  <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground">
                    Related Offerings
                  </h2>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {course.relatedOfferings.map((related) => (
                  <div
                    key={related._id}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {related.title}
                      </h3>
                    </div>
                    <div className="pt-6 mt-4 border-t border-border flex items-center justify-between">
                      <Button variant="ghost" size="sm" asChild className="p-0 hover:bg-transparent text-primary gap-1">
                        <Link href={`/courses/${related.slug.current}`}>
                          <span>View Details</span>
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

        <section className="border-t border-border bg-primary/5 py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col md:flex-row md:items-center md:justify-between gap-8 px-4 sm:px-6 md:px-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-wider text-primary">
                Ready to Join DCCP?
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Begin your admission application today.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Start your application online or speak with our admissions advisors for guidance on credit evaluation and scholarships.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-xl px-7">
                <Link href={applyHref}>Start Application</Link>
              </Button>
              {admissionsPhone && (
                <Button asChild size="lg" variant="outline" className="rounded-xl px-6">
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
