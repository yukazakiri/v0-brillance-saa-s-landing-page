"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Search, X } from "lucide-react";

import type { Course } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CourseMagazineProps = {
  courses: Course[];
  contact?: {
    phone?: string;
    email?: string;
  };
  initialCategory?: string;
};

type CategoryKey = "all" | Course["category"];

const CATEGORY_LABELS: Record<Course["category"], string> = {
  ched: "College",
  tesda: "TESDA",
  shs: "Senior High",
  short: "Short Courses",
};

function normalizeCategory(value?: string): CategoryKey {
  if (
    value === "ched" ||
    value === "tesda" ||
    value === "shs" ||
    value === "short"
  )
    return value;
  return "all";
}

function getCourseCategoryLabel(course: Course) {
  return CATEGORY_LABELS[course.category] ?? "Academic program";
}

export default function CourseMagazine({
  courses,
  contact,
  initialCategory,
}: CourseMagazineProps) {
  const [category, setCategory] = useState<CategoryKey>(
    normalizeCategory(initialCategory),
  );
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const available = (
      Object.keys(CATEGORY_LABELS) as Course["category"][]
    ).filter((key) => courses.some((course) => course.category === key));

    return [
      { key: "all" as const, label: "All programs" },
      ...available.map((key) => ({ key, label: CATEGORY_LABELS[key] })),
    ];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      if (category !== "all" && course.category !== category) return false;
      if (!normalizedQuery) return true;

      return [
        course.title,
        course.description ?? "",
        course.credential ?? "",
        course.duration,
        ...(course.highlights ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [category, courses, query]);

  const resetDirectory = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 border-b border-border pb-8 md:gap-10 md:pb-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="program-directory-heading"
              className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Program directory
            </h2>
            <p
              aria-live="polite"
              className="mt-2 text-sm text-muted-foreground"
            >
              {filteredCourses.length} result
              {filteredCourses.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="relative w-full md:max-w-[420px]">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search programs"
              aria-label="Search programs"
              className="h-11 bg-background pl-10 pr-10"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-1"
          aria-label="Filter programs by pathway"
        >
          {categories.map((item) => (
            <Button
              key={item.key}
              type="button"
              size="sm"
              variant={category === item.key ? "default" : "ghost"}
              aria-pressed={category === item.key}
              onClick={() => setCategory(item.key)}
              className={cn(
                "shrink-0",
                category !== item.key &&
                  "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <ol className="divide-y divide-border border-b border-border">
          {filteredCourses.map((course, index) => (
            <li key={course.id}>
              <Link
                href={`/courses/${course.slug}`}
                className="group grid gap-5 py-7 outline-none transition-colors hover:bg-muted/35 focus-visible:bg-muted/35 focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-start sm:px-3 md:gap-8 md:py-9"
              >
                <span className="hidden pt-1 font-mono text-xs text-muted-foreground sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{getCourseCategoryLabel(course)}</span>
                    {course.credential && <span>{course.credential}</span>}
                  </div>
                  <h3 className="mt-3 max-w-[32ch] text-pretty font-serif text-2xl font-semibold leading-[1.08] tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl md:text-4xl">
                    {course.title}
                  </h3>

                  <div className="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-visible:grid-rows-[1fr] md:group-focus-visible:opacity-100">
                    <div className="overflow-hidden">
                      <div className="grid gap-5 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end md:pt-6">
                        <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {course.description ??
                            "Speak with admissions for a concise overview of this program."}
                        </p>
                        <dl className="grid grid-cols-2 gap-x-7 gap-y-2 border-l-0 border-border text-sm sm:border-l sm:pl-6">
                          <div>
                            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                              Duration
                            </dt>
                            <dd className="mt-1 font-medium text-foreground">
                              {course.duration}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                              {course.creditHours
                                ? "Total units"
                                : "Training hours"}
                            </dt>
                            <dd className="mt-1 font-medium text-foreground">
                              {course.creditHours
                                ? `${course.creditHours} units`
                                : (course.trainingHours ?? "Not listed")}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:mt-2">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">View {course.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="border-b border-border py-16 text-center sm:py-20">
          <h3 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            No matching programs
          </h3>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            Try another search or return to the complete directory.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={resetDirectory}
            className="mt-6"
          >
            View all programs
          </Button>
        </div>
      )}

      {(contact?.phone || contact?.email) && (
        <div className="flex flex-col gap-5 border-b border-border py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Need help choosing?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Admissions can help you compare the right next steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {contact.phone && (
              <Button asChild>
                <a href={`tel:${contact.phone}`}>
                  <Phone aria-hidden="true" />
                  Call admissions
                </a>
              </Button>
            )}
            {contact.email && (
              <Button asChild variant="outline">
                <a href={`mailto:${contact.email}`}>
                  <Mail aria-hidden="true" />
                  Email admissions
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
