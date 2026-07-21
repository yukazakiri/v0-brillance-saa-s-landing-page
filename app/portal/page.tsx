import type { Metadata } from "next";

import { fetchStudentPortalPage, fetchSettings } from "@/lib/sanity/queries";
import { buildImageUrl } from "@/lib/sanity/image";
import type { Settings } from "@/lib/sanity/types";

import PortalHeader from "@/components/portal/portal-header";
import StudentPortalLanding from "@/components/portal/student-portal-landing";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchStudentPortalPage();
  const settings = await fetchSettings();

  if (!page) return {};

  const title = page.seo?.metaTitle || page.title;
  const description =
    page.seo?.metaDescription ||
    `Access ${page.softwareName} resources and tools.`;
  const ogImage =
    buildImageUrl(page.seo?.shareImage) ||
    buildImageUrl(settings?.defaultSeo?.shareImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    robots: {
      index: !page.seo?.noIndex,
      follow: !page.seo?.noIndex,
    },
  };
}

export default async function PortalPage() {
  const [page, settings] = await Promise.all([
    fetchStudentPortalPage(),
    fetchSettings(),
  ]);

  if (!page) {
    // Fallback if no page content is defined in Sanity yet
    return (
      <div className="flex min-h-screen flex-col">
        <PortalHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl font-bold font-serif mb-4 text-[#1a3a52]">
              Student Portal
            </h1>
            <p className="text-[#605A57]">
              Portal content is currently being updated. Please check back soon.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College",
    shortTitle: "DCCPH",
  };

  return <StudentPortalLanding page={page} settings={siteSettings} />;
}
