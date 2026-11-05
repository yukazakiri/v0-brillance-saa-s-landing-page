import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Home, Sparkles } from "lucide-react"

import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import ContactSection from "@/components/contact-section"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()
  const siteTitle = settings?.shortTitle || "DCCP Baguio"

  return {
    title: `Contact Us | ${siteTitle}`,
    description:
      "Get in touch with Data Center College of The Philippines. Reach out for admissions, degree program inquiries, scholarships, and campus visits.",
  }
}

export default async function ContactPage() {
  const settings = await fetchSettings()

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  }

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="w-full pt-28 sm:pt-32 min-h-screen">
        {/* Breadcrumb banner */}
        <div className="w-full border-b border-border bg-card/40 py-3 px-4 sm:px-8">
          <div className="mx-auto max-w-[1240px] flex items-center gap-2 text-xs text-muted-foreground font-sans">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-foreground font-medium">Contact Us</span>
          </div>
        </div>

        {/* Contact Section */}
        <ContactSection settings={siteSettings} className="border-b-0" />
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}
