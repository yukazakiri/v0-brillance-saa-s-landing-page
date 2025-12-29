"use client"

import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StudentTestimonialSection } from "@/lib/sanity/types"
import { getImageUrl } from "@/lib/sanity/image"

interface TestimonialSectionProps {
  data: StudentTestimonialSection
}

export default function TestimonialSection({ data }: TestimonialSectionProps) {
  const { sectionTitle, sectionDescription, testimonials } = data

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
            {sectionTitle}
          </h2>
          {sectionDescription && (
            <p className="text-lg text-muted-foreground max-w-[800px]">
              {sectionDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={cn(
                "relative flex flex-col p-8 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                testimonial.highlight && "ring-2 ring-primary/20 bg-gradient-to-br from-card to-primary/5"
              )}
            >
              <Quote className="absolute top-8 right-8 w-8 h-8 text-primary/10" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < (testimonial.rating || 5) ? "fill-primary text-primary" : "fill-muted text-muted-foreground/20"
                    )}
                  />
                ))}
              </div>

              <blockquote className="text-lg text-foreground mb-8 flex-grow leading-relaxed">
                "{testimonial.testimonial}"
              </blockquote>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0 border border-border">
                  {testimonial.studentPhoto ? (
                    <Image
                      src={getImageUrl(testimonial.studentPhoto)}
                      alt={testimonial.studentName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                      {testimonial.studentName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.studentName}</div>
                  {testimonial.studentProgram && (
                    <div className="text-sm text-muted-foreground">{testimonial.studentProgram}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
