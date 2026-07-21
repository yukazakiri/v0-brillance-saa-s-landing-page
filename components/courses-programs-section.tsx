"use client";

import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

import ContactCtaBar from "@/components/contact-cta-bar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Course } from "@/lib/sanity/types";
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
  description: string;
  programs: Course[];
};

const CATEGORY_DETAILS: Array<Omit<ProgramCategory, "programs">> = [
  {
    id: "ched",
    label: "College",
    heading: "Choose where you want to make an impact.",
    description:
      "Three degree pathways. Countless opportunities. One college that helps you go further.",
  },
  {
    id: "tesda",
    label: "TESDA",
    heading: "Turn practical skill into opportunity.",
    description:
      "Industry-recognized training for students ready to build confidence through hands-on learning.",
  },
  {
    id: "shs",
    label: "Senior High",
    heading: "Build a strong foundation for what comes next.",
    description:
      "Senior High School pathways designed for college readiness, technical training, and future careers.",
  },
  {
    id: "short",
    label: "Short Courses",
    heading: "Learn something useful in less time.",
    description:
      "Focused courses for developing practical skills and moving toward a clear next step.",
  },
];

const PROGRAM_THEMES = [
  {
    pattern: /business|financial|finance/i,
    statement: "Build businesses.",
    fallbackAcronym: "BSBA",
  },
  {
    pattern: /hotel|restaurant|hospitality|tourism/i,
    statement: "Create experiences.",
    fallbackAcronym: "BSHRM",
  },
  {
    pattern: /information technology|computer|software|digital/i,
    statement: "Shape technology.",
    fallbackAcronym: "BSIT",
  },
];

const GENERIC_STATEMENTS = [
  "Build real skill.",
  "Create new possibilities.",
  "Shape what comes next.",
];

function getProgramPresentation(program: Course, index: number) {
  const match = PROGRAM_THEMES.find((item) => item.pattern.test(program.title));
  const credential = program.credential?.trim();
  const usefulCredential =
    credential &&
    credential.length <= 12 &&
    !/degree|certificate|diploma/i.test(credential)
      ? credential.toUpperCase()
      : null;

  return {
    acronym: usefulCredential || match?.fallbackAcronym || "PATH",
    statement:
      match?.statement || GENERIC_STATEMENTS[index % GENERIC_STATEMENTS.length],
  };
}

function ProgramPoster({
  program,
  index,
  highlighted,
}: {
  program: Course;
  index: number;
  highlighted: boolean;
}) {
  const presentation = getProgramPresentation(program, index);
  const supportingCopy =
    program.description ||
    program.highlights?.[0] ||
    "Explore the program, learning experience, and career direction.";

  return (
    <article
      className={cn(
        "relative isolate h-full overflow-hidden border-border",
        index > 0 && "border-t lg:border-l lg:border-t-0",
        highlighted && "bg-secondary/10",
      )}
    >
      <Link
        href={"/courses/" + program.slug}
        className="group relative flex min-h-[410px] h-full flex-col px-5 py-7 outline-none focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:px-7 sm:py-8 lg:min-h-[430px] lg:px-8 lg:py-9"
      >
        <div className="relative z-10">
          <h4 className="max-w-[18ch] text-pretty font-serif text-2xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-3xl">
            {program.title}
          </h4>
          <p className="mt-4 text-sm font-medium text-secondary">
            {program.duration}
          </p>
        </div>

        <div className="relative z-10 mt-5 border-t border-secondary/50 pt-6">
          <p className="max-w-[11ch] text-pretty font-serif text-5xl font-semibold leading-[0.88] tracking-tight text-primary sm:text-6xl lg:text-[4.25rem]">
            {presentation.statement}
          </p>
          <p className="mt-5 line-clamp-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
            {supportingCopy}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 bottom-8 z-0 select-none overflow-hidden whitespace-nowrap font-serif text-[8rem] leading-none tracking-[-0.07em] text-secondary/[0.08] sm:text-[10rem] lg:inset-x-5 lg:text-[11rem]"
        >
          {presentation.acronym}
        </span>

        <span className="relative z-10 mt-auto inline-flex w-fit items-center gap-2 border-b border-secondary pb-1 text-sm font-semibold text-primary">
          Explore program
          <ArrowRight
            aria-hidden="true"
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}

export default function CoursesAndProgramsSection({
  courses = [],
  contact,
}: CoursesAndProgramsSectionProps) {
  const programCategories = CATEGORY_DETAILS.map((category) => ({
    ...category,
    programs: courses.filter((course) => course.category === category.id),
  })).filter((category) => category.programs.length > 0);

  const defaultCategory = programCategories[0]?.id;

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="w-full scroll-mt-24 border-y border-border"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-12">
        {defaultCategory ? (
          <Tabs defaultValue={defaultCategory} className="w-full gap-0">
            <div className="grid gap-5 border-y border-border py-5 lg:grid-cols-[auto_auto_minmax(260px,1fr)_auto] lg:items-center lg:gap-6">
              <div className="flex items-center gap-3 text-primary">
                <GraduationCap aria-hidden="true" className="size-5 shrink-0" />
                <h2
                  id="programs-heading"
                  className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Academic pathways
                </h2>
              </div>

              <div className="min-w-0 overflow-x-auto pb-1 lg:pb-0">
                <TabsList
                  aria-label="Academic pathways"
                  className="min-w-0 rounded-none bg-transparent p-0"
                >
                  {programCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex-none rounded-md border border-border bg-card px-4 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category.label}
                      <span className="rounded-full bg-background/85 px-1.5 py-0.5 text-[11px] leading-none text-muted-foreground">
                        {category.programs.length}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                Compare programs by study level, duration, and career
                direction&mdash;then explore the details together.
              </p>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full lg:w-fit"
              >
                <Link href="/courses">
                  Browse all programs
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {programCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                <div className="grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:items-end lg:gap-12">
                  <h3 className="max-w-[15ch] text-balance font-serif text-5xl font-semibold leading-[0.92] tracking-tight text-primary sm:text-6xl">
                    {category.heading}
                  </h3>
                  <div className="lg:pb-1">
                    <p className="max-w-[47ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {category.description}
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      className="mt-5 w-fit px-0 text-primary hover:bg-transparent hover:text-primary/80"
                    >
                      <Link
                        href={
                          "/courses?category=" + category.id + "#" + category.id
                        }
                      >
                        View all {category.label}
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid border-y border-border lg:grid-cols-3">
                  {category.programs.slice(0, 3).map((program, index) => (
                    <ProgramPoster
                      key={program.id}
                      program={program}
                      index={index}
                      highlighted={index === 1}
                    />
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
              className="mt-10 bg-card"
            />
          </Tabs>
        ) : (
          <div className="border-y border-border px-1 py-12">
            <h2
              id="programs-heading"
              className="font-serif text-3xl font-semibold text-foreground"
            >
              Program information is being updated
            </h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
              Admissions can help students and families review the programs
              currently available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
