"use client"

import { useState } from "react"
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  RotateCcw,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type PathfinderFilters = {
  category?: "all" | "ched" | "tesda" | "shs" | "short"
  query?: string
}

type CoursePathfinderProps = {
  onApplyPathfinder: (filters: PathfinderFilters) => void
  onResetPathfinder: () => void
}

const EDUCATION_LEVELS = [
  { id: "grade10", label: "Grade 10 Completer", hint: "Looking for Senior High School", category: "shs" as const },
  { id: "shs_grad", label: "Senior High Graduate", hint: "Looking for College Degree or Tech-Voc", category: "ched" as const },
  { id: "transferee", label: "College Transferee / 2nd Courser", hint: "Credit transfer & degrees", category: "ched" as const },
  { id: "professional", label: "Working Adult / Career Shifter", hint: "Fast NC certificates or short courses", category: "tesda" as const },
]

const INTEREST_FIELDS = [
  { id: "tech", label: "Tech, Software & Networking", query: "technology" },
  { id: "business", label: "Business, Finance & Management", query: "business" },
  { id: "hospitality", label: "Culinary Arts, Hotel & Baking", query: "hospitality" },
  { id: "design", label: "Creative Design & Digital Media", query: "design" },
]

const TIMELINE_GOALS = [
  { id: "degree", label: "4-Year Bachelor Degree", category: "ched" as const },
  { id: "tesda", label: "TESDA NC II / III Certificate (< 1 Year)", category: "tesda" as const },
  { id: "shs", label: "DepEd Voucher Senior High Track", category: "shs" as const },
  { id: "short", label: "Modular Weekend Skills Certificate", category: "short" as const },
]

export default function CoursePathfinder({ onApplyPathfinder, onResetPathfinder }: CoursePathfinderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedEducation, setSelectedEducation] = useState<string>("")
  const [selectedInterest, setSelectedInterest] = useState<string>("")
  const [selectedGoal, setSelectedGoal] = useState<string>("")

  const handleFinish = () => {
    let targetCategory: "all" | "ched" | "tesda" | "shs" | "short" = "all"
    let targetQuery = ""

    const eduObj = EDUCATION_LEVELS.find((e) => e.id === selectedEducation)
    const goalObj = TIMELINE_GOALS.find((g) => g.id === selectedGoal)
    const interestObj = INTEREST_FIELDS.find((i) => i.id === selectedInterest)

    if (goalObj) {
      targetCategory = goalObj.category
    } else if (eduObj) {
      targetCategory = eduObj.category
    }

    if (interestObj) {
      targetQuery = interestObj.query
    }

    onApplyPathfinder({
      category: targetCategory,
      query: targetQuery,
    })
  }

  const handleReset = () => {
    setSelectedEducation("")
    setSelectedInterest("")
    setSelectedGoal("")
    setStep(1)
    onResetPathfinder()
  }

  if (!isOpen) {
    return (
      <div className="w-full border-y border-border bg-muted/20 py-6 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center bg-foreground text-background">
            <Compass className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold">
                ADVISORY DOSSIER
              </span>
              <span className="text-border">·</span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">30-Second Diagnostic</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
              Unsure which academic discipline fits your horizon?
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Answer 3 brief questions to filter recommended college degrees, TESDA certifications, or senior high strands.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="shrink-0 rounded-none font-mono uppercase text-xs tracking-wider font-semibold gap-2 shadow-xs"
        >
          <Sparkles className="size-3.5" />
          <span>Open Field Guide</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full border border-border bg-background p-6 sm:p-8 transition-all">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center bg-primary text-primary-foreground">
            <Compass className="size-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-secondary font-bold">
              DIAGNOSTIC QUESTION {step} OF 3
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              {step === 1 && "What is your current educational background?"}
              {step === 2 && "Which disciplinary field excites you most?"}
              {step === 3 && "What is your target study timeline & outcome?"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs font-mono uppercase text-muted-foreground gap-1 rounded-none"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-xs font-mono uppercase text-muted-foreground rounded-none"
          >
            Close
          </Button>
        </div>
      </div>

      {/* Step 1: Education Level */}
      {step === 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {EDUCATION_LEVELS.map((edu, i) => (
            <button
              key={edu.id}
              type="button"
              onClick={() => {
                setSelectedEducation(edu.id)
                setStep(2)
              }}
              className={cn(
                "flex flex-col items-start border p-4 text-left transition-all",
                selectedEducation === edu.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-background hover:border-foreground/50 hover:bg-muted/20"
              )}
            >
              <span className="font-serif font-bold text-foreground text-base flex items-center justify-between w-full">
                <span>
                  <span className="font-mono text-xs text-secondary mr-2">0{i + 1}.</span>
                  {edu.label}
                </span>
                {selectedEducation === edu.id && <CheckCircle2 className="size-4 text-primary" />}
              </span>
              <span className="mt-1 text-xs text-muted-foreground font-sans">{edu.hint}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Interest Field */}
      {step === 2 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {INTEREST_FIELDS.map((field, i) => (
            <button
              key={field.id}
              type="button"
              onClick={() => {
                setSelectedInterest(field.id)
                setStep(3)
              }}
              className={cn(
                "flex flex-col items-start border p-4 text-left transition-all",
                selectedInterest === field.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-background hover:border-foreground/50 hover:bg-muted/20"
              )}
            >
              <span className="font-serif font-bold text-foreground text-base flex items-center justify-between w-full">
                <span>
                  <span className="font-mono text-xs text-secondary mr-2">0{i + 1}.</span>
                  {field.label}
                </span>
                {selectedInterest === field.id && <CheckCircle2 className="size-4 text-primary" />}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Goal & Timeline */}
      {step === 3 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {TIMELINE_GOALS.map((goal, i) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(goal.id)}
              className={cn(
                "flex flex-col items-start border p-4 text-left transition-all",
                selectedGoal === goal.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-background hover:border-foreground/50 hover:bg-muted/20"
              )}
            >
              <span className="font-serif font-bold text-foreground text-base flex items-center justify-between w-full">
                <span>
                  <span className="font-mono text-xs text-secondary mr-2">0{i + 1}.</span>
                  {goal.label}
                </span>
                {selectedGoal === goal.id && <CheckCircle2 className="size-4 text-primary" />}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStep((s) => (s - 1) as any)}
            className="rounded-none font-mono uppercase text-xs"
          >
            Back
          </Button>
        ) : <div />}

        {step < 3 ? (
          <Button
            type="button"
            size="sm"
            disabled={step === 1 ? !selectedEducation : !selectedInterest}
            onClick={() => setStep((s) => (s + 1) as any)}
            className="rounded-none font-mono uppercase text-xs"
          >
            Next Question
          </Button>
        ) : (
          <Button
            type="button"
            size="sm"
            disabled={!selectedGoal}
            onClick={handleFinish}
            className="gap-2 rounded-none font-mono uppercase text-xs tracking-wider"
          >
            <span>Show Recommended Disciplines</span>
            <ArrowRight className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
