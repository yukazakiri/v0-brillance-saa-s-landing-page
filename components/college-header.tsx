"use client";

import Link from "next/link";
import type { Settings } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

interface CollegeHeaderProps {
    settings: Settings;
}

export default function CollegeHeader({ settings }: CollegeHeaderProps) {
    // Extract logo URL, fallback to default
    const logoUrl = settings.logos?.icon
        ? getImageUrl(settings.logos.icon, 192, 192)
        : "/android-chrome-192x192.png";

    const logoAlt = settings.logos?.icon?.alt || `${settings.shortTitle || settings.siteTitle} Logo`;

    return (
        <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
            <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[900px] lg:w-[900px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-card backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
                <div className="flex justify-center items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 sm:gap-3 group hover:opacity-90 transition-opacity"
                    >
                        <img
                            src={logoUrl || "/android-chrome-192x192.png"}
                            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 drop-shadow-lg rounded-full bg-card border border-primary"
                            alt={logoAlt}
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="font-extrabold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight text-primary drop-shadow-[1px_1px_0px_oklch(0.5_0_0/0.15)]">
                                {settings.shortTitle || "Data Center College"}
                            </span>
                            <span
                                className="hidden sm:block italic text-[10px] sm:text-xs md:text-sm font-semibold text-foreground -mt-1"
                                style={{
                                    fontFamily: "'Brush Script MT', cursive",
                                    textShadow: "0.5px 0.5px 0 oklch(0.5 0 0 / 0.1)",
                                }}
                            >
                                of the Philippines
                                <span
                                    className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground font-bold ml-0.5"
                                    style={{
                                        textShadow: "0.5px 0.5px 0 #fff, 0.5px 0.5px 1px oklch(0.5 0 0 / 0.15)",
                                    }}
                                >
                                    of Baguio City, Inc.
                                </span>
                            </span>
                        </div>
                    </Link>
                    <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 flex justify-start items-start hidden sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
                        <Link
                            href="/#about"
                            className="flex justify-start items-center hover:text-primary transition-colors"
                        >
                            <div className="flex flex-col justify-center text-muted-foreground text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                                About
                            </div>
                        </Link>
                        <Link
                            href="/#programs"
                            className="flex justify-start items-center hover:text-primary transition-colors"
                        >
                            <div className="flex flex-col justify-center text-muted-foreground text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                                Programs
                            </div>
                        </Link>
                        <Link
                            href="/#admissions"
                            className="flex justify-start items-center hover:text-primary transition-colors"
                        >
                            <div className="flex flex-col justify-center text-muted-foreground text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                                Admissions
                            </div>
                        </Link>
                        <Link
                            href="/news"
                            className="flex justify-start items-center hover:text-primary transition-colors"
                        >
                            <div className="flex flex-col justify-center text-muted-foreground text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                                News
                            </div>
                        </Link>
                        <Link
                            href="/#campus-life"
                            className="flex justify-start items-center hover:text-primary transition-colors"
                        >
                            <div className="flex flex-col justify-center text-muted-foreground text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                                Campus Life
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="h-6 sm:h-7 md:h-8 flex justify-start items-start gap-2 sm:gap-3">
                    <Link
                        href="/#contact"
                        className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-primary shadow-[0px_1px_2px_oklch(0_0_0/0.12)] overflow-hidden rounded-full flex justify-center items-center hover:bg-primary/90 transition-colors"
                    >
                        <div className="flex flex-col justify-center text-primary-foreground text-xs md:text-[13px] font-medium leading-5 font-sans">
                            Apply Now
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
