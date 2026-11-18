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
    "Browse CHED degrees, senior high tracks, TESDA qualifications, and short courses at Data Center College of The Philippines Baguio City.",
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

      <main className="min-h-screen w-full pt-28 pb-20 bg-background text-foreground">
        {/* ================================================================= */}
        {/* MINIMALIST HERO                                                   */}
        {/* ================================================================= */}
        <section className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 pt-8 pb-12 sm:pb-16 border-b border-border/60">
          <div className="max-w-3xl flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Academic Prospectus · DCCP Baguio City
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.08]">
              Disciplines & Programs.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-light max-w-xl leading-relaxed">
              College degrees, senior high tracks, TESDA qualifications, and short courses.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* MINIMALIST CATALOG DIRECTORY                                      */}
        {/* ================================================================= */}
        <section id="curriculum-index" aria-labelledby="program-directory-heading" className="w-full">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 py-10 sm:py-16">
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

