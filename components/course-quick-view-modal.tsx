"use client"

import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Sparkles,
  X,
} from "lucide-react"

import type { Course } from "@/lib/sanity/types"
import { getImageAlt, getImageUrl } from "@/lib/sanity/image"
import {
  formatCourseDeliveryMode,
  hasCourseFinancialAidInfo,
} from "@/lib/sanity/course-formatters"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog"

type CourseQuickViewModalProps = {
  course: Course | null
  isOpen: boolean
  onClose: () => void
}

const CATEGORY_COLORS: Record<string, { badge: string; text: string; bg: string; border: string }> = {
  ched: {
    badge: "CHED degree",
    text: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  tesda: {
    badge: "TESDA qualification",
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  shs: {
    badge: "Senior High",
    text: "text-purple-700 dark:text-purple-300",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  short: {
    badge: "Short course",
    text: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
}

export default function CourseQuickViewModal({ course, isOpen, onClose }: CourseQuickViewModalProps) {
  if (!course) return null

  const catMeta = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.ched
  const imageUrl = getImageUrl(course.heroImage, 1000, 500)
  const imageAlt = getImageAlt(course.heroImage, course.title)
  const studyLoad = course.creditHours ? `${course.creditHours} Total Units` : course.trainingHours ?? "Not listed"
  const description = course.summary
  const applyHref = course.cta?.url || "/apply"
  const applyLabel = course.cta?.label || "Apply for Program"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto p-0 border border-border bg-card text-card-foreground shadow-2xl rounded-2xl sm:rounded-2xl"
        from="bottom"
      >
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-muted">
            <img src={imageUrl} alt={imageAlt} width={1000} height={500} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md bg-background/80 shadow-xs", catMeta.border, catMeta.text)}>
                  {catMeta.badge}
                </span>
                {course.credential && (
                  <Badge variant="outline" className="bg-background/80 font-mono text-[11px] backdrop-blur-md shadow-xs">
                    {course.credential}
                  </Badge>
                )}
                {hasCourseFinancialAidInfo(course) && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 backdrop-blur-md px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <Sparkles className="size-3" />
                    Financial aid info
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-background/80 backdrop-blur-md text-foreground hover:bg-background transition-colors shadow-xs"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Title on image gradient bottom */}
            <div className="absolute bottom-4 left-5 right-5 z-10">
              <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
                {course.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {description || course.title}
              </DialogDescription>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 divide-border border-b border-border bg-muted/40 text-xs">
            <div className="p-3.5 flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                <Clock className="size-3 text-primary" />
                Duration
              </span>
              <span className="font-semibold text-foreground truncate">{course.duration}</span>
            </div>
            <div className="p-3.5 flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                <GraduationCap className="size-3 text-primary" />
                Study Load
              </span>
              <span className="font-semibold text-foreground truncate">{studyLoad}</span>
            </div>
            <div className="p-3.5 flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                <MapPin className="size-3 text-primary" />
                Delivery
              </span>
              <span className="font-semibold text-foreground truncate">{formatCourseDeliveryMode(course.deliveryMode)}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-7 flex flex-col gap-6">
            {/* Description */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Overview
              </h3>
              {description && (
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  {description}
                </p>
              )}
            </div>

            {/* Highlights */}
            {course.highlights && course.highlights.length > 0 && (
              <div className="rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                  <Sparkles className="size-3.5 text-primary" />
                  Key Highlights & Competencies
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {course.highlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                      <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span className="leading-normal">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Opportunities */}
            {((course.careerPaths && course.careerPaths.length > 0) || (course.outcomes && course.outcomes.length > 0)) && (
              <div>
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                  <Briefcase className="size-3.5 text-primary" />
                  Target Careers & Industry Roles
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {((course.careerPaths && course.careerPaths.length > 0 ? course.careerPaths : course.outcomes) || []).map((role, i) => (
                    <span
                      key={`${role}-${i}`}
                      className="inline-flex rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tuition & Financial Aid info */}
            {(course.tuition || course.financialAidHighlight) && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs">
                <span className="font-semibold text-primary block mb-1">
                  Tuition & Financial Assistance:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {[course.tuition, course.financialAidHighlight].filter(Boolean).join(" ")}
                </p>
              </div>
            )}

            {/* Footer Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href={`/courses/${course.slug}`}>
                  <BookOpen className="size-4 mr-2" />
                  <span>View Full Curriculum & Roadmap</span>
                </Link>
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={applyHref}>
                    <span>{applyLabel}</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
