"use client"

import type React from "react"

// Badge component for consistency
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function CampusFacilitiesSection() {
  const campuses = [
    {
      name: "Main Campus - Baguio City",
      location: "Baguio City, Benguet",
      description:
        "Our flagship campus nestled in the cool highlands of Baguio City, featuring modern facilities and a vibrant academic community.",
      facilities: ["Computer Labs", "Library", "Auditorium", "Sports Complex", "Cafeteria", "Student Center"],
      students: "2,500+",
      established: "2010",
    },
    {
      name: "Downtown Campus",
      location: "Session Road, Baguio City",
      description:
        "Conveniently located in the heart of Baguio City, offering accessible education with state-of-the-art learning facilities.",
      facilities: ["Classrooms", "Computer Labs", "Study Halls", "Counseling Center", "Bookstore", "Lounge"],
      students: "1,200+",
      established: "2015",
    },
  ]

  const amenities = [
    {
      title: "Modern Computer Labs",
      description: "State-of-the-art laboratories with latest hardware and software for hands-on technical training.",
      icon: "💻",
    },
    {
      title: "Digital Library",
      description: "Extensive collection of e-books, journals, and research databases accessible 24/7 to all students.",
      icon: "📚",
    },
    {
      title: "Collaborative Spaces",
      description: "Innovative study areas designed for group projects, discussions, and creative collaboration.",
      icon: "🤝",
    },
    {
      title: "Sports & Recreation",
      description:
        "Complete sports facilities including gymnasium, courts, and recreational areas for student wellness.",
      icon: "⚽",
    },
    {
      title: "Cafeteria & Dining",
      description: "Modern dining facilities offering nutritious meals in a comfortable environment for all.",
      icon: "🍽️",
    },
    {
      title: "Student Lounge",
      description: "Comfortable spaces for relaxation, socializing, and extracurricular activities throughout campus.",
      icon: "☕",
    },
    {
      title: "Auditorium & Events",
      description: "Multi-purpose auditorium for seminars, conferences, cultural events, and academic presentations.",
      icon: "🎭",
    },
    {
      title: "Counseling Center",
      description: "Professional support services for mental health, career guidance, and personal development.",
      icon: "💬",
    },
  ]

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10L6 2L10 10" stroke="#37322F" strokeWidth="1" fill="none" />
                <path d="M4 6H8" stroke="#37322F" strokeWidth="1" />
              </svg>
            }
            text="Our Campuses"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Our Campuses & Facilities
          </div>
          <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Experience world-class facilities across our strategically located campuses
            <br className="hidden sm:block" />
            designed to support your academic and personal growth.
          </div>
        </div>
      </div>

      {/* Campuses Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 flex justify-center items-center">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {campuses.map((campus, index) => (
            <div
              key={index}
              className="border border-[rgba(55,50,47,0.12)] rounded-lg overflow-hidden hover:shadow-[0px_8px_24px_rgba(55,50,47,0.12)] transition-all duration-300 flex flex-col"
            >
              {/* Campus Header */}
              <div className="p-6 sm:p-8 border-b border-[rgba(55,50,47,0.12)] bg-gradient-to-r from-[#F7F5F3] to-[#FAFAF8]">
                <h3 className="text-[#37322F] text-xl sm:text-2xl font-semibold font-sans mb-2">{campus.name}</h3>
                <p className="text-[#605A57] text-sm sm:text-base font-medium flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 1C4.5 1 1.73 3.5 1.73 6.5C1.73 10.5 8 15 8 15s6.27-4.5 6.27-8.5C14.27 3.5 11.5 1 8 1Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                    <circle cx="8" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                  {campus.location}
                </p>
              </div>

              {/* Campus Content */}
              <div className="p-6 sm:p-8 flex flex-col gap-4 flex-grow">
                <p className="text-[#605A57] text-sm sm:text-base font-normal leading-relaxed font-sans">
                  {campus.description}
                </p>

                {/* Facilities Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {campus.facilities.map((facility, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#F7F5F3] text-[#37322F] text-xs font-medium rounded-full border border-[rgba(55,50,47,0.12)]"
                    >
                      {facility}
                    </span>
                  ))}
                </div>

                {/* Campus Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 mt-auto border-t border-[rgba(55,50,47,0.12)]">
                  <div className="pt-4">
                    <div className="text-[#37322F] text-lg sm:text-xl font-bold font-sans">{campus.students}</div>
                    <div className="text-[#605A57] text-xs sm:text-sm font-medium font-sans">Students</div>
                  </div>
                  <div className="pt-4">
                    <div className="text-[#37322F] text-lg sm:text-xl font-bold font-sans">
                      Est. {campus.established}
                    </div>
                    <div className="text-[#605A57] text-xs sm:text-sm font-medium font-sans">Established</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-t border-[rgba(55,50,47,0.12)] flex justify-center items-center">
        <div className="w-full max-w-[1200px]">
          <div className="mb-8 sm:mb-12">
            <h3 className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-sans mb-2">
              Campus Amenities & Facilities
            </h3>
            <p className="text-[#605A57] text-sm sm:text-base font-normal font-sans">
              All our campuses are equipped with comprehensive facilities to support your learning and development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="p-6 border border-[rgba(55,50,47,0.12)] rounded-lg hover:shadow-[0px_4px_12px_rgba(55,50,47,0.08)] transition-all duration-300 hover:border-[rgba(55,50,47,0.20)] flex flex-col gap-4 group"
              >
                {/* Icon */}
                <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>

                {/* Title */}
                <h4 className="text-[#37322F] text-lg sm:text-xl font-semibold font-sans leading-tight">
                  {amenity.title}
                </h4>

                {/* Description */}
                <p className="text-[#605A57] text-sm sm:text-base font-normal leading-relaxed font-sans flex-grow">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
