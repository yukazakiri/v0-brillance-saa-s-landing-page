import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Academics",
    description: "Explore our academic programs and departments.",
}

export default async function AcademicsPage() {
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
                                World-Class Education
                            </div>
                        </div>
                        <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
                            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">Academics</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
                            Relevant, practical, and industry-oriented programs designed to prepare you for the real world.
                        </p>
                    </div>
                </section>

                {/* Programs Teaser */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
                    <div className="w-full max-w-[1000px] flex flex-col gap-12 text-center items-center">
                        <h2 className="text-foreground text-3xl sm:text-4xl font-serif font-bold">Our Offerings</h2>
                        <div className="grid md:grid-cols-3 gap-8 w-full text-left">
                            <div className="flex flex-col gap-4 p-8 border border-border rounded-lg">
                                <h3 className="text-xl font-bold font-serif">Undergraduate Programs</h3>
                                <p className="text-muted-foreground">Bachelor's degrees in IT, Business Administration, Hospitality Management, and Tourism.</p>
                                <Link href="/courses" className="text-foreground font-medium underline underline-offset-4 decoration-border mt-auto">View Courses</Link>
                            </div>
                            <div className="flex flex-col gap-4 p-8 border border-border rounded-lg">
                                <h3 className="text-xl font-bold font-serif">Senior High School</h3>
                                <p className="text-muted-foreground">Academic Track (ABM, HUMSS, GAS) and TVL Track (ICT, HE).</p>
                                <Link href="/courses" className="text-foreground font-medium underline underline-offset-4 decoration-border mt-auto">Learn More</Link>
                            </div>
                            <div className="flex flex-col gap-4 p-8 border border-border rounded-lg">
                                <h3 className="text-xl font-bold font-serif">Short Courses</h3>
                                <p className="text-muted-foreground">Specialized training modules for skills enhancement and professional development.</p>
                                <Link href="/courses" className="text-foreground font-medium underline underline-offset-4 decoration-border mt-auto">Explore</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection settings={siteSettings} />
        </>
    )
}
