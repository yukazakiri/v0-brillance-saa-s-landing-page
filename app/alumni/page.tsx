import type { Metadata } from "next";
import { Network, Newspaper, ScrollText } from "lucide-react";

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
  title: "Alumni",
  description: "Connect with the Data Center College alumni network.",
};

export default async function AlumniPage() {
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
          eyebrow="Graduate network"
          title="The college story continues after graduation."
          description="A redesigned alumni page for outcomes, updates, transcript requests, and future graduate stories."
          meta="15k+ alumni carrying the college name across industries."
          actions={[
            { href: "/news", label: "Read Alumni Updates" },
            {
              href: "/apply",
              label: "Contact the College",
              variant: "outline",
            },
          ]}
        />
        <section className="w-full border-x border-b border-border/70 bg-primary px-5 py-16 text-primary-foreground sm:px-8 lg:px-12">
          <div className="mx-auto grid w-full max-w-[1320px] gap-6 md:grid-cols-3">
            {["15k+ Alumni", "50+ Years", "Global Community"].map((stat) => (
              <p key={stat} className="font-serif text-5xl tracking-[-0.05em]">
                {stat}
              </p>
            ))}
          </div>
        </section>
        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-4 md:grid-cols-3">
            <EditorialCard
              eyebrow="Records"
              title="Transcript support"
              description="Direct alumni requests toward official school channels and required documentation."
              href="/apply"
            >
              <ScrollText className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Stories"
              title="Graduate outcomes"
              description="Feature alumni proof, career milestones, and employer confidence."
              href="/news"
            >
              <Newspaper className="mt-8 size-8 text-accent" />
            </EditorialCard>
            <EditorialCard
              eyebrow="Community"
              title="Stay connected"
              description="Invite graduates to update details and stay part of the college network."
              href="/apply"
            >
              <Network className="mt-8 size-8 text-accent" />
            </EditorialCard>
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
