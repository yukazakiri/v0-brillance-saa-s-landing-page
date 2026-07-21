import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import type { Course } from "@/lib/sanity/types"
import { getImageAlt, getImageUrl } from "@/lib/sanity/image"
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

  if (variant === "compact") {
    return (
      <Link
        href={`/courses/${course.slug}`}
        className="group block h-full rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <Card
          className={cn(
            "h-full overflow-hidden transition-colors duration-200 group-hover:border-primary/35 group-hover:bg-card/80 motion-reduce:transition-none",
            className
          )}
        >
          <CardHeader className="gap-4 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary" className="max-w-full truncate text-[10px] uppercase tracking-wider">
                {course.credential || "Program"}
              </Badge>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Clock aria-hidden="true" className="size-3.5" />
                {course.duration}
              </span>
            </div>
            <h4 className="text-pretty font-serif text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              {course.title}
            </h4>
          </CardHeader>
          <CardContent className="mt-auto px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
            {course.highlights?.[0] ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.highlights[0]}</p>
            ) : course.description ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.description}</p>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">View program details and requirements.</p>
            )}
          </CardContent>
          <CardFooter className="mt-auto justify-between border-t border-border px-5 py-4 text-sm font-semibold text-foreground sm:px-6">
            View program
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </CardFooter>
        </Card>
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0px_12px_34px_rgba(55,50,47,0.12)]",
        className
      )}
    >
      <div className="relative">
        <img src={imageUrl} alt={imageAlt} className="h-[170px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
              {course.credential || "Program"}
            </Badge>
            {course.scholarshipsAvailable && (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-background/70">
                Scholarship
              </Badge>
            )}
            {priorityTag && (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-background/70">
                {priorityTag}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 sm:p-7">

        <div className="space-y-2">
          <h3 className="text-foreground text-lg sm:text-xl font-semibold font-serif leading-tight tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/courses/${course.slug}`} className="focus:outline-none">
              {course.title}
            </Link>
          </h3>
          {course.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {course.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </div>
          {course.highlights?.slice(0, 2).map((highlight, idx) => (
            <span
              key={`${course.id}-highlight-${idx}`}
              className="text-xs px-2.5 py-1 rounded-full border border-border/60 bg-secondary/15 text-foreground/90"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-border bg-card/70 px-6 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors"
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {showContactActions && (contact?.phone || contact?.email) && (
            <div className="flex items-center gap-2">
              {contact?.phone && (
                <Button asChild size="sm" className="px-3">
                  <a href={`tel:${contact.phone}`}>Call</a>
                </Button>
              )}
              {contact?.email && (
                <Button asChild size="sm" variant="outline" className="px-3">
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
