"use client"

import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  Trash2,
  X,
} from "lucide-react"

import type { Course } from "@/lib/sanity/types"
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

type CourseComparisonModalProps = {
  courses: Course[]
  isOpen: boolean
  onClose: () => void
  onRemoveCourse: (id: string) => void
  onClearAll: () => void
}

const CATEGORY_NAMES: Record<string, string> = {
  ched: "College Degree (CHED)",
  tesda: "Tech-Voc (TESDA)",
  shs: "Senior High (DepEd)",
  short: "Short Course",
}

export default function CourseComparisonModal({
  courses,
  isOpen,
  onClose,
  onRemoveCourse,
  onClearAll,
}: CourseComparisonModalProps) {
  if (courses.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto p-0 border border-border bg-card text-card-foreground shadow-2xl rounded-2xl"
        from="bottom"
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-md px-6 py-4">
            <div>
              <DialogTitle className="font-serif text-2xl font-bold text-foreground">
                Compare Programs Side-by-Side
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Review requirements, duration, credentials, and career pathways to choose your best fit.
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Clear All
              </Button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close comparison"
                className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto p-6">
            <div className="min-w-[680px]">
              {/* Top row: Titles and Removal */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 border-b border-border pb-6 items-start">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-2">
                  Program Details
                </div>
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-xl border border-border bg-muted/30 p-4 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => onRemoveCourse(course.id)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors"
                      title="Remove from comparison"
                      aria-label={`Remove ${course.title}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>

                    <div className="pr-6">
                      <span className="font-mono text-[10px] uppercase font-semibold text-primary block mb-1">
                        {CATEGORY_NAMES[course.category] || course.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-foreground leading-snug">
                        {course.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex flex-col gap-2">
                      <Button asChild size="sm" className="w-full text-xs">
                        <Link href={`/courses/${course.slug}`}>
                          <span>View Course</span>
                          <ArrowRight className="size-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row: Credential Awarded */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Award className="size-3.5 text-primary" />
                  Credential
                </div>
                {courses.map((course) => (
                  <div key={course.id} className="font-mono font-medium text-foreground">
                    <Badge variant="outline" className="text-[11px] font-semibold">
                      {course.credential || "Accredited Program"}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Row: Duration */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5 text-primary" />
                  Duration
                </div>
                {courses.map((course) => (
                  <div key={course.id} className="font-medium text-foreground">
                    {course.duration}
                  </div>
                ))}
              </div>

              {/* Row: Study Load / Units */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground flex items-center gap-1.5">
                  <GraduationCap className="size-3.5 text-primary" />
                  Study Load
                </div>
                {courses.map((course) => (
                  <div key={course.id} className="text-foreground">
                    {course.creditHours
                      ? `${course.creditHours} Total Units`
                      : course.trainingHours ?? "Standard Load"}
                  </div>
                ))}
              </div>

              {/* Row: Delivery Mode */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground">Delivery</div>
                {courses.map((course) => (
                  <div key={course.id} className="text-foreground font-medium">
                    {course.deliveryMode || "On Campus"}
                  </div>
                ))}
              </div>

              {/* Row: Financial Aid & Voucher */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-primary" />
                  Scholarships & Aid
                </div>
                {courses.map((course) => (
                  <div key={course.id} className="text-muted-foreground text-[11px] leading-relaxed">
                    {course.scholarshipsAvailable ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 mb-1 block">
                        <CheckCircle2 className="size-3" />
                        Eligible for Subsidy / Grant
                      </span>
                    ) : null}
                    {course.tuition || "Contact admissions for tuition details."}
                  </div>
                ))}
              </div>

              {/* Row: Key Highlights */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground">Highlights</div>
                {courses.map((course) => (
                  <ul key={course.id} className="space-y-1.5">
                    {(course.highlights || []).slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-muted-foreground text-[11px] leading-snug">
                        <span className="size-1 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>

              {/* Row: Career Roles */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 py-4 border-b border-border/70 text-xs">
                <div className="font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-primary" />
                  Career Outcomes
                </div>
                {courses.map((course) => {
                  const roles = course.careerPaths || course.outcomes || []
                  return (
                    <div key={course.id} className="flex flex-wrap gap-1">
                      {roles.slice(0, 4).map((r, i) => (
                        <span
                          key={i}
                          className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground font-medium"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )
                })}
              </div>

              {/* Bottom Actions */}
              <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(220px,1fr))] gap-4 pt-6">
                <div />
                {courses.map((course) => (
                  <div key={course.id} className="flex flex-col gap-2">
                    <Button asChild size="sm" className="w-full">
                      <Link href="/apply">
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
