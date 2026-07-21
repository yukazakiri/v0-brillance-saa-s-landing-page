"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"

import type { Course } from "@/lib/sanity/types"
import { cn } from "@/lib/utils"
import ContactCtaBar from "@/components/contact-cta-bar"
import CourseCard from "@/components/course-card"
import { Button } from "@/components/ui/button"

type CourseCatalogProps = {
  courses: Course[]
  initialCategory?: string
  contact?: {
    phone?: string
    email?: string
  }
}
type CategoryKey = "all" | "ched" | "shs" | "tesda" | "short"

const CATEGORY_LABELS: Record<Exclude<CategoryKey, "all">, string> = {
  ched: "College Courses",
  shs: "Senior High School",
  tesda: "TVET Programs",
  short: "Short Courses",
}

const CATEGORY_HELP: Record<Exclude<CategoryKey, "all">, string> = {
  ched: "Bachelor's degrees accredited by CHED.",
  shs: "Academic and TVL tracks approved by DepEd.",
  tesda: "Technical-vocational courses registered with TESDA.",
  short: "Specialized skills training modules.",
}

function normalizeCategory(value?: string): CategoryKey {
  if (!value) return "all"
  const v = value.toLowerCase()
  if (v === "ched" || v === "shs" || v === "tesda" || v === "short") return v
  return "all"
}

export default function CourseCatalog({ courses, initialCategory, contact }: CourseCatalogProps) {
  const [category, setCategory] = useState<CategoryKey>(normalizeCategory(initialCategory))
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()

  const filteredCourses = useMemo(() => {
    const base = category === "all" ? courses : courses.filter(c => c.category === category)
    if (!normalizedQuery) return base

    return base.filter(c => {
      const haystack = [
        c.title,
        c.description ?? "",
        c.credential ?? "",
        c.duration,
        ...(c.highlights ?? []),
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [category, courses, normalizedQuery])

  const grouped = useMemo(() => {
    const groups: Record<Exclude<CategoryKey, "all">, Course[]> = {
      ched: [],
      shs: [],
      tesda: [],
      short: [],
    }
    for (const course of filteredCourses) {
      if (course.category === "ched") groups.ched.push(course)
      if (course.category === "shs") groups.shs.push(course)
      if (course.category === "tesda") groups.tesda.push(course)
      if (course.category === "short") groups.short.push(course)
    }
    return groups
  }, [filteredCourses])

  const totalCount = courses.length
  const shownCount = filteredCourses.length

  const categories: Array<{ key: CategoryKey; label: string }> = [
    { key: "all", label: "All" },
    { key: "ched", label: "College" },
    { key: "shs", label: "SHS" },
    { key: "tesda", label: "TVET" },
    { key: "short", label: "Short" },
  ]

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full rounded-xl border border-border bg-card/60 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-border">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="text-foreground font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
                  Find the right program
                </div>
                <div className="text-muted-foreground text-sm sm:text-base mt-1">
                  {shownCount} of {totalCount} program{totalCount === 1 ? "" : "s"} shown
                </div>
              </div>

              <div className="relative w-full md:w-[420px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by program name, credential, or highlight..."
                  className={cn(
                    "w-full h-10 rounded-md border border-border bg-background/70 px-9 pr-10 text-sm text-foreground shadow-xs outline-none",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  )}
                />
                {query.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button
                  key={c.key}
                  type="button"
                  variant={category === c.key ? "default" : "outline"}
                  size="sm"
                  className={cn("h-8", category === c.key ? "shadow-sm" : "bg-background/70")}
                  onClick={() => setCategory(c.key)}
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-5 sm:py-6">
          <ContactCtaBar
            dense
            title="Ready to enquire?"
            subtitle="Call or email admissions for availability, requirements, and next steps."
            phone={contact?.phone}
            email={contact?.email}
            className="bg-background/60"
          />
        </div>
      </div>

      {shownCount === 0 ? (
        <div className="w-full rounded-xl border border-border bg-card p-8 text-center">
          <div className="text-foreground font-serif text-2xl font-semibold">No programs match your search</div>
          <div className="text-muted-foreground mt-2">
            Try a different keyword, or contact admissions and we’ll help you find the best option.
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button type="button" variant="outline" onClick={() => setQuery("")}>
              Clear search
            </Button>
            <Button type="button" variant="outline" onClick={() => setCategory("all")}>
              Show all
            </Button>
          </div>
        </div>
      ) : category === "all" ? (
        <div className="flex flex-col gap-14">
          {(Object.keys(CATEGORY_LABELS) as Array<Exclude<CategoryKey, "all">>).map((key) => {
            const list = grouped[key]
            if (list.length === 0) return null
            return (
              <section key={key} id={key} className="scroll-mt-28">
                <div className="flex flex-col gap-2 border-b border-border pb-4 mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      {CATEGORY_LABELS[key]}
                    </h2>
                    <div className="text-sm text-muted-foreground">{list.length} program{list.length === 1 ? "" : "s"}</div>
                  </div>
                  <p className="text-muted-foreground">{CATEGORY_HELP[key]}</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {list.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      contact={contact}
                      showContactActions
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-2 border-b border-border pb-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                {CATEGORY_LABELS[category as Exclude<CategoryKey, "all">]}
              </h2>
              <div className="text-sm text-muted-foreground">
                {shownCount} program{shownCount === 1 ? "" : "s"}
              </div>
            </div>
            <p className="text-muted-foreground">{CATEGORY_HELP[category as Exclude<CategoryKey, "all">]}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} contact={contact} showContactActions />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
