"use client";

import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Article, Settings } from "@/lib/sanity/types";

import CollegeHeader from "./college-header";
import FooterSection from "./footer-section";

const FALLBACK_CATEGORIES = [
  "announcement",
  "events",
  "achievement",
  "news",
  "alert",
];

function formatCategoryLabel(category: string) {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

interface NewsPageContentProps {
  articles: Article[];
  settings: Settings;
}

export default function NewsPageContent({
  articles,
  settings,
}: NewsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryOptions = useMemo(() => {
    const unique = new Set(
      articles
        .map((article) => article.category?.toLowerCase())
        .filter(Boolean),
    );
    return unique.size ? Array.from(unique) : FALLBACK_CATEGORIES;
  }, [articles]);

  const filteredNews = useMemo(() => {
    if (selectedCategory === "all") return articles;
    return articles.filter(
      (article) => article.category?.toLowerCase() === selectedCategory,
    );
  }, [articles, selectedCategory]);

  const hasArticles = articles.length > 0;

  return (
    <>
      <CollegeHeader settings={settings} />

      <div className="pt-16 sm:pt-20 flex flex-col justify-start items-center w-full relative overflow-hidden">
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
            <div className="flex-1 border-l border-r border-[rgba(26,58,82,0.12)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f7f5f3]">
              <div className="max-w-[1060px] mx-auto">
                {/* Page Header */}
                <div className="flex flex-col items-center text-center mb-16 sm:mb-20 gap-4">
                  {/* Badge */}
                  <div className="px-3 py-1.5 bg-[#f7f5f3] shadow-[0px_0px_0px_4px_rgba(26,58,82,0.05)] overflow-hidden rounded-full flex justify-start items-center gap-2 border border-[rgba(26,58,82,0.12)]">
                    <div className="w-2 h-2 rounded-full bg-[#1a3a52]" />
                    <span className="text-[#1a3a52] text-xs font-medium uppercase tracking-wider">
                      Newsroom
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-[#1a3a52] tracking-tight leading-[1.1]">
                    News & Announcements
                  </h1>

                  {/* Subtitle */}
                  <p className="text-[#605A57] text-lg font-light leading-relaxed max-w-2xl">
                    Stay updated with the latest happenings, events, and
                    achievements at{" "}
                    {settings.shortTitle || "Data Center College"}.
                  </p>

                  {/* Category Filter */}
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        selectedCategory === "all"
                          ? "bg-[#1a3a52] text-white"
                          : "bg-transparent text-[#1a3a52] border border-[rgba(26,58,82,0.2)] hover:border-[rgba(26,58,82,0.5)]"
                      }`}
                    >
                      All
                    </button>

                    {categoryOptions.map((category) => {
                      const isSelected =
                        selectedCategory === category.toLowerCase();
                      return (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(category.toLowerCase())
                          }
                          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                            isSelected
                              ? "bg-[#1a3a52] text-white"
                              : "bg-transparent text-[#1a3a52] border border-[rgba(26,58,82,0.2)] hover:border-[rgba(26,58,82,0.5)]"
                          }`}
                        >
                          {formatCategoryLabel(category)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content */}
                {!hasArticles ? (
                  <div className="text-center py-20">
                    <p className="text-[#605A57] text-lg font-light">
                      No articles available at the moment.
                    </p>
                  </div>
                ) : filteredNews.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-[#605A57] text-lg font-light">
                      No articles found in this category.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
                    {filteredNews.map((article, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <article
                          key={article.id}
                          className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center group`}
                        >
                          {/* Image */}
                          <div className="w-full lg:w-1/2 relative">
                            {/* Geometric Decoration */}
                            <div
                              className={`absolute -top-4 -bottom-4 ${isEven ? "-left-4" : "-right-4"} w-full border border-[rgba(26,58,82,0.08)] hidden lg:block transition-transform duration-500 group-hover:scale-[1.02]`}
                            />

                            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-[#1a3a52]/0 group-hover:bg-[#1a3a52]/5 transition-colors duration-300" />
                            </div>

                            {/* Category Badge */}
                            <div
                              className={`absolute top-4 ${isEven ? "left-4" : "right-4"}`}
                            >
                              <span className="px-3 py-1 bg-white/95 backdrop-blur text-[#1a3a52] text-[10px] font-bold uppercase tracking-wider border border-[rgba(26,58,82,0.1)]">
                                {formatCategoryLabel(article.category)}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
                            {/* Meta */}
                            <div className="flex items-center gap-3 text-xs font-medium text-[#605A57]/70 mb-4 uppercase tracking-widest">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {article.date}
                              </span>
                              <span className="w-px h-3 bg-[rgba(26,58,82,0.2)]" />
                              <span className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                {article.author}
                              </span>
                            </div>

                            {/* Title */}
                            <Link
                              href={`/news/${article.slug}`}
                              className="group/title"
                            >
                              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#1a3a52] mb-4 leading-tight group-hover/title:text-[#1a3a52]/70 transition-colors">
                                {article.title}
                              </h2>
                            </Link>

                            {/* Excerpt */}
                            <p className="text-[#605A57] text-base leading-relaxed mb-6 line-clamp-3 font-light">
                              {article.excerpt}
                            </p>

                            {/* Read More */}
                            <Link
                              href={`/news/${article.slug}`}
                              className="inline-flex items-center gap-2 text-[#1a3a52] text-sm font-medium uppercase tracking-wider group/link"
                            >
                              <span className="border-b border-[#1a3a52] group-hover/link:border-transparent transition-colors">
                                Read Article
                              </span>
                              <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                                →
                              </span>
                            </Link>
                          </div>
                        </article>
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
