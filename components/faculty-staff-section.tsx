"use client"

import type React from "react"

// Badge component for consistency
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

export default function FacultyStaffSection() {
  const faculty = [
    {
      name: "Dr. Maria Santos",
      title: "Dean of Academic Affairs",
      specialization: "Computer Science & AI",
      bio: "20+ years of experience in technology education and research.",
    },
    {
      name: "Prof. James Chen",
      title: "Head of IT Department",
      specialization: "Software Engineering",
      bio: "Expert in cloud computing and enterprise solutions.",
    },
    {
      name: "Dr. Patricia Reyes",
      title: "Head of Business School",
      specialization: "Business Administration",
      bio: "Specializes in strategic management and entrepreneurship.",
    },
    {
      name: "Prof. Robert Gonzales",
      title: "Lead Instructor",
      specialization: "Data Analytics",
      bio: "Passionate about data-driven decision making.",
    },
    {
      name: "Dr. Angela Torres",
      title: "Director of Student Services",
      specialization: "Student Development",
      bio: "Dedicated to student success and career development.",
    },
    {
      name: "Prof. Michael Reyes",
      title: "Instructor",
      specialization: "Digital Marketing",
      bio: "Industry expert with 15 years of marketing experience.",
    },
  ]

  return (
    <div className="w-full border-b border-border flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-border flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="3.5" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M2 10C2 8.5 4 7.5 6 7.5C8 7.5 10 8.5 10 10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            }
            text="Faculty"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-foreground text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Meet Our Faculty & Staff
          </div>
          <div className="self-stretch text-center text-muted-foreground text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Learn from experienced educators and industry professionals
            <br className="hidden sm:block" />
            committed to your academic and personal growth.
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 flex justify-center items-center">
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 border border-border rounded-lg hover:shadow-[0px_4px_12px_rgba(55,50,47,0.08)] transition-all duration-300 hover:border-border/80 flex flex-col gap-4 group"
            >
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-all duration-300">
                <span className="text-2xl sm:text-3xl font-semibold text-foreground">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <h3 className="text-foreground text-lg sm:text-xl font-semibold font-sans leading-tight">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm font-medium font-sans">{member.title}</p>
              </div>

              {/* Specialization Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-muted text-foreground text-xs font-medium rounded-full">
                  {member.specialization}
                </span>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-sm font-normal leading-relaxed font-sans flex-grow">{member.bio}</p>

              {/* Divider */}
              <div className="h-px bg-border group-hover:bg-border/80 transition-colors duration-300"></div>

              {/* Contact Link */}
              <button className="text-foreground text-sm font-semibold hover:text-muted-foreground transition-colors duration-200 flex items-center gap-2 pt-2">
                Connect
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-t border-border flex justify-center items-center">
        <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { number: "150+", label: "Faculty Members", description: "Experienced educators" },
            { number: "95%", label: "PhD Holders", description: "Advanced degrees" },
            { number: "20+", label: "Years Avg Experience", description: "Industry expertise" },
            { number: "1:15", label: "Student-Faculty Ratio", description: "Personalized attention" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.number}</div>
              <div className="flex flex-col gap-1">
                <h4 className="text-foreground text-base sm:text-lg font-semibold font-sans">{stat.label}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm font-normal font-sans">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
