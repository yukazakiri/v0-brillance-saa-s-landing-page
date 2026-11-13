"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Eye,
  GraduationCap,
  Grid,
  Layers,
  LayoutGrid,
  List,
  Mail,
  MapPin,
  Phone,
  Scale,
  Search,
  Sparkles,
  Table as TableIcon,
  X,
} from "lucide-react"

import type { Course } from "@/lib/sanity/types"
import { getImageAlt, getImageUrl } from "@/lib/sanity/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CourseQuickViewModal from "@/components/course-quick-view-modal"
import CourseComparisonModal from "@/components/course-comparison-modal"
import CoursePathfinder, { type PathfinderFilters } from "@/components/course-pathfinder"

type CourseCatalogProps = {
  courses: Course[]
  initialCategory?: string
  contact?: {
    phone?: string
    email?: string
  }
}

type CategoryKey = "all" | "ched" | "tesda" | "shs" | "short"
type QuickFilterKey = "all" | "scholarship" | "tech" | "business" | "hospitality" | "fast-track"
type SortKey = "featured" | "duration-asc" | "duration-desc" | "name"
type ViewMode = "editorial" | "ledger"

const CATEGORY_META: Record<
  Exclude<CategoryKey, "all">,
  { label: string; badge: string; description: string; color: string; dotColor: string }
> = {
  ched: {
    label: "College Degrees",
    badge: "CHED Accredited",
    description: "4-year bachelor degree programs leading to professional careers and certifications.",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    dotColor: "bg-blue-500",
  },
  tesda: {
    label: "TESDA Tech-Voc",
    badge: "TESDA Registered",
    description: "Competency-based technical and vocational training with National Certification (NC II / NC III).",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    dotColor: "bg-emerald-500",
  },
  shs: {
    label: "Senior High School",
    badge: "DepEd Voucher",
    description: "Grades 11-12 academic and technical-vocational tracks with 100% DepEd PEAC voucher subsidies.",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    dotColor: "bg-purple-500",
  },
  short: {
    label: "Short Courses",
    badge: "Modular Training",
    description: "Fast-track skills certificates for working professionals and career shifters.",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    dotColor: "bg-amber-500",
  },
}

const QUICK_FILTERS: Array<{ key: QuickFilterKey; label: string; icon?: any }> = [
  { key: "all", label: "All Pathways" },
  { key: "scholarship", label: "Voucher / Aid Eligible", icon: Sparkles },
  { key: "tech", label: "Tech & Computing" },
  { key: "business", label: "Business & Management" },
  { key: "hospitality", label: "Hospitality & Culinary" },
  { key: "fast-track", label: "Fast-Track (< 1 Year)" },
]

function normalizeCategory(value?: string): CategoryKey {
  if (!value) return "all"
  const v = value.toLowerCase()
  if (v === "ched" || v === "shs" || v === "tesda" || v === "short") return v
  return "all"
}

function parseDurationInMonths(durationStr: string): number {
  const s = durationStr.toLowerCase()
  if (s.includes("4 year")) return 48
  if (s.includes("2 year")) return 24
  if (s.includes("1 year")) return 12
  const monthMatch = s.match(/(\d+)\s*month/)
  if (monthMatch) return parseInt(monthMatch[1], 10)
  const hoursMatch = s.match(/(\d+)\s*hour/)
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1], 10)
    return Math.max(1, Math.round(hours / 100))
  }
  return 12
}

export default function CourseCatalog({ courses, initialCategory, contact }: CourseCatalogProps) {
  const [category, setCategory] = useState<CategoryKey>(normalizeCategory(initialCategory))
  const [quickFilter, setQuickFilter] = useState<QuickFilterKey>("all")
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortKey>("featured")
  const [viewMode, setViewMode] = useState<ViewMode>("editorial")
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false)
  const [quickViewCourse, setQuickViewCourse] = useState<Course | null>(null)

  const normalizedQuery = query.trim().toLowerCase()

  // Category counts
  const categories = useMemo(() => {
    const list: Array<{ key: CategoryKey; label: string; count: number }> = [
      { key: "all", label: "All Offerings", count: courses.length },
    ]
    const chedCount = courses.filter((c) => c.category === "ched").length
    const tesdaCount = courses.filter((c) => c.category === "tesda").length
    const shsCount = courses.filter((c) => c.category === "shs").length
    const shortCount = courses.filter((c) => c.category === "short").length

    if (chedCount > 0) list.push({ key: "ched", label: "College Degrees", count: chedCount })
    if (tesdaCount > 0) list.push({ key: "tesda", label: "TESDA Tech-Voc", count: tesdaCount })
    if (shsCount > 0) list.push({ key: "shs", label: "Senior High", count: shsCount })
    if (shortCount > 0) list.push({ key: "short", label: "Short Courses", count: shortCount })

    return list
  }, [courses])

  // Filtered and Sorted courses
  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      // Category filter
      if (category !== "all" && course.category !== category) return false

      // Quick filter
      if (quickFilter === "scholarship" && !course.scholarshipsAvailable) return false
      if (quickFilter === "fast-track") {
        const months = parseDurationInMonths(course.duration)
        if (months > 12) return false
      }
      if (quickFilter === "tech") {
        const isTech = /tech|computing|programming|network|system|design|graphic/i.test(
          `${course.title} ${course.description} ${course.credential}`
        )
        if (!isTech) return false
      }
      if (quickFilter === "business") {
        const isBusiness = /business|finance|account|abm|management/i.test(
          `${course.title} ${course.description} ${course.credential}`
        )
        if (!isBusiness) return false
      }
      if (quickFilter === "hospitality") {
        const isHosp = /hotel|restaurant|hospitality|culinary|cookery|baking|pastry|beverage|food/i.test(
          `${course.title} ${course.description} ${course.credential}`
        )
        if (!isHosp) return false
      }

      // Keyword query
      if (!normalizedQuery) return true

      const haystack = [
        course.title,
        course.description ?? "",
        course.credential ?? "",
        course.duration ?? "",
        course.tuition ?? "",
        ...(course.highlights ?? []),
        ...(course.careerPaths ?? []),
        ...(course.outcomes ?? []),
        ...(course.majors ?? []),
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === "duration-asc") {
        return parseDurationInMonths(a.duration) - parseDurationInMonths(b.duration)
      }
      if (sortBy === "duration-desc") {
        return parseDurationInMonths(b.duration) - parseDurationInMonths(a.duration)
      }
      // Featured / default
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

    return result
  }, [category, quickFilter, normalizedQuery, sortBy, courses])

  // Comparison Handlers
  const toggleComparison = (id: string) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id] // replace oldest if already 3
      }
      return [...prev, id]
    })
  }

  const comparisonCourses = useMemo(() => {
    return courses.filter((c) => selectedForComparison.includes(c.id))
  }, [courses, selectedForComparison])

  const resetFilters = () => {
    setCategory("all")
    setQuickFilter("all")
    setQuery("")
    setSortBy("featured")
  }

  const handleApplyPathfinder = (filters: PathfinderFilters) => {
    if (filters.category) {
      setCategory(filters.category)
    }
    if (filters.query) {
      setQuery(filters.query)
    }
  }

  const hasActiveFilters =
    category !== "all" || quickFilter !== "all" || Boolean(normalizedQuery) || sortBy !== "featured"

  return (
    <div className="w-full flex flex-col gap-10">
      {/* 30-Second Program Pathfinder Banner & Quiz */}
      <CoursePathfinder
        onApplyPathfinder={handleApplyPathfinder}
        onResetPathfinder={resetFilters}
      />

      {/* Main Filter & Explorer Hub — Magazine Publication Header */}
      <div className="w-full border-b border-border pb-8 flex flex-col gap-6">
        {/* Top line: Heading and Minimalist Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
                Section 02 // Program Directory
              </span>
              <span className="text-border">·</span>
              <span className="font-mono text-xs uppercase text-muted-foreground">
                Baguio City Campus
              </span>
            </div>
            <h2 id="program-directory-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              The Academic Curriculum Index
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl font-sans">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> of{" "}
              <span className="font-semibold text-foreground">{courses.length}</span> accredited disciplines and qualifications in Northern Luzon.
            </p>
          </div>

          {/* Minimalist Editorial Search input */}
          <div className="relative w-full lg:w-[380px] shrink-0">
            <Search
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by degree title, skill, or career role…"
              aria-label="Search programs"
              className="w-full h-11 border-b-2 border-border bg-transparent pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary transition-colors"
            />
            {query.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-6 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Department Switcher — Styled like Magazine Sections */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">
            Department:
          </span>
          {categories.map((c) => {
            const isSelected = category === c.key
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                className={cn(
                  "relative py-1.5 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5",
                  isSelected
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{c.label}</span>
                <span
                  className={cn(
                    "font-mono text-[10px] px-1.5 py-0.2 rounded-none",
                    isSelected
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {c.count}
                </span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            )
          })}
        </div>

        {/* Quick Filter Tags & View Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-4">
          {/* Quick-filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mr-1 hidden sm:inline">
              Filter:
            </span>
            {QUICK_FILTERS.map((qf) => {
              const isSelected = quickFilter === qf.key
              return (
                <button
                  key={qf.key}
                  type="button"
                  onClick={() => setQuickFilter(qf.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 border px-3 py-1 text-xs font-mono uppercase tracking-wide transition-all",
                    isSelected
                      ? "border-secondary bg-secondary text-secondary-foreground font-bold"
                      : "border-border/80 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  )}
                >
                  {qf.icon && <qf.icon className="size-3" />}
                  <span>{qf.label}</span>
                </button>
              )
            })}
          </div>

          {/* Controls: Sort, View, Reset */}
          <div className="flex flex-wrap items-center gap-4 ml-auto">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-medium hidden md:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort programs"
                className="h-9 border border-border bg-background px-3 text-xs font-mono uppercase text-foreground outline-none focus-visible:border-primary"
              >
                <option value="featured">Featured / In-Demand</option>
                <option value="duration-asc">Duration (Short to Long)</option>
                <option value="duration-desc">Duration (Long to Short)</option>
                <option value="name">Alphabetical (A to Z)</option>
              </select>
            </div>

            {/* View Mode Toggle: Editorial vs Ledger */}
            <div className="flex items-center border border-border bg-background">
              <button
                type="button"
                onClick={() => setViewMode("editorial")}
                aria-label="Editorial story layout"
                title="Editorial Story Spreads"
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors",
                  viewMode === "editorial"
                    ? "bg-foreground text-background font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Editorial</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("ledger")}
                aria-label="Academic ledger table view"
                title="Curriculum Ledger"
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors",
                  viewMode === "ledger"
                    ? "bg-foreground text-background font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <TableIcon className="size-3.5" />
                <span className="hidden sm:inline">Ledger</span>
              </button>
            </div>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 text-xs font-mono uppercase text-muted-foreground hover:text-foreground"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Courses Display */}
      {filteredCourses.length === 0 ? (
        <div className="w-full border border-dashed border-border p-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center bg-muted text-muted-foreground mb-4">
            <BookOpen className="size-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">No matching disciplines found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-[48ch] mx-auto leading-relaxed">
            We couldn't find any courses matching your specific search or filters. Try adjusting your keywords or clearing the active filters.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button type="button" variant="default" onClick={resetFilters} className="rounded-none">
              Clear All Filters
            </Button>
            {contact?.email && (
              <Button type="button" variant="outline" asChild className="rounded-none">
                <a href={`mailto:${contact.email}`}>Ask Admissions Help Desk</a>
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === "editorial" ? (
        /* ========================================================================= */
        /* EDITORIAL STORY SPREADS LAYOUT (Magazine Feature Rows)                     */
        /* ========================================================================= */
        <div className="flex flex-col">
          {filteredCourses.map((course, idx) => {
            const meta = course.category ? CATEGORY_META[course.category] : null
            const studyUnits = course.creditHours ? `${course.creditHours} Units` : course.trainingHours ?? "Standard Load"
            const imageUrl = getImageUrl(course.heroImage, 900, 600)
            const imageAlt = getImageAlt(course.heroImage, course.title)
            const isCompared = selectedForComparison.includes(course.id)

            return (
              <article
                key={course.id}
                className={cn(
                  "group relative border-t border-border/80 py-10 sm:py-14 transition-colors",
                  isCompared && "bg-primary/[0.03]"
                )}
              >
                {/* Article Header Bar: Number, Category, and Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm sm:text-base font-bold text-secondary">
                      № {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-border">/</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      {meta?.badge || course.credential || "ACCREDITED"}
                    </span>
                    {course.badge && (
                      <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-amber-500/30">
                        <Sparkles className="size-3" />
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono uppercase text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>·</span>
                    <span>{studyUnits}</span>
                    {course.scholarshipsAvailable && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Vouchers OK
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Main Asymmetrical Magazine Spread */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Title, Narrative, Highlights, Actions (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    <div>
                      <Link href={`/courses/${course.slug}`}>
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-[1.12]">
                          {course.title}
                        </h3>
                      </Link>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground font-sans">
                        {course.description || "Practical, career-oriented curriculum with hands-on labs and supervised industry practicums."}
                      </p>
                    </div>

                    {/* Key Competency Breakdown */}
                    {course.highlights && course.highlights.length > 0 && (
                      <div className="border-t border-border/60 pt-4 flex flex-col gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                          Curricular Focus & Lab Practice:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90">
                          {course.highlights.slice(0, 4).map((hl, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="font-mono text-[10px] text-secondary font-bold shrink-0 mt-0.5">
                                0{i + 1}
                              </span>
                              <span className="leading-snug">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Target Career Roles */}
                    {((course.careerPaths && course.careerPaths.length > 0) || (course.outcomes && course.outcomes.length > 0)) && (
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                          Target Roles:
                        </span>
                        {((course.careerPaths && course.careerPaths.length > 0 ? course.careerPaths : course.outcomes) || [])
                          .slice(0, 4)
                          .map((role, i, arr) => (
                            <span key={`${role}-${i}`} className="text-foreground font-medium">
                              {role}
                              {i < arr.length - 1 && <span className="text-muted-foreground/60 ml-2">/</span>}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button asChild size="default" className="rounded-none px-5 font-semibold text-xs gap-2">
                        <Link href={`/courses/${course.slug}`}>
                          <span>Read Full Dossier</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="default"
                        onClick={() => setQuickViewCourse(course)}
                        aria-label={`Quick preview for ${course.title}`}
                        className="rounded-none border-border px-4 text-xs font-semibold gap-1.5"
                      >
                        <Eye className="size-3.5" />
                        <span>Preview Syllabus</span>
                      </Button>

                      <button
                        type="button"
                        onClick={() => toggleComparison(course.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider border transition-colors",
                          isCompared
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                        )}
                        title="Add to comparison table"
                      >
                        <Scale className="size-3.5" />
                        <span>{isCompared ? "In Matrix [✓]" : "Compare"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Editorial Photography & Dossier Box (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border border-border bg-muted">
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono uppercase text-white drop-shadow-md">
                        <span>Baguio Campus Facility</span>
                        <span>{course.deliveryMode || "On Campus"}</span>
                      </div>
                    </div>

                    {/* Fast Facts Dossier Box below image */}
                    <div className="grid grid-cols-3 divide-x divide-border border-x border-b border-border bg-muted/20 py-2.5 px-2 text-center text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground block">Duration</span>
                        <span className="font-semibold text-foreground truncate block">{course.duration}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground block">Study Load</span>
                        <span className="font-semibold text-foreground truncate block">{studyUnits}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground block">Aid / Voucher</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate block">
                          {course.scholarshipsAvailable ? "Subsidized" : "Direct Pay"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        /* ========================================================================= */
        /* ACADEMIC LEDGER TABLE VIEW (Publication Index Format)                     */
        /* ========================================================================= */
        <div className="w-full border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">№</th>
                  <th className="py-3.5 px-4 min-w-[280px]">Discipline / Program</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Credential</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Voucher Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCourses.map((course, idx) => {
                  const meta = course.category ? CATEGORY_META[course.category] : null
                  const isCompared = selectedForComparison.includes(course.id)

                  return (
                    <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-center text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="font-serif text-sm font-bold text-foreground hover:text-primary transition-colors block"
                        >
                          {course.title}
                        </Link>
                        {course.highlights?.[0] && (
                          <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 font-sans">
                            {course.highlights[0]}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground uppercase">
                        {meta?.label || course.category}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-foreground">
                        {course.credential || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-muted-foreground">
                        {course.duration}
                      </td>
                      <td className="py-3.5 px-4">
                        {course.scholarshipsAvailable ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="size-3" />
                            PEAC / Voucher
                          </span>
                        ) : (
                          <span className="font-mono text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => toggleComparison(course.id)}
                            className={cn(
                              "font-mono text-[10px] uppercase px-2 py-1 border transition-colors",
                              isCompared
                                ? "border-primary bg-primary text-primary-foreground font-bold"
                                : "border-border text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {isCompared ? "In Matrix" : "+ Compare"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickViewCourse(course)}
                            className="size-7 inline-flex items-center justify-center border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title="Quick preview"
                            aria-label={`Preview ${course.title}`}
                          >
                            <Eye className="size-3.5" />
                          </button>
                          <Button size="sm" asChild className="rounded-none h-7 px-3 text-xs font-mono uppercase">
                            <Link href={`/courses/${course.slug}`}>
                              <span>Dossier</span>
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating Comparison Dock (Appears when 1-3 courses selected) */}
      {selectedForComparison.length > 0 && (
        <div role="region" aria-label="Program comparison dock" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl rounded-none border border-foreground/30 bg-background/95 backdrop-blur-xl shadow-2xl p-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center bg-foreground text-background">
              <Scale className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-xs uppercase font-bold text-foreground block">
                {selectedForComparison.length} {selectedForComparison.length === 1 ? "Discipline" : "Disciplines"} Selected for Matrix
              </span>
              <p className="text-xs text-muted-foreground truncate font-serif">
                {comparisonCourses.map((c) => c.title).join(" · ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedForComparison([])}
              className="text-xs font-mono uppercase text-muted-foreground hover:text-destructive h-9 rounded-none"
            >
              Clear
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setComparisonModalOpen(true)}
              className="rounded-none px-4 font-semibold shadow-xs h-9 gap-1.5"
            >
              <span>View Matrix</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <CourseQuickViewModal
        course={quickViewCourse}
        isOpen={Boolean(quickViewCourse)}
        onClose={() => setQuickViewCourse(null)}
      />

      {/* Side-by-Side Comparison Modal */}
      <CourseComparisonModal
        courses={comparisonCourses}
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        onRemoveCourse={(id) => setSelectedForComparison((prev) => prev.filter((item) => item !== id))}
        onClearAll={() => {
          setSelectedForComparison([])
          setComparisonModalOpen(false)
        }}
      />

      {/* Admissions Consultation Banner */}
      <div className="w-full rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Award className="size-3.5" />
            Baguio City Admissions Assistance
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Need help choosing your path?</h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Our DCCP Baguio guidance team provides one-on-one degree counseling, credit evaluation for college transferees, and DepEd PEAC voucher assistance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {contact?.phone && (
            <Button variant="outline" asChild className="gap-2 rounded-xl">
              <a href={`tel:${contact.phone}`}>
                <Phone className="size-4" />
                <span>Call Admissions</span>
              </a>
            </Button>
          )}
          {contact?.email && (
            <Button asChild className="gap-2 rounded-xl">
              <a href={`mailto:${contact.email}`}>
                <Mail className="size-4" />
                <span>Email Guidance Desk</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

