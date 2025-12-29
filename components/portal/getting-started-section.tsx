"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { GettingStartedSection } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

interface GettingStartedSectionProps {
  data: GettingStartedSection;
}

export default function GettingStartedSection({
  data,
}: GettingStartedSectionProps) {
  const { sectionTitle, sectionDescription, steps } = data;

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
            {sectionTitle}
          </h2>
          {sectionDescription && (
            <p className="text-lg text-muted-foreground max-w-[800px]">
              {sectionDescription}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-12 lg:gap-20">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={cn(
                "flex flex-col lg:flex-row gap-8 lg:gap-16 items-start",
                idx % 2 === 1 && "lg:flex-row-reverse",
              )}
            >
              {/* Step Content */}
              <div className="flex-1 flex flex-col gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-serif">
                    {step.stepTitle}
                  </h3>
                </div>

                {step.stepDescription && (
                  <p className="text-lg text-muted-foreground leading-relaxed pl-14">
                    {step.stepDescription}
                  </p>
                )}

                {step.resources && step.resources.length > 0 && (
                  <div className="flex flex-wrap gap-3 pl-14 mt-2">
                    {step.resources.map((resource, rIdx) => {
                      const Icon =
                        resource.resourceType === "video"
                          ? PlayCircle
                          : resource.resourceType === "download"
                            ? Download
                            : BookOpen;

                      return (
                        <Button
                          key={rIdx}
                          variant="outline"
                          size="sm"
                          asChild
                          className="gap-2"
                        >
                          <Link
                            href={resource.resourceUrl || "#"}
                            target="_blank"
                          >
                            <Icon className="w-4 h-4" />
                            {resource.resourceTitle}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step Image */}
              <div className="flex-1 w-full relative">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-border bg-card">
                  {step.stepImage ? (
                    <Image
                      src={getImageUrl(step.stepImage)}
                      alt={step.stepTitle}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      No Preview
                    </div>
                  )}
                </div>

                {/* Connector Line (Desktop Only) */}
                {idx !== steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden lg:block absolute -bottom-20 w-0.5 h-20 bg-border border-l-2 border-dashed border-muted-foreground/30",
                      idx % 2 === 0
                        ? "right-1/2 translate-x-1/2"
                        : "left-1/2 -translate-x-1/2",
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
