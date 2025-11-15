"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import FooterSection from "../../components/footer-section"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const newsItems = [
    {
      id: 1,
      category: "announcement",
      title: "Fall 2024 Enrollment Now Open",
      date: "December 15, 2024",
      author: "Admissions Office",
      excerpt:
        "We are excited to announce that enrollment for Fall 2024 is now open. Secure your spot in our undergraduate, TESDA, and Senior High School programs.",
      image: "/images/enrollment-announcement.jpg",
      featured: true,
    },
    {
      id: 2,
      category: "event",
      title: "Annual Career Fair - January 20, 2025",
      date: "December 10, 2024",
      author: "Career Services",
      excerpt:
        "Meet with top employers from Baguio City and beyond. Network with industry professionals and explore career opportunities in your field.",
      image: "/images/career-fair.jpg",
      featured: true,
    },
    {
      id: 3,
      category: "achievement",
      title: "DCCPH Students Win Regional IT Competition",
      date: "December 5, 2024",
      author: "IT Department",
      excerpt:
        "Congratulations to our Computer Science students who placed first in the Cordillera Region Hackathon, showcasing innovative solutions in web development.",
      image: "/images/it-competition.jpg",
      featured: false,
    },
    {
      id: 4,
      category: "announcement",
      title: "New TESDA Courses Available for 2025",
      date: "November 28, 2024",
      author: "TESDA Coordinator",
      excerpt:
        "Introducing new short-term courses in Digital Marketing and Graphic Design. Enroll now and gain industry-recognized certifications.",
      image: "/images/tesda-courses.jpg",
      featured: false,
    },
    {
      id: 5,
      category: "event",
      title: "Open House for Prospective Students",
      date: "November 20, 2024",
      author: "Student Affairs",
      excerpt:
        "Join us for our quarterly Open House event. Tour our facilities, meet faculty members, and learn more about our programs.",
      image: "/images/open-house.jpg",
      featured: false,
    },
    {
      id: 6,
      category: "achievement",
      title: "Business Administration Students Launch Startup",
      date: "November 15, 2024",
      author: "Business Department",
      excerpt:
        "Four BSBA students successfully launched their e-commerce platform, demonstrating real-world application of classroom learning.",
      image: "/images/student-startup.jpg",
      featured: false,
    },
  ]

  const filteredNews =
    selectedCategory === "all" ? newsItems : newsItems.filter((item) => item.category === selectedCategory)

  const featuredNews = newsItems.filter((item) => item.featured)
  const recentNews = filteredNews.filter((item) => !item.featured)

  return (
    <div className="w-full min-h-screen relative bg-background overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[900px] lg:w-[900px] relative flex flex-col justify-start items-start min-h-screen">
          <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-border/50 shadow-[1px_0px_0px_hsl(var(--background))] z-0"></div>
          <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-border/50 shadow-[1px_0px_0px_hsl(var(--background))] z-0"></div>

          <div className="self-stretch pt-[9px] overflow-visible border-b border-border flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 relative z-10">
            {/* Navigation */}
            <div className="w-full flex justify-center items-center z-20 px-4 sm:px-6 md:px-8 lg:px-0 py-3 sm:py-4 md:py-6">
              <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[700px] lg:w-[700px] py-2 sm:py-3 md:py-3 px-3 sm:px-5 md:px-5 bg-card shadow-[0px_2px_8px_rgba(55,50,47,0.08)] overflow-visible rounded-full flex justify-between items-center relative z-30 transition-all duration-300 ease-out border border-border">
                <Link
                  href="/"
                  className="flex justify-center items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <span className="text-primary-foreground text-xs sm:text-sm md:text-base font-bold">DC</span>
                  </div>
                  <div className="hidden sm:flex flex-col justify-center transition-opacity duration-300">
                    <div className="text-foreground text-xs sm:text-sm md:text-base font-bold leading-4 font-sans">
                      DCCPH
                    </div>
                    <div className="text-muted-foreground text-[10px] sm:text-[11px] md:text-xs leading-2 font-sans">
                      Baguio City
                    </div>
                  </div>
                </Link>

                <div className="hidden md:flex justify-start items-center gap-6 lg:gap-8 flex-1 ml-6 lg:ml-8">
                  <Link
                    href="/programs"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Programs
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                  <Link
                    href="/about"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                  <Link
                    href="/news"
                    className="text-foreground text-sm font-semibold hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    News
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/90"></span>
                  </Link>
                  <Link
                    href="/#contact"
                    className="text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 ease-out relative group"
                  >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/90 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                </div>

                <div className="hidden md:flex h-8 md:h-9 ml-4 md:ml-6">
                  <div className="px-4 md:px-5 py-1.5 md:py-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-[0px_2px_8px_rgba(55,50,47,0.3)] overflow-hidden rounded-full flex justify-center items-center cursor-pointer hover:shadow-[0px_4px_12px_rgba(55,50,47,0.4)] hover:scale-105 transition-all duration-300 ease-out active:scale-95">
                    <div className="flex flex-col justify-center text-primary-foreground text-xs sm:text-base md:text-[15px] font-medium leading-5 font-sans">
                      Apply Now
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-12 w-full">
              <div className="w-full max-w-[800px] flex flex-col justify-center items-start gap-6">
                <div className="flex flex-col gap-3">
                  <div className="text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight font-serif">
                    News & Announcements
                  </div>
                  <div className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed font-sans">
                    Stay updated with the latest news, events, and achievements at Data Center College of the
                    Philippines.
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === "all"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    All News
                  </button>
                  <button
                    onClick={() => setSelectedCategory("announcement")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === "announcement"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Announcements
                  </button>
                  <button
                    onClick={() => setSelectedCategory("event")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === "event"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Events
                  </button>
                  <button
                    onClick={() => setSelectedCategory("achievement")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === "achievement"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Achievements
                  </button>
                </div>
              </div>
            </div>

            {/* Featured News */}
            {selectedCategory === "all" && featuredNews.length > 0 && (
              <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 py-8 sm:py-12">
                <div className="w-full max-w-[800px] mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 font-serif">Featured</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredNews.map((item) => (
                      <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      >
                        <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="text-muted-foreground text-sm">Image Placeholder</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                            <span className="text-muted-foreground text-xs">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">By {item.author}</span>
                            <span className="text-primary text-sm font-medium group-hover:underline">Read more →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recent News */}
            <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 py-8 sm:py-12 pb-24">
              <div className="w-full max-w-[800px] mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 font-serif">
                  {selectedCategory === "all" ? "Recent Updates" : "Filtered Results"}
                </h2>
                <div className="space-y-6">
                  {recentNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.id}`}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group block"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-48 sm:h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="text-muted-foreground text-xs">Image</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                            <span className="text-muted-foreground text-xs">{item.date}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">By {item.author}</span>
                            <span className="text-primary text-sm font-medium group-hover:underline">Read more →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  )
}
