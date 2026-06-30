import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Compass, History, Target } from "lucide-react";

import EditorialSiteHeader from "@/components/editorial-site-header";
import {
  EditorialCard,
  EditorialCTA,
  EditorialHero,
} from "@/components/editorial-page-sections";
import FooterSection from "@/components/footer-section";
import { buildImageUrl } from "@/lib/sanity/image";
import { fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  const title = "About Us";
  const description =
    settings?.institutionProfile?.overview ||
    "Established in 1970, Data Center College of The Philippines is an institution for technology, business, and professional education in Baguio City.";
  const ogImage =
    buildImageUrl(settings?.defaultSeo?.shareImage) || "/images/founder.png";

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

export default async function AboutPage() {
  const settings = await fetchSettings();
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  };

  const profile = siteSettings.institutionProfile;

  return (
    <>
      <EditorialSiteHeader settings={siteSettings} />
      <main className="w-full min-h-screen">
        <EditorialHero
          eyebrow="Institutional charter"
          title="A Baguio college built for practical ambition."
          description={
            profile?.overview ||
            "Data Center College of The Philippines connects professional education with the skills, confidence, and judgment students need for work and life."
          }
          meta="Founded in 1970. Focused on technology, business, hospitality, and student formation."
          actions={[
            { href: "/programs", label: "Explore Programs" },
            { href: "/_gallery", label: "View Campus", variant: "outline" },
          ]}
        />

        <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="border border-primary/15 bg-card p-3 shadow-[14px_14px_0_color-mix(in_oklch,var(--secondary)_15%,transparent)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src="/images/founder.png"
                  alt="Engr. Wilfredo M. Bactad"
                  fill
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-border p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
                  Founder
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-primary">
                  Engr. Wilfredo M. Bactad
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <EditorialCard
                eyebrow="Origin"
                title="Founded to bridge school and work"
                description="The institution began with a practical promise: education should lead students toward useful skills and meaningful futures."
              >
                <History className="mt-8 size-8 text-accent" />
              </EditorialCard>
              <EditorialCard
                eyebrow="Mission"
                title="Accessible, relevant education"
                description={
                  profile?.mission ||
                  "Provide industry-relevant education that prepares students for careers while forming ethical, responsible leaders."
                }
              >
                <Target className="mt-8 size-8 text-accent" />
              </EditorialCard>
              <EditorialCard
                eyebrow="Vision"
                title="Graduates ready to contribute"
                description={
                  profile?.vision ||
                  "Be recognized for producing skilled graduates prepared to serve communities and industries with competence."
                }
              >
                <Compass className="mt-8 size-8 text-accent" />
              </EditorialCard>
              <EditorialCard
                eyebrow="Campus"
                title="A community in Baguio"
                description="A focused college environment for students, parents, faculty, and alumni connected by shared academic purpose."
              >
                <Building2 className="mt-8 size-8 text-accent" />
              </EditorialCard>
            </div>
          </div>
        </section>
        <EditorialCTA />
      </main>
      <FooterSection settings={siteSettings} />
    </>
  );
}
