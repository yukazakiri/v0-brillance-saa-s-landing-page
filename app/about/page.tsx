"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"

// Badge component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const milestones = [
    {
      year: "1998",
      title: "Foundation",
      description: "Data Center College of the Philippines was established in Baguio City, beginning with just 50 students and 5 faculty members.",
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
      description: "Established as a leading institution with over 2,000 students and partnerships with major tech companies.",
    },
  ]

  const stats = [
    { number: "25+", label: "Years of Excellence" },
    { number: "2,000+", label: "Active Students" },
    { number: "50+", label: "Expert Faculty" },
    { number: "95%", label: "Employment Rate" },
  ]

  return (
    <div className="w-full min-h-screen relative bg-background overflow-x-hidden flex flex-col justify-start items-center">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ease-out backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[900px] lg:w-[900px] relative flex flex-col justify-start items-start min-h-screen">
          {/* Left vertical line */}
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-border/50 shadow-[1px_0px_0px_hsl(var(--background))] z-0"></div>

          {/* Right vertical line */}
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-border/50 shadow-[1px_0px_0px_hsl(var(--background))] z-0"></div>

          {/* Navigation */}
          <div className="self-stretch pt-[9px] overflow-visible border-b border-border flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            <div className="w-full flex flex-col justify-center items-center z-20 px-4 sm:px-6 md:px-8 lg:px-0 py-3 sm:py-4 md:py-0 relative">
              <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] py-2 sm:py-3 md:py-3 px-3 sm:px-5 md:px-5 bg-card shadow-[0px_2px_8px_rgba(55,50,47,0.08)] overflow-visible rounded-full flex justify-between items-center relative z-30 transition-all duration-300 ease-out border border-border">
                {/* Logo Section */}
                <Link href="/" className="flex justify-center items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <span className="text-primary-foreground text-xs sm:text-sm md:text-base font-bold">DC</span>
                  </div>
                  <div className="hidden sm:flex flex-col justify-center transition-opacity duration-300">
                    <div className="text-foreground text-xs sm:text-sm md:text-base font-bold leading-4 font-sans">
                      DCCPH
                    </div>
                    <div className="text-muted-foreground text-[10px] sm:text-[11px] md:text-xs leading-2 font-sans">
                      Baguio City
                    </div>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-start items-center gap-6 lg:gap-8 flex-1 ml-6 lg:ml-8">
                  <Link
                    href="/programs"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Programs
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                  <Link
                    href="/about"
                    className="text-foreground text-sm font-semibold hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    About
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/90"></span>
                  </Link>
                  <Link
                    href="/#campuses"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Campuses
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                  <Link
                    href="/#contact"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden flex flex-col justify-center items-center gap-1.5 ml-auto p-2.5 hover:bg-muted rounded-lg transition-all duration-300 ease-out active:scale-95"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <div
                    className={`w-6 h-0.5 bg-foreground transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></div>
                  <div
                    className={`w-6 h-0.5 bg-foreground transition-all duration-300 ease-out ${
                      mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  ></div>
                  <div
                    className={`w-6 h-0.5 bg-foreground transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></div>
                </button>

                {/* Apply Now Button */}
                <div className="hidden md:flex h-8 md:h-9 ml-4 md:ml-6">
                  <div className="px-4 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-[0px_2px_8px_rgba(55,50,47,0.3)] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:shadow-[0px_4px_12px_rgba(55,50,47,0.4)] hover:scale-105 transition-all duration-300 ease-out active:scale-95">
                    <div className="flex flex-col justify-center text-primary-foreground text-xs sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                      Apply Now
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer */}
              <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-out ${
                  mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                />

                <div
                  className={`fixed top-0 right-0 h-screen w-64 sm:w-80 bg-card shadow-[0px_4px_24px_rgba(55,50,47,0.16)] z-50 flex flex-col transition-all duration-300 ease-out transform ${
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-primary-foreground text-sm font-bold">DC</span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-foreground text-base font-bold leading-5 font-sans">DCCPH</div>
                        <div className="text-muted-foreground text-xs leading-3 font-sans">Baguio City</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 hover:bg-muted rounded-lg transition-all duration-200 ease-out active:scale-95"
                      aria-label="Close menu"
                    >
                      <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
                    <Link
                      href="/programs"
                      className="block px-4 py-3 text-lg font-semibold text-foreground hover:bg-muted/80 transition-all duration-200 ease-out rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Programs
                    </Link>
                    <Link
                      href="/about"
                      className="block px-4 py-3 text-lg font-semibold text-primary bg-primary/10 transition-all duration-200 ease-out rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/#campuses"
                      className="block px-4 py-3 text-lg font-semibold text-foreground hover:bg-muted/80 transition-all duration-200 ease-out rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Campuses
                    </Link>
                    <Link
                      href="/#faculty"
                      className="block px-4 py-3 text-lg font-semibold text-foreground hover:bg-muted/80 transition-all duration-200 ease-out rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Faculty & Staff
                    </Link>
                    <Link
                      href="/#contact"
                      className="block px-4 py-3 text-lg font-semibold text-foreground hover:bg-muted/80 transition-all duration-200 ease-out rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>

                  <div className="border-t border-border px-5 sm:px-6 py-5 sm:py-6 space-y-3">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full px-4 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-lg font-semibold rounded-lg hover:shadow-[0px_4px_12px_rgba(55,50,47,0.3)] active:scale-95 transition-all duration-300 ease-out"
                    >
                      Apply Now
                    </button>
                    <p className="text-center text-sm text-muted-foreground font-medium">Start your journey today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="w-full border-b border-border py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 flex flex-col items-center gap-8">
            <div className="w-full max-w-[700px] flex flex-col items-center gap-6 text-center">
              <Badge
                icon={
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                  </svg>
                }
                text="About DCCPH"
              />
              <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-serif">
                Building Futures Through
                <br />
                Excellence in Education
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed font-sans max-w-[600px]">
                For over 25 years, Data Center College of the Philippines has been at the forefront of providing quality education in technology, business, and professional development.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="w-full border-b border-border py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-[800px] mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-2 text-center">
                  <div className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold font-sans">{stat.number}</div>
                  <div className="text-muted-foreground text-sm sm:text-base font-medium font-sans">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision - Split Layout */}
          <div className="w-full border-b border-border py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
            <div className="max-w-[800px] mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {/* Mission */}
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                  <h2 className="text-foreground text-2xl sm:text-3xl font-semibold font-serif">Our Mission</h2>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    To provide innovative, accessible, and industry-relevant education that prepares students for successful careers in technology, business, and professional services. We are committed to fostering critical thinking, creativity, and ethical leadership.
                  </p>
                </div>

                {/* Vision */}
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                  <h2 className="text-foreground text-2xl sm:text-3xl font-semibold font-serif">Our Vision</h2>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    To be the leading educational institution in the Philippines, recognized for producing graduates who are skilled, ethical, and ready to make meaningful contributions to society and the global economy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="w-full border-b border-border py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
            <div className="max-w-[700px] mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-semibold font-serif mb-4">
                  Our Journey
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg font-sans">
                  From humble beginnings to becoming a leading institution
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border"></div>

                {/* Timeline items */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex gap-6">
                      {/* Year dot */}
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <div className="w-3 h-3 rounded-full bg-primary-foreground"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-3">
                          {milestone.year}
                        </div>
                        <h3 className="text-foreground text-xl sm:text-2xl font-semibold font-sans mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed font-sans">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="w-full border-b border-border py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-semibold font-serif mb-4">
                  Our Core Values
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg font-sans">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 border border-border rounded-2xl hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-foreground text-xl font-semibold font-sans mb-3">Excellence</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    Committed to delivering the highest quality education and fostering academic achievement in every student.
                  </p>
                </div>

                <div className="p-8 border border-border rounded-2xl hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-foreground text-xl font-semibold font-sans mb-3">Innovation</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    Embracing cutting-edge technology and modern teaching methodologies to prepare students for the future.
                  </p>
                </div>

                <div className="p-8 border border-border rounded-2xl hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-foreground text-xl font-semibold font-sans mb-3">Community</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    Building a supportive environment where students, faculty, and staff thrive together as one family.
                  </p>
                </div>

                <div className="p-8 border border-border rounded-2xl hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-foreground text-xl font-semibold font-sans mb-3">Integrity</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-sans">
                    Upholding ethical standards and fostering responsible leadership in all our endeavors and interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
            <div className="max-w-[700px] mx-auto text-center">
              <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-semibold font-serif mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-sans mb-8">
                Join thousands of successful graduates who have built their careers at Data Center College of the Philippines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/programs" className="px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-base font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out active:scale-95">
                  Explore Programs
                </Link>
                <Link href="/#contact" className="px-8 py-4 border-2 border-border text-foreground text-base font-semibold rounded-full hover:bg-muted hover:scale-105 transition-all duration-300 ease-out active:scale-95">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
