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
import { formatCourseDeliveryMode } from "@/lib/sanity/course-formatters"
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
  { label: string }
> = {
  ched: {
    label: "CHED College Degree",
  },
  tesda: {
    label: "TESDA Technical-Vocational",
  },
  shs: {
    label: "Senior High School",
  },
  short: {
    label: "Short Course",
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
    }

  const duration =
    course.duration ?? course.trainingHours ?? "Not listed"
  const isDegree = course.offeringCategory === "ched"
  const studyLoad = isDegree
    ? course.creditHours
      ? `${course.creditHours} Total Units`
      : "Not listed"
    : course.trainingHours ?? "Not listed"

  const applyHref = course.cta?.url || "/apply"
  const applyLabel = course.cta?.label || "Apply for Admission"

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

      <main className="min-h-screen w-full pt-28 pb-20 bg-background text-foreground">
        {/* Minimalist Header */}
        <section className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 pb-12 border-b border-border/60">
          <div className="flex flex-col gap-6 max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/courses" className="hover:text-foreground transition-colors">
                Programs
              </Link>
              <span>/</span>
              <span className="text-foreground truncate">{course.title}</span>
            </div>

            {/* Tag & Title */}
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                {categoryInfo.label}
                {course.credential && ` · ${course.credential}`}
              </span>
              <h1 className="mt-2 font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
                {course.title}
              </h1>
            </div>

            {/* Concise Summary */}
            {course.summary && (
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                {course.summary}
              </p>
            )}

            {isDegree && course.majors && course.majors.length > 0 && (
              <section aria-labelledby="course-majors" className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
                <h2 id="course-majors" className="font-serif text-xl font-semibold text-foreground">
                  {course.majors.length === 1 ? "Program major" : "Choose your major"}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.majors.map((major) => (
                    <li key={major} className="rounded-xl border border-primary/20 bg-background px-4 py-3 text-base font-semibold text-foreground shadow-sm">
                      {major}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="default" className="rounded-full px-6 text-xs font-medium">
                <Link href={applyHref}>{applyLabel}</Link>
              </Button>

              {admissionsEmail && (
                <a
                  href={`mailto:${admissionsEmail}`}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Inquire with Admissions
                </a>
              )}

              {syllabusUrl && (
                <a
                  href={syllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 ml-2"
                >
                  Download Syllabus (PDF)
                </a>
              )}
            </div>
          </div>

          {/* Minimal Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-border/60 text-xs">
            <div>
              <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">
                Duration
              </span>
              <span className="font-medium text-foreground text-sm mt-0.5 block">
                {duration}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">
                Curriculum
              </span>
              <span className="font-medium text-foreground text-sm mt-0.5 block">
                {studyLoad}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">
                Delivery
              </span>
              <span className="font-medium text-foreground text-sm mt-0.5 block">
                {formatCourseDeliveryMode(course.deliveryMode)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">
                Financial Aid
              </span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 block">
                {course.financialAidHighlight
                  ? "See details below"
                  : course.scholarshipsAvailable
                    ? "Available"
                    : "Inquire"}
              </span>
            </div>
          </div>
        </section>

        {/* Minimalist Main Content */}
        <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 py-12 flex flex-col gap-16 max-w-4xl">
          {/* Overview Section */}
          {((course.overview && course.overview.length > 0) || (course.highlights && course.highlights.length > 0)) && (
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Overview
              </h2>
              {course.overview && course.overview.length > 0 && (
                <div className="prose prose-neutral max-w-none text-muted-foreground font-light">
                  <PortableText value={course.overview} />
                </div>
              )}

              {/* Core Highlights - Minimalist List */}
              {course.highlights && course.highlights.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/80">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">·</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Curriculum Roadmap - Minimal List */}
          {course.curriculumStructure && course.curriculumStructure.length > 0 && (
            <section className="flex flex-col gap-6 pt-8 border-t border-border/60">
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Curriculum Progression
              </h2>
              <div className="divide-y divide-border/40">
                {course.curriculumStructure.map((stage, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-sm">
                    <div className="sm:w-1/3">
                      <span className="font-mono text-xs text-muted-foreground mr-2">0{idx + 1}.</span>
                      <span className="font-medium text-foreground">{stage.term || `Term ${idx + 1}`}</span>
                    </div>
                    <div className="sm:w-2/3 text-xs text-muted-foreground">
                      {stage.description && (
                        <p className="leading-relaxed">{stage.description}</p>
                      )}
                      {stage.subjects && stage.subjects.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {stage.subjects.map((sub, sIdx) => (
                            <span key={sIdx} className="bg-muted px-2 py-0.5 rounded text-foreground/80">
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Career Pathways */}
          {allCareerRoles.length > 0 && (
            <section className="flex flex-col gap-4 pt-8 border-t border-border/60">
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Career Pathways
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {allCareerRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="border border-border/80 px-3 py-1 rounded-full text-foreground/80"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Tuition & Financial Aid */}
          {(course.tuition || course.financialAidHighlight) && (
            <section className="flex flex-col gap-4 pt-8 border-t border-border/60">
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Tuition & Financial Aid
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted-foreground">
                {course.tuition && (
                  <div>
                    <span className="font-medium text-foreground uppercase tracking-wider block mb-1">
                      Estimated Tuition
                    </span>
                    <p className="leading-relaxed">{course.tuition}</p>
                  </div>
                )}
                {course.financialAidHighlight && (
                  <div>
                    <span className="font-medium text-foreground uppercase tracking-wider block mb-1">
                      Scholarships & Grants
                    </span>
                    <p className="leading-relaxed">{course.financialAidHighlight}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Minimalist Enrollment Checklist */}
          {course.admissionsRequirements && course.admissionsRequirements.length > 0 && (
            <section className="flex flex-col gap-4 pt-8 border-t border-border/60">
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Admissions Requirements
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground list-none">
                {course.admissionsRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-muted-foreground/60">{idx + 1}.</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Simple Bottom CTA */}
          <section className="pt-10 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl text-foreground">Ready to begin?</h3>
              <p className="text-xs text-muted-foreground">
                Contact admissions for current intake dates and requirements.
              </p>
            </div>
            <Button asChild size="default" className="rounded-full px-6 text-xs font-medium shrink-0">
              <Link href={applyHref}>{applyLabel}</Link>
            </Button>
          </section>
        </div>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}
