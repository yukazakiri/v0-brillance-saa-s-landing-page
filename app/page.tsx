import Link from "next/link";
import type React from "react";

import { fetchLatestPosts, fetchSettings } from "@/lib/sanity/queries";
import type { Article, Settings } from "@/lib/sanity/types";

// College-specific components
import AboutSection from "../components/about-section";
import CampusFacilitiesSection from "../components/campus-facilities-section";
import CollegeHeader from "../components/college-header";
import CollegeHero from "../components/college-hero";
import CoursesAndProgramsSection from "../components/courses-programs-section";
import CTASection from "../components/cta-section";
import FAQSection from "../components/faq-section";
import FooterSection from "../components/footer-section";
import TestimonialsSection from "../components/testimonials-section";

// Reusable Badge Component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
            <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
                {text}
            </div>
        </div>
    );
}

export default async function LandingPage() {
    const [newsArticles, settings] = await Promise.all([
        fetchLatestPosts(4),
        fetchSettings()
    ]);

    // Provide default values if settings are not available
    const siteSettings: Settings = settings ?? {
        _id: "default",
        _type: "settings",
        siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
        shortTitle: "Data Center College",
        tagline: "Empowering the next generation of IT professionals, business leaders, and innovators",
    };

    return (
        <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
            <div className="relative flex flex-col justify-start items-center w-full">
                {/* horizontal line */}
                <div className="w-full absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-border shadow-[0px_2px_0px_white]"></div>
                {/* Main container with proper margins */}

                <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
                    {/* Left vertical line */}
                    <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

                    {/* Right vertical line */}
                    <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

                    <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
                        {/* Navigation - College Header */}
                        <CollegeHeader settings={siteSettings} />

                        {/* Hero Section - College Hero */}
                        <CollegeHero settings={siteSettings} />
                        {/* News & Announcements Section */}
                        <NewsAnnouncementsSection articles={newsArticles} />

                        {/* About Section */}
                        <AboutSection settings={siteSettings} />

                        {/* Academic Programs Section */}
                        <CoursesAndProgramsSection />

                        {/* Campus Facilities Section */}
                        <CampusFacilitiesSection />

                        {/* Testimonials Section */}
                        <TestimonialsSection />

                        {/* FAQ Section */}
                        <FAQSection />

                        {/* CTA Section */}
                        <CTASection settings={siteSettings} />

                        {/* Footer Section */}
                        <FooterSection settings={siteSettings} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// News & Announcements Section Component (CMS-style)
function NewsAnnouncementsSection({ articles }: { articles: Article[] }) {
    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            announcement: "bg-blue-500/10 text-blue-700 border-blue-500/20",
            events: "bg-purple-500/10 text-purple-700 border-purple-500/20",
            achievement: "bg-green-500/10 text-green-700 border-green-500/20",
            news: "bg-amber-500/10 text-amber-700 border-amber-500/20",
            update: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
        };
        return colors[category?.toLowerCase()] || "bg-gray-500/10 text-gray-700 border-gray-500/20";
    };

    if (!articles.length) {
        return (
            <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center py-16">
                <div className="text-center">
                    <Badge
                        icon={
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="2"
                                    y="2"
                                    width="8"
                                    height="8"
                                    rx="1"
                                    stroke="#37322F"
                                    strokeWidth="1"
                                    fill="none"
                                />
                                <path d="M2 4h8M4 2v2M8 2v2" stroke="#37322F" strokeWidth="1" />
                            </svg>
                        }
                        text="Latest Updates"
                    />
                    <p className="mt-4 text-[#605A57] text-sm sm:text-base">
                        No news or announcements are available right now. Please check back soon.
                    </p>
                </div>
            </div>
        );
    }

    const featuredArticles = articles.filter(article => article.featured);
    const fallbackFeatured = featuredArticles.length === 0 && articles.length > 0 ? [articles[0]] : featuredArticles;
    const featuredIds = new Set(fallbackFeatured.map(article => article.id));
    const regularArticles = articles.filter(article => !featuredIds.has(article.id));

    return (
        <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
            {/* Header Section */}
            <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
                <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4">
                    <Badge
                        icon={
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="2"
                                    y="2"
                                    width="8"
                                    height="8"
                                    rx="1"
                                    stroke="#37322F"
                                    strokeWidth="1"
                                    fill="none"
                                />
                                <path d="M2 4h8M4 2v2M8 2v2" stroke="#37322F" strokeWidth="1" />
                            </svg>
                        }
                        text="Latest Updates"
                    />
                    <div className="w-full max-w-[520px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
                        News & Announcements
                    </div>
                    <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
                        Stay updated with the latest happenings,
                        <br className="hidden sm:block" />
                        events, and achievements at DCCPB
                    </div>
                </div>
            </div>

            {/* News Grid Section */}
            <div className="self-stretch flex justify-center items-start">
                <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                    <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                        {Array.from({ length: 200 }).map((_, i) => (
                            <div
                                key={i}
                                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-1 border-l border-r border-[rgba(55,50,47,0.12)] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
                    {/* Featured Article */}
                    <div className="mb-8 sm:mb-12 md:mb-16">
                        {fallbackFeatured.map(article => (
                            <Link
                                key={article.id}
                                href={`/news/${article.slug}`}
                                className="group bg-white border border-[rgba(55,50,47,0.12)] rounded-[8px] sm:rounded-[10px] overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300 cursor-pointer block"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                    {/* Image */}
                                    <div className="relative h-[240px] sm:h-[280px] md:h-full min-h-[320px] overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${getCategoryColor(
                                                    article.category
                                                )}`}
                                            >
                                                Featured
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                                        <div
                                            className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full border w-fit mb-4 ${getCategoryColor(
                                                article.category
                                            )}`}
                                        >
                                            {article.category}
                                        </div>
                                        <h3 className="text-[#37322F] text-xl sm:text-2xl md:text-3xl font-semibold font-serif mb-3 leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-[#605A57] text-sm sm:text-base font-normal font-sans leading-relaxed mb-6">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs sm:text-sm text-[#605A57] mb-6">
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        cx="7"
                                                        cy="7"
                                                        r="6"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                        fill="none"
                                                    />
                                                    <path
                                                        d="M7 3v4l3 2"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                {article.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        cx="7"
                                                        cy="5"
                                                        r="2.5"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                        fill="none"
                                                    />
                                                    <path
                                                        d="M2 12c0-2.5 2-4 5-4s5 1.5 5 4"
                                                        stroke="currentColor"
                                                        strokeWidth="1"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                {article.author}
                                            </span>
                                        </div>
                                        <button className="text-[#37322F] text-sm font-semibold hover:text-[#49423D] transition-colors duration-200 flex items-center gap-2 group/btn">
                                            <span>Read Full Article</span>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="group-hover/btn:translate-x-1 transition-transform duration-300"
                                            >
                                                <path
                                                    d="M6 12L10 8L6 4"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Regular Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                        {regularArticles.map(article => (
                            <Link
                                key={article.id}
                                href={`/news/${article.slug}`}
                                className="group bg-white border border-[rgba(55,50,47,0.12)] rounded-[8px] overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300 cursor-pointer flex flex-col block"
                            >
                                {/* Image */}
                                <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span
                                            className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                                                article.category
                                            )}`}
                                        >
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                    <h3 className="text-[#37322F] text-base sm:text-lg font-semibold font-serif mb-2 leading-tight line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-[#605A57] text-sm font-normal font-sans leading-relaxed mb-4 line-clamp-2 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-[#605A57] mb-4 pb-4 border-b border-[rgba(55,50,47,0.08)]">
                                        <span className="flex items-center gap-1">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="6"
                                                    cy="6"
                                                    r="5"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    fill="none"
                                                />
                                                <path
                                                    d="M6 2v4l2 1"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            {article.date}
                                        </span>
                                    </div>
                                    <button className="text-[#37322F] text-sm font-semibold hover:text-[#49423D] transition-colors duration-200 flex items-center gap-2 group/btn">
                                        <span>Read More</span>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="group-hover/btn:translate-x-1 transition-transform duration-300"
                                        >
                                            <path
                                                d="M5 10L9 7L5 4"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
                        <Link
                            href="/news"
                            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white border-2 border-[#37322F] rounded-full text-[#37322F] text-sm sm:text-base font-semibold hover:bg-[#37322F] hover:text-white transition-all duration-300 flex items-center gap-2"
                        >
                            <span>View All News</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12L10 8L6 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                    <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                        {Array.from({ length: 200 }).map((_, i) => (
                            <div
                                key={i}
                                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
