"use client";

import { CheckCircle2 } from "lucide-react";
import type { OverviewSection } from "@/lib/sanity/types";

interface OverviewSectionProps {
  data: OverviewSection;
}

export default function OverviewSection({ data }: OverviewSectionProps) {
  const { overviewTitle, overviewDescription, keyBenefits } = data;

  return (
    <section className="w-full py-16 md:py-24 border-t border-b border-border ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-serif">
              {overviewTitle}
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              <p>{overviewDescription}</p>
            </div>
          </div>

          <div className="grid gap-6">
            {keyBenefits?.map((benefit, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-foreground">
                    {benefit.benefit}
                  </h3>
                  {benefit.description && (
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
