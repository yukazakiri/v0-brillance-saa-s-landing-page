"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, Clock, GraduationCap } from "lucide-react"
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

function getCategoryMeta(category: "ched" | "tesda" | "shs") {
  if (category === "ched") {
    return {
      label: "Degrees",
      title: "Undergraduate Programs",
      description: "Professional bachelor's degrees accredited by CHED",
      summary: "Best for students planning a full college degree path.",
      icon: GraduationCap,
    }
  }

  if (category === "tesda") {
    return {
      label: "Certifications",
      title: "TESDA Courses",
      description: "Industry-recognized technical certifications",
      summary: "Fast, practical training for students who want job-ready skills.",
      icon: Award,
    }
  }

  return {
    label: "Preparatory",
    title: "Senior High School",
    description: "Foundation for college readiness and career preparation",
    summary: "A strong starting point for future college and career decisions.",
    icon: BookOpen,
  }
}

function getCategoryDuration(programs: Course[]) {
  return programs[0]?.duration ?? "Varies"
}

export default function CoursesAndProgramsSection({ courses = [] }: CoursesAndProgramsSectionProps) {
  const chedCourses = courses.filter(c => c.category === "ched")
  const tesdaCourses = courses.filter(c => c.category === "tesda")
  const shsCourses = courses.filter(c => c.category === "shs")

  const programCategories = [
    {
      id: "ched",
      ...getCategoryMeta("ched"),
      programs: chedCourses,
    },
    {
      id: "tesda",
      ...getCategoryMeta("tesda"),
      programs: tesdaCourses,
    },
    {
      id: "shs",
      ...getCategoryMeta("shs"),
      programs: shsCourses,
    },
  ].filter(cat => cat.programs.length > 0)

  return (
    <div id="programs" className="w-full border-b border-border flex flex-col justify-center items-center">
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-12 sm:py-14 md:py-16 border-b border-border flex justify-center items-center">
        <div className="w-full max-w-[1100px] flex flex-col gap-8 md:gap-10">
          <SectionBadge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L6 2L11 11" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M3 7H9" stroke="currentColor" strokeWidth="1" />
              </svg>
            }
            text="Academic Programs"
          />

          <div className="max-w-[760px] flex flex-col gap-3">
            <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.02] font-serif tracking-tight">
              What students can study, at a glance
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-normal leading-relaxed font-sans max-w-[680px]">
              Start with the pathway that matches the student’s goal, then explore the programs under it. This keeps
              the section clear, minimal, and easy to understand in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {programCategories.map(categoryData => {
              const Icon = categoryData.icon

              return (
                <Link
                  key={categoryData.id}
                  href={`#${categoryData.id}`}
                  className="group rounded-2xl border border-border bg-card p-5 md:p-6 flex flex-col gap-4 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em]">
                      <Icon className="w-4 h-4" />
                      {categoryData.label}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-xl md:text-2xl font-serif font-semibold leading-tight">
                      {categoryData.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{categoryData.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
                      {categoryData.programs.length} {categoryData.programs.length === 1 ? "Program" : "Programs"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {getCategoryDuration(categoryData.programs)}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="self-stretch flex justify-center items-start">
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

        <div className="flex-1 border-l border-r border-border py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-16 md:gap-20">
            {programCategories.map((categoryData, categoryIndex) => (
              <div key={categoryData.id} id={categoryData.id} className="flex flex-col gap-6 md:gap-8 scroll-mt-28">
                <div className="flex flex-col gap-4 pb-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                      {categoryData.title}
                    </h2>
                    <Badge variant="secondary" className="text-xs tracking-[0.2em]">
                      {categoryData.programs.length} {categoryData.programs.length === 1 ? "PROGRAM" : "PROGRAMS"}
                    </Badge>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-sans max-w-[760px] leading-relaxed">
                    {categoryData.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {categoryData.programs.map(program => (
                    <Link
                      key={program.id}
                      href={`/courses/${program.slug}`}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[0px_10px_28px_rgba(55,50,47,0.08)] hover:border-foreground/20 transition-all duration-300 flex flex-col"
                    >
                      <div className="p-6 md:p-7 flex flex-col gap-4 flex-grow">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-foreground text-lg md:text-xl font-semibold font-serif leading-tight group-hover:text-primary transition-colors min-h-[3.5rem] line-clamp-3">
                            {program.title}
                          </h3>
                          <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                        </div>

                        {program.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-sans">
                            {program.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-foreground border border-border">
                            <Clock className="w-3 h-3" />
                            {program.duration}
                          </div>
                          {program.credential && (
                            <Badge variant="outline" className="text-xs px-2.5 py-1">
                              {program.credential}
                            </Badge>
                          )}
                          {program.scholarshipsAvailable && (
                            <Badge variant="secondary" className="text-xs px-2.5 py-1">
                              Scholarship
                            </Badge>
                          )}
                        </div>

                        {program.highlights && program.highlights.length > 0 && (
                          <div className="flex flex-col gap-2 pt-4 border-t border-border">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Key Areas
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {program.highlights.slice(0, 3).map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2.5 py-1 bg-background text-foreground rounded-full border border-border font-sans"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-4 mt-auto border-t border-border">
                          <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            <span>Learn More</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {categoryIndex < programCategories.length - 1 && (
                  <div className="w-full h-px bg-border mt-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>

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
