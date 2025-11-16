"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Article, Settings } from "@/lib/sanity/types";

import CollegeHeader from "./college-header";
import FooterSection from "./footer-section";

// Badge Component matching homepage style
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="px-3.5 py-1.5 bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-2 border border-[rgba(2,6,23,0.08)]">
            <div className="w-3.5 h-3.5 relative overflow-hidden flex items-center justify-center">{icon}</div>
            <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
                {text}
            </div>
        </div>
    );
}

const FALLBACK_CATEGORIES = ["announcement", "events", "achievement", "news", "alert"];

const categoryColors: Record<string, string> = {
    announcement: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    events: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    achievement: "bg-green-500/10 text-green-700 border-green-500/20",
    news: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    alert: "bg-red-500/10 text-red-700 border-red-500/20",
    story: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
};

function getCategoryColor(category: string) {
    return categoryColors[category?.toLowerCase()] || "bg-gray-500/10 text-gray-700 border-gray-500/20";
}

function formatCategoryLabel(category: string) {
    if (!category) return "General";
    return category.charAt(0).toUpperCase() + category.slice(1);
}

interface NewsPageContentProps {
    articles: Article[];
    settings: Settings;
}

export default function NewsPageContent({ articles, settings }: NewsPageContentProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categoryOptions = useMemo(() => {
        const unique = new Set(articles.map(article => article.category.toLowerCase()).filter(Boolean));
        return unique.size ? Array.from(unique) : FALLBACK_CATEGORIES;
    }, [articles]);

    const filteredNews = useMemo(() => {
        if (selectedCategory === "all") return articles;
        return articles.filter(article => article.category.toLowerCase() === selectedCategory);
    }, [articles, selectedCategory]);

    const featuredNews = useMemo(() => {
        if (selectedCategory !== "all") return [];
        const explicitFeatured = filteredNews.filter(article => article.featured);
        if (explicitFeatured.length > 0) return explicitFeatured.slice(0, 2);
        return filteredNews.length > 0 ? [filteredNews[0]] : [];
    }, [filteredNews, selectedCategory]);

    const featuredIds = useMemo(() => new Set(featuredNews.map(article => article.id)), [featuredNews]);

    const regularNews = useMemo(() => {
        if (selectedCategory !== "all") return filteredNews;
        return filteredNews.filter(article => !featuredIds.has(article.id));
    }, [filteredNews, featuredIds, selectedCategory]);

    const hasArticles = articles.length > 0;

    return (
        <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
            <div className="relative flex flex-col justify-start items-center w-full">
                {/* Horizontal line */}
                <div className="w-full absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-border shadow-[0px_2px_0px_white]"></div>

                <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
                    {/* Left vertical line */}
                    <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

                    {/* Right vertical line */}
                    <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

                    <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
                        <CollegeHeader settings={settings} />

                        {/* Header Section */}
                        <header className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
                            <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-8 sm:py-12 md:py-16 flex justify-center items-center">
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

                                    <h1 className="w-full max-w-[520px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
                                        News & Announcements
                                    </h1>

                                    <p className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
                                        Stay updated with the latest happenings, events, and achievements at {settings.siteTitle || "Data Center College of The Philippines"}
                                    </p>

                                    {/* Category Filter Pills */}
                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        <button
                                            onClick={() => setSelectedCategory("all")}
                                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                                selectedCategory === "all"
                                                    ? "bg-[#37322F] text-white border-[#37322F]"
                                                    : "bg-white text-[#37322F] border-[rgba(55,50,47,0.20)] hover:border-[rgba(55,50,47,0.40)]"
                                            }`}
                                        >
                                            All News
                                        </button>

                                        {categoryOptions.map(category => {
                                            const isSelected = selectedCategory === category.toLowerCase();
                                            return (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(category.toLowerCase())}
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                                        isSelected
                                                            ? "bg-[#37322F] text-white border-[#37322F]"
                                                            : "bg-white text-[#37322F] border-[rgba(55,50,47,0.20)] hover:border-[rgba(55,50,47,0.40)]"
                                                    }`}
                                                >
                                                    {formatCategoryLabel(category)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* News Grid Section */}
                        <section className="self-stretch flex justify-center items-start">
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
                                {!hasArticles ? (
                                    <div className="text-center py-16">
                                        <div className="inline-block mb-4 p-4 bg-white border border-[rgba(55,50,47,0.12)] rounded-full">
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-[#605A57]"
                                            >
                                                <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                                                <path d="M6 10h20M10 6v4M22 6v4" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <p className="text-[#605A57] text-base sm:text-lg font-medium mb-2">
                                            No articles available
                                        </p>
                                        <p className="text-[#605A57] text-sm">
                                            Check back soon for the latest news and announcements.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Featured Articles */}
                                        {selectedCategory === "all" && featuredNews.length > 0 && (
                                            <div className="mb-12 sm:mb-16">
                                                <h2 className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-serif mb-6 sm:mb-8">
                                                    Featured Stories
                                                </h2>
                                                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                                                    {featuredNews.map(article => (
                                                        <Link
                                                            key={article.id}
                                                            href={`/news/${article.slug}`}
                                                            className="group bg-white border border-[rgba(55,50,47,0.12)] rounded-[8px] sm:rounded-[10px] overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300"
                                                        >
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                                                <div className="relative h-64 sm:h-80 md:h-full min-h-[320px] overflow-hidden">
                                                                    <img
                                                                        src={article.image}
                                                                        alt={article.title}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    />
                                                                    <div className="absolute top-4 left-4">
                                                                        <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#37322F] text-white">
                                                                            Featured
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                                                                    <span
                                                                        className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full border w-fit mb-4 ${getCategoryColor(article.category)}`}
                                                                    >
                                                                        {article.category}
                                                                    </span>
                                                                    <h3 className="text-[#37322F] text-xl sm:text-2xl md:text-3xl font-semibold font-serif mb-3 group-hover:text-[#49423D] transition-colors leading-tight">
                                                                        {article.title}
                                                                    </h3>
                                                                    <p className="text-[#605A57] text-sm sm:text-base leading-relaxed mb-6">
                                                                        {article.excerpt}
                                                                    </p>
                                                                    <div className="flex items-center gap-4 text-xs sm:text-sm text-[#605A57] mb-6">
                                                                        <span className="flex items-center gap-1.5">
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
                                                                        <span className="flex items-center gap-1.5">
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
                                                                    <div className="flex items-center gap-2 text-[#37322F] font-semibold text-sm group-hover:gap-3 transition-all">
                                                                        <span>Read Full Article</span>
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
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Regular Articles */}
                                        <div>
                                            <h2 className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-serif mb-6 sm:mb-8">
                                                {selectedCategory === "all"
                                                    ? regularNews.length > 0
                                                        ? "Latest News"
                                                        : ""
                                                    : formatCategoryLabel(selectedCategory)}
                                            </h2>

                                            {regularNews.length === 0 && selectedCategory !== "all" ? (
                                                <div className="text-center py-12">
                                                    <p className="text-[#605A57] text-base">
                                                        No articles found in this category.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                                    {regularNews.map(article => (
                                                        <Link
                                                            key={article.id}
                                                            href={`/news/${article.slug}`}
                                                            className="group bg-white border border-[rgba(55,50,47,0.12)] rounded-[8px] overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300 flex flex-col"
                                                        >
                                                            <div className="relative h-48 sm:h-52 overflow-hidden">
                                                                <img
                                                                    src={article.image}
                                                                    alt={article.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                                <div className="absolute top-3 left-3">
                                                                    <span
                                                                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(article.category)}`}
                                                                    >
                                                                        {article.category}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                                                <h3 className="text-[#37322F] text-base sm:text-lg font-semibold font-serif mb-2 group-hover:text-[#49423D] transition-colors leading-tight line-clamp-2">
                                                                    {article.title}
                                                                </h3>
                                                                <p className="text-[#605A57] text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
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
                                                                <div className="flex items-center gap-2 text-[#37322F] font-semibold text-sm group-hover:gap-3 transition-all">
                                                                    <span>Read More</span>
                                                                    <svg
                                                                        width="14"
                                                                        height="14"
                                                                        viewBox="0 0 14 14"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M5 10L9 7L5 4"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
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
                        </section>

                        <FooterSection settings={settings} />
                    </div>
                </div>
            </div>
        </div>
    );
}
