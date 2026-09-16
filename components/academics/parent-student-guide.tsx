"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Coins,
  FileText,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  HelpCircle as QuestionIcon,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const STUDENT_BENEFITS = [
  {
    icon: Sparkles,
    title: "Career-First Curriculum",
    description:
      "Every subject focuses on competencies employers seek. Over 60% of coursework is practical laboratory and simulated work environments.",
  },
  {
    icon: GraduationCap,
    title: "Ladderized Education",
    description:
      "Skills acquired in Senior High or TESDA directly count towards your Bachelor's degree, saving you both time and tuition costs.",
  },
  {
    icon: HeartHandshake,
    title: "Guaranteed OJT Placement",
    description:
      "Our industry linkage office pairs you with reputable technology companies, financial firms, and hotel chains for your internship.",
  },
  {
    icon: Users,
    title: "Supportive Faculty & Small Classes",
    description:
      "Learn directly from experienced practitioners who know you by name, offering one-on-one academic consultation and project guidance.",
  },
]

const PARENT_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Fully Recognized Accreditation",
    description:
      "100% government compliant. Degrees recognized by CHED and the Civil Service Commission; Senior High approved by DepEd; TVET certified by TESDA.",
  },
  {
    icon: Coins,
    title: "Vouchers & Government Subsidies",
    description:
      "Participating institution in DepEd PEAC ESC voucher program (subsidizing Senior High tuition) and CHED UniFAST financial assistance programs.",
  },
  {
    icon: FileText,
    title: "Transparent & Flexible Tuition",
    description:
      "No hidden fees. We offer staggered installment plans throughout the semester to accommodate family budgets and monthly paydays.",
  },
  {
    icon: HeartHandshake,
    title: "Safe, Values-Driven Environment",
    description:
      "Located in Baguio City with strict campus security, active guidance counseling, student progress updates, and a zero-tolerance hazing policy.",
  },
]

const ACADEMIC_FAQS = [
  {
    id: "faq-vouchers",
    question: "How do Senior High School vouchers (DepEd PEAC / ESC) apply at DCCP?",
    answer:
      "DCCP is an official DepEd voucher-participating institution. Qualified Junior High School completers from public schools automatically receive the full voucher value, which significantly or entirely covers tuition. Private school ESC grantees also receive their respective voucher subsidies. Our admissions desk assists families with voucher validation during enrollment.",
  },
  {
    id: "faq-strand-alignment",
    question: "Can a student from any Senior High strand take BS Information Technology or BSBA?",
    answer:
      "Yes. DCCP welcomes graduates from all Senior High strands (TVL, ABM, HUMSS, STEM, or GAS). For students whose senior high track was not directly aligned, our faculty provides introductory foundation modules in the first semester to ensure everyone excels in programming, math, or accounting concepts.",
  },
  {
    id: "faq-tuition-plans",
    question: "What installment options and payment schedules are available?",
    answer:
      "We believe education should remain accessible. Tuition can be settled via an initial downpayment upon enrollment, followed by monthly or preliminary/midterm/pre-final/final installments. We also accommodate UniFAST Tertiary Education Subsidy (TES) grantees and local government scholarship recipients.",
  },
  {
    id: "faq-transfer-credits",
    question: "How are transfer credits handled for college transferees or returnees?",
    answer:
      "We provide a swift credit evaluation process. Simply submit your Official Transcript of Records (OTR) or Certified True Copy of Grades to the Registrar. Accredited college-level subjects with passing marks from recognized institutions will be credited toward your degree checklist.",
  },
  {
    id: "faq-career-ojt",
    question: "Does DCCP guarantee on-the-job training (OJT) and job placement assistance?",
    answer:
      "Yes. DCCP maintains formal partnerships with regional tech firms, business process outsourcers, banking institutions, and premier hospitality establishments in Baguio and Northern Luzon. Our Career Services unit assists students in mock interviews, resume preparation, and direct job referrals prior to graduation.",
  },
  {
    id: "faq-tesda-dual",
    question: "What is the advantage of TESDA certification alongside a degree?",
    answer:
      "Dual credentials give graduates an immense competitive edge. By passing TESDA National Certificate (NC II / NC III) assessments while completing their coursework, DCCP students hold government competency credentials that are recognized both locally and by overseas employers.",
  },
]

export default function ParentStudentGuide() {
  const [activeAudience, setActiveAudience] = useState<"students" | "parents">("students")

  return (
    <section id="parents-guide" className="w-full border-b border-border bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        {/* Section Heading */}
        <div className="max-w-[800px]">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Clarity For Families
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Designed for Students, Trusted by Parents
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Choosing the right academic path is a family decision. We provide transparent information
            so you can plan with certainty and confidence.
          </p>
        </div>

        {/* Dual Audience Tabs */}
        <div className="mt-10">
          <Tabs
            value={activeAudience}
            onValueChange={(val) => setActiveAudience(val as "students" | "parents")}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4 gap-4">
              <TabsList className="bg-muted/60 p-1 rounded-lg">
                <TabsTrigger
                  value="students"
                  className="rounded-md px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-xs"
                >
                  For Future Students
                </TabsTrigger>
                <TabsTrigger
                  value="parents"
                  className="rounded-md px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-xs"
                >
                  For Parents & Guardians
                </TabsTrigger>
              </TabsList>

              <span className="font-mono text-xs text-muted-foreground">
                {activeAudience === "students"
                  ? "Explore student outcomes & practical training"
                  : "Review accreditation, tuition aid & campus safety"}
              </span>
            </div>

            {/* Students Content */}
            <TabsContent value="students" className="mt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {STUDENT_BENEFITS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="rounded-xl border border-border bg-card p-6 shadow-xs transition-colors hover:border-primary/40"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  )
                })}
              </div>

              {/* Student Action Prompt */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between rounded-xl border border-border bg-card/60 p-6">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-foreground">
                    Ready to take your next step?
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Apply online in less than 10 minutes or visit our campus for a personalized course consultation.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3 shrink-0">
                  <Button asChild size="sm">
                    <Link href="/apply">Start Online Application</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Parents Content */}
            <TabsContent value="parents" className="mt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PARENT_BENEFITS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="rounded-xl border border-border bg-card p-6 shadow-xs transition-colors hover:border-primary/40"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </Card>
                  )
                })}
              </div>

              {/* Parent Action Prompt */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between rounded-xl border border-border bg-card/60 p-6">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-foreground">
                    Have questions about tuition, vouchers, or safety?
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Our Admissions and Registrar officers are ready to assist you personally.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3 shrink-0">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/parents">View Dedicated Parents Page</Link>
                  </Button>
                  <Button asChild size="sm">
                    <a href="tel:+6374442222">Call Admissions Office</a>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Academic FAQs Accordion using Shadcn */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="max-w-[700px]">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Frequently Asked Questions
            </span>
            <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Common Questions from Students & Parents
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Clear answers regarding enrollment, accreditation, and financial assistance.
            </p>
          </div>

          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              {ACADEMIC_FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-border">
                  <AccordionTrigger className="py-5 font-serif text-lg sm:text-xl font-medium text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
