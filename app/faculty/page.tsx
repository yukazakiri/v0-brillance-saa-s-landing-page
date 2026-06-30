import type { Metadata } from "next";
import { BookOpenCheck, GraduationCap, UsersRound } from "lucide-react";

import EditorialSiteHeader from "@/components/editorial-site-header";
import {
  EditorialCard,
  EditorialCTA,
  EditorialHero,
} from "@/components/editorial-page-sections";
import FooterSection from "@/components/footer-section";
import { fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet the dedicated faculty members of Data Center College of The Philippines.",
};

export default async function FacultyPage() {
  const settings = await fetchSettings();
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  };

  return (
    <>
      <EditorialSiteHeader settings={siteSettings} />
      <main className="w-full min-h-screen">
        <EditorialHero
          eyebrow="Teaching body"
          title="Mentors for practical, career-minded learning."
          description="Faculty content can expand into a CMS-powered directory. For now, this page sets a premium structure for departments, advising, and instructional values."
          meta="Faculty directory module ready for future official records."
          actions={[
            { href: "/academics", label: "View Academics" },
            {
              href: "/programs",
              label: "Explore Programs",
              variant: "outline",
            },
          ]}
        />
        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-4 md:grid-cols-3">
            <EditorialCard
              eyebrow="Guidance"
              title="Academic advising"
              description="Students need faculty who can help translate interests into workable academic choices."
            >
              <UsersRound className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Practice"
              title="Industry relevance"
              description="Programs are strongest when teaching connects classroom concepts with workplace expectations."
            >
              <BookOpenCheck className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Formation"
              title="Student development"
              description="The college experience includes professional habits, communication, and responsibility."
            >
              <GraduationCap className="mt-8 size-8 text-accent" />
            </EditorialCard>
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
