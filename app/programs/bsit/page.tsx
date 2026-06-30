import type { Metadata } from "next";
import { Code2 } from "lucide-react";

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
  title: "BS Information Technology",
  description:
    "Bachelor of Science in Information Technology at Data Center College.",
};

export default async function BSITPage() {
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
          eyebrow="Computing studio"
          title="Information Technology for builders and systems thinkers."
          description="Learn software, networks, databases, and applied computing through a career-minded college pathway."
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
              "Software development",
              "Network administration",
              "Systems analysis",
            ].map((item) => (
              <EditorialCard
                key={item}
                eyebrow="Career area"
                title={item}
                description="A practical outcome area for students preparing for technology roles."
              >
                <Code2 className="mt-8 size-8 text-accent" />
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
