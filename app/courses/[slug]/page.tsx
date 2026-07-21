import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Download,
  Mail,
  Phone,
} from "lucide-react";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildImageUrl } from "@/lib/sanity/image";
import {
  fetchCourseBySlug,
  fetchCourseSlugs,
  fetchSettings,
} from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  ched: "College degree",
  tesda: "TESDA program",
  shs: "Senior High",
  short: "Short course",
};

const DELIVERY_LABELS: Record<string, string> = {
  "on-campus": "On campus",
  hybrid: "Hybrid",
  online: "Online",
  modular: "Weekend / modular",
};

type DisclosureProps = {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
};

function CourseDetailDisclosure({
  index,
  title,
  description,
  children,
}: DisclosureProps) {
  return (
    <details className="group border-t border-border">
      <summary className="grid cursor-pointer list-none gap-4 py-7 outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:items-start sm:px-3 md:gap-8 md:py-9 [&::-webkit-details-marker]:hidden">
        <span className="pt-1 font-mono text-xs text-muted-foreground">
          {index}
        </span>
        <span>
          <span className="block font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </span>
          <span className="mt-2 block max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            {description}
          </span>
        </span>
        <span className="mt-1 inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-transform duration-300 motion-reduce:transition-none group-open:rotate-180">
          <ChevronDown aria-hidden="true" className="size-4" />
        </span>
      </summary>
      <div className="pb-10 sm:grid sm:grid-cols-[48px_minmax(0,1fr)_auto] sm:px-3 md:gap-8 md:pb-12">
        <div aria-hidden="true" />
        <div className="max-w-[760px]">{children}</div>
      </div>
    </details>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="grid gap-3 py-4 sm:grid-cols-[36px_minmax(0,1fr)] sm:py-5"
        >
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-relaxed text-foreground sm:text-base">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

export async function generateStaticParams() {
  const slugs = await fetchCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);
  if (!course) return {};

  const title =
    course.seo?.metaTitle || `${course.title} - Data Center College`;
  const description =
    course.seo?.metaDescription ||
    course.summary ||
    `Learn more about ${course.title} at Data Center College of The Philippines`;
  const ogImage = buildImageUrl(course.seo?.shareImage ?? course.heroImage);
  const ogAlt =
    course.seo?.shareImage?.alt ?? course.heroImage?.alt ?? course.title;

  return {
    title,
    description,
    openGraph: ogImage
      ? {
          title,
          description,
          images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
        }
      : undefined,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [course, settings] = await Promise.all([
    fetchCourseBySlug(slug),
    fetchSettings(),
  ]);

  if (!course) notFound();

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  };

  const primaryContact =
    siteSettings.contactDirectory?.find((contact) =>
      Boolean(contact.phone || contact.email),
    ) ?? siteSettings.contactDirectory?.[0];
  const admissionsPhone =
    course.admissionsContact?.phone ?? primaryContact?.phone;
  const admissionsEmail =
    course.admissionsContact?.email ?? primaryContact?.email;
  const categoryLabel =
    CATEGORY_LABELS[course.offeringCategory] ?? "Academic program";
  const deliveryLabel = course.deliveryMode
    ? (DELIVERY_LABELS[course.deliveryMode] ?? course.deliveryMode)
    : "Contact admissions";
  const duration =
    course.duration ?? course.trainingHours ?? "Contact admissions";
  const isDegree = Boolean(course.creditHours);
  const studyLoad = isDegree
    ? `${course.creditHours} units`
    : (course.trainingHours ?? "Not listed");
  const studyLoadLabel = isDegree ? "Total units" : "Training hours";
  const applyHref = course.cta?.url || "/apply";
  const applyLabel = course.cta?.label || "Apply now";
  const isExternalApplyLink = /^https?:\/\//.test(applyHref);

  const hasProgramContent = Boolean(
    course.highlights?.length || course.learningOutcomes?.length,
  );
  const hasCurriculum = Boolean(course.curriculumStructure?.length);
  const hasCareerContent = Boolean(course.outcomes?.length);
  const hasAdmissionsContent = Boolean(
    course.admissionsRequirements?.length ||
    course.applicationDeadlines?.length ||
    course.tuition ||
    course.financialAidHighlight ||
    admissionsPhone ||
    admissionsEmail,
  );

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="min-h-screen w-full pt-24">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All programs
            </Link>

            <div className="mt-12 max-w-[1040px] sm:mt-16">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <span>{categoryLabel}</span>
                {course.code && <Badge variant="outline">{course.code}</Badge>}
              </div>

              <h1 className="mt-6 max-w-[18ch] text-balance font-serif text-5xl font-semibold leading-[0.94] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                {course.title}
              </h1>

              {course.summary && (
                <p className="mt-8 max-w-[66ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                  {course.summary}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  {isExternalApplyLink ? (
                    <a
                      href={applyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {applyLabel}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={applyHref}>
                      {applyLabel}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  )}
                </Button>
                {admissionsEmail && (
                  <Button asChild size="lg" variant="outline">
                    <a href={`mailto:${admissionsEmail}`}>
                      <Mail aria-hidden="true" />
                      Ask admissions
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Program facts" className="border-b border-border">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-8">
            {[
              ["Duration", duration],
              [studyLoadLabel, studyLoad],
              ["Format", deliveryLabel],
              ["Credential", course.credential ?? categoryLabel],
            ].map(([label, value], index) => (
              <dl
                key={label}
                className={`py-6 sm:py-8 md:px-7 ${index % 2 === 1 ? "border-l border-border" : ""} ${index > 1 ? "border-t border-border md:border-t-0" : ""} ${index > 0 ? "md:border-l md:border-border" : ""}`}
              >
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-2 text-sm font-medium text-foreground sm:text-base">
                  {value}
                </dd>
              </dl>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 md:px-8 md:py-24">
          <div className="grid gap-12 border-b border-border pb-14 md:grid-cols-[220px_minmax(0,760px)] md:gap-16 md:pb-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Overview
              </p>
            </div>
            <div>
              {course.overview && course.overview.length > 0 ? (
                <div className="prose prose-neutral max-w-none text-base leading-relaxed text-foreground sm:text-lg [&_p]:leading-relaxed">
                  <PortableText value={course.overview} />
                </div>
              ) : (
                <p className="text-base leading-relaxed text-foreground sm:text-lg">
                  {course.summary ??
                    "Contact admissions for the full program overview."}
                </p>
              )}
            </div>
          </div>

          <div className="pt-14 sm:pt-20">
            <div className="mb-8 max-w-[680px]">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Explore the program
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Details, when you need them.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Open a section to review the curriculum, learning direction,
                career paths, or admissions information.
              </p>
            </div>

            <div className="border-b border-border">
              {hasProgramContent && (
                <CourseDetailDisclosure
                  index="01"
                  title="Learning experience"
                  description="The skills, projects, and outcomes that shape this program."
                >
                  <div className="space-y-10">
                    {course.highlights && course.highlights.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                          Program highlights
                        </h3>
                        <NumberedList items={course.highlights} />
                      </div>
                    )}
                    {course.learningOutcomes &&
                      course.learningOutcomes.length > 0 && (
                        <div>
                          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            What you will learn
                          </h3>
                          <NumberedList items={course.learningOutcomes} />
                        </div>
                      )}
                  </div>
                </CourseDetailDisclosure>
              )}

              {hasCurriculum && (
                <CourseDetailDisclosure
                  index="02"
                  title="Curriculum"
                  description={`${course.curriculumStructure?.length ?? 0} stages from foundation to completion.`}
                >
                  <ol className="divide-y divide-border border-y border-border">
                    {course.curriculumStructure?.map((item, index) => (
                      <li
                        key={`${item.term}-${index}`}
                        className="grid gap-3 py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
                      >
                        <h3 className="font-serif text-xl font-semibold text-foreground">
                          {item.term ?? `Stage ${index + 1}`}
                        </h3>
                        {item.description && (
                          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </CourseDetailDisclosure>
              )}

              {hasCareerContent && (
                <CourseDetailDisclosure
                  index="03"
                  title="Career direction"
                  description="Roles and professional paths this program can help you pursue."
                >
                  <NumberedList items={course.outcomes ?? []} />
                </CourseDetailDisclosure>
              )}

              {hasAdmissionsContent && (
                <CourseDetailDisclosure
                  index="04"
                  title="Admissions & costs"
                  description="Requirements, tuition, schedules, and the people who can help."
                >
                  <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                    {course.admissionsRequirements &&
                      course.admissionsRequirements.length > 0 && (
                        <div>
                          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Requirements
                          </h3>
                          <NumberedList items={course.admissionsRequirements} />
                        </div>
                      )}
                    <div className="space-y-7">
                      {course.tuition && (
                        <dl className="border-t border-border pt-4">
                          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Tuition
                          </dt>
                          <dd className="mt-2 font-serif text-2xl font-semibold text-foreground">
                            {course.tuition}
                          </dd>
                        </dl>
                      )}
                      {course.financialAidHighlight && (
                        <dl className="border-t border-border pt-4">
                          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Financial aid
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-foreground">
                            {course.financialAidHighlight}
                          </dd>
                        </dl>
                      )}
                      {course.applicationDeadlines &&
                        course.applicationDeadlines.length > 0 && (
                          <dl className="border-t border-border pt-4">
                            <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                              Application schedule
                            </dt>
                            <dd className="mt-2 space-y-1 text-sm text-foreground">
                              {course.applicationDeadlines.map((deadline) => (
                                <span key={deadline} className="block">
                                  {deadline}
                                </span>
                              ))}
                            </dd>
                          </dl>
                        )}
                      {(admissionsPhone || admissionsEmail) && (
                        <div className="border-t border-border pt-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Admissions contact
                          </p>
                          <div className="mt-3 flex flex-col items-start gap-2 text-sm">
                            {admissionsPhone && (
                              <a
                                href={`tel:${admissionsPhone}`}
                                className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                              >
                                <Phone aria-hidden="true" className="size-4" />
                                {admissionsPhone}
                              </a>
                            )}
                            {admissionsEmail && (
                              <a
                                href={`mailto:${admissionsEmail}`}
                                className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                              >
                                <Mail aria-hidden="true" className="size-4" />
                                {admissionsEmail}
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CourseDetailDisclosure>
              )}
            </div>
          </div>

          {(course.majors?.length ||
            course.semesterAvailability?.length ||
            course.syllabus) && (
            <div className="grid gap-8 border-b border-border py-12 sm:grid-cols-2 md:grid-cols-3 md:py-16">
              {course.majors && course.majors.length > 0 && (
                <dl>
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Available focus
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-foreground">
                    {course.majors.join(", ")}
                  </dd>
                </dl>
              )}
              {course.semesterAvailability &&
                course.semesterAvailability.length > 0 && (
                  <dl>
                    <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Offered
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-foreground">
                      {course.semesterAvailability.join(" · ")}
                    </dd>
                  </dl>
                )}
              {course.syllabus && (
                <div>
                  <Button asChild variant="outline">
                    <a
                      href={course.syllabus.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download aria-hidden="true" />
                      Download syllabus
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

          {course.relatedOfferings && course.relatedOfferings.length > 0 && (
            <div className="py-12 md:py-16">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Related programs
              </p>
              <div className="mt-5 flex flex-col divide-y divide-border border-y border-border">
                {course.relatedOfferings.map((related) => (
                  <Link
                    key={related._id}
                    href={`/courses/${related.slug.current}`}
                    className="group flex items-center justify-between gap-5 py-5 text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <span className="font-serif text-xl font-semibold sm:text-2xl">
                      {related.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-4 py-14 sm:px-6 sm:py-16 md:flex-row md:items-end md:justify-between md:px-8">
            <div className="max-w-[680px]">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Your next step
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Ready to begin?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Apply today or speak with admissions if you want help comparing
                programs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                {isExternalApplyLink ? (
                  <a href={applyHref} target="_blank" rel="noopener noreferrer">
                    {applyLabel}
                  </a>
                ) : (
                  <Link href={applyHref}>{applyLabel}</Link>
                )}
              </Button>
              {admissionsPhone && (
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${admissionsPhone}`}>
                    <Phone aria-hidden="true" />
                    Call admissions
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  );
}
