import type { Metadata } from "next";
import {
  BookOpenText,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
} from "lucide-react";

import EditorialSiteHeader from "@/components/editorial-site-header";
import {
  EditorialCard,
  EditorialCTA,
  EditorialHero,
} from "@/components/editorial-page-sections";
import FooterSection from "@/components/footer-section";
import { fetchCourses, fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore academic programs, college pathways, and learning support at Data Center College.",
};

export default async function AcademicsPage() {
  const [settings, courses] = await Promise.all([
    fetchSettings(),
    fetchCourses(),
  ]);
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  };

  const activeCourses = courses.slice(0, 4);

  return (
    <>
      <EditorialSiteHeader settings={siteSettings} />
      <main className="w-full min-h-screen">
        <EditorialHero
          eyebrow="Academic field guide"
          title="Programs built around work students can recognize."
          description="Explore the college's academic structure through clear pathways, practical outcomes, and links to live CMS-backed course records."
          meta={`${courses.length || "No"} active programs currently available.`}
          actions={[
            { href: "/programs", label: "View Programs" },
            {
              href: "/courses",
              label: "Browse Course Records",
              variant: "outline",
            },
          ]}
        />

        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-4 md:grid-cols-2 xl:grid-cols-4">
            <EditorialCard
              eyebrow="Computing"
              title="Technology"
              description="Software, systems, and digital problem-solving for students entering technical work."
              href="/programs/bsit"
            >
              <Code2 className="mt-8 size-9 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Enterprise"
              title="Business"
              description="Decision-making, management, and entrepreneurship for future organizational leaders."
              href="/programs/bsba"
            >
              <BriefcaseBusiness className="mt-8 size-9 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Service craft"
              title="Hospitality"
              description="Operational excellence and human-centered service for hospitality environments."
              href="/programs/bshrm"
            >
              <GraduationCap className="mt-8 size-9 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Foundation"
              title="Senior High"
              description="Preparation for college choices through guided tracks and stronger learning habits."
              href="/programs"
            >
              <BookOpenText className="mt-8 size-9 text-accent" />
            </EditorialCard>
          </div>
        </section>

        <section className="w-full border-x border-b border-border/70 bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto w-full max-w-[1320px]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground/70">
              Live program records
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {activeCourses.length > 0 ? (
                activeCourses.map((course) => (
                  <a
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="group border border-primary-foreground/15 bg-primary-foreground/7 p-6 hover:border-accent"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground/60">
                      {course.credential || course.category}
                    </p>
                    <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-primary-foreground group-hover:text-accent">
                      {course.title}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-primary-foreground/68">
                      {course.description}
                    </p>
                  </a>
                ))
              ) : (
                <p className="text-primary-foreground/70">
                  No active course records are available yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
