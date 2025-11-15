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

export default function AboutUsSection() {
  const values = [
    {
      title: "Excellence",
      description: "Committed to delivering the highest quality education and fostering academic achievement.",
      icon: "⭐",
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge technology and modern teaching methodologies for student success.",
      icon: "💡",
    },
    {
      title: "Community",
      description: "Building a supportive environment where students, faculty, and staff thrive together.",
      icon: "🤝",
    },
    {
      title: "Integrity",
      description: "Upholding ethical standards and fostering responsible leadership in all endeavors.",
      icon: "🏆",
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
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                <circle cx="6" cy="6" r="2" fill="currentColor" />
              </svg>
            }
            text="About Us"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-foreground text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Our Mission & Values
          </div>
          <div className="self-stretch text-center text-muted-foreground text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Data Center College of the Philippines is dedicated to providing world-class education
            <br className="hidden sm:block" />
            that empowers students to excel in technology and business.
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-border flex justify-center items-center">
        <div className="w-full max-w-[800px] flex flex-col justify-start items-start gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-lg sm:text-xl font-semibold font-sans">Our Mission</h3>
            <p className="text-muted-foreground text-sm sm:text-base font-normal leading-relaxed font-sans">
              To provide innovative, accessible, and industry-relevant education that prepares students for successful
              careers in technology, business, and professional services. We are committed to fostering critical
              thinking, creativity, and ethical leadership while maintaining the highest standards of academic
              excellence.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-lg sm:text-xl font-semibold font-sans">Our Vision</h3>
            <p className="text-muted-foreground text-sm sm:text-base font-normal leading-relaxed font-sans">
              To be the leading educational institution in the Philippines, recognized for producing graduates who are
              skilled, ethical, and ready to make meaningful contributions to society and the global economy.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 flex justify-center items-center">
        <div className="w-full max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 border border-border rounded-lg hover:shadow-[0px_0px_0px_0.75px_rgba(55,50,47,0.1)_inset] transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl sm:text-3xl">{value.icon}</div>
                  <h4 className="text-foreground text-lg sm:text-xl font-semibold font-sans">{value.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base font-normal leading-relaxed font-sans">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
