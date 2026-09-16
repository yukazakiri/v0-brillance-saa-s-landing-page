import type { Metadata } from "next"

import AcademicCalendarSummary from "@/components/academics/academic-calendar-summary"
import AcademicOfferings from "@/components/academics/academic-offerings"
import AcademicsAdmissionsBanner from "@/components/academics/academics-admissions-banner"
import AcademicsHero from "@/components/academics/academics-hero"
import ParentStudentGuide from "@/components/academics/parent-student-guide"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import { fetchCourses, fetchSettings } from "@/lib/sanity/queries"
import type { Course, Settings } from "@/lib/sanity/types"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Academics | Data Center College of The Philippines",
  description:
    "Explore CHED-recognized college degrees, DepEd-approved Senior High School strands, and TESDA accredited skills training in Baguio City. Industry-oriented education designed for students and trusted by parents.",
}

export default async function AcademicsPage() {
  let settings: Settings | null = null
  let courses: Course[] = []

  try {
    const [fetchedSettings, fetchedCourses] = await Promise.all([
      fetchSettings(),
      fetchCourses(),
    ])
    settings = fetchedSettings
    courses = fetchedCourses
  } catch (error) {
    console.error("Error fetching academic data:", error)
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  }

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="w-full flex flex-col items-center pt-24 pb-0 min-h-screen">
        {/* Minimalist Hero */}
        <AcademicsHero />

        {/* Academic Offerings Directory (Shadcn Tabs, Card, Badge, Input) */}
        <AcademicOfferings sanityCourses={courses} />

        {/* Dual Perspective Guide (Students & Parents) + FAQs (Shadcn Accordion) */}
        <ParentStudentGuide />

        {/* Academic Calendar & 4-Step Enrollment */}
        <AcademicCalendarSummary />

        {/* Admissions Consultation Banner */}
        <AcademicsAdmissionsBanner settings={siteSettings} />
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}
