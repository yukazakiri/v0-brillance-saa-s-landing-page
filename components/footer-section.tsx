import { getImageUrl } from "@/lib/sanity/image";
import type { Settings } from "@/lib/sanity/types";
import {
    ExternalLink,
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
    Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FooterSectionProps {
    settings: Settings;
}

export default function FooterSection({ settings }: FooterSectionProps) {
    const currentYear = new Date().getFullYear();
    const socialLinks = settings.socialLinks || [];

    // Extract primary logo URL
    const logoUrl =
        getImageUrl(settings.logos?.primary, 192, 192) ||
        settings.logos?.primary?.externalUrl ||
        "/android-chrome-192x192.png";

    const logoAlt = settings.logos?.primary?.alt || `${settings.shortTitle || settings.siteTitle} Logo`;

    // Helper to get social icon
    const getSocialIcon = (platform: string) => {
        const p = platform.toLowerCase();
        if (p.includes("facebook")) return <Facebook className="w-4 h-4" />;
        if (p.includes("twitter") || p.includes("x")) return <Twitter className="w-4 h-4" />;
        if (p.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
        if (p.includes("github")) return <Github className="w-4 h-4" />;
        if (p.includes("instagram")) return <Instagram className="w-4 h-4" />;
        if (p.includes("youtube")) return <Youtube className="w-4 h-4" />;
        return <ExternalLink className="w-4 h-4" />;
    };

    // Extract contact info
    const primaryAddress = settings.addresses?.[0];
    const primaryContact = settings.contactDirectory?.[0];

    return (
        <footer className="w-full ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Section - Takes up 4 columns on large screens */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <Image
                                src={logoUrl}
                                className="h-10 w-10 rounded-full bg-white border border-stone-200 shadow-sm"
                                alt={logoAlt}
                                width={40}
                                height={40}
                            />
                            <div className="flex flex-col">
                                <span className="font-bold text-[#49423D] text-lg leading-tight">
                                    {settings.shortTitle || "Data Center College"}
                                </span>
                                <span className="text-xs text-stone-500 font-medium">
                                    {settings.tagline || "Excellence in Education"}
                                </span>
                            </div>
                        </Link>

                        <div className="space-y-4">
                            {primaryAddress && (
                                <div className="flex items-start gap-3 text-sm text-stone-500">
                                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span className="leading-relaxed max-w-xs">{primaryAddress.address}</span>
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                {primaryContact?.phone && (
                                    <div className="flex items-center gap-3 text-sm text-stone-500">
                                        <Phone className="w-4 h-4 shrink-0" />
                                        <a
                                            href={`tel:${primaryContact.phone}`}
                                            className="hover:text-[#49423D] transition-colors"
                                        >
                                            {primaryContact.phone}
                                        </a>
                                    </div>
                                )}
                                {primaryContact?.email && (
                                    <div className="flex items-center gap-3 text-sm text-stone-500">
                                        <Mail className="w-4 h-4 shrink-0" />
                                        <a
                                            href={`mailto:${primaryContact.email}`}
                                            className="hover:text-[#49423D] transition-colors"
                                        >
                                            {primaryContact.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Links Section - Takes up 8 columns on large screens */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Programs */}
                        <div>
                            <h4 className="text-sm font-semibold text-[#49423D] mb-4">Programs</h4>
                            <ul className="space-y-2.5">
                                {settings.institutionProfile?.chedPrograms?.slice(0, 5).map((program, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href="/courses"
                                            className="text-sm text-stone-500 hover:text-[#49423D] transition-colors line-clamp-1"
                                        >
                                            {program.name}
                                        </Link>
                                    </li>
                                ))}
                                {(!settings.institutionProfile?.chedPrograms ||
                                    settings.institutionProfile.chedPrograms.length === 0) && (
                                    <>
                                        <li>
                                            <Link
                                                href="/courses"
                                                className="text-sm text-stone-500 hover:text-[#49423D]"
                                            >
                                                College Courses
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/courses"
                                                className="text-sm text-stone-500 hover:text-[#49423D]"
                                            >
                                                Senior High School
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/courses"
                                                className="text-sm text-stone-500 hover:text-[#49423D]"
                                            >
                                                TVET Programs
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-[#49423D] mb-4">Quick Links</h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/news"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        News & Updates
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admissions"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        Admissions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/portal"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        Student Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/careers"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal / Resources */}
                        <div>
                            <h4 className="text-sm font-semibold text-[#49423D] mb-4">Resources</h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm text-stone-500 hover:text-[#49423D] transition-colors"
                                    >
                                        Contact Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-stone-400">
                        &copy; {currentYear} {settings.siteTitle || "Data Center College"}. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-400 hover:text-[#49423D] hover:bg-stone-100 p-2 rounded-full transition-all"
                                aria-label={`Visit our ${link.platform}`}
                            >
                                {getSocialIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
