import type { Metadata } from "next"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Alumni",
    description: "Connect with the Data Center College alumni network.",
}

export default async function AlumniPage() {
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
                                Welcome Home
                            </div>
                        </div>
                        <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
                            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">Alumni Network</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
                            Connecting thousands of graduates making a difference worldwide.
                        </p>
                    </div>
                </section>

                {/* Brief Stats */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-16 sm:py-20 flex justify-center">
                    <div className="w-full max-w-[1000px] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
                        {[
                            { number: "15K+", label: "Alumni" },
                            { number: "50+", label: "Years of Legacy" },
                            { number: "Global", label: "Community" },
                        ].map((stat, index) => (
                            <div key={index} className="flex flex-col gap-1 text-center md:text-left">
                                <span className="text-foreground text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-none tracking-tighter">
                                    {stat.number}
                                </span>
                                <span className="text-muted-foreground text-sm font-sans font-medium uppercase tracking-[0.2em]">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
                    <div className="w-full max-w-[700px] flex flex-col items-center gap-8 text-center">
                        <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-[1.1] tracking-tight">
                            Stay Connected
                        </h2>
                        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-sans max-w-[500px]">
                            Update your information, request transcripts, or find out about upcoming alumni events.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/#contact"
                                className="px-8 py-4 bg-foreground text-background text-base font-semibold font-sans rounded-full hover:shadow-[0px_8px_24px_rgba(55,50,47,0.2)] transition-all duration-300 active:scale-95"
                            >
                                Contact Alumni Relations
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection settings={siteSettings} />
        </>
    )
}
