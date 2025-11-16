"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Article } from "@/lib/sanity/types";

import CollegeHeader from "./college-header";
import FooterSection from "./footer-section";

const FALLBACK_CATEGORIES = ["announcement", "events", "achievement", "news", "update"];

const filterStyles: Record<string, { active: string; inactive: string }> = {
    announcement: {
        active: "bg-blue-600 text-white border-blue-600",
        inactive: "bg-blue-500/10 text-blue-700 border-blue-500/20 hover:border-blue-500/40",
    },
    events: {
        active: "bg-purple-600 text-white border-purple-600",
        inactive: "bg-purple-500/10 text-purple-700 border-purple-500/20 hover:border-purple-500/40",
    },
    achievement: {
        active: "bg-green-600 text-white border-green-600",
        inactive: "bg-green-500/10 text-green-700 border-green-500/20 hover:border-green-500/40",
    },
    news: {
        active: "bg-amber-600 text-white border-amber-600",
        inactive: "bg-amber-500/10 text-amber-700 border-amber-500/20 hover:border-amber-500/40",
    },
    update: {
        active: "bg-emerald-600 text-white border-emerald-600",
        inactive: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:border-emerald-500/40",
    },
};

function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
        announcement: "bg-blue-500/10 text-blue-700 border-blue-500/20",
        events: "bg-purple-500/10 text-purple-700 border-purple-500/20",
        achievement: "bg-green-500/10 text-green-700 border-green-500/20",
        news: "bg-amber-500/10 text-amber-700 border-amber-500/20",
        update: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    };

    return colors[category?.toLowerCase()] || "bg-gray-500/10 text-gray-700 border-gray-500/20";
}

const defaultFilterStyles = {
    active: "bg-[#37322F] text-white border-[#37322F]",
    inactive: "bg-white text-[#37322F] border-[rgba(55,50,47,0.20)] hover:border-[rgba(55,50,47,0.40)]",
};

function formatCategoryLabel(category: string) {
    if (!category) return "General";
    return category.charAt(0).toUpperCase() + category.slice(1);
}

interface NewsPageContentProps {
    articles: Article[];
}

export default function NewsPageContent({ articles }: NewsPageContentProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categoryOptions = useMemo(() => {
        const unique = new Set(articles.map(article => article.category.toLowerCase()).filter(Boolean));

        return unique.size ? Array.from(unique) : FALLBACK_CATEGORIES;
    }, [articles]);

    const filteredNews = useMemo(() => {
        if (selectedCategory === "all") {
            return articles;
        }

        return articles.filter(article => article.category.toLowerCase() === selectedCategory);
    }, [articles, selectedCategory]);

    const featuredNews = useMemo(() => {
        if (selectedCategory !== "all") return [];
        const explicitFeatured = filteredNews.filter(article => article.featured);
        if (explicitFeatured.length > 0) return explicitFeatured;
        return filteredNews.length > 0 ? [filteredNews[0]] : [];
    }, [filteredNews, selectedCategory]);

    const featuredIds = useMemo(() => new Set(featuredNews.map(article => article.id)), [featuredNews]);

    const regularNews = useMemo(() => {
        if (selectedCategory !== "all") return filteredNews;
        return filteredNews.filter(article => !featuredIds.has(article.id));
    }, [filteredNews, featuredIds, selectedCategory]);

    const hasArticles = articles.length > 0;

    return (
        <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col  justify-start items-center">
            <div className="relative flex flex-col justify-start items-center w-full">
                <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] relative flex flex-col justify-start items-start min-h-screen">
                    <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>
                    <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0"></div>

                    <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
                        <CollegeHeader />

                        <header className="self-stretch px-4 sm:px-6 md:px-8 lg:px-4 py-8 sm:py-12 md:py-16 flex justify-center items-center gap-6">
                            <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                                <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                                    {Array.from({ length: 200 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 border-l border-r border-[rgba(55,50,47,0.12)] px-4 sm:px-6 md:px-8">
                                <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 mx-auto">
                                    <div className="px-[14px] py-[6px] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border shadow-xs">
                                        <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2 2h8M2 6h8M2 10h8"
                                                    stroke="#37322F"
                                                    strokeWidth="1"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-semibold leading-3 font-sans">
                                            News & Announcements
                                        </div>
                                    </div>

                                    <h1 className="w-full max-w-[520px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
                                        Latest News & Updates
                                    </h1>

                                    <p className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
                                        Stay informed about the latest events, achievements, and announcements from Data
                                        Center College of The Philippines
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-3 mt-4">
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
                                            const normalized = category.toLowerCase();
                                            const styles = filterStyles[normalized] ?? defaultFilterStyles;
                                            const isSelected = selectedCategory === normalized;

                                            return (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(normalized)}
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                                        isSelected ? styles.active : styles.inactive
                                                    }`}
                                                >
                                                    {formatCategoryLabel(category)}
                                                </button>
                                            );
                                        })}
                                    </div>
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
                        </header>

                        <section className="self-stretch flex justify-center items-center">
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
                                {selectedCategory === "all" && featuredNews.length > 0 && (
                                    <div className="mb-8 sm:mb-12 md:mb-16">
                                        <h2 className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-serif mb-8">
                                            Featured
                                        </h2>
                                        <div className="grid grid-cols-1 gap-8">
                                            {featuredNews.map(item => (
                                                <Link
                                                    key={item.id}
                                                    href={`/news/${item.slug}`}
                                                    className="group bg-white border border-[rgba(55,50,47,0.12)] rounded-lg overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                                        <div className="relative h-64 md:h-auto overflow-hidden">
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute top-4 left-4">
                                                                <span
                                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${getCategoryColor(
                                                                        item.category
                                                                    )}`}
                                                                >
                                                                    {item.category}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                                                            <div className="text-[#605A57] text-sm font-medium mb-3">
                                                                {item.date} • {item.author}
                                                            </div>
                                                            <h3 className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-serif mb-4 group-hover:text-[#49423D] transition-colors">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-[#605A57] text-base leading-relaxed mb-6">
                                                                {item.excerpt}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-[#37322F] font-semibold text-sm group-hover:gap-3 transition-all">
                                                                Read More
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

                                <div>
                                    <h2 className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-serif mb-8">
                                        {selectedCategory === "all"
                                            ? "All News"
                                            : formatCategoryLabel(selectedCategory)}
                                    </h2>

                                    {!hasArticles ? (
                                        <div className="text-center text-[#605A57] text-sm sm:text-base">
                                            No news articles are available at this time. Please check back soon.
                                        </div>
                                    ) : regularNews.length === 0 ? (
                                        <div className="text-center text-[#605A57] text-sm sm:text-base">
                                            No news found for this category.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                            {regularNews.map(item => (
                                                <Link
                                                    key={item.id}
                                                    href={`/news/${item.slug}`}
                                                    className="group bg-white border border-[rgba(55,50,47,0.12)] rounded-lg overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300 flex flex-col"
                                                >
                                                    <div className="relative h-48 overflow-hidden">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute top-3 left-3">
                                                            <span
                                                                className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                                                                    item.category
                                                                )}`}
                                                            >
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 flex flex-col flex-grow">
                                                        <div className="text-[#605A57] text-xs font-medium mb-3">
                                                            {item.date} • {item.author}
                                                        </div>
                                                        <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold font-serif mb-3 group-hover:text-[#49423D] transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[#605A57] text-sm leading-relaxed mb-4 flex-grow">
                                                            {item.excerpt}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-[#37322F] font-semibold text-sm group-hover:gap-3 transition-all pt-2 border-t border-[rgba(55,50,47,0.08)]">
                                                            Read More
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

                        <FooterSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
