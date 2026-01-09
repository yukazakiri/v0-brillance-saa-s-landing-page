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
        <footer className="w-full relative overflow-hidden bg-gradient-to-b from-transparent to-primary/20">
            {/* Decorative Pattern Overlay - Scaled down for footer */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none opacity-[0.03]">
                <img
                    src="/mask-group-pattern.svg"
                    alt=""
                    className="w-[1000px] h-auto mix-blend-multiply"
                    style={{
                        filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Section - Takes up 4 columns on large screens */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-start gap-3 group w-fit">
                            <Image
                                src={logoUrl}
                                className="h-12 w-12 rounded-full bg-white border border-stone-200 shadow-sm mt-1"
                                alt={logoAlt}
                                width={48}
                                height={48}
                            />
                            <div className="flex flex-col">
                                {/* Main Title */}
                                <span className="text-primary text-xl font-bold leading-tight font-serif tracking-tight">
                                    Data Center College
                                </span>

                                {/* Subtitle Lines */}
                                <span
                                    className="text-foreground/80 text-lg font-semibold leading-none italic -mt-1"
                                    style={{
                                        fontFamily: "'Brush Script MT', cursive",
                                    }}
                                >
                                    of The Philippines
                                </span>
                                <span className="text-muted-foreground text-[10px] font-medium leading-tight tracking-wide uppercase mt-0.5">
                                    of Baguio City, Inc.
                                </span>
                            </div>
                        </Link>

                        <div className="space-y-4 pl-1">
                            {primaryAddress && (
                                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
                                    <span className="leading-relaxed max-w-xs">{primaryAddress.address}</span>
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                {primaryContact?.phone && (
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4 shrink-0 text-primary/70" />
                                        <a
                                            href={`tel:${primaryContact.phone}`}
                                            className="hover:text-primary transition-colors"
                                        >
                                            {primaryContact.phone}
                                        </a>
                                    </div>
                                )}
                                {primaryContact?.email && (
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Mail className="w-4 h-4 shrink-0 text-primary/70" />
                                        <a
                                            href={`mailto:${primaryContact.email}`}
                                            className="hover:text-primary transition-colors"
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
                            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                                Programs
                            </h4>
                            <ul className="space-y-2.5">
                                <ul className="space-y-2.5">
                                    <li>
                                        <Link
                                            href="/programs/bsit"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            BS Information Technology
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/programs/bsba"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            BS Business Administration
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/programs/bshrm"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            BS Hotel & Restaurant Mgt.
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/courses"
                                            className="text-sm text-primary font-medium hover:underline flex items-center gap-1 mt-2"
                                        >
                                            View All Programs &rarr;
                                        </Link>
                                    </li>
                                </ul>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/news"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        News & Updates
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admissions"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Admissions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/portal"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Student Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/careers"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal / Resources */}
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                                Resources
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Contact Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
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
                                className="text-muted-foreground hover:text-primary hover:bg-primary/10 p-2 rounded-full transition-all"
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
