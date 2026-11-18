import Link from "next/link"
import { ArrowRight, Clock, Sparkles } from "lucide-react"

import type { Course } from "@/lib/sanity/types"
import { getImageAlt, getImageUrl } from "@/lib/sanity/image"
import { hasCourseFinancialAidInfo } from "@/lib/sanity/course-formatters"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type CourseCardProps = {
  course: Course
  className?: string
  contact?: {
    phone?: string
    email?: string
  }
  showContactActions?: boolean
  priorityTag?: string
  variant?: "default" | "compact"
}

const CATEGORY_COLORS: Record<string, string> = {
  ched: "border-blue-500/30 text-blue-700 dark:text-blue-300 bg-blue-500/10",
  tesda: "border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10",
  shs: "border-purple-500/30 text-purple-700 dark:text-purple-300 bg-purple-500/10",
  short: "border-amber-500/30 text-amber-700 dark:text-amber-300 bg-amber-500/10",
}

export default function CourseCard({
  course,
  className,
  contact,
  showContactActions = false,
  priorityTag,
  variant = "default",
}: CourseCardProps) {
  const imageUrl = getImageUrl(course.heroImage, 1200, 675)
  const imageAlt = getImageAlt(course.heroImage, course.title)
  const catStyle = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.ched

  if (variant === "compact") {
    return (
      <Link
        href={`/courses/${course.slug}`}
        className="group block h-full rounded-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <Card
          className={cn(
            "h-full overflow-hidden transition-all duration-200 group-hover:border-primary/40 group-hover:bg-card/90 hover:shadow-md",
            className
          )}
        >
          <CardHeader className="gap-3 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider", catStyle)}>
                {course.credential || "Program"}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Clock aria-hidden="true" className="size-3.5 text-primary" />
                {course.duration}
              </span>
            </div>
            <h4 className="text-pretty font-serif text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {course.title}
            </h4>
          </CardHeader>
          <CardContent className="mt-auto px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
            {course.highlights?.[0] ? (
              <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{course.highlights[0]}</p>
            ) : course.summary ? (
              <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
            ) : (
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">View program details and requirements.</p>
            )}
          </CardContent>
          <CardFooter className="mt-auto justify-between border-t border-border px-5 py-3.5 text-xs font-semibold text-primary sm:px-6">
            Explore program
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </CardFooter>
        </Card>
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl",
        className
      )}
    >
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
        <div className="absolute left-3 top-3 right-3 flex items-start justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-background/80", catStyle)}>
              {course.credential || "Program"}
            </span>
            {hasCourseFinancialAidInfo(course) && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 backdrop-blur-md">
                <Sparkles className="size-2.5" />
                Financial aid info
              </span>
            )}
            {priorityTag && (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-background/80 backdrop-blur-md">
                {priorityTag}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">
        <div className="space-y-1.5">
          <h3 className="text-foreground text-lg sm:text-xl font-bold font-serif leading-snug tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/courses/${course.slug}`} className="focus:outline-none">
              {course.title}
            </Link>
          </h3>
          {course.summary && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {course.summary}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 mt-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            <Clock className="size-3 text-primary" />
            {course.duration}
          </div>
          {course.highlights?.slice(0, 2).map((highlight, idx) => (
            <span
              key={`${course.id}-highlight-${idx}`}
              className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground truncate max-w-[200px]"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-border bg-muted/20 px-5 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
          >
            Explore Program
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {showContactActions && (contact?.phone || contact?.email) && (
            <div className="flex items-center gap-1.5">
              {contact?.phone && (
                <Button asChild size="sm" variant="outline" className="h-8 px-2.5 text-xs">
                  <a href={`tel:${contact.phone}`}>Call</a>
                </Button>
              )}
              {contact?.email && (
                <Button asChild size="sm" variant="outline" className="h-8 px-2.5 text-xs">
                  <a href={`mailto:${contact.email}`}>Email</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

