import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import { ApplyButton } from "@/components/ui/apply-button"
import Link from "next/link"

export const metadata: Metadata = {
    title: "BS Business Administration",
    description: "Bachelor of Science in Business Administration at Data Center College.",
}

export default async function BSBAPage() {
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
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans tracking-wide uppercase">
                                College of Business
                            </div>
                        </div>
                        <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Bachelor of Science in</span>
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic">Business Administration</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
                            Lead the way. Develop the leadership skills, financial acumen, and strategic mindset needed to succeed in the corporate world.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <ApplyButton size="default">Apply Now</ApplyButton>
                            <Link href="/courses" className="px-6 py-2 rounded-full border border-border hover:bg-muted/50 transition-colors font-medium">View Curriculum</Link>
                        </div>
                    </div>
                </section>

                {/* Feature Section */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
                    <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold">Majors Offered</h2>
                            <ul className="flex flex-col gap-4">
                                <li className="flex gap-3 items-start">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <div>
                                        <strong className="block text-foreground text-lg">Marketing Management</strong>
                                        <span className="text-muted-foreground">Strategic marketing, consumer behavior, and brand management.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <div>
                                        <strong className="block text-foreground text-lg">Financial Management</strong>
                                        <span className="text-muted-foreground">Corporate finance, investment analysis, and financial planning.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <div>
                                        <strong className="block text-foreground text-lg">Human Resource Management</strong>
                                        <span className="text-muted-foreground">Talent acquisition, organizational development, and employee relations.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-muted/50 rounded-xl aspect-square flex items-center justify-center border border-border">
                            <span className="text-muted-foreground italic">Business Image Placeholder</span>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection settings={siteSettings} />
        </>
    )
}
