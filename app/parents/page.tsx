import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Parents",
    description: "Information and resources for parents of Data Center College students.",
}

export default async function ParentsPage() {
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
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36 flex justify-center">
                    <div className="w-full max-w-[900px] flex flex-col gap-8 text-center items-center">
                        <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border">
                            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans tracking-wide uppercase">
                                Family & Community
                            </div>
                        </div>
                        <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
                            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">For Parents</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
                            Partnering with you to support your child's academic journey and success.
                        </p>
                    </div>
                </section>

                {/* Resources Grid */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
                    <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-12">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground text-2xl font-serif font-bold">Important Dates</h3>
                            <p className="text-muted-foreground font-sans">Keep up with the academic calendar, enrollment periods, and holidays.</p>
                            <Link href="/news" className="text-foreground font-semibold hover:underline mt-2">View Calendar &rarr;</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground text-2xl font-serif font-bold">Tuition & Payments</h3>
                            <p className="text-muted-foreground font-sans">Payment schedules, scholarships, and financial aid information.</p>
                            <Link href="/portal" className="text-foreground font-semibold hover:underline mt-2">Access Portal &rarr;</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground text-2xl font-serif font-bold">Student Safety</h3>
                            <p className="text-muted-foreground font-sans">Our commitment to providing a safe, secure, and conducive learning environment.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-foreground text-2xl font-serif font-bold">Stay Informed</h3>
                            <p className="text-muted-foreground font-sans">subscribe to our newsletter or follow our announcements.</p>
                            <Link href="/news" className="text-foreground font-semibold hover:underline mt-2">Read News &rarr;</Link>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection settings={siteSettings} />
        </>
    )
}
