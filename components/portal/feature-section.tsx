"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SoftwareFeatureSection } from "@/lib/sanity/types"
import { getImageUrl } from "@/lib/sanity/image"
import { PortableText } from "next-sanity"

interface FeatureSectionProps {
  data: SoftwareFeatureSection
}

export default function FeatureSection({ data }: FeatureSectionProps) {
  const { sectionTitle, sectionDescription, layout, features } = data

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
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

        {layout === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-col p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-lg",
                  feature.highlight && "ring-2 ring-primary/20 shadow-md"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon ? (
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={getImageUrl(feature.icon)}
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-foreground font-serif">{feature.featureName}</h3>
                </div>
                
                {feature.shortDescription && (
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {feature.shortDescription}
                  </p>
                )}

                {feature.screenshot && (
                  <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border border-border/50">
                    <Image
                      src={getImageUrl(feature.screenshot)}
                      alt={feature.screenshot.alt || feature.featureName}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {layout === "list" && (
          <div className="flex flex-col gap-12 md:gap-24">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex flex-col lg:flex-row gap-8 lg:gap-16 items-center",
                  idx % 2 === 1 && "lg:flex-row-reverse"
                )}
              >
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    {feature.icon && (
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={getImageUrl(feature.icon)}
                          alt=""
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                      {feature.featureName}
                    </h3>
                  </div>
                  
                  {feature.shortDescription && (
                    <p className="text-lg text-muted-foreground">
                      {feature.shortDescription}
                    </p>
                  )}

                  {feature.detailedDescription && (
                    <div className="prose prose-neutral max-w-none text-muted-foreground">
                      <PortableText value={feature.detailedDescription} />
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  {feature.screenshot ? (
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
                      <Image
                        src={getImageUrl(feature.screenshot)}
                        alt={feature.screenshot.alt || feature.featureName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] rounded-2xl bg-muted border border-border flex items-center justify-center">
                      <p className="text-muted-foreground font-medium">No preview available</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabbed layout logic could be added here if needed */}
      </div>
    </section>
  )
}
