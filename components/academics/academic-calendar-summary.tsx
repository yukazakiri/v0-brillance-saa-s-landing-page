import { Calendar, CheckCircle, Clock, FileCheck, UserCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TERMS = [
  {
    term: "First Semester",
    months: "August — December",
    status: "Upcoming Enrollment",
    description:
      "Main academic intake for fresh high school graduates, incoming college freshmen, and transfer students.",
    highlights: ["Early Enrollment: May — July", "Classes Begin: Mid-August", "Midterm Exams: October"],
  },
  {
    term: "Second Semester",
    months: "January — May",
    status: "Regular Intake",
    description:
      "Mid-year intake welcoming transferees, cross-enrollees, and continuing degree scholars.",
    highlights: ["Enrollment: December — January", "Classes Begin: Mid-January", "Commencement: Late May"],
  },
  {
    term: "Midyear Term",
    months: "June — July",
    status: "Special Term",
    description:
      "Fast-track term dedicated to thesis research, prerequisite clearing, and intensive industry internships (OJT).",
    highlights: ["Intensive Practicum Hours", "Bridging Courses for Transferees", "TESDA Short Competencies"],
  },
]

const ENROLLMENT_STEPS = [
  {
    step: "01",
    title: "Apply Online or In-Person",
    desc: "Complete the preliminary application form online or visit the Baguio admissions office.",
  },
  {
    step: "02",
    title: "Submit Documents & Vouchers",
    desc: "Present Form 138 (Report Card) or Transcript of Records and DepEd/PEAC voucher certificate if applicable.",
  },
  {
    step: "03",
    title: "Assessment & Scheme Selection",
    desc: "Meet with an admissions counselor to confirm subject evaluation and select your installment payment plan.",
  },
  {
    step: "04",
    title: "Official Enrollment & Orientation",
    desc: "Receive your student number, class schedule, student portal credentials, and campus orientation guide.",
  },
]

export default function AcademicCalendarSummary() {
  return (
    <section id="calendar" className="w-full border-b border-border bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Schedules & Planning
          </span>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Academic Calendar & Admission Steps
          </h2>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            Plan your educational journey with clarity. We maintain transparent academic terms and
            a straightforward enrollment procedure for students and families.
          </p>
        </div>

        {/* 3 Term Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TERMS.map((t, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-colors hover:border-primary/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-primary font-medium">
                    <Calendar className="size-3.5 text-secondary" />
                    <span>{t.months}</span>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {t.status}
                  </Badge>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                  {t.term}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {t.description}
                </p>

                <ul className="mt-4 space-y-1.5 border-t border-border/50 pt-3">
                  {t.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="size-1 rounded-full bg-secondary shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* 4-Step Enrollment Process */}
        <div className="mt-16 rounded-2xl border border-border bg-card/60 p-6 sm:p-10">
          <div className="border-b border-border pb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-secondary font-semibold">
              How to Enroll
            </span>
            <h3 className="mt-1 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Four Clear Steps from Inquiry to First Day of Class
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ENROLLMENT_STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-mono text-2xl font-bold text-primary/40">
                  {step.step}
                </span>
                <h4 className="font-serif text-lg font-semibold text-foreground">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
