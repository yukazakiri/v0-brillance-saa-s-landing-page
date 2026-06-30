import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  Laptop,
  LockKeyhole,
  MessageSquareText,
  MonitorSmartphone,
  UsersRound,
} from "lucide-react";

import EditorialSiteHeader from "@/components/editorial-site-header";
import FooterSection from "@/components/footer-section";
import GsapEditorialReveal from "@/components/gsap-editorial-reveal";
import { Button } from "@/components/ui/button";
import { fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "DCCPHub Portal | Data Center College of The Philippines",
  description:
    "Explore DCCPHub, the student and faculty portal for grades, enrollment, LMS resources, messages, payments, and faculty analytics.",
  openGraph: {
    title: "DCCPHub Portal",
    description:
      "One hub for every academic tool students and faculty need at Data Center College of The Philippines.",
  },
};

const portalFeatures = [
  {
    title: "Student command desk",
    description:
      "Grades, schedules, balances, announcements, and course work organized into one calm academic view.",
    icon: MonitorSmartphone,
  },
  {
    title: "Learning continuity",
    description:
      "LMS modules, deadlines, and class materials stay connected to the student's academic record.",
    icon: BookOpenCheck,
  },
  {
    title: "Faculty signal board",
    description:
      "Class lists, grade workflows, and learner signals give faculty a clearer place to act.",
    icon: UsersRound,
  },
  {
    title: "Secure access layer",
    description:
      "Role-aware access keeps student, faculty, and administrative functions separated and focused.",
    icon: LockKeyhole,
  },
];

const portalSteps = [
  "Open the portal from the college website.",
  "Sign in with your assigned student or faculty credentials.",
  "Check announcements, classes, balances, and learning tasks.",
  "Contact the relevant office if a record needs correction.",
];

export default async function PortalPage() {
  const settings = await fetchSettings();
  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "DCCPH",
    tagline:
      "Empowering the next generation of IT professionals, business leaders, and innovators",
  };

  return (
    <>
      <EditorialSiteHeader settings={siteSettings} />
      <GsapEditorialReveal>
        <main className="w-full min-h-screen">
          <section className="relative isolate overflow-hidden border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--primary)_6%,transparent)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_oklch,var(--primary)_4%,transparent)_1px,transparent_1px)] bg-[size:72px_72px]" />
            <div className="mx-auto grid w-full max-w-[1320px] gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div data-gsap-reveal>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                  DCCPHub portal
                </p>
                <h1 className="mt-5 max-w-5xl text-balance font-serif text-6xl font-medium leading-[0.86] tracking-[-0.065em] text-primary sm:text-7xl lg:text-8xl">
                  One academic desk for every campus role.
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                  DCCPHub brings student records, learning tasks, messages,
                  balances, and faculty workflows into a calmer portal
                  experience.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    className="h-14 rounded-none bg-accent px-8 text-base font-bold text-accent-foreground shadow-[7px_7px_0_color-mix(in_oklch,var(--primary)_18%,transparent)] hover:bg-accent/90"
                  >
                    <a
                      href="https://hub.dccp.edu.ph"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Launch Portal
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-14 rounded-none border-primary/25 bg-background/80 px-8 text-base font-bold text-primary hover:bg-card"
                  >
                    <Link href="/apply">Ask Admissions</Link>
                  </Button>
                </div>
              </div>

              <div data-gsap-reveal className="relative min-h-[560px]">
                <div className="absolute left-0 top-8 w-[82%] border border-primary/15 bg-card p-4 shadow-[16px_16px_0_color-mix(in_oklch,var(--primary)_9%,transparent)]">
                  <div className="border border-border bg-background p-5">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
                          Student view
                        </p>
                        <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em] text-primary">
                          Today's academic desk
                        </h2>
                      </div>
                      <Laptop className="size-9 text-accent" />
                    </div>
                    <div className="mt-6 grid gap-3">
                      {[
                        "Classes and rooms",
                        "Grade movement",
                        "Balance reminders",
                        "Learning tasks",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center justify-between border border-border bg-card p-4"
                        >
                          <span className="text-sm font-bold text-primary">
                            {item}
                          </span>
                          <span className="font-serif text-3xl text-primary/25">
                            0{index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-[58%] border border-primary/15 bg-primary p-6 text-primary-foreground shadow-[12px_12px_0_color-mix(in_oklch,var(--accent)_32%,transparent)]">
                  <BarChart3 className="size-9 text-accent" />
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-primary-foreground/60">
                    Faculty signal
                  </p>
                  <p className="mt-3 font-serif text-4xl leading-none tracking-[-0.05em]">
                    Earlier action, less noise.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="mx-auto grid w-full max-w-[1320px] gap-4 md:grid-cols-2 xl:grid-cols-4">
              {portalFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    data-gsap-reveal
                    className="border border-border bg-card p-6 transition-all duration-300 hover:border-accent/70 hover:shadow-[10px_10px_0_color-mix(in_oklch,var(--primary)_8%,transparent)]"
                  >
                    <Icon className="size-9 text-accent" />
                    <h2 className="mt-10 font-serif text-3xl font-medium leading-tight tracking-[-0.04em] text-primary">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="border-x border-b border-border/70 bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-12 lg:py-28">
            <div className="mx-auto grid w-full max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div data-gsap-reveal>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground/60">
                  How to use it
                </p>
                <h2 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.055em] text-primary-foreground sm:text-6xl">
                  A portal flow students can remember.
                </h2>
              </div>
              <div className="grid gap-4">
                {portalSteps.map((step, index) => (
                  <div
                    key={step}
                    data-gsap-reveal
                    className="grid gap-5 border border-primary-foreground/15 bg-primary-foreground/7 p-5 sm:grid-cols-[80px_1fr] sm:items-center"
                  >
                    <span className="font-serif text-5xl leading-none tracking-[-0.06em] text-accent">
                      0{index + 1}
                    </span>
                    <p className="text-lg font-semibold text-primary-foreground/85">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-x border-b border-border/70 bg-muted/45 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div
              data-gsap-reveal
              className="mx-auto grid w-full max-w-[1320px] gap-10 border border-border bg-card p-8 shadow-[14px_14px_0_color-mix(in_oklch,var(--secondary)_14%,transparent)] lg:grid-cols-[0.8fr_1.2fr] lg:p-10"
            >
              <div>
                <MessageSquareText className="size-10 text-accent" />
                <h2 className="mt-8 font-serif text-5xl leading-none tracking-[-0.055em] text-primary">
                  Support stays human.
                </h2>
              </div>
              <div className="grid content-center gap-5">
                {[
                  "For account access, contact the assigned school office.",
                  "For admissions questions, start at the application page.",
                  "For record corrections, prepare your student number and documentation.",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-start gap-3 text-base leading-7 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-accent" />
                    {item}
                  </p>
                ))}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-12 rounded-none bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"
                  >
                    <a
                      href="https://hub.dccp.edu.ph"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Launch Portal
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-none border-primary/25 bg-background px-6 font-bold text-primary hover:bg-card"
                  >
                    <Link href="/apply">Contact Admissions</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </GsapEditorialReveal>
      <FooterSection settings={siteSettings} />
    </>
  );
}
