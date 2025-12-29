"use client"

import Link from "next/link"
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

export default function AdmissionsContactSection() {
  const admissionSteps = [
    {
      step: "1",
      title: "Submit Application",
      description: "Complete the online application form with your personal and academic information.",
    },
    {
      step: "2",
      title: "Submit Documents",
      description: "Upload required documents including transcripts, test scores, and recommendation letters.",
    },
    {
      step: "3",
      title: "Application Review",
      description: "Our admissions team reviews your application and evaluates your qualifications.",
    },
    {
      step: "4",
      title: "Interview",
      description: "Selected candidates are invited for an interview with our admissions counselors.",
    },
    {
      step: "5",
      title: "Decision",
      description: "Receive your admission decision and enrollment instructions via email.",
    },
    {
      step: "6",
      title: "Enrollment",
      description: "Complete enrollment process and prepare for your first semester at DCCPH.",
    },
  ]

  const importantDates = [
    { event: "Application Deadline", date: "March 31, 2024" },
    { event: "Early Decision Deadline", date: "February 15, 2024" },
    { event: "Interview Period", date: "April - May 2024" },
    { event: "Admission Decision", date: "June 15, 2024" },
    { event: "Enrollment Deadline", date: "July 31, 2024" },
    { event: "Orientation", date: "August 15-20, 2024" },
  ]

  return (
    <div className="w-full border-b border-border flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-border flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <path d="M2 8H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            }
            text="Admissions"
          />
          <div className="self-stretch text-center flex justify-center flex-col text-foreground text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Admissions & Contact
          </div>
          <div className="self-stretch text-center text-muted-foreground text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Start your journey with us. Learn about our admissions process
            <br className="hidden sm:block" />
            and get in touch with our admissions team.
          </div>
        </div>
      </div>

      {/* Admission Steps */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-border flex justify-center items-center">
        <div className="w-full max-w-[1200px]">
          <h3 className="text-foreground text-2xl sm:text-3xl font-semibold font-sans mb-8 sm:mb-12">
            Admission Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionSteps.map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 border border-border rounded-lg hover:shadow-[0px_4px_12px_rgba(55,50,47,0.08)] transition-all duration-300 hover:border-border/80 flex flex-col gap-4"
              >
                {/* Step Number */}
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>

                {/* Title */}
                <h4 className="text-foreground text-lg sm:text-xl font-semibold font-sans">{item.title}</h4>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base font-normal leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Dates & Contact */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-border flex justify-center items-center">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Important Dates */}
          <div className="flex flex-col gap-6">
            <h3 className="text-foreground text-2xl sm:text-3xl font-semibold font-sans">Important Dates</h3>
            <div className="flex flex-col gap-4">
              {importantDates.map((item, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-foreground font-semibold text-base sm:text-lg font-sans">{item.event}</h4>
                      <p className="text-muted-foreground text-sm font-normal font-sans">{item.date}</p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mt-1"
                    >
                      <rect x="2" y="2" width="16" height="16" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M6 10H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <h3 className="text-foreground text-2xl sm:text-3xl font-semibold font-sans">Contact Us</h3>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "📍",
                  title: "Address",
                  content: "123 Education Street, Baguio City, Philippines 2600",
                },
                {
                  icon: "📞",
                  title: "Phone",
                  content: "+63 (74) 442-1234 / +63 (74) 442-5678",
                },
                {
                  icon: "📧",
                  title: "Email",
                  content: "admissions@dccph.edu.ph",
                },
                {
                  icon: "🕐",
                  title: "Office Hours",
                  content: "Monday - Friday: 8:00 AM - 5:00 PM",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="flex gap-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">{contact.icon}</div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-foreground font-semibold text-base sm:text-lg font-sans">{contact.title}</h4>
                      <p className="text-muted-foreground text-sm font-normal leading-relaxed font-sans">{contact.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 flex justify-center items-center">
        <div className="w-full max-w-[700px] flex flex-col justify-center items-center gap-6 text-center">
          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-2xl sm:text-3xl font-semibold font-sans">Ready to Apply?</h3>
            <p className="text-muted-foreground text-sm sm:text-base font-normal font-sans">
              Take the first step towards your future. Apply now and join our community of learners and innovators.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply"><button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm sm:text-base hover:shadow-[0px_4px_12px_rgba(55,50,47,0.3)] transition-all duration-200 hover:scale-105 active:scale-95">
              Apply Now
            </button>
            <button className="px-8 py-3 border border-primary text-primary rounded-full font-semibold text-sm sm:text-base hover:bg-primary/5 transition-all duration-200 hover:scale-105 active:scale-95">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
