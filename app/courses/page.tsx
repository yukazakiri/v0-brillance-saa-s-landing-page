import type { Metadata } from "next"

import { fetchCourses, fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import CourseMagazine from "@/components/course-magazine"
import FooterSection from "@/components/footer-section"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Academic Programs",
  description: "Explore our academic programs, college degrees, and technical-vocational courses.",
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

      <main className="min-h-screen w-full pt-24">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
            <div className="max-w-[920px]">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Academic programs
              </p>
              <h1 className="text-balance font-serif text-5xl font-semibold leading-[0.92] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                Choose what comes next.
              </h1>
              <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-start sm:justify-between">
                <p className="max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Explore college degrees and technical training through a clear, focused directory built for thoughtful decisions.
                </p>
                <p className="shrink-0 text-sm font-medium text-foreground">
                  {courses.length} program{courses.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="program-directory-heading" className="w-full">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
            <CourseMagazine
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
