"use client"

import type React from "react"
import Link from "next/link"
import { fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"

// Badge component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-secondary/10 shadow-sm rounded-[90px] flex justify-start items-center gap-[8px] border border-secondary/20">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-center flex justify-center flex-col text-primary text-xs font-bold leading-3 font-sans tracking-wide uppercase">
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
    {
      year: "1998",
      title: "Foundation",
      description:
        "Data Center College of the Philippines was established in Baguio City, beginning with just 50 students and 5 faculty members.",
    },
    {
      year: "2005",
      title: "Expansion",
      description: "Opened our Downtown Campus and introduced TESDA-certified programs to meet industry demands.",
    },
    {
      year: "2012",
      title: "Recognition",
      description: "Achieved CHED recognition for excellence in IT and Business education programs.",
    },
    {
      year: "2018",
      title: "Digital Transformation",
      description: "Launched modern learning facilities with state-of-the-art computer labs and digital resources.",
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description:
        "Established as a leading institution with over 2,000 students and partnerships with major tech companies.",
    },
  ]

  const stats = [
    { number: "25+", label: "Years of Excellence" },
    { number: "2,000+", label: "Active Students" },
    { number: "50+", label: "Expert Faculty" },
    { number: "95%", label: "Employment Rate" },
  ]

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="w-full flex flex-col items-center pt-24 pb-0 bg-background">
        {/* Hero Section */}
        <section className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 flex flex-col items-center gap-8 relative overflow-hidden border-b border-secondary/10">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
          </div>

          <div className="w-full max-w-[900px] flex flex-col items-center gap-8 text-center relative z-10">
            <Badge
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="6" cy="6" r="2" fill="currentColor" />
                </svg>
              }
              text="About DCCPH"
            />
            <h1 className="text-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] font-serif tracking-tighter drop-shadow-sm">
              Building Futures Through
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary italic font-bold">
                Excellence in Education
              </span>
            </h1>
            <p className="text-muted-foreground text-xl sm:text-2xl md:text-3xl leading-relaxed font-sans font-light max-w-[720px]">
              For over 25 years, Data Center College of the Philippines has been at the forefront of providing quality
              education in technology, business, and professional development.
            </p>
          </div>
        </section>

        {/* Stats Section with Gold Accents */}
        <section className="w-full border-b border-secondary/20 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 max-w-[1200px] mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-3 text-center group">
                <div className="text-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif group-hover:scale-105 transition-transform duration-300 drop-shadow-[2px_2px_0_rgba(212,175,55,0.2)]">
                  {stat.number}
                </div>
                <div className="text-secondary text-sm sm:text-base font-bold font-sans uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision - Split Layout with Cards */}
        <section className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 border-b border-secondary/10">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch">
              <div className="flex flex-col gap-8 p-10 bg-card/50 rounded-3xl border border-secondary/20 hover:border-secondary/60 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h2 className="text-primary text-4xl sm:text-5xl font-bold font-serif tracking-tight">Our Mission</h2>
                <p className="text-muted-foreground text-xl leading-relaxed font-sans font-light">
                  To provide innovative, accessible, and industry-relevant education that prepares students for
                  successful careers in technology, business, and professional services. We are committed to fostering
                  critical thinking, creativity, and ethical leadership.
                </p>
              </div>

              <div className="flex flex-col gap-8 p-10 bg-card/50 rounded-3xl border border-secondary/20 hover:border-secondary/60 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-secondary"
                  >
                    <path d="M2 12h20" />
                    <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <h2 className="text-primary text-4xl sm:text-5xl font-bold font-serif tracking-tight">Our Vision</h2>
                <p className="text-muted-foreground text-xl leading-relaxed font-sans font-light">
                  To be the leading educational institution in the Philippines, recognized for producing graduates who
                  are skilled, ethical, and ready to make meaningful contributions to society and the global economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 border-b border-secondary/10">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-20 md:mb-24">
              <span className="text-secondary text-base font-bold uppercase tracking-[0.2em] mb-4 block">
                Our History
              </span>
              <h2 className="text-primary text-5xl sm:text-6xl md:text-7xl font-bold font-serif mb-6 tracking-tight">
                A Legacy of Excellence
              </h2>
              <p className="text-muted-foreground text-xl sm:text-2xl font-sans font-light max-w-3xl mx-auto">
                From humble beginnings to becoming a leading institution in Baguio City.
              </p>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/50 via-primary/20 to-transparent"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex gap-8 group">
                    <div className="relative flex-shrink-0 z-10">
                      <div className="w-10 h-10 rounded-full bg-background border-2 border-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:bg-secondary group-hover:border-primary">
                        <div className="w-3 h-3 rounded-full bg-primary group-hover:bg-primary-foreground transition-colors duration-300"></div>
                      </div>
                    </div>

                    <div className="flex-1 pb-10 border-b border-border/50 group-last:border-0 pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-3">
                        <span className="text-secondary text-2xl sm:text-3xl font-bold font-serif">
                          {milestone.year}
                        </span>
                        <h3 className="text-primary text-2xl sm:text-3xl font-bold font-serif">{milestone.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-sans">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 border-b border-secondary/10 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-[0.03] pattern-dots pointer-events-none"></div>

          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif mb-6 tracking-tight">
                Our Core Values
              </h2>
              <p className="text-muted-foreground text-xl sm:text-2xl font-sans font-light max-w-3xl mx-auto">
                The principles that guide every aspect of our academic community
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  icon: "🎯",
                  title: "Excellence",
                  description:
                    "Committed to delivering the highest quality education and fostering academic achievement in every student.",
                },
                {
                  icon: "💡",
                  title: "Innovation",
                  description:
                    "Embracing cutting-edge technology and modern teaching methodologies to prepare students for the future.",
                },
                {
                  icon: "🤝",
                  title: "Community",
                  description:
                    "Building a supportive environment where students, faculty, and staff thrive together as one family.",
                },
                {
                  icon: "⭐",
                  title: "Integrity",
                  description:
                    "Upholding ethical standards and fostering responsible leadership in all our endeavors and interactions.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="p-8 md:p-10 border border-secondary/20 bg-background rounded-2xl hover:border-secondary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-primary text-2xl sm:text-3xl font-bold font-serif mb-4">{value.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-sans">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Message (New Section) */}
        <section className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
          <div className="max-w-[1000px] mx-auto bg-secondary/5 rounded-[3rem] p-10 md:p-16 border border-secondary/20 relative">
            <div className="absolute -top-10 -left-4 md:-left-10 text-[10rem] md:text-[12rem] text-secondary/10 font-serif leading-none select-none">
              "
            </div>
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center relative z-10">
              {/* Placeholder for President Image */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-background border-4 border-secondary/30 shadow-2xl flex-shrink-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary font-serif font-bold text-5xl group-hover:scale-105 transition-transform duration-500">
                  JP
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-primary text-3xl sm:text-4xl font-bold font-serif mb-6">
                  A Message from the President
                </h2>
                <p className="text-primary/80 text-xl sm:text-2xl leading-relaxed font-serif italic mb-8">
                  "At Data Center College, we believe that education is the key to unlocking human potential. We are
                  dedicated to providing an environment where students can discover their passions, develop their
                  skills, and prepare for a future of meaningful contribution."
                </p>
                <div>
                  <div className="text-primary font-bold text-2xl font-serif">Juan dela Cruz, PhD</div>
                  <div className="text-secondary font-bold text-sm uppercase tracking-[0.15em] mt-1">
                    College President
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 border-t border-secondary/20">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-sans mb-10">
              Join thousands of successful graduates who have built their careers at Data Center College of the
              Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="px-10 py-5 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:shadow-xl hover:bg-primary/90 transition-all duration-300 ease-out active:scale-95"
              >
                Explore Programs
              </Link>
              <Link
                href="/#contact"
                className="px-10 py-5 bg-transparent border-2 border-primary text-primary text-lg font-bold rounded-full hover:bg-primary/5 transition-all duration-300 ease-out active:scale-95"
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
