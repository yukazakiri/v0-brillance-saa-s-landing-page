"use client"

import { Monitor, GraduationCap, Users, Trophy, BookOpen, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Use standard design token for borders
const BORDER_COLOR = "border-[rgba(26,58,82,0.12)]"
const NAVY = "text-[#1a3a52]"
const GREY = "text-[#605A57]"
const GOLD = "text-[#C79244]"

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "Industry-Relevant Curriculum",
      description: "Our programs are constantly updated with input from industry leaders to ensure you learn skills that employers actually need right now.",
      icon: <Monitor className="w-6 h-6 text-[#1a3a52]" />,
    },
    {
      title: "Expert Faculty",
      description: "Learn from seasoned professionals and academics who bring real-world experience and deep subject knowledge to the classroom.",
      icon: <Users className="w-6 h-6 text-[#1a3a52]" />,
    },
    {
      title: "Career Placement Support",
      description: "We don't just educate; we connect. Our dedicated career center helps you with internships, job placements, and career counseling.",
      icon: <GraduationCap className="w-6 h-6 text-[#1a3a52]" />,
    },
    {
      title: "Modern Learning Environment",
      description: "Experience a blend of traditional academic rigor and modern technological tools designed to foster innovation and critical thinking.",
      icon: <BookOpen className="w-6 h-6 text-[#1a3a52]" />,
    },
    {
      title: "Global Perspective",
      description: "Our curriculum emphasizes global standards, preparing you to compete and succeed in the international job market.",
      icon: <Globe className="w-6 h-6 text-[#1a3a52]" />,
    },
    {
      title: "Student Success Track Record",
      description: "Join a community of successful alumni who are now leaders in various industries across the globe.",
      icon: <Trophy className="w-6 h-6 text-[#1a3a52]" />,
    },
  ]

  return (
    <div id="why-choose-us" className={cn("w-full border-b flex flex-col justify-center items-center", BORDER_COLOR)}>
      {/* Header Section */}
      <div className={cn("self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 border-b flex justify-center items-center gap-6", BORDER_COLOR)}>
        <div className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4">
          <Badge variant="outline" className="px-4 py-1.5 bg-[#F7F5F3] border-border text-[#1a3a52] hover:bg-[#F7F5F3] flex gap-2 items-center rounded-full shadow-sm">
             <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10L6 2L10 10" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M4 6H8" stroke="currentColor" strokeWidth="1" />
              </svg>
            <span className="uppercase tracking-wider text-[10px] font-semibold">Why Choose Us</span>
          </Badge>
          
          <div className={cn("w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight", NAVY)}>
            Building Your Future on a <br /> <span className={cn("italic", GOLD)}>Foundation of Excellence</span>
          </div>
          
          <div className={cn("self-stretch text-center text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans", GREY)}>
            We go beyond textbooks to provide a holistic education that shapes character, builds competence, and opens doors to global opportunities.
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="self-stretch flex justify-center items-start">
        {/* Left decorative element */}
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

        {/* Main Bento Grid */}
        <div className={cn("flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-r", BORDER_COLOR)}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative bg-transparent p-8 sm:p-10 flex flex-col justify-start items-start gap-6 hover:bg-white/50 transition-colors duration-300",
                // Borders logic for grid
                "border-b", BORDER_COLOR,
                // Add right border to 1st and 2nd column on lg screens
                (index + 1) % 3 !== 0 ? "lg:border-r" : "",
                // Add right border to odd items on md screens (only up to last row)
                (index + 1) % 2 !== 0 ? "md:max-lg:border-r" : ""
              )}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-[#F7F5F3] border border-[rgba(26,58,82,0.08)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 group-hover:border-[rgba(26,58,82,0.15)] group-hover:shadow-sm">
                {feature.icon}
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className={cn("font-serif text-xl font-semibold leading-tight group-hover:text-[#C79244] transition-colors", NAVY)}>
                  {feature.title}
                </h3>
                
                <p className={cn("text-sm leading-relaxed", GREY)}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right decorative element */}
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
    </div>
  )
}
