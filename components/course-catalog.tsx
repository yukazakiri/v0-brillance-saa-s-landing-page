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
  const [showPathfinder, setShowPathfinder] = useState(false)

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
    <div className="w-full flex flex-col gap-8">
      {/* Optional minimal guidance toggle */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/40 pb-3">
        <span>Looking for a tailored path?</span>
        <button
          type="button"
          onClick={() => setShowPathfinder(!showPathfinder)}
          className="text-foreground font-medium hover:underline underline-offset-4"
        >
          {showPathfinder ? "Hide Pathfinder" : "Try 30-second Program Finder →"}
        </button>
      </div>

      {showPathfinder && (
        <CoursePathfinder
          onApplyPathfinder={handleApplyPathfinder}
          onResetPathfinder={resetFilters}
        />
      )}

      {/* Minimalist Filter Bar */}
      <div className="w-full flex flex-col gap-6 border-b border-border/60 pb-8">
        {/* Top: Category Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Department Clean Tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {categories.map((c) => {
              const isSelected = category === c.key
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key)}
                  className={cn(
                    "px-3 py-1.5 text-xs sm:text-sm transition-colors rounded-full",
                    isSelected
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span>{c.label}</span>
                  <span className="ml-1.5 opacity-60 text-[11px] font-mono">
                    {c.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Minimal Search Line */}
          <div className="relative w-full lg:w-72">
            <Search
              aria-hidden="true"
              className="absolute left-0 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs…"
              aria-label="Search programs"
              className="w-full h-9 pl-6 pr-6 bg-transparent border-b border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground transition-colors"
            />
            {query.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Secondary: Quick Filter & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {QUICK_FILTERS.map((qf) => {
              const isSelected = quickFilter === qf.key
              return (
                <button
                  key={qf.key}
                  type="button"
                  onClick={() => setQuickFilter(qf.key)}
                  className={cn(
                    "px-2.5 py-1 text-xs transition-colors rounded-md",
                    isSelected
                      ? "bg-muted text-foreground font-medium"
                      : "hover:text-foreground"
                  )}
                >
                  {qf.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              aria-label="Sort programs"
              className="bg-transparent text-xs text-muted-foreground hover:text-foreground outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="duration-asc">Shortest duration</option>
              <option value="duration-desc">Longest duration</option>
              <option value="name">Alphabetical</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Courses Display */}
      {filteredCourses.length === 0 ? (
        <div className="w-full py-16 text-center">
          <p className="text-sm text-muted-foreground">No matching programs found.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 text-xs font-medium text-foreground underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* ========================================================================= */
        /* MINIMALIST COURSE LIST                                                    */
        /* ========================================================================= */
        <div className="divide-y divide-border/60">
          {filteredCourses.map((course, idx) => {
            const meta = course.category ? CATEGORY_META[course.category] : null
            const imageUrl = getImageUrl(course.heroImage, 600, 380)
            const imageAlt = getImageAlt(course.heroImage, course.title)
            const isCompared = selectedForComparison.includes(course.id)

            // 1-sentence clean summary (limit text)
            const cleanSummary =
              course.summary ||
              (course.description ? course.description.split(".")[0] + "." : "")

            const roles = (course.careerPaths || course.outcomes || []).slice(0, 2)

            return (
              <article
                key={course.id}
                className={cn(
                  "py-8 sm:py-10 transition-colors group",
                  isCompared && "bg-muted/20"
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left: Minimal Index & Info (9 cols) */}
                  <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-3">
                    {/* Meta line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono text-xs font-semibold text-foreground/80">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>·</span>
                      <span className="uppercase tracking-wider text-[11px] font-medium">
                        {meta?.label || course.category}
                      </span>
                      <span>·</span>
                      <span>{course.duration}</span>
                      {course.scholarshipsAvailable && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Vouchers Accepted
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <Link href={`/courses/${course.slug}`}>
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground group-hover:underline underline-offset-4 transition-all">
                        {course.title}
                      </h2>
                    </Link>

                    {/* 1-Sentence Concise Summary */}
                    {cleanSummary && (
                      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
                        {cleanSummary}
                      </p>
                    )}

                    {/* Minimal Inline Career Tags & Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                      {roles.length > 0 && (
                        <div className="text-muted-foreground/80 text-[11px] hidden sm:flex items-center gap-1.5">
                          <span className="text-muted-foreground/60">Careers:</span>
                          <span>{roles.join(" · ")}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-4 ml-auto sm:ml-0">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-foreground hover:underline underline-offset-4"
                        >
                          <span>View program</span>
                          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleComparison(course.id)}
                          className={cn(
                            "text-xs transition-colors",
                            isCompared
                              ? "text-primary font-medium"
                              : "text-muted-foreground/70 hover:text-foreground"
                          )}
                        >
                          {isCompared ? "Selected [✓]" : "+ Compare"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Clean Minimal Thumbnail (3 cols) */}
                  <div className="md:col-span-4 lg:col-span-3">
                    <Link href={`/courses/${course.slug}`} className="block overflow-hidden rounded-md bg-muted aspect-[16/10]">
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-90"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
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

