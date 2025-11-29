import type React from "react"
import Link from "next/link"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"

// Badge component matching other sections
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans tracking-wide uppercase">
        {text}
      </div>
    </div>
  )
}

export default async function AboutPage() {
  const settings = await fetchSettings()

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  }

  const milestones = [
    { year: "1998", title: "Foundation", description: "Established with 50 students and a vision for excellence." },
    { year: "2005", title: "Expansion", description: "Opened Downtown Campus with TESDA-certified programs." },
    { year: "2012", title: "Recognition", description: "Achieved CHED recognition for IT and Business programs." },
    {
      year: "2018",
      title: "Digital Era",
      description: "Launched state-of-the-art computer labs and digital resources.",
    },
    {
      year: "2024",
      title: "Today",
      description: "Leading institution with 2,000+ students and industry partnerships.",
    },
  ]

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="w-full flex flex-col items-center pt-24 pb-0 min-h-screen">
        {/* Hero Section - Typography Focused */}
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36 flex justify-center">
          <div className="w-full max-w-[900px] flex flex-col gap-8">
            <Badge
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="6" cy="6" r="2" fill="currentColor" />
                </svg>
              }
              text="Est. 1998"
            />
            <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">Data Center</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">College of the</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal italic">Philippines</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
              Building futures through quality education in technology, business, and professional development for over
              25 years.
            </p>
          </div>
        </section>

        {/* Stats Section - Large Numbers */}
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-16 sm:py-20 flex justify-center">
          <div className="w-full max-w-[1000px] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { number: "25+", label: "Years" },
              { number: "2K+", label: "Students" },
              { number: "50+", label: "Faculty" },
              { number: "95%", label: "Employed" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="text-foreground text-6xl sm:text-7xl md:text-8xl font-serif font-bold leading-none tracking-tighter">
                  {stat.number}
                </span>
                <span className="text-muted-foreground text-sm font-sans font-medium uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Section - NEW */}
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col md:flex-row gap-12 md:gap-16">
            {/* Founder Image */}
            <div className="flex-shrink-0 w-full md:w-[320px]">
              <div className="aspect-[3/4] w-full border border-border rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=480&width=360"
                  alt="Dr. Jose M. Santos - Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Founder Info */}
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-xs font-sans font-semibold uppercase tracking-[0.25em]">
                  The Founder
                </span>
                <h2 className="text-foreground text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight">
                  Dr. Jose M. Santos
                </h2>
                <span className="text-muted-foreground text-base sm:text-lg font-sans mt-1">
                  Visionary Educator & Entrepreneur
                </span>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-foreground text-lg sm:text-xl md:text-2xl font-serif leading-snug">
                  "Education is not just about acquiring knowledge—it is about transforming lives and building a nation,
                  one student at a time."
                </p>
                <div className="flex flex-col gap-4 text-muted-foreground text-base leading-relaxed font-sans">
                  <p>
                    Dr. Jose M. Santos founded Data Center College of the Philippines in 1998 with a bold vision: to
                    create an institution that would bridge the gap between traditional education and the rapidly
                    evolving demands of the technology industry.
                  </p>
                  <p>
                    With over three decades of experience in education and a deep commitment to student success, Dr.
                    Santos built DCCPH from a small computer training center into one of Baguio City's most respected
                    educational institutions. His philosophy of accessible, industry-relevant education continues to
                    guide the college today.
                  </p>
                </div>
              </div>

              {/* Founder Achievements */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-border mt-2">
                <div className="flex flex-col gap-0">
                  <span className="text-foreground text-2xl sm:text-3xl font-serif font-bold">PhD</span>
                  <span className="text-muted-foreground text-xs font-sans uppercase tracking-wider">Education</span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-foreground text-2xl sm:text-3xl font-serif font-bold">30+</span>
                  <span className="text-muted-foreground text-xs font-sans uppercase tracking-wider">
                    Years in Education
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-foreground text-2xl sm:text-3xl font-serif font-bold">15K+</span>
                  <span className="text-muted-foreground text-xs font-sans uppercase tracking-wider">Alumni</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Typography Focused */}
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col gap-16 md:gap-20">
            {/* Mission */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-16">
              <div className="flex-shrink-0 w-full md:w-[200px]">
                <span className="text-muted-foreground text-xs font-sans font-semibold uppercase tracking-[0.25em]">
                  Our Mission
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground text-2xl sm:text-3xl md:text-4xl font-serif leading-snug tracking-tight">
                  To provide innovative, accessible, and industry-relevant education that prepares students for
                  successful careers while fostering critical thinking, creativity, and ethical leadership.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-16">
              <div className="flex-shrink-0 w-full md:w-[200px]">
                <span className="text-muted-foreground text-xs font-sans font-semibold uppercase tracking-[0.25em]">
                  Our Vision
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground text-2xl sm:text-3xl md:text-4xl font-serif leading-snug tracking-tight">
                  To be the leading educational institution in the Philippines for technology and business—recognized
                  for producing graduates who are skilled, ethical, and ready to make meaningful contributions to
                  society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - Minimal Cards */}
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs font-sans font-semibold uppercase tracking-[0.25em]">
                What We Believe
              </span>
              <h2 className="text-foreground text-4xl sm:text-5xl font-serif font-bold tracking-tight">Core Values</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-px border border-border rounded-lg overflow-hidden">
              {[
                {
                  title: "Excellence",
                  desc: "Committed to the highest quality education and fostering academic achievement.",
                },
                {
                  title: "Innovation",
                  desc: "Embracing technology and modern methodologies to prepare students for the future.",
                },
                {
                  title: "Community",
                  desc: "Building a supportive environment where everyone thrives together as one family.",
                },
                {
                  title: "Integrity",
                  desc: "Upholding ethical standards and fostering responsible leadership in all endeavors.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="p-8 md:p-10 flex flex-col gap-4 border-b border-r border-border last:border-b-0 sm:last:border-b sm:[&:nth-last-child(2)]:border-b-0 sm:odd:border-r sm:even:border-r-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-foreground text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
                      {value.title}
                    </h3>
                    <span className="text-muted-foreground/20 text-5xl font-serif font-bold leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline - Horizontal on Desktop */}
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs font-sans font-semibold uppercase tracking-[0.25em]">
                Our Journey
              </span>
              <h2 className="text-foreground text-4xl sm:text-5xl font-serif font-bold tracking-tight">Milestones</h2>
            </div>

            <div className="flex flex-col gap-0">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 md:gap-10 py-6 border-t border-border group">
                  <span className="flex-shrink-0 w-24 text-foreground text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-none tracking-tighter">
                    {milestone.year}
                  </span>
                  <div className="flex flex-col gap-1 pt-1">
                    <h3 className="text-foreground text-lg sm:text-xl font-serif font-semibold">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
          <div className="w-full max-w-[700px] flex flex-col items-center gap-8 text-center">
            <h2 className="text-foreground text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight text-balance">
              Begin Your Journey With Us
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-sans max-w-[500px]">
              Join thousands of successful graduates who have built their careers at Data Center College.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/courses"
                className="px-8 py-4 bg-foreground text-background text-base font-semibold font-sans rounded-full hover:shadow-[0px_8px_24px_rgba(55,50,47,0.2)] transition-all duration-300 active:scale-95"
              >
                Explore Programs
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-4 border border-border text-foreground text-base font-semibold font-sans rounded-full hover:bg-muted/50 transition-all duration-300 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  )
}
