import NewsPageContent from "@/components/news-page-content"
import { fetchAllPosts, fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"

export default async function NewsPage() {
  let articles = []
  let settings = null

  try {
    ;[articles, settings] = await Promise.all([fetchAllPosts(), fetchSettings()])
  } catch (error) {
    console.error("Error fetching Sanity data:", error)
    // Continue with empty data if Sanity is unavailable
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline: "Empowering the next generation of IT professionals, business leaders, and innovators",
  }

  return <NewsPageContent articles={articles} settings={siteSettings} />
}
