"use client";

import { Calendar, Facebook, Share2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Settings } from "@/lib/sanity/types";
import type { UnifiedPost } from "@/lib/unified-posts";
import {
  formatUnifiedDate,
  getRelativeTime,
  isFacebookPost,
  getPostLink,
  isSharedPost,
  getSharedFrom,
} from "@/lib/unified-posts";

import FooterSection from "./footer-section";

const FALLBACK_CATEGORIES = [
  "announcement",
  "events",
  "achievement",
  "news",
  "alert",
  "social media",
];

function formatCategoryLabel(category: string) {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Bento Grid Component for Facebook and Sanity Gallery Images
function BentoGrid({ posts, galleryImages = [] }: { posts: UnifiedPost[]; galleryImages?: Array<{ id: string; image: string; title: string; date: string }> }) {
  // Combine both sources
  const combinedImages = [...posts, ...galleryImages].slice(0, 8);
  
  if (!combinedImages.length) return null;

  return (
    <section className="w-full border-b border-t border-[rgba(26,58,82,0.12)] flex flex-col justify-center items-center mt-8">
      <div className="self-stretch flex justify-center items-start">
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
        <div className="flex-1 border-l border-r border-[rgba(26,58,82,0.12)] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f7f5f3]">
          <div className="max-w-[1060px] mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 gap-4">
              <div className="px-3 py-1.5 bg-[#f7f5f3] shadow-[0px_0px_0px_4px_rgba(26,58,82,0.05)] overflow-hidden rounded-full flex justify-start items-center gap-2 border border-[rgba(26,58,82,0.12)]">
                <div className="w-2 h-2 rounded-full bg-[#1877f2]" />
                <span className="text-[#1a3a52] text-xs font-medium uppercase tracking-wider">
                  Media Gallery
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#1a3a52] tracking-tight leading-[1.1]">
                Recent Photos
              </h2>
              <p className="text-[#605A57] text-lg font-light leading-relaxed max-w-2xl">
                Captured moments from our social media and campus events
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {combinedImages.map((item, index) => {
                // First item takes 2 columns and 2 rows on larger screens
                const isFeatured = index === 0;
                const gridClass = isFeatured
                  ? "col-span-2 row-span-2"
                  : "col-span-1";
                
                // Check if this is a Facebook post
                const isFb = 'id' in item && isFacebookPost(item as UnifiedPost);
                const link = isFb ? getPostLink(item as UnifiedPost) : "#";

                return (
                  <Link
                    key={item.id}
                    href={link}
                    className={`${gridClass} group relative overflow-hidden rounded-lg bg-stone-100 aspect-square`}
                  >
                    <img
                      src={item.image || ""}
                      alt={item.title || "Gallery image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        {isFb ? getRelativeTime(item.date) : item.date}
                      </p>
                    </div>
                    {isFb && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
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
    </section>
  );
}

interface NewsPageContentProps {
  posts: UnifiedPost[];
  facebookImages: UnifiedPost[];
  galleryImages?: Array<{ id: string; image: string; title: string; date: string }>;
  settings: Settings;
  showFooter?: boolean;
}

export default function NewsPageContent({
  posts,
  facebookImages,
  galleryImages = [],
  settings,
  showFooter = true,
}: NewsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryOptions = useMemo(() => {
    const unique = new Set(
      posts.map((post) => post.category?.toLowerCase()).filter(Boolean),
    );
    return unique.size ? Array.from(unique) : FALLBACK_CATEGORIES;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter(
      (post) => post.category?.toLowerCase() === selectedCategory,
    );
  }, [posts, selectedCategory]);

  const hasPosts = posts.length > 0;

  return (
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
                  achievements at {settings.shortTitle || "Data Center College"}
                  .
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
              {!hasPosts ? (
                <div className="text-center py-20">
                  <p className="text-[#605A57] text-lg font-light">
                    No posts available at the moment.
                  </p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#605A57] text-lg font-light">
                    No posts found in this category.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 sm:gap-20 md:gap-24">
                  {filteredPosts.map((post, index) => {
                    const isEven = index % 2 === 0;
                    const postLink = getPostLink(post);
                    const fbPost = isFacebookPost(post);

                    return (
                      <article
                        key={post.id}
                        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center group`}
                      >
                        {/* Image */}
                        <div className="w-full lg:w-1/2 relative">
                          {/* Geometric Decoration */}
                          <div
                            className={`absolute -top-4 -bottom-4 ${isEven ? "-left-4" : "-right-4"} w-full border border-[rgba(26,58,82,0.08)] hidden lg:block transition-transform duration-500 group-hover:scale-[1.02]`}
                          />

                          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title || "Post image"}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#f7f5f3]">
                                {fbPost ? (
                                  <Facebook className="w-16 h-16 text-[#1877f2]/30" />
                                ) : (
                                  <span className="text-[#605A57]/30 text-sm">
                                    No image
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-[#1a3a52]/0 group-hover:bg-[#1a3a52]/5 transition-colors duration-300" />
                          </div>

                          {/* Category Badge */}
                          <div
                            className={`absolute top-4 ${isEven ? "left-4" : "right-4"}`}
                          >
                            <span
                              className={`px-3 py-1 backdrop-blur text-[10px] font-bold uppercase tracking-wider border ${
                                fbPost
                                  ? "bg-[#1877f2]/95 text-white border-[#1877f2]/20"
                                  : "bg-white/95 text-[#1a3a52] border-[rgba(26,58,82,0.1)]"
                              }`}
                            >
                              {fbPost && (
                                <Facebook className="w-3 h-3 inline mr-1" />
                              )}
                              {formatCategoryLabel(post.category)}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
                          {/* Meta */}
                          <div className="flex items-center gap-3 text-xs font-medium text-[#605A57]/70 mb-4 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatUnifiedDate(post.date)}
                            </span>
                            <span className="w-px h-3 bg-[rgba(26,58,82,0.2)]" />
                            <span className="flex items-center gap-1.5">
                              {fbPost ? (
                                <>
                                  <Facebook className="w-3.5 h-3.5 text-[#1877f2]" />
                                  Facebook
                                </>
                              ) : (
                                <>
                                  <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px]">
                                    ✎
                                  </span>
                                  {post.author}
                                </>
                              )}
                            </span>
                          </div>

                          {/* Shared Post Indicator */}
                          {isSharedPost(post) && (
                            <div className="flex items-center gap-2 mb-3 text-xs text-[#1877f2]">
                              <Share2 className="w-3.5 h-3.5" />
                              <span>
                                Shared from{" "}
                                {getSharedFrom(post)?.name || "Facebook"}
                              </span>
                            </div>
                          )}

                          {/* Title */}
                          <Link href={postLink} className="group/title">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#1a3a52] mb-4 leading-tight group-hover/title:text-[#1a3a52]/70 transition-colors">
                              {post.title}
                            </h2>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-[#605A57] text-base leading-relaxed mb-6 line-clamp-3 font-light">
                            {post.excerpt}
                          </p>

                          {/* Read More */}
                          <Link
                            href={postLink}
                            className="inline-flex items-center gap-2 text-[#1a3a52] text-sm font-medium uppercase tracking-wider group/link"
                          >
                            <span className="border-b border-[#1a3a52] group-hover/link:border-transparent transition-colors">
                              {fbPost ? "View Post" : "Read Article"}
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

      {showFooter && <FooterSection settings={settings} />}

      {/* Bento Grid for Combined Facebook and Gallery Images */}
      <BentoGrid posts={facebookImages} galleryImages={galleryImages} />
    </div>
  );
}
