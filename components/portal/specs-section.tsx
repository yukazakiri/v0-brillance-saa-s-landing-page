"use client"

import { cn } from "@/lib/utils"
import type { TechnicalSpecsSection } from "@/lib/sanity/types"

interface SpecsSectionProps {
  data: TechnicalSpecsSection
}

export default function SpecsSection({ data }: SpecsSectionProps) {
  const { sectionTitle, sectionDescription, specifications } = data

  return (
    <section className="w-full py-16 md:py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
            {sectionTitle}
          </h2>
          {sectionDescription && (
            <p className="text-lg text-muted-foreground max-w-[800px]">
              {sectionDescription}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {specifications.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-foreground pb-2 border-b border-border">
                {category.category}
              </h3>
              <dl className="grid gap-4">
                {category.items.map((item, i) => (
                  <div key={i} className="grid gap-1">
                    <dt className="font-medium text-foreground text-sm">{item.label}</dt>
                    <dd className="text-muted-foreground text-sm">{item.value}</dd>
                    {item.description && (
                      <dd className="text-xs text-muted-foreground/80 italic mt-0.5">
                        {item.description}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
