import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import { buildImageUrl } from "@/lib/sanity/image"
import type { Settings } from "@/lib/sanity/types"
import ProgramsPageContent from "@/components/programs-page-content"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()
  
  const title = "Academic Programs"
  const description = "Explore our comprehensive academic offerings designed to prepare you for success in your chosen career path."
  const ogImage = buildImageUrl(settings?.defaultSeo?.shareImage) || "/hero-images/maincampus.png"

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${settings?.shortTitle || "DCCP"}`,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${settings?.shortTitle || "DCCP"}`,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function ProgramsPage() {
  const settings = await fetchSettings()

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline: "Empowering the next generation",
  }

  return <ProgramsPageContent settings={siteSettings} />
}
