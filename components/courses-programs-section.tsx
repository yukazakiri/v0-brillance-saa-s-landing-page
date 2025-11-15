"use client"

import type React from "react"

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function CoursesAndProgramsSection() {
  const programCategories = [
    {
      category: "Undergraduate Programs",
      icon: "🎓",
      color: "from-primary to-primary/80",
      programs: [
        {
          title: "Bachelor of Science in Information Technology",
          duration: "4 Years",
          highlights: ["Web Development", "Cloud Computing", "Cybersecurity"],
        },
        {
          title: "Bachelor of Science in Business Administration",
          duration: "4 Years",
          highlights: ["Financial Management", "Strategic Planning", "Digital Marketing"],
        },
        {
          title: "Bachelor of Science in Computer Science",
          duration: "4 Years",
          highlights: ["Machine Learning", "AI Development", "Software Engineering"],
        },
      ],
    },
    {
      category: "TESDA Courses",
      icon: "💼",
      color: "from-secondary to-secondary/80",
      programs: [
        {
          title: "TESDA Certified Network Technician",
          duration: "6-9 Months",
          highlights: ["Network Setup", "System Administration", "Troubleshooting"],
        },
        {
          title: "TESDA Certified Web Developer",
          duration: "6-9 Months",
          highlights: ["Frontend Development", "Backend Development", "Full Stack Skills"],
        },
        {
          title: "TESDA Certified Digital Marketing",
          duration: "3-6 Months",
          highlights: ["Social Media Marketing", "SEO", "Content Strategy"],
        },
      ],
    },
    {
      category: "Senior High School (SHS)",
      icon: "📚",
      color: "from-accent to-accent/80",
      programs: [
        {
          title: "Science, Technology, Engineering & Mathematics (STEM)",
          duration: "2 Years",
          highlights: ["Physics", "Chemistry", "Computer Science"],
        },
        {
          title: "Information & Communications Technology (ICT)",
          duration: "2 Years",
          highlights: ["Web Design", "Programming", "Digital Media"],
        },
        {
          title: "Business & Management (ABM)",
          duration: "2 Years",
          highlights: ["Accounting", "Business Strategy", "Entrepreneurship"],
        },
      ],
    },
  ]

  return (
    <div id="programs" className="w-full border-b border-border flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-12 sm:py-16 md:py-24 lg:py-32 border-b border-border flex justify-center items-center">
        <div className="w-full max-w-[700px] flex flex-col justify-start items-center gap-4 sm:gap-6 md:gap-8">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L6 2L11 11" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M3 7H9" stroke="currentColor" strokeWidth="1" />
              </svg>
            }
            text="Academic Programs"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-serif tracking-tight">
            Our Academic Offerings
          </div>
          <div className="self-stretch text-center text-muted-foreground text-sm sm:text-base md:text-lg font-normal leading-relaxed md:leading-8 font-sans max-w-[600px]">
            From Senior High School to specialized TESDA courses and bachelor's degrees, we offer pathways for every
            student.
          </div>
        </div>
      </div>

      {/* Program Categories - Streamlined layout */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-12 sm:py-16 md:py-24 lg:py-32 flex justify-center items-center">
        <div className="w-full max-w-[900px] flex flex-col gap-16 md:gap-20">
          {programCategories.map((categoryData, categoryIndex) => (
            <div key={categoryIndex} className="flex flex-col gap-6 md:gap-8">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className={`h-12 w-1 bg-gradient-to-b ${categoryData.color}`}></div>
                <div>
                  <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    {categoryData.category}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {categoryData.category === "Undergraduate Programs" && "Professional bachelor's degrees"}
                    {categoryData.category === "TESDA Courses" && "Short-term technical certifications"}
                    {categoryData.category === "Senior High School (SHS)" && "Foundation for college readiness"}
                  </div>
                </div>
              </div>

              {/* Program Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {categoryData.programs.map((program, programIndex) => (
                  <div
                    key={programIndex}
                    className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 hover:shadow-[0px_8px_24px_rgba(55,50,47,0.08)] transition-all duration-300 flex flex-col bg-card"
                  >
                    {/* Color accent bar */}
                    <div className={`h-1 bg-gradient-to-r ${categoryData.color}`}></div>

                    {/* Content */}
                    <div className="p-6 md:p-7 flex flex-col gap-4 flex-grow">
                      {/* Program Title */}
                      <h3 className="text-foreground text-lg md:text-xl font-semibold font-serif leading-tight group-hover:text-primary transition-colors">
                        {program.title}
                      </h3>

                      {/* Duration */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-3 py-1.5 bg-muted text-foreground rounded-full border border-border">
                          {program.duration}
                        </span>
                      </div>

                      {/* Key Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {program.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground text-xs font-medium rounded-md border border-border/50"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* CTA Link */}
                      <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors duration-200 flex items-center gap-2 group/link pt-2 mt-auto">
                        Learn More
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6 12L10 8L6 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover/link:translate-x-1 transition-transform duration-300"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Our Programs - Simplified benefits */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-border flex justify-center items-center bg-card/50">
        <div className="w-full max-w-[900px] flex flex-col gap-8 md:gap-12">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-foreground text-3xl md:text-4xl font-semibold font-serif">Why Choose Our Programs</h2>
            <p className="text-muted-foreground text-base md:text-lg font-normal font-sans max-w-[600px] mx-auto">
              We provide comprehensive education and support services to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Industry-Aligned Curriculum",
                description:
                  "All programs are designed with input from industry experts to ensure you learn in-demand skills.",
              },
              {
                title: "Experienced Faculty",
                description: "Learn from qualified instructors with real-world experience in their respective fields.",
              },
              {
                title: "Career Support",
                description:
                  "Access internship opportunities, job placement assistance, and career counseling services.",
              },
              {
                title: "Flexible Learning Options",
                description: "Choose from full-time, part-time, and online formats designed to fit your schedule.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-8 border border-border rounded-lg bg-background hover:shadow-[0px_8px_24px_rgba(55,50,47,0.08)] transition-all duration-300"
              >
                <h4 className="text-foreground text-lg font-semibold font-serif mb-3">{benefit.title}</h4>
                <p className="text-muted-foreground text-base font-normal font-sans leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
