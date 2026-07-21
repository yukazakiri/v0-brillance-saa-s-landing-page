import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Settings } from "@/lib/sanity/types";

interface AboutSectionProps {
  settings: Settings;
}

const DEFAULT_MISSION =
  "To provide accessible, relevant education that develops capable, ethical, and innovative professionals ready to serve their communities.";

const DEFAULT_VISION =
  "To be a trusted leader in tertiary education, preparing globally competitive graduates for meaningful work and lifelong growth.";

export default function AboutSection({ settings }: AboutSectionProps) {
  const mission = settings.institutionProfile?.mission ?? DEFAULT_MISSION;
  const vision = settings.institutionProfile?.vision ?? DEFAULT_VISION;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-24 border-y border-border"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 sm:py-18 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              About DCCP Baguio
            </p>
            <h2
              id="about-heading"
              className="mt-5 max-w-[14ch] text-balance font-serif text-5xl font-semibold leading-[0.94] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Rooted in <span className="text-secondary">Baguio.</span>
              <span className="mt-1 block">
                Ready for what{" "}
                <span className="box-decoration-clone bg-secondary/15 px-1 text-foreground">
                  comes next.
                </span>
              </span>
            </h2>
          </div>

          <div className="border-t border-border pt-6 lg:border-t-0 lg:pt-0">
            <p className="max-w-[54ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              <strong className="font-medium text-foreground">
                {settings.tagline ||
                  "Empowering Cordilleran innovators through applied technology."}
              </strong>{" "}
              Here, practical learning meets strong values, personal guidance,
              and pathways connected to the world beyond the classroom.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-7">
              <Link href="/about">
                Discover our story
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-y border-border bg-muted/30 px-5 py-8 sm:px-8 sm:py-10 md:mt-20 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12 md:px-10 md:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Our student promise
          </p>
          <div>
            <p className="max-w-[30ch] text-pretty font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Learning that stays{" "}
              <mark className="box-decoration-clone bg-secondary/15 px-1 text-foreground">
                practical
              </mark>
              , feels{" "}
              <mark className="box-decoration-clone bg-secondary/15 px-1 text-foreground">
                personal
              </mark>
              , and opens real{" "}
              <mark className="box-decoration-clone bg-secondary/15 px-1 text-foreground">
                possibility
              </mark>
              .
            </p>
            <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
              Students build useful skills, confidence, and character through
              programs shaped for meaningful work and service to their
              communities.
            </p>
          </div>
        </div>

        <div className="mt-14 grid border-y border-border sm:grid-cols-3 md:mt-16">
          {[
            {
              value: "Since 1970",
              label: "A legacy of learning",
              description:
                "Decades of helping students turn education into opportunity.",
            },
            {
              value: "CHED + TESDA",
              label: "Recognized pathways",
              description:
                "Degree and skills programs for different goals and stages.",
            },
            {
              value: "Baguio City",
              label: "Home in the Cordilleras",
              description:
                "A learning community grounded in the region it serves.",
            },
          ].map((fact, index) => (
            <dl
              key={fact.value}
              className={`flex flex-col py-7 sm:px-6 sm:py-8 md:px-8 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="order-2 mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="order-1 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {fact.value}
              </dd>
              <dd className="order-3 mt-4 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
                {fact.description}
              </dd>
            </dl>
          ))}
        </div>

        <div className="grid gap-12 pt-14 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 md:pt-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              What guides us
            </p>
            <h3 className="mt-4 max-w-[10ch] font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Education with purpose.
            </h3>
          </div>

          <div className="border-b border-border">
            <article className="grid gap-4 border-t border-border py-7 sm:grid-cols-[48px_minmax(0,1fr)] sm:px-3 md:gap-8 md:py-9">
              <span className="pt-1 font-mono text-xs text-muted-foreground">
                01
              </span>
              <div>
                <h4 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Our mission
                </h4>
                <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {mission}
                </p>
              </div>
            </article>

            <article className="grid gap-4 border-t border-border py-7 sm:grid-cols-[48px_minmax(0,1fr)] sm:px-3 md:gap-8 md:py-9">
              <span className="pt-1 font-mono text-xs text-muted-foreground">
                02
              </span>
              <div>
                <h4 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Our vision
                </h4>
                <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {vision}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
