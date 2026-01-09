import {
  fetchCourses,
  fetchLatestPosts,
  fetchSettings,
} from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

// Revalidate page every 60 seconds to pick up new Sanity content
export const revalidate = 60;

// College-specific components
import CTASection from "@/components/cta-section";
import FacultyStaffSection from "@/components/faculty-staff-section";
import AboutSection from "@/components/about-section";
import CollegeHeader from "@/components/college-header";
import CollegeHero from "@/components/college-hero";
import CoursesAndProgramsSection from "@/components/courses-programs-section";
import FAQSection from "@/components/faq-section";
import FooterSection from "@/components/footer-section";
import NewsAnnouncementsSection from "@/components/news-announcements-section";
import TestimonialsSection from "@/components/testimonials-section";

export default async function LandingPage() {
  let newsArticles: Awaited<ReturnType<typeof fetchLatestPosts>> = [];
  let settings: Settings | null = null;
  let courses: Awaited<ReturnType<typeof fetchCourses>> = [];

  try {
    [newsArticles, settings, courses] = await Promise.all([
      fetchLatestPosts(4),
      fetchSettings(),
      fetchCourses(),
    ]);
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    // Continue with empty data if Sanity is unavailable
  }

  // Provide default values if settings are not available
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
      <CollegeHeader settings={siteSettings} />
      <CollegeHero settings={siteSettings} />
      <NewsAnnouncementsSection articles={newsArticles} />
      <AboutSection settings={siteSettings} />
      <CoursesAndProgramsSection courses={courses} />
      {/*<FacultyStaffSection />*/}
      <TestimonialsSection />
      <FAQSection />
      <CTASection settings={siteSettings} />
      <FooterSection settings={siteSettings} />
    </>
  );
}
