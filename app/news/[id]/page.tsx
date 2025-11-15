"use client"

import type React from "react"
import Link from "next/link"
import { useParams } from 'next/navigation'
import FooterSection from "../../../components/footer-section"
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'

export default function NewsArticlePage() {
  const params = useParams()
  const id = params.id

  const newsData: Record<string, any> = {
    "1": {
      id: 1,
      category: "announcement",
      title: "Fall 2024 Enrollment Now Open",
      date: "December 15, 2024",
      author: "Admissions Office",
      image: "/images/enrollment-announcement.jpg",
      content: `
        <p>We are thrilled to announce that enrollment for the Fall 2024 semester is now officially open at Data Center College of the Philippines. This is an exciting opportunity for prospective students to join our growing community of learners in Baguio City.</p>

        <h2>Available Programs</h2>
        <p>We are accepting applications for the following programs:</p>
        <ul>
          <li><strong>Undergraduate Programs:</strong> Bachelor of Science in Information Technology, Business Administration, Computer Science, and more</li>
          <li><strong>TESDA Courses:</strong> Computer Programming, Web Development, Digital Marketing, and Graphic Design</li>
          <li><strong>Senior High School:</strong> STEM, ABM, HUMSS, and ICT tracks</li>
        </ul>

        <h2>Important Dates</h2>
        <p>Please take note of the following important dates for the Fall 2024 enrollment:</p>
        <ul>
          <li>Application Period: December 15, 2024 - February 28, 2025</li>
          <li>Entrance Examination: March 5-10, 2025</li>
          <li>Results Release: March 20, 2025</li>
          <li>Enrollment Period: March 25 - April 15, 2025</li>
          <li>Start of Classes: May 5, 2025</li>
        </ul>

        <h2>Application Requirements</h2>
        <p>To complete your application, please prepare the following documents:</p>
        <ul>
          <li>Completed application form (available online or at the admissions office)</li>
          <li>High school diploma or equivalent certificate</li>
          <li>Official transcript of records</li>
          <li>Birth certificate (PSA copy)</li>
          <li>Two (2) recent 2x2 ID photos</li>
          <li>Medical certificate</li>
        </ul>

        <h2>Scholarship Opportunities</h2>
        <p>DCCPH offers various scholarship programs for qualified students, including academic scholarships, athletic scholarships, and need-based financial assistance. Visit our admissions office or website for more information about available scholarships.</p>

        <h2>How to Apply</h2>
        <p>You can submit your application through the following channels:</p>
        <ul>
          <li><strong>Online:</strong> Visit our website and fill out the online application form</li>
          <li><strong>In-Person:</strong> Visit our admissions office at DCCPH Main Campus, Baguio City</li>
          <li><strong>Email:</strong> Send your requirements to admissions@dccph.edu.ph</li>
        </ul>

        <p>For questions or concerns, please contact our admissions office at (074) 442-3456 or email us at admissions@dccph.edu.ph. Our team is ready to assist you with your enrollment journey.</p>

        <p>We look forward to welcoming you to the DCCPH family!</p>
      `,
    },
    "2": {
      id: 2,
      category: "event",
      title: "Annual Career Fair - January 20, 2025",
      date: "December 10, 2024",
      author: "Career Services",
      image: "/images/career-fair.jpg",
      content: `
        <p>Mark your calendars! The Data Center College of the Philippines is hosting its Annual Career Fair on January 20, 2025, from 9:00 AM to 5:00 PM at the DCCPH Main Campus Gymnasium.</p>

        <h2>What to Expect</h2>
        <p>This year's career fair promises to be our biggest yet, with over 50 participating companies from various industries including technology, business, healthcare, and education. This is an excellent opportunity for students and recent graduates to:</p>
        <ul>
          <li>Network with industry professionals and potential employers</li>
          <li>Learn about job opportunities and internship programs</li>
          <li>Submit resumes and participate in on-the-spot interviews</li>
          <li>Attend career development workshops and seminars</li>
          <li>Gain insights into different career paths and industries</li>
        </ul>

        <h2>Participating Companies</h2>
        <p>We are proud to welcome leading companies from Baguio City and the surrounding regions, including:</p>
        <ul>
          <li>Tech Solutions Inc. - Software Development</li>
          <li>Mountain Marketing Group - Digital Marketing</li>
          <li>Baguio Business Process Outsourcing - Customer Service</li>
          <li>Northern IT Services - Technical Support</li>
          <li>Cordillera Healthcare System - Healthcare Management</li>
          <li>And many more!</li>
        </ul>

        <h2>Workshop Schedule</h2>
        <p>Throughout the day, we will be hosting various workshops and seminars:</p>
        <ul>
          <li>10:00 AM - Resume Writing Workshop</li>
          <li>11:30 AM - Interview Skills and Techniques</li>
          <li>1:00 PM - LinkedIn Profile Optimization</li>
          <li>2:30 PM - Salary Negotiation Strategies</li>
          <li>4:00 PM - Building Your Personal Brand</li>
        </ul>

        <h2>Registration</h2>
        <p>Registration is free for all DCCPH students and alumni. To register, please visit the Career Services Office or email careerservices@dccph.edu.ph with your name, student number, and program.</p>

        <h2>Tips for Success</h2>
        <p>To make the most of the career fair:</p>
        <ul>
          <li>Dress professionally - business attire is recommended</li>
          <li>Bring multiple copies of your resume (at least 20-30)</li>
          <li>Prepare a 30-second elevator pitch about yourself</li>
          <li>Research participating companies beforehand</li>
          <li>Bring a notebook and pen to take notes</li>
          <li>Follow up with recruiters after the event</li>
        </ul>

        <p>Don't miss this opportunity to jumpstart your career! See you at the fair!</p>
      `,
    },
    "3": {
      id: 3,
      category: "achievement",
      title: "DCCPH Students Win Regional IT Competition",
      date: "December 5, 2024",
      author: "IT Department",
      image: "/images/it-competition.jpg",
      content: `
        <p>The Data Center College of the Philippines is proud to announce that our Computer Science students have won first place at the Cordillera Region Hackathon 2024, held at the Baguio Convention Center last December 1-3, 2024.</p>

        <h2>The Winning Team</h2>
        <p>Our winning team, "Code Warriors," consisted of four talented students:</p>
        <ul>
          <li>John Michael Santos (4th Year, BS Computer Science) - Team Leader</li>
          <li>Maria Clara Reyes (3rd Year, BS Computer Science) - Frontend Developer</li>
          <li>Kevin Rodriguez (4th Year, BS Computer Science) - Backend Developer</li>
          <li>Sarah Jane Cruz (3rd Year, BS Information Technology) - UI/UX Designer</li>
        </ul>

        <h2>The Winning Project</h2>
        <p>The team developed "EduConnect," an innovative web application that connects students with tutors and educational resources. The platform features:</p>
        <ul>
          <li>Real-time video conferencing for online tutoring sessions</li>
          <li>AI-powered matching algorithm to connect students with suitable tutors</li>
          <li>Interactive whiteboard for collaborative learning</li>
          <li>Progress tracking and analytics dashboard</li>
          <li>Payment integration for tutor services</li>
        </ul>

        <h2>Competition Details</h2>
        <p>The Cordillera Region Hackathon 2024 was a three-day event that brought together over 30 teams from universities across the region. Teams were challenged to develop innovative solutions to real-world problems in education, healthcare, or business.</p>
        
        <p>The DCCPH team competed against strong contenders from other prestigious institutions and impressed the judges with their technical expertise, creativity, and presentation skills.</p>

        <h2>Recognition and Prizes</h2>
        <p>As the first-place winners, the team received:</p>
        <ul>
          <li>PHP 50,000 cash prize</li>
          <li>Mentorship opportunity with industry professionals</li>
          <li>Featured article in regional tech publications</li>
          <li>Invitation to present at the National IT Summit 2025</li>
          <li>Certificates of recognition</li>
        </ul>

        <h2>Statement from the IT Department</h2>
        <p>"We are incredibly proud of our students' achievement," said Dr. Roberto Gomez, Head of the IT Department. "This victory demonstrates the quality of education and training we provide at DCCPH. Our students are not just learning theory—they're applying their skills to create real solutions that can make a difference in people's lives."</p>

        <h2>Looking Ahead</h2>
        <p>The team plans to further develop EduConnect and launch it as a commercial product. They are currently seeking additional funding and partnerships to bring their vision to life.</p>

        <p>Congratulations to our Code Warriors! You've made DCCPH proud!</p>
      `,
    },
  }

  const article = newsData[id as string]

  if (!article) {
    return (
      <div className="w-full min-h-screen relative bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/news" className="text-primary hover:underline">
            Back to News
          </Link>
        </div>
      </div>
    )
  }

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

            {/* Back to News Link */}
            <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 pt-8">
              <div className="w-full max-w-[720px] mx-auto">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-sm font-medium">Back to News</span>
                </Link>
              </div>
            </div>

            {/* Article Header */}
            <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 pt-8 pb-6">
              <div className="w-full max-w-[720px] mx-auto">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    <Tag className="w-3 h-3" />
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-serif">
                  {article.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {article.author}</span>
                  </div>
                </div>

                {/* Featured Image Placeholder */}
                <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden mb-12">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Article Image</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 pb-16">
              <div className="w-full max-w-[720px] mx-auto">
                <article
                  className="prose prose-lg max-w-none
                    prose-headings:text-foreground prose-headings:font-serif prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:text-muted-foreground prose-ul:my-6
                    prose-li:my-2
                    prose-strong:text-foreground prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share Section */}
                <div className="mt-16 pt-8 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-300">
                      Facebook
                    </button>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-300">
                      Twitter
                    </button>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-300">
                      LinkedIn
                    </button>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="mt-16 pt-8 border-t border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-6 font-serif">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                      href="/news/2"
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 group"
                    >
                      <span className="text-xs text-primary font-semibold mb-2 block">Event</span>
                      <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        Annual Career Fair - January 20, 2025
                      </h4>
                    </Link>
                    <Link
                      href="/news/3"
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 group"
                    >
                      <span className="text-xs text-primary font-semibold mb-2 block">Achievement</span>
                      <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        DCCPH Students Win Regional IT Competition
                      </h4>
                    </Link>
                  </div>
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
