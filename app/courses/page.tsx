import type { Metadata } from "next"

import { fetchCourses, fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import CourseCatalog from "@/components/course-catalog"
import FooterSection from "@/components/footer-section"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Academic Courses & Programs | Data Center College",
  description: "Browse accredited college degrees, TESDA technical-vocational courses, and skills certifications in Baguio City.",
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

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="min-h-screen w-full pt-24 bg-background">
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto w-full max-w-[1240px] px-4 py-14 sm:px-6 sm:py-20 md:px-8">
            <div className="max-w-[900px]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
                Academic Programs · DCCP Baguio City
              </span>
              <h1 className="text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Choose your direction. Build what comes next.
              </h1>
              <p className="mt-6 max-w-[65ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore our government-accredited college degree tracks and TESDA technical-vocational credentials designed for regional impact and direct industry employment.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="program-directory-heading" className="w-full">
          <div className="mx-auto w-full max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 md:px-8">
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
