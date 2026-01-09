import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import { ApplyButton } from "@/components/ui/apply-button"
import Link from "next/link"

export const metadata: Metadata = {
    title: "BS Hotel and Restaurant Management",
    description: "Bachelor of Science in Hotel and Restaurant Management at Data Center College.",
}

export default async function BSHRMPage() {
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

            <main className="w-full flex flex-col items-center pt-24 pb-0 min-h-screen">
                {/* Hero Section */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36 flex justify-center bg-gradient-to-b from-transparent to-primary/5">
                    <div className="w-full max-w-[900px] flex flex-col gap-8 text-center items-center">
                        <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border">
                            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
                            </div>
                            <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans tracking-wide uppercase">
                                College of Hospitality
                            </div>
                        </div>
                        <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Bachelor of Science in</span>
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic">Hotel & Restaurant Management</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
                            World-class hospitality. Train in top-tier facilities and gain international experience in the hospitality and tourism industry.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <ApplyButton size="default">Apply Now</ApplyButton>
                            <Link href="/courses" className="px-6 py-2 rounded-full border border-border hover:bg-muted/50 transition-colors font-medium">View Curriculum</Link>
                        </div>
                    </div>
                </section>

                {/* Career Opportunities */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
                    <div className="w-full max-w-[1000px] flex flex-col gap-12">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Industry Careers</h2>
                            <p className="text-muted-foreground">Prepare for exciting careers in:</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {["Hotel Management", "Event Planning", "Culinary Arts", "Travel & Tourism", "Resort Operations", "Cruise Line Services", "Food & Beverage", "Airline Operations"].map((job) => (
                                <div key={job} className="p-6 bg-card border border-border rounded-lg text-center hover:shadow-sm transition-shadow">
                                    <span className="font-semibold text-foreground">{job}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection settings={siteSettings} />
        </>
    )
}
