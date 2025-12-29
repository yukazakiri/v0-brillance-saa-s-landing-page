import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import ApplyInterstitial from "@/components/apply-interstitial"

export const metadata: Metadata = {
  title: "Apply Now | Data Center College",
  description: "Start your enrollment process at Data Center College of The Philippines.",
}

export default async function ApplyPage() {
  const settings = await fetchSettings()
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines",
    shortTitle: "Data Center College",
  }

  return (
    <>
      <CollegeHeader settings={siteSettings} />
      
      <main className="w-full flex flex-col items-center pt-32 pb-20 min-h-screen px-4">
        <ApplyInterstitial />
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}
