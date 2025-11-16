"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Course } from "@/lib/sanity/types"
import { Badge } from "@/components/ui/badge"

function SectionBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

interface CoursesAndProgramsSectionProps {
  courses?: Course[]
}

export default function CoursesAndProgramsSection({ courses = [] }: CoursesAndProgramsSectionProps) {
  // Group courses by category
  const chedCourses = courses.filter(c => c.category === "ched")
  const tesdaCourses = courses.filter(c => c.category === "tesda")
  const shsCourses = courses.filter(c => c.category === "shs")

  const programCategories = [
    {
      id: "ched",
      category: "Undergraduate Programs",
      description: "Professional bachelor's degrees accredited by CHED",
      programs: chedCourses,
    },
    {
      id: "tesda",
      category: "TESDA Courses",
      description: "Industry-recognized technical certifications",
      programs: tesdaCourses,
    },
    {
      id: "shs",
      category: "Senior High School",
      description: "Foundation for college readiness and career preparation",
      programs: shsCourses,
    },
  ].filter(cat => cat.programs.length > 0)

  return (
    <div id="programs" className="w-full border-b border-border flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-12 sm:py-16 md:py-24 lg:py-32 border-b border-border flex justify-center items-center">
        <div className="w-full max-w-[700px] flex flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8">
          <SectionBadge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L6 2L11 11" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M3 7H9" stroke="currentColor" strokeWidth="1" />
              </svg>
            }
            text="Academic Programs"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-serif tracking-tight">
            Our Academic Offerings
          </div>
          <div className="self-stretch text-center text-muted-foreground text-sm sm:text-base md:text-lg font-normal leading-relaxed md:leading-8 font-sans max-w-[600px]">
            From Senior High School to specialized TESDA courses and bachelor's degrees, we offer pathways for every
            student.
          </div>
        </div>
      </div>

      {/* Program Categories */}
      <div className="self-stretch flex justify-center items-start">
        {/* Left decorative element */}
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 border-l border-r border-border py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-16 md:gap-20">
            {programCategories.map((categoryData, categoryIndex) => (
              <div key={categoryData.id} className="flex flex-col gap-6 md:gap-8">
                {/* Category Header */}
                <div className="flex flex-col gap-3 pb-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                      {categoryData.category}
                    </h2>
                    <Badge variant="secondary" className="text-xs tracking-[0.2em]">
                      {categoryData.programs.length} {categoryData.programs.length === 1 ? "PROGRAM" : "PROGRAMS"}
                    </Badge>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-sans">
                    {categoryData.description}
                  </p>
                </div>

                {/* Program Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {categoryData.programs.map((program) => (
                    <Link
                      key={program.id}
                      href={`/courses/${program.slug}`}
                      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] hover:border-foreground/20 transition-all duration-300 flex flex-col"
                    >
                      {/* Card Content */}
                      <div className="p-6 md:p-7 flex flex-col gap-4 flex-grow">
                        {/* Title */}
                        <h3 className="text-foreground text-lg md:text-xl font-semibold font-serif leading-tight group-hover:text-primary transition-colors min-h-[3.5rem] line-clamp-3">
                          {program.title}
                        </h3>

                        {/* Description */}
                        {program.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-sans">
                            {program.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-foreground border border-border">
                            <Clock className="w-3 h-3" />
                            {program.duration}
                          </div>
                          {program.credential && (
                            <Badge variant="outline" className="text-xs px-2.5 py-1">
                              Certified
                            </Badge>
                          )}
                          {program.scholarshipsAvailable && (
                            <Badge variant="secondary" className="text-xs px-2.5 py-1">
                              Scholarship
                            </Badge>
                          )}
                        </div>

                        {/* Key Highlights */}
                        {program.highlights && program.highlights.length > 0 && (
                          <div className="flex flex-col gap-2 pt-3 border-t border-border">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Key Areas
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {program.highlights.slice(0, 3).map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded border border-border/50 font-sans"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="pt-4 mt-auto border-t border-border">
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Category divider - not on last item */}
                {categoryIndex < programCategories.length - 1 && (
                  <div className="w-full h-px bg-border mt-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right decorative element */}
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
