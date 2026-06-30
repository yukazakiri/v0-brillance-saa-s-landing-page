import type { Metadata } from "next";
import { ClipboardCheck, FileText, MessagesSquare } from "lucide-react";

import ApplyInterstitial from "@/components/apply-interstitial";
import EditorialSiteHeader from "@/components/editorial-site-header";
import {
  EditorialCard,
  EditorialHero,
} from "@/components/editorial-page-sections";
import FooterSection from "@/components/footer-section";
import { fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Apply Now | Data Center College",
  description:
    "Start your enrollment process at Data Center College of The Philippines.",
};

export default async function ApplyPage() {
  const settings = await fetchSettings();
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines",
    shortTitle: "Data Center College",
  };

  return (
    <>
      <EditorialSiteHeader settings={siteSettings} />
      <main className="w-full min-h-screen">
        <EditorialHero
          eyebrow="Admissions"
          title="Start with the path. Then submit the application."
          description="This page keeps the application action focused while giving students and parents a quick checklist before proceeding."
          meta="Admissions support is available for program choice, requirements, and next steps."
          actions={[
            { href: "/programs", label: "Review Programs", variant: "outline" },
          ]}
        />

        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="grid gap-4">
              <EditorialCard
                eyebrow="Step 1"
                title="Choose a program"
                description="Compare the available college, senior high, and technical pathways before applying."
              >
                <ClipboardCheck className="mt-8 size-8 text-accent" />
              </EditorialCard>
              <EditorialCard
                eyebrow="Step 2"
                title="Prepare documents"
                description="Have identification, school records, and relevant enrollment requirements ready."
              >
                <FileText className="mt-8 size-8 text-accent" />
              </EditorialCard>
              <EditorialCard
                eyebrow="Step 3"
                title="Wait for guidance"
                description="Admissions will guide the next checkpoint after your application is submitted."
              >
                <MessagesSquare className="mt-8 size-8 text-accent" />
              </EditorialCard>
            </div>
            <div className="border border-primary/15 bg-card p-6 shadow-[14px_14px_0_color-mix(in_oklch,var(--primary)_8%,transparent)] lg:p-10">
              <ApplyInterstitial />
            </div>
          </div>
        </section>
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
