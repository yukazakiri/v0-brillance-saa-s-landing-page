"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Article, Settings } from "@/lib/sanity/types";

import CollegeHeader from "./college-header";
import FooterSection from "./footer-section";

// Badge Component matching homepage style
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="px-2 py-1.5 bg-[#f7f5f3] shadow-[0px_0px_0px_4px_rgba(26,58,82,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-2 border border-[rgba(26,58,82,0.12)]">
            <div className="w-3 h-3 relative overflow-hidden flex items-center justify-center">{icon}</div>
            <div className="text-center flex justify-center flex-col text-[#1a3a52] text-xs font-medium leading-3 font-sans">
                {text}
            </div>
        </div>
    );
}

const FALLBACK_CATEGORIES = ["announcement", "events", "achievement", "news", "alert"];

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

    const hasArticles = articles.length > 0;

    return (
        <>
            <CollegeHeader settings={settings} />
            <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[160px] pb-8 sm:pb-12 md:pb-16 lg:pb-20 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full relative overflow-hidden">
                <main className="w-full border-b border-t border-[rgba(26,58,82,0.12)] flex flex-col justify-center items-center flex-grow">
                    <div className="self-stretch flex justify-center items-start flex-grow">
                        {/* Left Decorative Sidebar */}
                        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                            <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                                {Array.from({ length: 200 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 border-l border-r border-[rgba(26,58,82,0.12)] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f7f5f3]">
                            <div className="max-w-[1060px] mx-auto">
                                {/* Page Header */}
                                <div className="flex flex-col items-center text-center mb-20 sm:mb-24 gap-6">
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
                                                    stroke="#1a3a52"
                                                    strokeWidth="1"
                                                    fill="none"
                                                />
                                                <path d="M2 4h8M4 2v2M8 2v2" stroke="#1a3a52" strokeWidth="1" />
                                            </svg>
                                        }
                                        text="Newsroom"
                                    />
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-[#1a3a52] tracking-tight leading-[1.1]">
                                        News & Announcements
                                    </h1>
                                    <p className="text-[#605A57] text-lg font-light leading-relaxed max-w-2xl">
                                        Stay updated with the latest happenings, events, and achievements at{" "}
                                        {settings.siteTitle || "Data Center College"}.
                                    </p>

                                    {/* Filter Buttons */}
                                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                                        <button
                                            onClick={() => setSelectedCategory("all")}
                                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                                selectedCategory === "all"
                                                    ? "bg-[#1a3a52] text-white border-[#1a3a52]"
                                                    : "bg-transparent text-[#1a3a52] border-[rgba(26,58,82,0.2)] hover:border-[rgba(26,58,82,0.5)]"
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
                                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                                        isSelected
                                                            ? "bg-[#1a3a52] text-white border-[#1a3a52]"
                                                            : "bg-transparent text-[#1a3a52] border-[rgba(26,58,82,0.2)] hover:border-[rgba(26,58,82,0.5)]"
                                                    }`}
                                                >
                                                    {formatCategoryLabel(category)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Content Stream */}
                                {!hasArticles ? (
                                    <div className="text-center py-20">
                                        <p className="text-[#605A57] text-lg">No articles available at the moment.</p>
                                    </div>
                                ) : filteredNews.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-[#605A57] text-lg">No articles found in this category.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-20 sm:gap-32">
                                        {filteredNews.map((article, index) => {
                                            const isEven = index % 2 === 0;
                                            return (
                                                <div
                                                    key={article.id}
                                                    className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center group`}
                                                >
                                                    {/* Image Side */}
                                                    <div className="w-full lg:w-1/2 relative">
                                                        {/* Geometric Decoration */}
                                                        <div
                                                            className={`absolute -top-6 -bottom-6 ${isEven ? "-left-6" : "-right-6"} w-full border border-[rgba(26,58,82,0.08)] hidden lg:block transition-transform duration-700 group-hover:scale-[1.02]`}
                                                        />

                                                        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                                                            <img
                                                                src={article.image}
                                                                alt={article.title}
                                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-[#1a3a52]/0 group-hover:bg-[#1a3a52]/5 transition-colors duration-500" />
                                                        </div>

                                                        {/* Floating Category */}
                                                        <div
                                                            className={`absolute top-6 ${isEven ? "left-6" : "right-6"}`}
                                                        >
                                                            <span className="px-3 py-1 bg-white/95 backdrop-blur text-[#1a3a52] text-xs font-bold uppercase tracking-wider border border-[rgba(26,58,82,0.1)]">
                                                                {article.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content Side */}
                                                    <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
                                                        <div className="flex items-center gap-4 text-xs font-medium text-[#605A57]/80 mb-6 uppercase tracking-widest">
                                                            <span className="flex items-center gap-2">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {article.date}
                                                            </span>
                                                            <span className="w-px h-3 bg-[rgba(26,58,82,0.2)]" />
                                                            <span className="flex items-center gap-2">
                                                                <User className="w-3.5 h-3.5" />
                                                                {article.author}
                                                            </span>
                                                        </div>

                                                        <Link href={`/news/${article.slug}`} className="group/title">
                                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#1a3a52] mb-6 leading-tight group-hover/title:text-[#1a3a52]/80 transition-colors">
                                                                {article.title}
                                                            </h3>
                                                        </Link>

                                                        <p className="text-[#605A57] text-lg leading-relaxed mb-8 line-clamp-3 font-light">
                                                            {article.excerpt}
                                                        </p>

                                                        <Link
                                                            href={`/news/${article.slug}`}
                                                            className="inline-flex items-center gap-3 text-[#1a3a52] font-semibold uppercase tracking-wider text-sm group/btn hover:opacity-70 transition-opacity"
                                                        >
                                                            <span className="border-b border-[#1a3a52]">
                                                                Read Article
                                                            </span>
                                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Decorative Sidebar */}
                        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
                            <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
                                {Array.from({ length: 200 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <FooterSection settings={settings} />
            </div>
        </>
    );
}
