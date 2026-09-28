"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  Grid,
  List,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react"

import type { Course } from "@/lib/sanity/types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type CourseCatalogProps = {
  courses: Course[]
  initialCategory?: string
  contact?: {
    phone?: string
    email?: string
  }
}

type CategoryKey = "all" | "ched" | "tesda" | "shs" | "short"

const CATEGORY_META: Record<
  Exclude<CategoryKey, "all">,
  { label: string; badge: string; description: string; color: string }
> = {
  ched: {
    label: "College Degrees",
    badge: "CHED Accredited",
    description: "4-year bachelor degree programs leading to professional careers and certifications.",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  },
  tesda: {
    label: "TESDA Tech-Voc",
    badge: "TESDA Registered",
    description: "Competency-based technical and vocational training with National Certification (NC II).",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  shs: {
    label: "Senior High",
    badge: "DepEd Recognized",
    description: "Grades 11-12 academic and technical-vocational-livelihood tracks with voucher subsidies.",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  },
  short: {
    label: "Short Courses",
    badge: "Modular Training",
    description: "Fast-track skills certificates for working professionals and career shifters.",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
}

function normalizeCategory(value?: string): CategoryKey {
  if (!value) return "all"
  const v = value.toLowerCase()
  if (v === "ched" || v === "shs" || v === "tesda" || v === "short") return v
  return "all"
}

export default function CourseCatalog({ courses, initialCategory, contact }: CourseCatalogProps) {
  const [category, setCategory] = useState<CategoryKey>(normalizeCategory(initialCategory))
  const [credentialFilter, setCredentialFilter] = useState<string>("all")
  const [deliveryFilter, setDeliveryFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()

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

  const credentials = useMemo(() => {
    const set = new Set<string>()
    for (const c of courses) {
      if (c.credential) set.add(c.credential)
    }
    return Array.from(set)
  }, [courses])

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (category !== "all" && course.category !== category) return false
      if (credentialFilter !== "all" && course.credential !== credentialFilter) return false
      if (deliveryFilter !== "all") {
        const mode = (course.deliveryMode || "").toLowerCase()
        if (deliveryFilter === "on-campus" && !mode.includes("campus")) return false
        if (deliveryFilter === "modular" && !mode.includes("modular")) return false
      }
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
      ]
        .join(" ")
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [category, credentialFilter, deliveryFilter, courses, normalizedQuery])

  const resetFilters = () => {
    setCategory("all")
    setCredentialFilter("all")
    setDeliveryFilter("all")
    setQuery("")
  }

  const hasActiveFilters =
    category !== "all" || credentialFilter !== "all" || deliveryFilter !== "all" || Boolean(normalizedQuery)

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-sm p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Course Catalog & Explorer
              </h2>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Showing {filteredCourses.length} of {courses.length} accredited program{courses.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="relative w-full lg:w-[420px]">
              <Search aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, career role, or keyword..."
                aria-label="Search programs"
                className="w-full h-11 rounded-lg border border-border bg-background/80 pl-10 pr-10 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <Button
                  key={c.key}
                  type="button"
                  size="sm"
                  variant={category === c.key ? "default" : "outline"}
                  className={cn(
                    "h-9 rounded-full px-4 text-xs font-medium transition-all",
                    category === c.key
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-background/60 hover:bg-accent"
                  )}
                  onClick={() => setCategory(c.key)}
                >
                  {c.label}
                  <span
                    className={cn(
                      "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]",
                      category === c.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {c.count}
                  </span>
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {credentials.length > 1 && (
                <select
                  value={credentialFilter}
                  onChange={(e) => setCredentialFilter(e.target.value)}
                  aria-label="Filter by credential"
                  className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="all">All Credentials</option>
                  {credentials.map((cred) => (
                    <option key={cred} value={cred}>
                      {cred}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={deliveryFilter}
                onChange={(e) => setDeliveryFilter(e.target.value)}
                aria-label="Filter by delivery mode"
                className="h-9 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Delivery Modes</option>
                <option value="on-campus">On Campus</option>
                <option value="modular">Weekend / Modular</option>
              </select>

              <div className="hidden sm:flex items-center rounded-lg border border-border bg-background p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors",
                    viewMode === "grid" && "bg-muted text-foreground shadow-xs"
                  )}
                >
                  <Grid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors",
                    viewMode === "list" && "bg-muted text-foreground shadow-xs"
                  )}
                >
                  <List className="size-4" />
                </button>
              </div>

              {hasActiveFilters && (
                <Button type="button" variant="ghost" size="sm" onClick={resetFilters} className="h-9 text-xs text-muted-foreground hover:text-foreground">
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="w-full rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
            <BookOpen className="size-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">No matching courses found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-[45ch] mx-auto">
            Try adjusting your search terms or filters to explore our available college degrees and vocational programs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button type="button" variant="default" onClick={resetFilters}>
              Clear All Filters
            </Button>
            {contact?.email && (
              <Button type="button" variant="outline" asChild>
                <a href={`mailto:${contact.email}`}>Ask Admissions</a>
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const meta = course.category && course.category !== "all" ? CATEGORY_META[course.category as Exclude<CategoryKey, "all">] : null
            const studyUnits = course.creditHours ? `${course.creditHours} Units` : course.trainingHours ?? "Standard Load"

            return (
              <div
                key={course.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card/85 p-6 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {meta && (
                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-tight", meta.color)}>
                          {meta.badge}
                        </span>
                      )}
                      {course.credential && (
                        <Badge variant="outline" className="font-mono text-[10px] uppercase font-semibold">
                          {course.credential}
                        </Badge>
                      )}
                    </div>
                    {course.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                        <Sparkles className="size-3" />
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <Link href={`/courses/${course.slug}`} className="outline-none focus-visible:underline">
                      <h3 className="font-serif text-2xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {course.description || "In-depth career-focused curriculum with hands-on labs and supervised regional industry practicums."}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-y border-border/70 py-3 text-xs text-muted-foreground">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        <Clock className="size-3 text-primary" />
                        Duration
                      </span>
                      <span className="font-semibold text-foreground truncate">{course.duration}</span>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        <GraduationCap className="size-3 text-primary" />
                        Curriculum
                      </span>
                      <span className="font-semibold text-foreground truncate">{studyUnits}</span>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
                        <MapPin className="size-3 text-primary" />
                        Delivery
                      </span>
                      <span className="font-semibold text-foreground truncate">{course.deliveryMode || "On Campus"}</span>
                    </div>
                  </div>

                  {((course.careerPaths && course.careerPaths.length > 0) || (course.outcomes && course.outcomes.length > 0)) && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-foreground">
                        <Briefcase className="size-3 text-muted-foreground" />
                        Career Opportunities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {((course.careerPaths && course.careerPaths.length > 0 ? course.careerPaths : course.outcomes) || [])
                          .slice(0, 3)
                          .map((role, i) => (
                            <span
                              key={`${role}-${i}`}
                              className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                            >
                              {role}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 border-t border-border/70 flex items-center justify-between gap-3">
                  <Button variant="outline" size="sm" asChild className="w-full justify-between group-hover:border-primary group-hover:text-primary transition-all">
                    <Link href={`/courses/${course.slug}`}>
                      <span>Explore Program</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
          {filteredCourses.map((course) => (
            <div key={course.id} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:bg-muted/30 transition-colors">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px] uppercase">
                    {course.credential || "Program"}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {course.duration}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{course.deliveryMode || "On Campus"}</span>
                </div>
                <Link href={`/courses/${course.slug}`} className="hover:text-primary transition-colors">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">{course.title}</h3>
                </Link>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {course.description || "Practical degree and technical certificate path designed for direct workforce integration."}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button size="sm" asChild>
                  <Link href={`/courses/${course.slug}`} className="gap-1.5">
                    <span>View Details</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Award className="size-3.5" />
            Admissions Consultation
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Need help choosing your path?</h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Our Baguio admissions counselors provide personal degree mapping, credit evaluation for transferees, and government scholarship guidance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {contact?.phone && (
            <Button variant="outline" asChild className="gap-2">
              <a href={`tel:${contact.phone}`}>
                <Phone className="size-4" />
                <span>Call Admissions</span>
              </a>
            </Button>
          )}
          {contact?.email && (
            <Button asChild className="gap-2">
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
