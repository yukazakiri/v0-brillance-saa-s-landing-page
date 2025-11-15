"use client"

import type React from "react"
import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import FooterSection from "../components/footer-section"
import AboutUsSection from "../components/about-us-section"
import CoursesAndProgramsSection from "../components/courses-programs-section"
import FacultyStaffSection from "../components/faculty-staff-section"
import AdmissionsContactSection from "../components/admissions-contact-section"

// Reusable Badge Component
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

export default function LandingPage() {
  const [activeCard, setActiveCard] = useState(0)
  const [progress, setProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % 3)
          }
          return 0
        }
        return prev + 2 // 2% every 100ms = 5 seconds total
      })
    }, 100)

    return () => {
      clearInterval(progressInterval)
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return
    setActiveCard(index)
    setProgress(0)
  }

  const getDashboardContent = () => {
    switch (activeCard) {
      case 0:
        return <div className="text-muted-foreground text-sm">Customer Subscription Status and Details</div>
      case 1:
        return <div className="text-muted-foreground text-sm">Analytics Dashboard - Real-time Insights</div>
      case 2:
        return <div className="text-muted-foreground text-sm">Data Visualization - Charts and Metrics</div>
      default:
        return <div className="text-muted-foreground text-sm">Customer Subscription Status and Details</div>
    }
  }

  return (
    <div className="w-full min-h-screen relative bg-background overflow-x-hidden flex flex-col justify-start items-center">
      {/* Mobile Menu Backdrop - only blur the background */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer - clean, sharp, no blur */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-card z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <span className="text-primary-foreground text-sm font-bold">DC</span>
            </div>
            <div className="flex flex-col">
              <div className="text-foreground text-base font-bold font-sans">DCCPH</div>
              <div className="text-muted-foreground text-xs font-sans">Baguio City</div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link
            href="/programs"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Programs
          </Link>
          <Link
            href="/about"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/news"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            News
          </Link>
          <a
            href="#faculty"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Faculty & Staff
          </a>
          <a
            href="#contact"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </nav>

        {/* Apply Now CTA - Fixed at bottom */}
        <div className="border-t border-border px-6 py-5 bg-muted/30">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-full px-5 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-base font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            Apply Now
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
            Start your journey with us today
          </p>
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[900px] lg:w-[900px] relative flex flex-col justify-start items-start min-h-screen">
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[900px] lg:w-[900px] relative flex flex-col justify-start items-start min-h-screen">
            <div className="self-stretch pt-[9px] overflow-visible border-b border-border flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
              <div className="w-full flex flex-col justify-center items-center sticky top-0 z-50 bg-background px-4 sm:px-6 md:px-8 lg:px-0 py-3 sm:py-4 md:py-4">
                <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] py-2 sm:py-3 md:py-3 px-3 sm:px-5 md:px-5 bg-card shadow-[0px_2px_8px_rgba(55,50,47,0.08)] overflow-visible rounded-full flex justify-between items-center relative z-30 transition-all duration-300 ease-out border border-border">
                  {/* Logo Section */}
                  <div className="flex justify-center items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0">
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
                  </div>

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
                      className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                    >
                      About
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link
                      href="/news"
                      className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                    >
                      News
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                    <a
                      href="#contact"
                      className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                    >
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </a>
                  </div>

                  {/* Hamburger Menu Button */}
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
              </div>

              {/* Hero Section */}
              <div className="pt-12 sm:pt-16 md:pt-24 lg:pt-[216px] pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full sm:pl-0 sm:pr-0 pl-0 pr-0">
                <div className="w-full max-w-[937px] lg:w-[937px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    <div className="w-full max-w-[748.71px] lg:w-[748.71px] text-center flex justify-center flex-col text-foreground text-[24px] xs:text-[28px] sm:text-[36px] md:text-[52px] lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-24 font-serif px-2 sm:px-4 md:px-0">
                      Excellence in Education
                      <br />
                      at Data Center College
                    </div>
                    <div className="w-full max-w-[506.08px] lg:w-[506.08px] text-center flex justify-center flex-col text-muted-foreground sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-[1.5] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
                      Prepare for the future with innovative programs
                      <br className="hidden sm:block" />
                      in technology, business, and professional development.
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-[497px] lg:w-[497px] flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                  <div className="backdrop-blur-[8.25px] flex justify-start items-center gap-4">
                    <div className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative bg-primary shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full flex justify-center items-center">
                      <div className="w-20 sm:w-24 md:w-28 lg:w-44 h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                      <div className="flex flex-col justify-center text-primary-foreground text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                        Explore Programs
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-[960px] lg:w-[960px] pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-2 sm:px-4 md:px-6 lg:px-11 flex flex-col justify-center items-center gap-2 relative z-5 my-8 sm:my-12 md:my-16 lg:my-16 mb-0 lg:pb-0">
                  <div className="w-full max-w-[960px] lg:w-[960px] h-[200px] sm:h-[280px] md:h-[450px] lg:h-[695.55px] bg-card shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[9.06px] flex flex-col justify-start items-start">
                    {/* Dashboard Content */}
                    <div className="self-stretch flex-1 flex justify-start items-start">
                      {/* Main Content */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden">
                          {/* Product Image 1 - Plan your schedules */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                              activeCard === 0 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
                            }`}
                          >
                            <img
                              src="/images/design-mode/dsadsadsa.jpg.jpeg"
                              alt="Schedules Dashboard - Customer Subscription Management"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Image 2 - Data to insights */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                              activeCard === 1 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
                            }`}
                          >
                            <img
                              src="/analytics-dashboard-with-charts-graphs-and-data-vi.jpg"
                              alt="Analytics Dashboard"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Image 3 - Data visualization */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                              activeCard === 2 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
                            }`}
                          >
                            <img
                              src="/data-visualization-dashboard-with-interactive-char.jpg"
                              alt="Data Visualization Dashboard"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Us Section */}
                <div id="about">
                  <AboutUsSection />
                </div>

                {/* Courses & Programs Section */}
                <div id="programs">
                  <CoursesAndProgramsSection />
                </div>

                {/* Faculty & Staff Section */}
                <div id="faculty">
                  <FacultyStaffSection />
                </div>

                {/* Admissions & Contact Section */}
                <div id="contact">
                  <AdmissionsContactSection />
                </div>

                {/* Footer Section */}
                <FooterSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// FeatureCard component definition inline to fix import error
function FeatureCard({
  title,
  description,
  isActive,
  progress,
  onClick,
}: {
  title: string
  description: string
  isActive: boolean
  progress: number
  onClick: () => void
}) {
  return (
    <div
      className={`w-full md:flex-1 self-stretch px-6 py-5 overflow-hidden flex flex-col justify-start items-start gap-2 cursor-pointer relative border-b md:border-b-0 last:border-b-0 ${
        isActive
          ? "bg-card border-b border-border"
          : "border-l-0 border-r-0 md:border border-border/50"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-border">
          <div
            className="h-full bg-foreground transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="self-stretch flex justify-center flex-col text-foreground text-sm md:text-sm font-semibold leading-6 md:leading-6 font-sans">
        {title}
      </div>
      <div className="self-stretch text-muted-foreground text-[13px] md:text-[13px] font-normal leading-[22px] md:leading-[22px] font-sans">
        {description}
      </div>
    </div>
  )
}
