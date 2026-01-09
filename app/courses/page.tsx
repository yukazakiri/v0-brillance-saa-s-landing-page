import type { Metadata } from "next"
import Link from "next/link"
import { fetchCourses, fetchSettings } from "@/lib/sanity/queries"
import type { Settings } from "@/lib/sanity/types"
import CollegeHeader from "@/components/college-header"
import FooterSection from "@/components/footer-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, Award } from "lucide-react"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Academic Programs",
    description: "Explore our wide range of academic programs, from undergraduate degrees to technical-vocational courses.",
}

export default async function CoursesPage() {
    const [courses, settings] = await Promise.all([
        fetchCourses(),
        fetchSettings(),
    ])

    const siteSettings: Settings = settings ?? {
        _id: "default",
        _type: "settings",
        siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
        shortTitle: "Data Center College",
    }

    // Group courses by category
    const categories = {
        ched: courses.filter(c => c.category === "ched"),
        tesda: courses.filter(c => c.category === "tesda"),
        shs: courses.filter(c => c.category === "shs"),
        short: courses.filter(c => c.category === "short"),
    }

    return (
        <>
            <CollegeHeader settings={siteSettings} />

            <main className="w-full flex flex-col items-center pt-24 pb-0 min-h-screen">
                {/* Hero Section */}
                <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36 flex justify-center bg-gradient-to-b from-transparent to-primary/5">
                    <div className="w-full max-w-[900px] flex flex-col gap-8 text-center items-center">
                        <Badge variant="outline" className="tracking-widest uppercase mb-2">Academic Offerings</Badge>
                        <h1 className="text-foreground font-serif leading-[0.95] tracking-tight">
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Our Programs</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed font-sans max-w-[600px] mt-4">
                            Discover the path to your future. Browse our comprehensive list of programs designed to equip you with industry-ready skills.
                        </p>
                    </div>
                </section>

                {/* Course List Section */}
                <section className="w-full px-4 sm:px-6 md:px-8 py-20 sm:py-28 flex justify-center">
                    <div className="w-full max-w-[1200px] flex flex-col gap-20">

                        {/* CHED Programs */}
                        {categories.ched.length > 0 && (
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-4">
                                    <h2 className="text-3xl font-serif font-bold text-foreground">College Courses</h2>
                                    <p className="text-muted-foreground">Bachelor's degrees accredited by CHED.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.ched.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Senior High School */}
                        {categories.shs.length > 0 && (
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-4">
                                    <h2 className="text-3xl font-serif font-bold text-foreground">Senior High School</h2>
                                    <p className="text-muted-foreground">Academic and TVL tracks approved by DepEd.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.shs.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TESDA Programs */}
                        {categories.tesda.length > 0 && (
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-4">
                                    <h2 className="text-3xl font-serif font-bold text-foreground">TVET Programs</h2>
                                    <p className="text-muted-foreground">Technical-vocational courses registered with TESDA.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.tesda.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Short Courses */}
                        {categories.short.length > 0 && (
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 border-b border-border pb-4">
                                    <h2 className="text-3xl font-serif font-bold text-foreground">Short Courses</h2>
                                    <p className="text-muted-foreground">Specialized skills training modules.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.short.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {courses.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground text-lg">No programs found. Please check back later.</p>
                            </div>
                        )}

                    </div>
                </section>
            </main>

            <FooterSection settings={siteSettings} />
        </>
    )
}

function CourseCard({ course }: { course: any }) {
    return (
        <Link href={`/courses/${course.slug}`} className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6 flex flex-col gap-4 h-full">
                <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{course.credential || "Certificate"}</Badge>
                </div>

                <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-auto">
                    {course.description || course.summary}
                </p>

                <div className="pt-4 mt-auto border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                        {course.duration && (
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {course.duration}
                            </span>
                        )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
            </div>
        </Link>
    )
}
