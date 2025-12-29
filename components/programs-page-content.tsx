"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import FooterSection from "./footer-section"
import type { Settings } from "@/lib/sanity/types"

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

interface ProgramsPageContentProps {
  settings: Settings | null
}

export default function ProgramsPageContent({ settings }: ProgramsPageContentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const programData = {
    undergraduate: [
      {
        code: "BSIT",
        title: "Information Technology",
        fullTitle: "Bachelor of Science in Information Technology",
        duration: "4 Years",
        credits: "120 Units",
        description:
          "Comprehensive IT program covering software development, networking, database management, and emerging technologies.",
        keySkills: ["Web Development", "Cloud Computing", "Cybersecurity", "System Administration"],
        careers: ["Software Developer", "IT Consultant", "Systems Analyst", "Network Administrator"],
      },
      {
        code: "BSBA",
        title: "Business Administration",
        fullTitle: "Bachelor of Science in Business Administration",
        duration: "4 Years",
        credits: "120 Units",
        description:
          "Strategic business education focusing on management, finance, marketing, and entrepreneurship in the digital age.",
        keySkills: ["Financial Management", "Strategic Planning", "Digital Marketing", "Business Analytics"],
        careers: ["Business Manager", "Financial Analyst", "Marketing Director", "Entrepreneur"],
      },
      {
        code: "BSCS",
        title: "Computer Science",
        fullTitle: "Bachelor of Science in Computer Science",
        duration: "4 Years",
        credits: "120 Units",
        description:
          "Advanced computing program emphasizing algorithms, software engineering, AI, and theoretical computer science.",
        keySkills: ["Machine Learning", "AI Development", "Software Engineering", "Data Structures"],
        careers: ["Software Engineer", "AI Specialist", "Research Scientist", "Full Stack Developer"],
      },
    ],
    tesda: [
      {
        code: "NC II",
        title: "Network Technician",
        fullTitle: "Network Technician NC II",
        duration: "6-9 Months",
        credits: "Competency-Based",
        description: "TESDA-certified program for network installation, configuration, and troubleshooting expertise.",
        keySkills: ["Network Setup", "System Administration", "Troubleshooting", "Hardware Installation"],
        careers: ["Network Technician", "IT Support Specialist", "Systems Administrator"],
      },
      {
        code: "NC III",
        title: "Web Developer",
        fullTitle: "Web Developer NC III",
        duration: "6-9 Months",
        credits: "Competency-Based",
        description: "Full-stack web development certification covering frontend, backend, and database technologies.",
        keySkills: ["Frontend Dev", "Backend Dev", "Database Design", "Responsive Design"],
        careers: ["Web Developer", "Full Stack Developer", "Frontend Developer"],
      },
      {
        code: "CERT",
        title: "Digital Marketing",
        fullTitle: "Digital Marketing Certificate",
        duration: "3-6 Months",
        credits: "Competency-Based",
        description: "Practical digital marketing training covering SEO, social media, content strategy, and analytics.",
        keySkills: ["Social Media", "SEO/SEM", "Content Strategy", "Analytics"],
        careers: ["Digital Marketer", "Social Media Manager", "SEO Specialist"],
      },
    ],
    shs: [
      {
        code: "STEM",
        title: "STEM Strand",
        fullTitle: "Science, Technology, Engineering & Mathematics",
        duration: "2 Years",
        credits: "80 Units",
        description: "College-preparatory track for students pursuing careers in science, engineering, and technology.",
        keySkills: ["Physics", "Chemistry", "Computer Science", "Mathematics", "Research"],
        careers: ["Engineering", "Science", "Medical", "Technology"],
      },
      {
        code: "ICT",
        title: "ICT Strand",
        fullTitle: "Information & Communications Technology",
        duration: "2 Years",
        credits: "80 Units",
        description: "Technical-vocational track preparing students for IT careers or further ICT education.",
        keySkills: ["Web Design", "Programming", "Digital Media", "Networking"],
        careers: ["Web Designer", "IT Support", "Junior Developer"],
      },
      {
        code: "ABM",
        title: "ABM Strand",
        fullTitle: "Accountancy, Business & Management",
        duration: "2 Years",
        credits: "80 Units",
        description:
          "Business-focused track for students interested in business management, accounting, and entrepreneurship.",
        keySkills: ["Accounting", "Business Strategy", "Entrepreneurship", "Marketing"],
        careers: ["Business", "Accountancy", "Entrepreneur"],
      },
    ],
  }

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-card z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
          <Link
            href="/#faculty"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Faculty & Staff
          </Link>
          <Link
            href="/apply"
            className="block px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <div className="border-t border-border px-6 py-5 bg-muted/30">
          <Link
            href="/apply"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full px-5 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-base font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 block text-center"
          >
            Apply Now
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
            Start your journey with us today
          </p>
        </div>
      </div>

      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[900px] lg:w-[900px] flex flex-col justify-start items-start min-h-screen">
        <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
            <div className="w-full flex flex-col justify-center items-center sticky top-0 z-50 bg-background px-4 sm:px-6 md:px-8 lg:px-0 py-3 sm:py-4 md:py-4">
              <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] py-2 sm:py-3 md:py-3 px-3 sm:px-5 md:px-5 bg-card shadow-[0px_2px_8px_rgba(55,50,47,0.08)] overflow-visible rounded-full flex justify-between items-center relative z-30 transition-all duration-300 ease-out border border-border">
                <Link
                  href="/"
                  className="flex justify-center items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0"
                >
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

                <div className="hidden md:flex justify-start items-center gap-6 lg:gap-8 flex-1 ml-6 lg:ml-8">
                  <Link
                    href="/programs"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Programs
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/90 transition-all duration-300 ease-out"></span>
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
                  <Link
                    href="/apply"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                </div>

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

                <div className="hidden md:flex h-8 md:h-9 ml-4 md:ml-6">
                  <Link
                    href="/apply"
                    className="px-4 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-[0px_2px_8px_rgba(55,50,47,0.3)] overflow-hidden rounded-full flex justify-center items-center hover:shadow-[0px_4px_12px_rgba(55,50,47,0.4)] hover:scale-105 transition-all duration-300 ease-out active:scale-95"
                  >
                    <div className="flex flex-col justify-center text-primary-foreground text-xs sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                      Apply Now
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="pt-12 sm:pt-16 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full">
              <div className="w-full max-w-[800px] flex flex-col justify-center items-center gap-6 sm:gap-8">
                <Badge
                  icon={
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L6 2L11 11" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M3 7H9" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  }
                  text="Academic Programs"
                />
                <div className="text-center flex flex-col gap-4">
                  <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-serif tracking-tight">
                    Programs & Courses
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed font-sans max-w-[650px] mx-auto">
                    Explore our comprehensive academic offerings designed to prepare you for success in your chosen
                    career path.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-border py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="w-full max-w-[850px] mx-auto">
                <div className="mb-10 md:mb-14">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-1.5 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                    <h2 className="text-foreground text-3xl md:text-4xl font-serif font-bold">
                      Undergraduate Programs
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base ml-5">
                    Four-year bachelor's degree programs for comprehensive professional education.
                  </p>
                </div>

                {/* Grid layout with 2 columns */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {programData.undergraduate.map((program, index) => (
                    <div
                      key={index}
                      className="group border-2 border-border rounded-2xl bg-card hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Card Header with gradient */}
                      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border-b border-border">
                        <div className="flex items-start justify-between mb-3">
                          <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm">
                            {program.code}
                          </span>
                          <span className="px-3 py-1 bg-card text-muted-foreground text-xs font-semibold rounded-md border border-border">
                            {program.duration}
                          </span>
                        </div>
                        <h3 className="text-foreground text-xl md:text-2xl font-bold font-serif leading-tight group-hover:text-primary transition-colors duration-300">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mt-1">{program.fullTitle}</p>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-5">
                        <p className="text-muted-foreground text-sm leading-relaxed">{program.description}</p>

                        {/* Key Skills - Compact grid */}
                        <div>
                          <h4 className="text-foreground text-xs font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            Key Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {program.keySkills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-muted text-foreground text-xs rounded-full border border-border"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Career Paths - Compact list */}
                        <div>
                          <h4 className="text-foreground text-xs font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                            Career Paths
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {program.careers.slice(0, 3).map((career, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20"
                              >
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full border-t border-border py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-muted/30">
              <div className="w-full max-w-[850px] mx-auto">
                <div className="mb-10 md:mb-14">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-1.5 bg-gradient-to-b from-secondary to-secondary/60 rounded-full"></div>
                    <h2 className="text-foreground text-3xl md:text-4xl font-serif font-bold">TESDA Courses</h2>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base ml-5">
                    Technical-vocational programs with industry-recognized TESDA certification.
                  </p>
                </div>

                {/* 3-column grid for shorter courses */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {programData.tesda.map((program, index) => (
                    <div
                      key={index}
                      className="group border-2 border-border rounded-xl bg-card hover:shadow-xl hover:border-secondary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Compact header */}
                      <div className="bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-5 border-b border-border flex-shrink-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-md">
                            {program.code}
                          </span>
                        </div>
                        <h3 className="text-foreground text-lg font-bold font-serif leading-tight group-hover:text-secondary transition-colors duration-300 mb-1">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">{program.duration}</p>
                      </div>

                      {/* Compact body */}
                      <div className="p-5 space-y-4 flex-1 flex flex-col">
                        <p className="text-muted-foreground text-xs leading-relaxed">{program.description}</p>

                        {/* Skills as tags */}
                        <div className="flex-1">
                          <h4 className="text-foreground text-[10px] font-bold mb-2 uppercase tracking-wide">
                            Competencies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {program.keySkills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-muted text-foreground text-[10px] rounded border border-border"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Careers */}
                        <div>
                          <h4 className="text-foreground text-[10px] font-bold mb-2 uppercase tracking-wide">
                            Job Opportunities
                          </h4>
                          <div className="space-y-1">
                            {program.careers.slice(0, 2).map((career, idx) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <span className="text-secondary mt-0.5 text-xs">•</span>
                                <span className="text-muted-foreground text-xs">{career}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full border-t border-border py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="w-full max-w-[850px] mx-auto">
                <div className="mb-10 md:mb-14">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-1.5 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                    <h2 className="text-foreground text-3xl md:text-4xl font-serif font-bold">Senior High School</h2>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base ml-5">
                    K-12 program strands preparing students for college or immediate employment.
                  </p>
                </div>

                {/* Horizontal card layout */}
                <div className="space-y-6">
                  {programData.shs.map((program, index) => (
                    <div
                      key={index}
                      className="group border-2 border-border rounded-xl bg-card hover:shadow-xl hover:border-accent/40 transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Left side - Header info */}
                        <div className="md:w-2/5 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
                          <div>
                            <span className="px-4 py-1.5 bg-accent text-accent-foreground text-sm font-bold rounded-lg inline-block mb-3">
                              {program.code}
                            </span>
                            <h3 className="text-foreground text-2xl font-bold font-serif leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
                              {program.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">{program.fullTitle}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-3 py-1.5 bg-card rounded-md border border-border">
                              <p className="text-foreground text-xs font-semibold">{program.duration}</p>
                            </div>
                            <div className="px-3 py-1.5 bg-card rounded-md border border-border">
                              <p className="text-muted-foreground text-xs">{program.credits}</p>
                            </div>
                          </div>
                        </div>

                        {/* Right side - Details */}
                        <div className="md:w-3/5 p-6 space-y-4">
                          <p className="text-muted-foreground text-sm leading-relaxed">{program.description}</p>

                          <div className="grid sm:grid-cols-2 gap-4">
                            {/* Core Subjects */}
                            <div>
                              <h4 className="text-foreground text-xs font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                Core Subjects
                              </h4>
                              <div className="space-y-1">
                                {program.keySkills.slice(0, 4).map((skill, idx) => (
                                  <div key={idx} className="flex items-start gap-1.5">
                                    <span className="text-accent mt-0.5 text-xs">•</span>
                                    <span className="text-muted-foreground text-xs">{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Pathway Options */}
                            <div>
                              <h4 className="text-foreground text-xs font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Pathway Options
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {program.careers.map((career, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                                  >
                                    {career}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="w-full border-t border-border py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-0 bg-card/50">
              <div className="w-full max-w-[700px] mx-auto text-center flex flex-col gap-6 sm:gap-8">
                <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl font-semibold font-serif">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[600px] mx-auto">
                  Choose the program that's right for you and take the first step toward a successful future at Data
                  Center College of the Philippines.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/apply"
                    className="px-8 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/apply"
                    className="px-8 py-3 border-2 border-border text-foreground rounded-full font-semibold hover:bg-muted hover:border-primary/30 transition-all duration-300"
                  >
                    Contact Admissions
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            {settings && <FooterSection settings={settings} />}
          </div>
        </div>
    </>
  )
}