import type { Metadata } from "next";
import { Building2 } from "lucide-react";

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
  title: "BS Hotel and Restaurant Management",
  description:
    "Bachelor of Science in Hotel and Restaurant Management at Data Center College.",
};

export default async function BSHRMPage() {
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
          eyebrow="Service craft"
          title="Hospitality Management for composed, capable professionals."
          description="Learn operations, guest experience, and service leadership for hospitality and tourism environments."
          meta="Legacy program page. For CMS records, browse /courses."
          actions={[
            { href: "/apply", label: "Apply Now" },
            {
              href: "/courses",
              label: "View Course Records",
              variant: "outline",
            },
          ]}
        />
        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-4 md:grid-cols-3">
            {[
              "Guest experience",
              "Food and beverage",
              "Operations leadership",
            ].map((item) => (
              <EditorialCard
                key={item}
                eyebrow="Practice area"
                title={item}
                description="A professional skill area for students preparing for hospitality and service careers."
              >
                <Building2 className="mt-8 size-8 text-accent" />
              </EditorialCard>
            ))}
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
