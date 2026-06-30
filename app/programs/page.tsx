import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import EditorialSiteHeader from "@/components/editorial-site-header";
import {
  EditorialCTA,
  EditorialHero,
} from "@/components/editorial-page-sections";
import FooterSection from "@/components/footer-section";
import { buildImageUrl } from "@/lib/sanity/image";
import { fetchCourses, fetchSettings } from "@/lib/sanity/queries";
import type { Course, Settings } from "@/lib/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  const title = "Academic Programs";
  const description =
    "Explore comprehensive academic offerings designed to prepare students for career-ready futures.";
  const ogImage =
    buildImageUrl(settings?.defaultSeo?.shareImage) ||
    "/hero-images/maincampus.png";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${settings?.shortTitle || "DCCP"}`,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export const revalidate = 60;

const categoryLabels: Record<string, string> = {
  ched: "College degree programs",
  tesda: "TESDA / TVET programs",
  shs: "Senior High School",
  short: "Short courses",
};

function ProgramCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[10px_10px_0_color-mix(in_oklch,var(--primary)_8%,transparent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
          {course.credential || course.category}
        </p>
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-[-0.04em] text-primary group-hover:text-accent">
        {course.title}
      </h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
        {course.description ||
          "Open this program to review details, outcomes, and admissions information."}
      </p>
      <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-5">
        <span className="border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground">
          {course.duration}
        </span>
        {course.scholarshipsAvailable && (
          <span className="border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
            Scholarship
          </span>
        )}
      </div>
    </Link>
  );
}

export default async function ProgramsPage() {
  const [settings, courses] = await Promise.all([
    fetchSettings(),
    fetchCourses(),
  ]);
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline: "Empowering the next generation",
  };

  const categories = ["ched", "shs", "tesda", "short"]
    .map((category) => ({
      category,
      courses: courses.filter((course) => course.category === category),
    }))
    .filter((group) => group.courses.length > 0);

  return (
    <>
      <EditorialSiteHeader settings={siteSettings} />
      <main className="w-full min-h-screen">
        <EditorialHero
          eyebrow="Program catalog"
          title="Compare every active pathway in one disciplined view."
          description="This page renders active official course records and links each program to its detail page."
          meta={`${courses.length || "No"} active program records loaded.`}
          actions={[
            { href: "/apply", label: "Apply Now" },
            {
              href: "/academics",
              label: "Academic Overview",
              variant: "outline",
            },
          ]}
        />
        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-16">
            {categories.length > 0 ? (
              categories.map((group) => (
                <section
                  key={group.category}
                  className="grid gap-8 lg:grid-cols-[320px_1fr]"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                      {group.category}
                    </p>
                    <h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.055em] text-primary">
                      {categoryLabels[group.category] || group.category}
                    </h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {group.courses.map((course) => (
                      <ProgramCard key={course.id} course={course} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="border border-border bg-card p-10">
                <h2 className="font-serif text-4xl text-primary">
                  No active programs found.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Add active course records to populate this catalog.
                </p>
              </div>
            )}
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
