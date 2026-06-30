import FooterSection from "@/components/footer-section";
import PremiumHomepage from "@/components/premium-homepage";
import {
  fetchCourses,
  fetchLatestPosts,
  fetchPhotoGalleries,
  fetchSettings,
} from "@/lib/sanity/queries";
import type {
  Article,
  Course,
  SanityPhotoGallery,
  Settings,
} from "@/lib/sanity/types";

// Revalidate page every 60 seconds to pick up new content
export const revalidate = 60;

export default async function LandingPage() {
  let settings: Settings | null = null;
  let courses: Course[] = [];
  let articles: Article[] = [];
  let galleries: SanityPhotoGallery[] = [];

  try {
    [settings, courses, articles, galleries] = await Promise.all([
      fetchSettings(),
      fetchCourses(),
      fetchLatestPosts(3),
      fetchPhotoGalleries(),
    ]);
  } catch (error) {
    console.error("Error fetching homepage content:", error);
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
    tagline:
      "Empowering the next generation of IT professionals, business leaders, and innovators",
  };

  return (
    <>
      <PremiumHomepage
        settings={siteSettings}
        courses={courses}
        articles={articles}
        galleries={galleries}
      />
      <FooterSection settings={siteSettings} />
    </>
  );
}
