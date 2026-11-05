"use client"

import * as React from "react"
import { useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const INQUIRY_CATEGORIES = [
  "Admissions & Enrollment",
  "Academic Programs",
  "Tuition & Scholarships",
  "Alumni Services",
  "General Inquiry",
] as const

type InquiryCategory = (typeof INQUIRY_CATEGORIES)[number]

interface FormState {
  name: string
  email: string
  phone: string
  category: InquiryCategory
  subject: string
  message: string
  hp_website: string
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  category: "Admissions & Enrollment",
  subject: "",
  message: "",
  hp_website: "",
}

interface ContactFormProps {
  className?: string
  defaultCategory?: InquiryCategory
  onSuccess?: () => void
}

export default function ContactForm({
  className,
  defaultCategory,
  onSuccess,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    ...INITIAL_FORM,
    category: defaultCategory || "Admissions & Enrollment",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successInfo, setSuccessInfo] = useState<{ id?: string; message?: string }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side quick check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error")
      setErrorMessage("Please complete all required fields (Name, Email, and Message).")
      return
    }

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          category: formData.category,
          subject:
            formData.subject.trim() ||
            `Inquiry: ${formData.category} from ${formData.name.trim()}`,
          message: formData.phone.trim()
            ? `Phone: ${formData.phone.trim()}\n\n${formData.message.trim()}`
            : formData.message.trim(),
          hp_website: formData.hp_website,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message. Please try again.")
      }

      setStatus("success")
      setSuccessInfo({ id: data.id, message: data.message })
      onSuccess?.()
    } catch (err) {
      console.error("Form submit error:", err)
      setStatus("error")
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      )
    }
  }

  const handleReset = () => {
    setFormData({
      ...INITIAL_FORM,
      category: defaultCategory || "Admissions & Enrollment",
    })
    setStatus("idle")
    setErrorMessage("")
    setSuccessInfo({})
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "w-full rounded-2xl border border-border bg-card/90 p-8 sm:p-10 text-center shadow-lg backdrop-blur-sm transition-all animate-in fade-in-50 zoom-in-95 duration-300",
          className
        )}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary border border-secondary/30 mb-6">
          <CheckCircle2 className="h-8 w-8 text-secondary" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-medium text-foreground mb-4">
          <Sparkles className="h-3.5 w-3.5 text-secondary" />
          <span>Message Delivered</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mb-3">
          Thank you for reaching out!
        </h3>

        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6 font-sans">
          {successInfo.message ||
            "We have received your message. Our admissions and support staff will review your inquiry and follow up via email within 1–2 business days."}
        </p>

        <div className="rounded-xl border border-border/80 bg-muted/40 p-4 max-w-md mx-auto text-left text-xs text-muted-foreground space-y-1 mb-6 font-sans">
          <p>
            <strong className="text-foreground">Inquiry:</strong> {formData.category}
          </p>
          <p>
            <strong className="text-foreground">Contact Email:</strong> {formData.email}
          </p>
          {formData.subject && (
            <p>
              <strong className="text-foreground">Subject:</strong> {formData.subject}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleReset}
          variant="outline"
          className="rounded-full px-6 py-2 text-sm border-secondary/40 hover:bg-secondary/10 text-foreground transition-all duration-200"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn(
        "relative w-full rounded-2xl border border-border bg-card/90 p-6 sm:p-8 md:p-10 shadow-lg backdrop-blur-sm transition-all",
        className
      )}
    >
      {/* Honeypot field (hidden from users, traps automated scrapers) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="hp_website">Website</label>
        <input
          id="hp_website"
          name="hp_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.hp_website}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-6">
        {/* Category Pill Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Inquiry Type <span className="text-secondary">*</span>
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {INQUIRY_CATEGORIES.map((cat) => {
              const isSelected = formData.category === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer border",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs scale-[1.02]"
                      : "bg-muted/40 text-foreground/80 border-border hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Name and Email in responsive grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Full Name <span className="text-secondary">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Maria Santos"
              value={formData.name}
              onChange={handleChange}
              disabled={status === "submitting"}
              className="h-11 bg-background/60 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Email Address <span className="text-secondary">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="maria@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "submitting"}
              className="h-11 bg-background/60 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Phone and Subject in responsive grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between"
            >
              <span>Contact Number</span>
              <span className="text-[10px] font-normal lowercase text-muted-foreground">
                (optional)
              </span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+63 912 345 6789"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === "submitting"}
              className="h-11 bg-background/60 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between"
            >
              <span>Subject</span>
              <span className="text-[10px] font-normal lowercase text-muted-foreground">
                (optional)
              </span>
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. BS Information Technology Inquiry"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "submitting"}
              className="h-11 bg-background/60 border-border focus-visible:border-primary focus-visible:ring-primary/20"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between"
          >
            <span>Your Message <span className="text-secondary">*</span></span>
            <span className="text-[10px] font-normal lowercase text-muted-foreground">
              {formData.message.length} characters
            </span>
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your questions, desired course, or enrollment timeframe..."
            value={formData.message}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="bg-background/60 border-border focus-visible:border-primary focus-visible:ring-primary/20 resize-y min-h-[120px]"
          />
        </div>

        {/* Error notification */}
        {status === "error" && errorMessage && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 text-xs text-destructive animate-in fade-in-50 duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-muted-foreground text-center sm:text-left order-2 sm:order-1">
            Directly forwarded to admissions and support staff.
          </p>

          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto rounded-full px-8 py-2.5 bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0px_4px_16px_rgba(30,45,75,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] order-1 sm:order-2 cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
