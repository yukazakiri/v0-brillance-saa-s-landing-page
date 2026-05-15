"use client"

import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "./college-header"
import FooterSection from "./footer-section"
import AdmissionsContactSection from "./admissions-contact-section"
import { ArrowRight, BookOpen, GraduationCap, ClipboardCheck } from "lucide-react"

interface AdmissionsPageContentProps {
  settings: Settings
}

export default function AdmissionsPageContent({ settings }: AdmissionsPageContentProps) {
  return (
    <main className="min-h-screen bg-background font-inter">
      <CollegeHeader settings={settings} />

      {/* Minimal Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                Applications Open for 2025
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-instrument-serif text-primary leading-[1.1] mb-8 tracking-tight">
              Begin Your <span className="italic text-secondary">Legacy</span> at DCCP.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-inter leading-relaxed">
              We seek students who are driven by curiosity and a desire to lead in a technology-first world. Your future
              starts with a single step.
            </p>
          </div>
        </div>
      </section>

      {/* Minimalist Cards Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-border bg-background hover:border-secondary transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                <GraduationCap className="w-6 h-6 text-primary group-hover:text-secondary" />
              </div>
              <h3 className="text-2xl font-instrument-serif text-primary mb-4">Undergraduate</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Accredited degree programs in IT, Business, and Innovaton. Focus on industry-ready skills.
              </p>
              <ul className="space-y-3 mb-8">
                {["Form 138 (Report Card)", "Good Moral Certificate", "PSA Birth Certificate"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary group/btn">
                Requirements <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="group p-8 rounded-2xl border border-border bg-background hover:border-secondary transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                <BookOpen className="w-6 h-6 text-primary group-hover:text-secondary" />
              </div>
              <h3 className="text-2xl font-instrument-serif text-primary mb-4">Vocational</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                TESDA-registered short courses designed for immediate workforce integration and mastery.
              </p>
              <ul className="space-y-3 mb-8">
                {["High School Diploma", "2x2 Photos (4pcs)", "Medical Certificate"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary group/btn">
                Program List <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="group p-8 rounded-2xl border border-border bg-background hover:border-secondary transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                <ClipboardCheck className="w-6 h-6 text-primary group-hover:text-secondary" />
              </div>
              <h3 className="text-2xl font-instrument-serif text-primary mb-4">How to Apply</h3>
              <div className="space-y-6">
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-secondary" />
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Step 01</p>
                  <p className="text-muted-foreground text-xs">Complete the online pre-registration form.</p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-secondary" />
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Step 02</p>
                  <p className="text-muted-foreground text-xs">Submit required documents for evaluation.</p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-secondary" />
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Step 03</p>
                  <p className="text-muted-foreground text-xs">Payment of fees and official enrollment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Contact Section Integration */}
      <section className="bg-background">
        <AdmissionsContactSection />
      </section>

      <FooterSection settings={settings} />
    </main>
  )
}
