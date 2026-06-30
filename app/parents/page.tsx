import type { Metadata } from "next";
import { CalendarDays, CreditCard, Newspaper, ShieldCheck } from "lucide-react";

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
  title: "Parents",
  description:
    "Information and resources for parents of Data Center College students.",
};

export default async function ParentsPage() {
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
          eyebrow="Family guide"
          title="A clearer view of the college decision."
          description="Parents need practical signals: dates, costs, safety, and communication. This page organizes the essentials around those decisions."
          meta="For parents and guardians supporting incoming and enrolled students."
          actions={[
            { href: "/programs", label: "Compare Programs" },
            { href: "/portal", label: "Open Portal", variant: "outline" },
          ]}
        />
        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-4 md:grid-cols-2">
            <EditorialCard
              eyebrow="Academic calendar"
              title="Important dates"
              description="Track enrollment periods, school activities, holidays, and official announcements."
              href="/news"
            >
              <CalendarDays className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Finance"
              title="Tuition and payments"
              description="Use the portal for balances, schedules, and payment-related student services."
              href="/portal"
            >
              <CreditCard className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Student care"
              title="Campus safety"
              description="A focused learning environment with guidance for students as they enter college life."
            >
              <ShieldCheck className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Updates"
              title="Stay informed"
              description="Read official news, announcements, campus milestones, and student stories."
              href="/news"
            >
              <Newspaper className="mt-8 size-8 text-accent" />
            </EditorialCard>
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
