"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, GraduationCap, Search, Sparkles, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Course } from "@/lib/sanity/types"

export interface AcademicOfferingItem extends Course {
  careerOutcomes?: string[]
  levelLabel?: string
  trackGroup?: "ched" | "shs" | "tesda" | "short"
}

// Complete baseline curriculum data for DCCP Baguio City
export const DEFAULT_ACADEMIC_OFFERINGS: AcademicOfferingItem[] = [
  // CHED Degree Programs
  {
    id: "bs-information-technology",
    slug: "bs-information-technology",
    title: "Bachelor of Science in Information Technology",
    category: "ched",
    trackGroup: "ched",
    levelLabel: "CHED Accredited",
    duration: "4 Years (8 Semesters)",
    credential: "BSIT Degree",
    scholarshipsAvailable: true,
    description:
      "A comprehensive program designed to produce technology leaders proficient in software development, cloud infrastructure, network administration, and systems security.",
    highlights: [
      "Full-stack Web & Mobile Application Development",
      "Network Infrastructure & Cisco Routing Concepts",
      "Database Administration, SQL & Enterprise Systems",
      "486+ Hours Supervised Industry Internship (OJT)",
    ],
    careerOutcomes: [
      "Software Developer",
      "Network Administrator",
      "Systems Analyst",
      "IT Support Engineer",
    ],
  },
  {
    id: "bs-business-administration-financial-management",
    slug: "bs-business-administration-financial-management",
    title: "BS Business Administration — Financial Management",
    category: "ched",
    trackGroup: "ched",
    levelLabel: "CHED Accredited",
    duration: "4 Years (8 Semesters)",
    credential: "BSBA Degree",
    scholarshipsAvailable: true,
    description:
      "Focuses on modern corporate finance, banking operations, investment analysis, and strategic business planning with digital tools.",
    highlights: [
      "Corporate Financial Planning & Budgeting",
      "Investment Analysis & Portfolio Management",
      "Accounting Information Systems & Taxation",
      "Real-world Business Practicum with Regional Firms",
    ],
    careerOutcomes: [
      "Financial Analyst",
      "Bank Operations Officer",
      "Investment Consultant",
      "Budget Planner",
    ],
  },
  {
    id: "bs-hotel-and-restaurant-management",
    slug: "bs-hotel-and-restaurant-management",
    title: "Bachelor of Science in Hotel & Restaurant Management",
    category: "ched",
    trackGroup: "ched",
    levelLabel: "CHED Accredited",
    duration: "4 Years (8 Semesters)",
    credential: "BSHRM Degree",
    scholarshipsAvailable: true,
    description:
      "Prepares graduates for hospitality leadership through rigorous culinary arts, front office systems, banqueting, and lodging management in Baguio and international venues.",
    highlights: [
      "Commercial Culinary Arts & Kitchen Laboratory Work",
      "Front Office Management & Hospitality Software",
      "Food & Beverage Service and Mixology Mastery",
      "Supervised Hotel Internship in Premier Hospitality Chains",
    ],
    careerOutcomes: [
      "Hotel Operations Manager",
      "Food & Beverage Director",
      "Catering & Event Manager",
      "Executive Chef",
    ],
  },

  // Senior High School Tracks (DepEd)
  {
    id: "shs-tvl-ict",
    slug: "senior-high-tvl-ict",
    title: "TVL Track — Information & Communications Technology (ICT)",
    category: "shs",
    trackGroup: "shs",
    levelLabel: "DepEd Recognized",
    duration: "2 Years (Grades 11–12)",
    credential: "High School Diploma + NC II",
    scholarshipsAvailable: true,
    description:
      "A career-ready senior high strand providing dual advantage: qualifying students for immediate IT technician employment or direct credit transfer into BSIT.",
    highlights: [
      "Computer Systems Servicing & PC Diagnostics",
      "Computer Programming Fundamentals & Logic",
      "DepEd PEAC ESC Voucher Scheme Fully Accepted",
      "TESDA National Certificate (NC II) Assessment Support",
    ],
    careerOutcomes: [
      "Direct Entry into BSIT",
      "IT Support Technician",
      "Junior Helpdesk Staff",
      "Freelance Web Assistant",
    ],
  },
  {
    id: "shs-tvl-he",
    slug: "senior-high-tvl-home-economics",
    title: "TVL Track — Home Economics (Hospitality & Culinary)",
    category: "shs",
    trackGroup: "shs",
    levelLabel: "DepEd Recognized",
    duration: "2 Years (Grades 11–12)",
    credential: "High School Diploma + NC II",
    scholarshipsAvailable: true,
    description:
      "Hands-on culinary and service training designed for students aiming for careers in hospitality, culinary arts, or progression into BSHRM.",
    highlights: [
      "Commercial Cookery and Kitchen Operations",
      "Bread & Pastry Baking Laboratory Techniques",
      "Food & Beverage Service Standards",
      "Full DepEd PEAC Voucher Subsidy Eligible",
    ],
    careerOutcomes: [
      "Direct Entry into BSHRM",
      "Assistant Pastry Chef",
      "Dining Service Staff",
      "Food Business Starter",
    ],
  },
  {
    id: "shs-academic-abm",
    slug: "senior-high-academic-abm",
    title: "Academic Track — Accountancy, Business & Management (ABM)",
    category: "shs",
    trackGroup: "shs",
    levelLabel: "DepEd Recognized",
    duration: "2 Years (Grades 11–12)",
    credential: "High School Diploma",
    scholarshipsAvailable: true,
    description:
      "Structured for students planning college degrees in Business, Finance, and Entrepreneurship with rigorous foundations in accounting and management.",
    highlights: [
      "Fundamentals of Accountancy & Business Math",
      "Organization, Management & Principles of Marketing",
      "Business Enterprise Simulation",
      "Seamless Bridge into BSBA Financial Management",
    ],
    careerOutcomes: [
      "Direct Entry into BSBA",
      "Junior Bookkeeper",
      "Administrative Assistant",
      "Small Business Manager",
    ],
  },
  {
    id: "shs-academic-humss",
    slug: "senior-high-academic-humss",
    title: "Academic Track — Humanities & Social Sciences (HUMSS)",
    category: "shs",
    trackGroup: "shs",
    levelLabel: "DepEd Recognized",
    duration: "2 Years (Grades 11–12)",
    credential: "High School Diploma",
    scholarshipsAvailable: true,
    description:
      "Nurtures critical thinking, verbal articulation, and societal awareness for students aspiring toward law, communications, education, or public service.",
    highlights: [
      "Creative Nonfiction, Writing & Oral Communication",
      "Philippine Politics, Governance & Community Engagement",
      "Disciplines and Ideas in Social Sciences",
      "DepEd Voucher Grant Coverage",
    ],
    careerOutcomes: [
      "Pre-Law & Public Administration",
      "Communications & Journalism",
      "Education & Social Work",
      "Corporate Communications",
    ],
  },

  // TESDA Technical-Vocational Programs
  {
    id: "tesda-computer-systems-servicing-nc2",
    slug: "tesda-computer-systems-servicing-nc2",
    title: "Computer Systems Servicing (CSS NC II)",
    category: "tesda",
    trackGroup: "tesda",
    levelLabel: "TESDA Accredited",
    duration: "280 Training Hours",
    credential: "National Certificate II (NC II)",
    scholarshipsAvailable: true,
    description:
      "Intensive competency-based training in computer hardware assembly, OS installation, local network setup, and server maintenance.",
    highlights: [
      "Assemble Computer Hardware & Peripherals",
      "Install Operating Systems and Drivers",
      "Setup Computer Networks and Routers",
      "Maintain Computer Systems and Servers",
    ],
    careerOutcomes: [
      "Computer Service Technician",
      "Network Support Technician",
      "IT Maintenance Specialist",
      "Computer Store Technician",
    ],
  },
  {
    id: "tesda-visual-graphic-design-nc3",
    slug: "tesda-visual-graphic-design-nc3",
    title: "Visual Graphic Design (VGD NC III)",
    category: "tesda",
    trackGroup: "tesda",
    levelLabel: "TESDA Accredited",
    duration: "487 Training Hours",
    credential: "National Certificate III (NC III)",
    scholarshipsAvailable: true,
    description:
      "Practical digital design training focusing on brand identity, print collateral, digital illustration, and electronic media development.",
    highlights: [
      "Develop Designs for Print Collateral & Marketing",
      "Create Brand Identity & Logo Guidelines",
      "Design for User Interfaces and Digital Screens",
      "Industry Standard Vector and Raster Tools",
    ],
    careerOutcomes: [
      "Graphic Designer",
      "Digital Production Artist",
      "Marketing Collateral Specialist",
      "Freelance Illustrator",
    ],
  },
  {
    id: "tesda-food-and-beverage-services-nc2",
    slug: "tesda-food-and-beverage-services-nc2",
    title: "Food & Beverage Services (FBS NC II)",
    category: "tesda",
    trackGroup: "tesda",
    levelLabel: "TESDA Accredited",
    duration: "356 Training Hours",
    credential: "National Certificate II (NC II)",
    scholarshipsAvailable: true,
    description:
      "Hands-on hospitality service course covering dining room preparation, beverage serving, guest check management, and banquet service.",
    highlights: [
      "Table Setting & Dining Room Preparation",
      "Silver Service and American Service Standards",
      "Bar and Beverage Service Operations",
      "Handling Customer Inquiries and Orders",
    ],
    careerOutcomes: [
      "Dining Room Server",
      "Barista / Beverage Server",
      "Banquet Service Specialist",
      "Cruise Ship Service Crew",
    ],
  },
  {
    id: "tesda-bread-and-pastry-production-nc2",
    slug: "tesda-bread-and-pastry-production-nc2",
    title: "Bread and Pastry Production (BPP NC II)",
    category: "tesda",
    trackGroup: "tesda",
    levelLabel: "TESDA Accredited",
    duration: "141 Training Hours",
    credential: "National Certificate II (NC II)",
    scholarshipsAvailable: true,
    description:
      "Focused practical baking training in commercial artisan breads, pastries, cakes, and desserts with food safety and sanitation mastery.",
    highlights: [
      "Bake Artisan Breads and Yeast Doughs",
      "Prepare and Produce Pastry Products",
      "Cake Preparation and Decorative Icing",
      "Food Safety Standards and Commercial Kitchen Hygiene",
    ],
    careerOutcomes: [
      "Bakery Assistant",
      "Pastry Cook",
      "Commis Baker",
      "Home Bakery Entrepreneur",
    ],
  },

  // Short Courses
  {
    id: "short-office-productivity",
    slug: "short-office-productivity",
    title: "Digital Office Productivity & Cloud Tools",
    category: "short",
    trackGroup: "short",
    levelLabel: "Certificate Course",
    duration: "60 Hours (Flexible Schedule)",
    credential: "Certificate of Completion",
    scholarshipsAvailable: false,
    description:
      "Essential digital workspace skills for career shifters and professionals covering advanced spreadsheets, documents, presentation design, and cloud collaboration.",
    highlights: [
      "Advanced Spreadsheet Formulas & Data Visualization",
      "Cloud Document Collaboration & Workspace Tools",
      "Executive Presentation Design & Delivery",
      "Weekend & Evening Schedules Available",
    ],
    careerOutcomes: [
      "Executive Administrative Assistant",
      "Data Encoder / Analyst",
      "Office Operations Coordinator",
      "Remote Virtual Assistant",
    ],
  },
]

type AcademicOfferingsProps = {
  sanityCourses?: Course[]
}

export default function AcademicOfferings({ sanityCourses = [] }: AcademicOfferingsProps) {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Combine Sanity data with baseline offerings to ensure no curriculum details are missing
  const allOfferings = useMemo(() => {
    if (!sanityCourses || sanityCourses.length === 0) {
      return DEFAULT_ACADEMIC_OFFERINGS
    }

    const merged = [...DEFAULT_ACADEMIC_OFFERINGS]
    // If sanity has items matching slug, prioritize Sanity titles or add new ones
    for (const sCourse of sanityCourses) {
      const existingIdx = merged.findIndex(
        (item) => item.slug === sCourse.slug || item.id === sCourse.id
      )
      if (existingIdx >= 0) {
        merged[existingIdx] = {
          ...merged[existingIdx],
          ...sCourse,
          highlights:
            sCourse.highlights && sCourse.highlights.length > 0
              ? sCourse.highlights
              : merged[existingIdx].highlights,
        }
      } else {
        merged.push({
          ...sCourse,
          trackGroup: sCourse.category,
          levelLabel:
            sCourse.category === "ched"
              ? "CHED Degree"
              : sCourse.category === "tesda"
              ? "TESDA NC"
              : sCourse.category === "shs"
              ? "DepEd SHS"
              : "Certificate",
          careerOutcomes: sCourse.highlights?.slice(0, 3) || [],
        })
      }
    }

    return merged
  }, [sanityCourses])

  // Filter offerings based on tab and search
  const filteredOfferings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return allOfferings.filter((item) => {
      // Tab filter
      if (activeTab !== "all") {
        if (activeTab === "ched" && item.category !== "ched") return false
        if (activeTab === "shs" && item.category !== "shs") return false
        if (activeTab === "tesda" && item.category !== "tesda") return false
        if (activeTab === "short" && item.category !== "short") return false
      }

      // Search filter
      if (!query) return true

      const searchableText = [
        item.title,
        item.description || "",
        item.credential || "",
        item.duration || "",
        ...(item.highlights || []),
        ...(item.careerOutcomes || []),
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [allOfferings, activeTab, searchQuery])

  return (
    <section id="offerings" className="w-full border-b border-border bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Directory of Curricula
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Academic Offerings
            </h2>
            <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground sm:text-base">
              Explore college degrees, senior high strands, and technical training. Every path is
              designed for practical capability and strong career outcomes.
            </p>
          </div>

          <div className="shrink-0 text-sm font-mono text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredOfferings.length}</span>{" "}
            program{filteredOfferings.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* Controls: Search & Tabs */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Quick Search */}
          <div className="relative w-full sm:max-w-[340px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by career, major, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-md border-border pl-9 pr-8 text-sm placeholder:text-muted-foreground/70"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs Filter */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 w-full">
          <TabsList className="w-full justify-start overflow-x-auto border-b border-border bg-transparent p-0 rounded-none h-auto gap-2">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              All Paths ({allOfferings.length})
            </TabsTrigger>
            <TabsTrigger
              value="ched"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              College Degrees
            </TabsTrigger>
            <TabsTrigger
              value="shs"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Senior High School
            </TabsTrigger>
            <TabsTrigger
              value="tesda"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              TESDA TVET
            </TabsTrigger>
            <TabsTrigger
              value="short"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Short Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {filteredOfferings.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                <p className="font-serif text-2xl font-medium text-foreground">No matching offerings found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your keywords or switch to another category.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveTab("all")
                  }}
                  className="mt-6"
                >
                  Reset all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredOfferings.map((item) => (
                  <Card
                    key={item.id}
                    className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-sm"
                  >
                    <div>
                      {/* Badge and metadata row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                            {item.levelLabel || (item.category === "ched" ? "College Degree" : item.category.toUpperCase())}
                          </Badge>
                          {item.scholarshipsAvailable && (
                            <Badge variant="secondary" className="font-mono text-[10px]">
                              Voucher / Aid Eligible
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                          <Clock className="size-3.5 text-secondary" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mt-4">
                        <h3 className="font-serif text-2xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Key Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="mt-5 border-t border-border/50 pt-4">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                            Curriculum Highlights
                          </span>
                          <ul className="mt-2.5 space-y-1.5">
                            {item.highlights.slice(0, 3).map((hl, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-normal">
                                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-secondary" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Career Outcomes (Especially high-value for parents & students) */}
                      {item.careerOutcomes && item.careerOutcomes.length > 0 && (
                        <div className="mt-4 rounded-lg bg-muted/40 p-3">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                            Target Careers & Opportunities:
                          </span>
                          <p className="mt-1 text-xs text-foreground font-medium leading-relaxed">
                            {item.careerOutcomes.join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                      {item.category === "ched" ? (
                        <Link
                          href={`/courses/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-secondary group-hover:underline"
                        >
                          View Full Syllabus
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <span className="font-mono text-[11px] text-muted-foreground">
                          Inquire for Enrollment
                        </span>
                      )}

                      <Button asChild size="sm" variant="default" className="rounded-md">
                        <Link href="/apply">Apply for this Path</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
