import { ArrowLeft, Calendar, Hash, Tag as TagIcon, User } from "lucide-react";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import { buildImageUrl } from "@/lib/sanity/image";
import { fetchPostBySlug, fetchPostSlugs, fetchSettings } from "@/lib/sanity/queries";
import type { SanityPost, Settings } from "@/lib/sanity/types";
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
});

export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            const imageUrl = value ? buildImageUrl(value, 900, 600) : null;
            if (!imageUrl) return null;
            return (
                <img src={imageUrl} alt={value?.alt || "News article image"} className="w-full rounded-2xl shadow-md" />
            );
        },
    },
};

function formatCategoryLabel(category?: string | null) {
    if (!category) return "News";
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function getSiteBaseUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "";
}

export async function generateStaticParams() {
    const slugs = await fetchPostSlugs();
    return slugs.map(slug => ({ slug }));
}

async function getPost(slug: string): Promise<SanityPost | null> {
    return fetchPostBySlug(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchPostBySlug(slug);
    if (!post) return {};

    const baseUrl = getSiteBaseUrl();
    const canonicalUrl = baseUrl ? `${baseUrl}/news/${post.slug}` : undefined;
    const ogImage = buildImageUrl(post.seo?.metaImage ?? post.featuredImage);

    return {
        title: post.seo?.metaTitle ?? post.title,
        description: post.seo?.metaDescription ?? post.excerpt ?? undefined,
        alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
        openGraph: {
            title: post.seo?.metaTitle ?? post.title,
            description: post.seo?.metaDescription ?? post.excerpt ?? undefined,
            url: canonicalUrl,
            type: "article",
            images: ogImage
                ? [
                      {
                          url: ogImage,
                          width: 1200,
                          height: 630,
                          alt: post.title,
                      },
                  ]
                : undefined,
        },
    };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, settings] = await Promise.all([getPost(slug), fetchSettings()]);

    if (!post) {
        notFound();
    }

    const siteSettings: Settings = settings ?? {
        _id: "default",
        _type: "settings",
        siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
        shortTitle: "Data Center College",
        tagline: "Empowering the next generation of IT professionals, business leaders, and innovators",
    };

    const heroImage = buildImageUrl(post.featuredImage);
    const heroMedia = heroImage ?? "/hero-images/maincampus.png";
    const publishedDate = post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : "Coming soon";
    const categoryLabel = formatCategoryLabel(post.category);
    const authorName = post.author || "Editorial Team";
    const summaryText =
        post.seo?.metaDescription ?? post.excerpt ?? "Stay informed with the latest updates from Data Center College.";
    const tags = Array.isArray(post.tags) ? post.tags.filter(Boolean) : [];
    const baseUrl = getSiteBaseUrl();
    const canonicalUrl = baseUrl ? `${baseUrl}/news/${post.slug}` : `/news/${post.slug}`;
    const shareLinks = [
        {
            label: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`,
        },
        {
            label: "Twitter",
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(
                post.title
            )}`,
        },
        {
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
        },
    ];

    return (
        <>
            <CollegeHeader settings={siteSettings} />

            <div className="w-full mt-10 px-2 sm:px-4 md:px-8 lg:px-12 pt-10 pb-6">
                <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-10">
                    <section className="relative overflow-hidden border-y border-border bg-background">
                        <div className="absolute inset-0 pointer-events-none">
                            <img
                                src={heroMedia}
                                alt={post.featuredImage?.alt || post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-background via-white/80 to-transparent"></div>
                            <div
                                className="absolute inset-0 opacity-15"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(135deg, rgba(55,50,47,0.04) 0, rgba(55,50,47,0.04) 1px, transparent 1px, transparent 16px)",
                                }}
                            ></div>
                        </div>

                        <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-12 flex flex-col gap-8 text-foreground">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <Button asChild variant="outline" className="bg-white/90">
                                    <Link href="/news" className="flex items-center gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Newsroom
                                    </Link>
                                </Button>
                                <Badge className="bg-primary text-primary-foreground tracking-[0.18em] uppercase">
                                    <TagIcon className="w-3.5 h-3.5" />
                                    {categoryLabel}
                                </Badge>
                            </div>

                            <div className="space-y-5 max-w-3xl">
                                <Badge variant="secondary" className="tracking-[0.3em]">
                                    DCCPB Bulletin
                                </Badge>
                                <h1 className="text-[30px] sm:text-[42px] lg:text-[54px] leading-tight font-serif">
                                    {post.title}
                                </h1>
                                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                    {summaryText}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {publishedDate}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {authorName}
                                </span>
                            </div>
                        </div>
                    </section>

                    <div className="w-full max-w-[820px] mx-auto flex flex-col gap-8">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-[#4A403B]">
                                {tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(55,50,47,0.18)] bg-[#FCFAF7]"
                                    >
                                        <Hash className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <article className="prose prose-neutral prose-lg max-w-none text-[#433C38]">
                            {Array.isArray(post.content) && post.content.length > 0 ? (
                                <PortableText value={post.content} components={portableTextComponents} />
                            ) : (
                                <p>Details for this announcement will be available soon.</p>
                            )}
                        </article>

                        <div className="border-t border-[rgba(55,50,47,0.12)] pt-6 flex flex-col gap-4">
                            <h3 className="text-sm font-semibold text-[#6B635D] uppercase tracking-[0.3em]">
                                Share this story
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {shareLinks.map(share => (
                                    <a
                                        key={share.label}
                                        href={share.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(55,50,47,0.2)] text-sm font-semibold text-[#37322F] hover:bg-[#37322F] hover:text-white transition-colors"
                                    >
                                        {share.label}
                                        <span aria-hidden>↗</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterSection settings={siteSettings} />
        </>
    );
}
