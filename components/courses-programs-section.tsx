"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import ContactCtaBar from "@/components/contact-cta-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "@/lib/sanity/types";
import { getImageAlt, getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

type CoursesAndProgramsSectionProps = {
  courses?: Course[];
  contact?: {
    phone?: string;
    email?: string;
  };
};

type ProgramCategory = {
  id: Course["category"];
  label: string;
  heading: string;
  badge: string;
  description: string;
  programs: Course[];
};

const CATEGORY_DETAILS: Array<Omit<ProgramCategory, "programs">> = [
  {
    id: "ched",
    label: "College Degrees",
    badge: "CHED Accredited",
    heading: "Build your future with a government-recognized bachelor degree.",
    description:
      "Four-year college pathways in Information Technology, Business Administration, and Hospitality Management with intensive hands-on labs and 480+ hours of supervised industry immersion.",
  },
  {
    id: "tesda",
    label: "TESDA Tech-Voc",
    badge: "National Certificates",
    heading: "Turn practical skill into direct job qualification.",
    description:
      "Competency-based technical and vocational training with TESDA National Certificate (NC II / NC III) assessments in computer servicing, graphic design, food service, and artisan baking.",
  },
  {
    id: "shs",
    label: "Senior High",
    badge: "100% DepEd Voucher",
    heading: "Start strong with subsidized Senior High tracks.",
    description:
      "Grades 11–12 TVL and Academic tracks fully eligible for the DepEd PEAC ESC Voucher Scheme, providing zero or minimal tuition top-up for public school graduates.",
  },
  {
    id: "short",
    label: "Short Courses",
    badge: "Modular Skills",
    heading: "Upgrade your capabilities in less time.",
    description:
      "Focused 60-hour modular certifications in digital office tools, spreadsheets, and cloud workspaces designed for working adults and remote professionals.",
  },
];

function ProgramCard({ program }: { program: Course }) {
  const imageUrl = getImageUrl(program.heroImage, 600, 340);
  const imageAlt = getImageAlt(program.heroImage, program.title);
  const studyLoad = program.creditHours
    ? `${program.creditHours} Units`
    : program.trainingHours ?? "Standard Load";

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div>
        {/* Card Thumbnail */}
        <div className="relative h-44 w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
            <Badge variant="outline" className="bg-background/85 font-mono text-[10px] uppercase backdrop-blur-md">
              {program.credential || "Program"}
            </Badge>

            {program.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 text-white backdrop-blur-md px-2 py-0.5 text-[10px] font-bold shadow-xs">
                <Sparkles className="size-3" />
                {program.badge}
              </span>
            )}
          </div>

          {/* Duration tag bottom-left */}
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 text-[11px] font-medium text-foreground bg-background/80 backdrop-blur-md px-2 py-0.5 rounded-md">
            <Clock className="size-3 text-primary" />
            <span>{program.duration}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col gap-3">
          <Link href={`/courses/${program.slug}`} className="outline-none focus-visible:underline">
            <h4 className="font-serif text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
              {program.title}
            </h4>
          </Link>

          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {program.description ||
              program.highlights?.[0] ||
              "In-depth career-focused curriculum with hands-on labs and supervised regional industry practicums."}
          </p>

          {/* Key Metric Facts */}
          <div className="grid grid-cols-2 gap-2 border-y border-border/60 py-2 text-[11px] text-muted-foreground">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground/80 font-medium">Load</span>
              <span className="font-semibold text-foreground truncate">{studyLoad}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground/80 font-medium">Delivery</span>
              <span className="font-semibold text-foreground truncate">{program.deliveryMode || "On Campus"}</span>
            </div>
          </div>

          {/* Career tags */}
          {((program.careerPaths && program.careerPaths.length > 0) ||
            (program.outcomes && program.outcomes.length > 0)) && (
            <div className="flex flex-wrap gap-1 pt-1">
              {((program.careerPaths && program.careerPaths.length > 0
                ? program.careerPaths
                : program.outcomes) || [])
                .slice(0, 2)
                .map((role, i) => (
                  <span
                    key={`${role}-${i}`}
                    className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground font-medium"
                  >
                    {role}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-border/70 bg-muted/20 flex items-center justify-between">
        <span className="text-xs font-semibold text-primary group-hover:underline">
          Explore Program
        </span>
        <ArrowRight className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </article>
  );
}

export default function CoursesAndProgramsSection({
  courses = [],
  contact,
}: CoursesAndProgramsSectionProps) {
  const programCategories = useMemo(() => {
    return CATEGORY_DETAILS.map((category) => ({
      ...category,
      programs: courses.filter((course) => course.category === category.id),
    })).filter((category) => category.programs.length > 0);
  }, [courses]);

  const defaultCategory = programCategories[0]?.id ?? "ched";

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="w-full scroll-mt-24 border-y border-border bg-background/50"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        {programCategories.length > 0 ? (
          <Tabs defaultValue={defaultCategory} className="w-full gap-0">
            {/* Header Control Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <GraduationCap className="size-3.5" />
                    Curriculum Pathways · DCCP Baguio
                  </span>
                </div>
                <h2
                  id="programs-heading"
                  className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                >
                  Academic Offerings & Programs
                </h2>
                <p className="mt-1 text-sm text-muted-foreground max-w-[55ch]">
                  Select a pathway to explore accredited degrees, technical-vocational credentials, and subsidized senior high tracks.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="outline" size="sm" className="rounded-xl font-semibold">
                  <Link href="/courses">
                    <span>Explore Full Directory</span>
                    <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Category Tab List */}
            <div className="mt-6 overflow-x-auto pb-2">
              <TabsList
                aria-label="Academic pathways"
                className="inline-flex h-11 items-center gap-1 rounded-xl bg-muted p-1 text-muted-foreground"
              >
                {programCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                  >
                    <span>{category.label}</span>
                    <span className="ml-1.5 rounded-full bg-muted-foreground/15 px-1.5 py-0.2 text-[10px] font-mono">
                      {category.programs.length}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Contents */}
            {programCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                {/* Category Banner */}
                <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                      <Sparkles className="size-3" />
                      {category.badge}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                      {category.heading}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <Button asChild size="sm" variant="default" className="shrink-0 rounded-xl font-semibold">
                    <Link href={`/courses?category=${category.id}`}>
                      <span>View All {category.label}</span>
                      <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>

                {/* Program Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.programs.slice(0, 3).map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
              </TabsContent>
            ))}

            <ContactCtaBar
              dense
              showSms={false}
              title="Not sure which path fits?"
              subtitle="Talk with admissions about interests, requirements, schedules, and next steps."
              phone={contact?.phone}
              email={contact?.email}
              className="mt-12 bg-card"
            />
          </Tabs>
        ) : (
          <div className="border-y border-border px-1 py-12 text-center">
            <h2
              id="programs-heading"
              className="font-serif text-3xl font-semibold text-foreground"
            >
              Academic programs directory
            </h2>
            <p className="mt-3 max-w-[60ch] mx-auto text-sm leading-relaxed text-muted-foreground sm:text-base">
              Admissions counselors are available to review current program offerings, scholarships, and schedules.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/courses">Browse Course Catalog</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

