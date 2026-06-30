import type { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";

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
  title: "BS Business Administration",
  description:
    "Bachelor of Science in Business Administration at Data Center College.",
};

export default async function BSBAPage() {
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
          eyebrow="Leadership practice"
          title="Business Administration for practical decision-makers."
          description="Study management, entrepreneurship, markets, and the discipline behind sustainable organizations."
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
            {["Management", "Entrepreneurship", "Business analytics"].map(
              (item) => (
                <EditorialCard
                  key={item}
                  eyebrow="Focus area"
                  title={item}
                  description="A core business capability for students preparing for professional and enterprise roles."
                >
                  <BriefcaseBusiness className="mt-8 size-8 text-accent" />
                </EditorialCard>
              ),
            )}
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
