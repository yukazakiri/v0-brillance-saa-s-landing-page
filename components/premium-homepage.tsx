import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  Code2,
  Compass,
  GraduationCap,
  Landmark,
  Quote,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type {
  Article,
  Course,
  SanityPhotoGallery,
  Settings,
} from "@/lib/sanity/types";

type PremiumHomepageProps = {
  settings: Settings;
  courses?: Course[];
  articles?: Article[];
  galleries?: SanityPhotoGallery[];
};

type Discipline = {
  title: string;
  description: string;
  href: string;
  icon: typeof GraduationCap;
  catalogCode: string;
  track: string;
};

const metrics = [
  {
    value: "50+",
    label: "years forming graduates in Baguio",
    note: "A long-standing institution with a practical, career-minded academic culture.",
  },
  {
    value: "15k+",
    label: "alumni carrying the college name",
    note: "A graduate network across technology, enterprise, service, and public sectors.",
  },
  {
    value: "18:1",
    label: "guided student-to-faculty environment",
    note: "Closer advising for students choosing their first serious professional path.",
  },
  {
    value: "4",
    label: "entry points into college life",
    note: "Degree, technical, hospitality, and senior high school pathways.",
  },
];

const disciplines: Discipline[] = [
  {
    title: "Information Technology",
    description:
      "Build software, systems, and data fluency for work that changes every semester.",
    href: "/programs/bsit",
    icon: Code2,
    catalogCode: "IT",
    track: "Computing studio",
  },
  {
    title: "Business Administration",
    description:
      "Study decisions, markets, people, and the discipline behind sustainable enterprise.",
    href: "/programs/bsba",
    icon: BriefcaseBusiness,
    catalogCode: "BA",
    track: "Leadership practice",
  },
  {
    title: "Hospitality Management",
    description:
      "Learn the operational details and human judgment behind exceptional service.",
    href: "/programs/bshrm",
    icon: Building2,
    catalogCode: "HM",
    track: "Service craft",
  },
  {
    title: "Senior High School",
    description:
      "Prepare for college with stronger habits, clearer choices, and guided confidence.",
    href: "/programs",
    icon: Landmark,
    catalogCode: "SHS",
    track: "College foundation",
  },
];

export default function PremiumHomepage({
  settings,
  courses = [],
  articles = [],
  galleries = [],
}: PremiumHomepageProps) {
  const logoUrl =
    getImageUrl(settings.logos?.primary, 192, 192) ||
    settings.logos?.primary?.externalUrl ||
    "/android-chrome-192x192.png";

  const logoAlt =
    settings.logos?.primary?.alt ||
    `${settings.shortTitle || settings.siteTitle} logo`;
  const shortTitle = settings.shortTitle || "Data Center College";
  const siteTitle =
    settings.siteTitle || "Data Center College of The Philippines";
  const tagline =
    settings.tagline ||
    "Empowering the next generation of IT professionals, business leaders, and innovators.";
  const featuredCourses = courses.slice(0, 6);
  const featuredArticles = articles.slice(0, 3);
  const featuredGalleries = galleries.slice(0, 3);

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative isolate w-full overflow-hidden border-x border-border/70 bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--primary-foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_oklch,var(--primary-foreground)_7%,transparent)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute left-0 top-0 -z-10 h-full w-28 bg-accent/20 [clip-path:polygon(0_0,100%_0,46%_100%,0_100%)]" />
        <div className="absolute bottom-0 right-0 -z-10 h-[72%] w-[52%] bg-secondary/20 blur-3xl" />

        <header className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-4"
            aria-label={`${siteTitle} homepage`}
          >
            <span className="grid size-14 place-items-center border border-primary-foreground/15 bg-background shadow-[6px_6px_0_color-mix(in_oklch,var(--accent)_35%,transparent)] transition-transform duration-300 group-hover:-translate-y-0.5">
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={40}
                height={40}
                className="size-10 object-contain"
              />
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-2xl leading-none tracking-tight text-primary-foreground">
                {shortTitle}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-primary-foreground/55">
                Baguio City, Inc.
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/70 lg:flex"
            aria-label="Primary navigation"
          >
            <Link href="/about" className="transition-colors hover:text-accent">
              About
            </Link>
            <Link
              href="/academics"
              className="transition-colors hover:text-accent"
            >
              Academics
            </Link>
            <Link href="/news" className="transition-colors hover:text-accent">
              News
            </Link>
            <Link
              href="/portal"
              className="transition-colors hover:text-accent"
            >
              Portal
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="hidden text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60 transition-colors hover:text-accent sm:inline-flex"
            >
              Student login
            </Link>
            <Button
              asChild
              className="h-11 rounded-none bg-accent px-5 font-bold text-accent-foreground shadow-[5px_5px_0_color-mix(in_oklch,var(--primary-foreground)_14%,transparent)] hover:bg-accent/90"
            >
              <Link href="/apply">Apply</Link>
            </Button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1320px] px-5 pb-14 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-foreground/65">
              <Compass className="size-4 text-accent" />
              <span>Campus briefing</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-balance font-serif text-[4.3rem] font-medium leading-[0.88] tracking-[-0.07em] text-primary-foreground sm:text-8xl lg:text-[8.4rem]">
              Know campus first. Choose with clarity.
            </h1>
          </div>

          <div className="mt-10 grid gap-8 border-t border-primary-foreground/15 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <p className="max-w-2xl text-pretty text-lg leading-8 text-primary-foreground/72">
              {tagline} Current school updates come first, followed by programs,
              admissions, and student services.
            </p>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end lg:justify-self-end">
              {featuredArticles[0] && (
                <Link
                  href={`/news/${featuredArticles[0].slug}`}
                  className="group border-l border-accent/70 pl-5"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                    Latest update
                  </p>
                  <p className="mt-2 max-w-md text-base font-semibold leading-7 text-primary-foreground group-hover:text-accent">
                    {featuredArticles[0].title}
                  </p>
                </Link>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-none bg-accent px-6 text-sm font-bold text-accent-foreground hover:bg-accent/90"
                >
                  <Link href="/news">
                    Latest News
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-none border-primary-foreground/25 bg-transparent px-6 text-sm font-bold text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/programs">
                    Programs
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-x border-b border-border/70 bg-background px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                Campus dispatches
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-5xl font-medium leading-[0.94] tracking-[-0.055em] text-primary sm:text-6xl">
                Latest news from DCCP.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                Important school updates, announcements, and campus stories —
                placed here because students should not have to search for them.
              </p>
              <Link
                href="/news"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary hover:text-accent"
              >
                View all news
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {featuredArticles.length > 0 ? (
            <div className="divide-y divide-border">
              {featuredArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group grid gap-6 py-8 transition-colors hover:bg-card/60 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:px-4"
                >
                  <span className="font-serif text-5xl leading-none tracking-[-0.06em] text-primary/25 group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                      {article.category} / {article.date}
                    </p>
                    <h3 className="mt-3 max-w-4xl font-serif text-3xl font-medium leading-tight tracking-[-0.04em] text-primary group-hover:text-accent sm:text-4xl lg:text-5xl">
                      {article.title}
                    </h3>
                    <p className="mt-4 line-clamp-2 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex size-10 items-center justify-center border border-border text-primary group-hover:border-accent group-hover:text-accent">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-border bg-card p-8">
              <p className="font-serif text-3xl text-primary">
                No official updates found.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Publish news or announcement posts and they will render here.
              </p>
            </div>
          )}

          {featuredGalleries.length > 0 && (
            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
                  Gallery preview
                </p>
                <p className="mt-2 font-serif text-3xl leading-none tracking-[-0.04em] text-primary">
                  {featuredGalleries[0].title}
                </p>
              </div>
              <Button
                asChild
                className="h-11 rounded-none bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/_gallery">Open Gallery</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="w-full border-x border-b border-border/70 bg-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 divide-y divide-primary-foreground/15 px-5 sm:px-8 md:grid-cols-4 md:divide-x md:divide-y-0 lg:px-12">
          {metrics.map((metric) => (
            <article key={metric.label} className="py-10 md:px-6 lg:py-14">
              <p className="font-serif text-6xl font-medium leading-none tracking-[-0.05em] text-primary-foreground lg:text-7xl">
                {metric.value}
              </p>
              <h2 className="mt-5 max-w-[14rem] text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/90">
                {metric.label}
              </h2>
              <p className="mt-4 text-sm leading-6 text-primary-foreground/68">
                {metric.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="programs"
        className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-10 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                Academic disciplines
              </p>
              <h2 className="mt-5 max-w-xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-primary sm:text-6xl">
                The course catalog, edited for decisions.
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
                Parents need clarity. Students need a path that feels real. Each
                field is presented as a working identity, not just a list of
                subjects.
              </p>
            </div>

            <div className="grid gap-4">
              {disciplines.map((discipline, index) => {
                const Icon = discipline.icon;

                return (
                  <Link
                    key={discipline.title}
                    href={discipline.href}
                    className={cn(
                      "group grid gap-6 border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[12px_12px_0_color-mix(in_oklch,var(--primary)_8%,transparent)] sm:grid-cols-[120px_1fr_auto] sm:items-center lg:p-8",
                      index === 1 && "lg:ml-16",
                      index === 2 && "lg:mr-16",
                    )}
                  >
                    <div className="flex items-center gap-4 sm:block">
                      <span className="grid size-16 place-items-center bg-muted text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        <Icon className="size-7" />
                      </span>
                      <span className="font-serif text-5xl leading-none tracking-[-0.06em] text-primary/20 sm:mt-5 sm:block">
                        {discipline.catalogCode}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
                        {discipline.track}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-[-0.035em] text-primary sm:text-4xl">
                        {discipline.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        {discipline.description}
                      </p>
                    </div>
                    <span className="inline-flex size-11 items-center justify-center border border-primary/20 text-primary transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-x border-b border-border/70 bg-primary px-5 py-20 text-primary-foreground sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground/70">
              Live program catalog
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl font-medium leading-[0.92] tracking-[-0.055em] text-primary-foreground sm:text-6xl">
              Official programs, rendered for quick comparison.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-primary-foreground/70">
              This section uses active course records from the CMS when
              available, with links routed to each course detail page.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(featuredCourses.length > 0 ? featuredCourses : courses)
              .slice(0, 6)
              .map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group border border-primary-foreground/15 bg-primary-foreground/7 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-primary-foreground/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary-foreground/60">
                      {course.credential || course.category}
                    </span>
                    <ArrowUpRight className="size-4 text-primary-foreground/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <h3 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-[-0.04em] text-primary-foreground">
                    {course.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-primary-foreground/68">
                    {course.description ||
                      "Explore requirements, duration, outcomes, and admissions details."}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="border border-primary-foreground/15 px-3 py-1 text-xs font-semibold text-primary-foreground/75">
                      {course.duration}
                    </span>
                    {course.scholarshipsAvailable && (
                      <span className="border border-accent/50 px-3 py-1 text-xs font-semibold text-accent">
                        Scholarship
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            {featuredCourses.length === 0 && (
              <div className="border border-primary-foreground/15 bg-primary-foreground/7 p-8 md:col-span-2">
                <p className="font-serif text-3xl text-primary-foreground">
                  No active CMS programs found yet.
                </p>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/68">
                  Add active program records in the content system and they will
                  render here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full border-x border-b border-border/70 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                Admissions route
              </p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl font-medium leading-[0.94] tracking-[-0.055em] text-primary sm:text-6xl">
                Make the next step obvious for students and parents.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              The page now moves from inspiration to decision support: compare
              paths, check requirements, then begin the application.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              [
                "01",
                "Choose a field",
                "Start with the program catalog and shortlist the pathways that match your goals.",
              ],
              [
                "02",
                "Prepare requirements",
                "Review entry documents for freshmen, transferees, and returning learners.",
              ],
              [
                "03",
                "Apply with guidance",
                "Submit the application and connect with admissions for the next checkpoint.",
              ],
            ].map(([step, title, text]) => (
              <article
                key={step}
                className="border border-border bg-card p-7 shadow-[8px_8px_0_color-mix(in_oklch,var(--primary)_7%,transparent)]"
              >
                <p className="font-serif text-5xl leading-none tracking-[-0.06em] text-primary/25">
                  {step}
                </p>
                <h3 className="mt-8 font-serif text-3xl font-medium tracking-[-0.04em] text-primary">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-x border-b border-border/70 bg-muted/45 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1320px] gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative border border-primary/15 bg-card p-6 shadow-[16px_16px_0_color-mix(in_oklch,var(--secondary)_16%,transparent)] lg:p-10">
            <Quote className="mb-10 size-12 text-accent" />
            <blockquote className="text-pretty font-serif text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-primary sm:text-5xl lg:text-6xl">
              “The college helped me translate ambition into a plan. I knew what
              to study, who to ask, and how to keep moving when the work became
              serious.”
            </blockquote>
            <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-lg font-bold text-foreground">
                  Student success proof
                </p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Replace this profile with an approved graduate, parent, or
                  employer story from the institution’s brand library.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-primary/25 bg-background px-6 font-bold text-primary hover:bg-card"
              >
                <Link href="/alumni">
                  View Outcomes
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[560px] border border-primary/15 bg-background p-3 shadow-[12px_12px_0_color-mix(in_oklch,var(--primary)_8%,transparent)]">
            <div className="relative h-full min-h-[532px] overflow-hidden bg-muted">
              <Image
                src="/hero-images/image.png"
                alt="Professional student profile placeholder"
                fill
                sizes="(min-width: 1024px) 500px, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                <div className="mb-5 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.24em] backdrop-blur">
                  <UsersRound className="size-4" />
                  Profile placeholder
                </div>
                <h3 className="font-serif text-4xl font-medium leading-none tracking-[-0.04em]">
                  A real student story belongs here.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-x border-b border-border/70 bg-background px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div className="flex items-start gap-4">
            <BookOpenText className="mt-1 size-6 text-accent" />
            <div>
              <p className="font-serif text-3xl leading-none tracking-[-0.035em] text-primary">
                Ready to compare programs?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start with the catalog, then book a campus conversation when
                your shortlist is clear.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="h-12 rounded-none bg-accent px-6 font-bold text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/programs">
              Open Program Catalog
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
