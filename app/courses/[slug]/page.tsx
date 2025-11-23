import {
    ArrowLeft,
    Award,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    DollarSign,
    Download,
    FileText,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Users,
} from "lucide-react";
import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildImageUrl } from "@/lib/sanity/image";
import { fetchCourseBySlug, fetchCourseSlugs, fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const revalidate = 60;

function getCategoryLabel(category?: string): string {
    if (!category) return "Program";
    const labels: Record<string, string> = {
        ched: "CHED Program",
        tesda: "TESDA Program",
        short: "Short Course",
    };
    return labels[category] || category.toUpperCase();
}

function getDeliveryModeLabel(mode?: string): string {
    const labels: Record<string, string> = {
        "on-campus": "On Campus",
        hybrid: "Hybrid",
        online: "Online",
        modular: "Weekend / Modular",
    };
    return mode ? labels[mode] || mode : "Contact for details";
}

function getLevelLabel(level?: string): string {
    const labels: Record<string, string> = {
        undergrad: "Undergraduate",
        graduate: "Graduate",
        tvet: "Technical / Vocational",
    };
    return level ? labels[level] || level : "";
}

export async function generateStaticParams() {
    const slugs = await fetchCourseSlugs();
    return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const course = await fetchCourseBySlug(slug);
    if (!course) return {};

    const title = course.seo?.metaTitle || `${course.title} - Data Center College`;
    const description =
        course.seo?.metaDescription ||
        course.summary ||
        `Learn more about ${course.title} at Data Center College of The Philippines`;
    const ogImage = buildImageUrl(course.seo?.shareImage ?? course.heroImage);
    const ogAlt = course.seo?.shareImage?.alt ?? course.heroImage?.alt ?? course.title;

    return {
        title,
        description,
        openGraph: ogImage
            ? {
                  title,
                  description,
                  images: [
                      {
                          url: ogImage,
                          width: 1200,
                          height: 630,
                          alt: ogAlt,
                      },
                  ],
              }
            : undefined,
    };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [course, settings] = await Promise.all([fetchCourseBySlug(slug), fetchSettings()]);

    if (!course) {
        notFound();
    }

    const siteSettings: Settings = settings ?? {
        _id: "default",
        _type: "settings",
        siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
        shortTitle: "Data Center College",
        tagline: "Empowering the next generation of IT professionals, business leaders, and innovators",
    };

    const categoryLabel = getCategoryLabel(course.offeringCategory);
    const deliveryModeLabel = getDeliveryModeLabel(course.deliveryMode);
    const levelLabel = getLevelLabel(course.level);

    return (
        <>
            <CollegeHeader settings={siteSettings} />

            <div className="w-full mt-10 px-2 sm:px-4 md:px-8 lg:px-12 pt-10 pb-6">
                <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-10">
                    <section className="relative overflow-hidden border-y border-border bg-card">
                        <div className="absolute inset-0 opacity-5">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(135deg, rgba(55,50,47,0.04) 0, rgba(55,50,47,0.04) 1px, transparent 1px, transparent 16px)",
                                }}
                            ></div>
                        </div>

                        <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-12 flex flex-col gap-8 text-foreground">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <Button asChild variant="outline">
                                    <Link href="/#programs" className="flex items-center gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Programs
                                    </Link>
                                </Button>
                                <Badge variant="secondary" className="tracking-[0.18em] uppercase text-xs">
                                    {categoryLabel}
                                </Badge>
                            </div>

                            <div className="space-y-5 max-w-3xl">
                                {course.code && (
                                    <Badge variant="outline" className="tracking-[0.2em] text-xs font-mono">
                                        {course.code}
                                    </Badge>
                                )}
                                <h1 className="text-[30px] sm:text-[42px] lg:text-[54px] leading-tight font-serif text-foreground">
                                    {course.title}
                                </h1>
                                {course.credential && (
                                    <p className="text-lg sm:text-xl text-muted-foreground font-semibold">
                                        {course.credential}
                                    </p>
                                )}
                                {course.summary && (
                                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                        {course.summary}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                {course.duration && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border">
                                        <Clock className="w-4 h-4" />
                                        {course.duration}
                                    </span>
                                )}
                                {course.deliveryMode && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border">
                                        <MapPin className="w-4 h-4" />
                                        {deliveryModeLabel}
                                    </span>
                                )}
                                {course.department && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border">
                                        <BookOpen className="w-4 h-4" />
                                        {course.department.title}
                                    </span>
                                )}
                                {levelLabel && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border">
                                        <Award className="w-4 h-4" />
                                        {levelLabel}
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="w-full flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-8">
                            {course.overview && course.overview.length > 0 && (
                                <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Overview</h2>
                                    <div className="prose prose-neutral max-w-none text-foreground">
                                        <PortableText value={course.overview} />
                                    </div>
                                </section>
                            )}

                            {course.highlights && course.highlights.length > 0 && (
                                <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                                        Program Highlights
                                    </h2>
                                    <ul className="space-y-3">
                                        {course.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-foreground">
                                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                                <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                                        Learning Outcomes
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        Upon completion of this program, students will be able to:
                                    </p>
                                    <ul className="space-y-3">
                                        {course.learningOutcomes.map((outcome, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-foreground">
                                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {course.curriculumStructure && course.curriculumStructure.length > 0 && (
                                <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                                        Curriculum Structure
                                    </h2>
                                    <div className="space-y-4">
                                        {course.curriculumStructure.map((item, idx) => (
                                            <div key={idx} className="border-l-2 border-primary pl-4 py-2">
                                                {item.term && (
                                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                                        {item.term}
                                                    </h3>
                                                )}
                                                {item.description && (
                                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {course.outcomes && course.outcomes.length > 0 && (
                                <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                        Career Opportunities
                                    </h2>
                                    <p className="text-muted-foreground mb-6">
                                        Graduates of this program can pursue careers in:
                                    </p>
                                    <ul className="space-y-3">
                                        {course.outcomes.map((path, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-foreground">
                                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{path}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {course.admissionsRequirements && course.admissionsRequirements.length > 0 && (
                                <section className="bg-card border border-border rounded-lg p-6 md:p-8">
                                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                                        Admissions Requirements
                                    </h2>
                                    <ul className="space-y-3">
                                        {course.admissionsRequirements.map((req, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-foreground">
                                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {((course.prerequisites && course.prerequisites.length > 0) ||
                                (course.prerequisiteNotes && course.prerequisiteNotes.length > 0)) && (
                                <section className="bg-muted/50 border border-border rounded-lg p-6 md:p-8">
                                    <h3 className="text-lg font-semibold text-foreground mb-4">Prerequisites</h3>
                                    {course.prerequisites && course.prerequisites.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-sm text-muted-foreground mb-2">Required courses:</p>
                                            <ul className="space-y-2">
                                                {course.prerequisites.map(prereq => (
                                                    <li key={prereq._id}>
                                                        <Link
                                                            href={`/courses/${prereq.slug.current}`}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {prereq.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {course.prerequisiteNotes && course.prerequisiteNotes.length > 0 && (
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {course.prerequisiteNotes.map((note, idx) => (
                                                <li key={idx}>• {note}</li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            )}
                        </div>

                        <aside className="lg:w-[320px] flex flex-col gap-6">
                            {/* Quick Info Card */}
                            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                                <h3 className="text-lg font-serif font-semibold text-foreground mb-6">
                                    Program Details
                                </h3>
                                <div className="space-y-5">
                                    {course.creditHours && (
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                <FileText className="w-4 h-4" />
                                                Credit Hours / Units
                                            </div>
                                            <div className="text-base font-medium text-foreground">
                                                {course.creditHours}
                                            </div>
                                        </div>
                                    )}

                                    {course.trainingHours && (
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                <Clock className="w-4 h-4" />
                                                Training Hours
                                            </div>
                                            <div className="text-base font-medium text-foreground">
                                                {course.trainingHours}
                                            </div>
                                        </div>
                                    )}

                                    {course.tuition && (
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                <DollarSign className="w-4 h-4" />
                                                Tuition
                                            </div>
                                            <div className="text-base font-medium text-foreground">
                                                {course.tuition}
                                            </div>
                                        </div>
                                    )}

                                    {course.financialAidHighlight && (
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                            <div className="flex items-center gap-2 text-sm font-medium text-green-700 mb-1">
                                                <Award className="w-4 h-4" />
                                                Financial Aid
                                            </div>
                                            <p className="text-xs text-green-700/80">{course.financialAidHighlight}</p>
                                        </div>
                                    )}

                                    {course.semesterAvailability && course.semesterAvailability.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <Calendar className="w-4 h-4" />
                                                Offered In
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {course.semesterAvailability.map((sem, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                        {sem}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {course.majors && course.majors.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <GraduationCap className="w-4 h-4" />
                                                Available Majors
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {course.majors.map((major, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                        {major}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {course.syllabus && (
                                        <div>
                                            <Button asChild variant="outline" className="w-full" size="sm">
                                                <a
                                                    href={course.syllabus.asset.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download Syllabus
                                                </a>
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 space-y-3">
                                    {course.cta ? (
                                        <Button asChild className="w-full">
                                            <a
                                                href={course.cta.url || "/#contact"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {course.cta.label || "Apply Now"}
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button asChild className="w-full">
                                            <Link href="/#contact">Apply Now</Link>
                                        </Button>
                                    )}
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/#contact">Request Information</Link>
                                    </Button>
                                </div>

                                {course.admissionsContact && (
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <h4 className="text-sm font-semibold text-foreground mb-3">
                                            Contact Admissions
                                        </h4>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            {course.admissionsContact.name && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    {course.admissionsContact.name}
                                                </div>
                                            )}
                                            {course.admissionsContact.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    <a
                                                        href={`mailto:${course.admissionsContact.email}`}
                                                        className="hover:text-primary"
                                                    >
                                                        {course.admissionsContact.email}
                                                    </a>
                                                </div>
                                            )}
                                            {course.admissionsContact.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    <a
                                                        href={`tel:${course.admissionsContact.phone}`}
                                                        className="hover:text-primary"
                                                    >
                                                        {course.admissionsContact.phone}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {course.applicationDeadlines && course.applicationDeadlines.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <h4 className="text-sm font-semibold text-foreground mb-3">
                                            Application Deadlines
                                        </h4>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {course.applicationDeadlines.map((deadline, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    {deadline}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Related Offerings */}
                            {course.relatedOfferings && course.relatedOfferings.length > 0 && (
                                <div className="bg-muted/30 border border-border rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-4">Related Programs</h3>
                                    <div className="space-y-3">
                                        {course.relatedOfferings.map(related => (
                                            <Link
                                                key={related._id}
                                                href={`/courses/${related.slug.current}`}
                                                className="block p-3 bg-card border border-border rounded hover:border-primary transition-colors"
                                            >
                                                <h4 className="text-sm font-medium text-foreground hover:text-primary">
                                                    {related.title}
                                                </h4>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </div>

            <FooterSection settings={siteSettings} />
        </>
    );
}
