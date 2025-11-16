"use client";

import type { Settings } from "@/lib/sanity/types";
import { useEffect, useState } from "react";

interface CollegeHeroProps {
    settings: Settings;
}

export default function CollegeHero({ settings }: CollegeHeroProps) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const campusImages = [
        {
            src: "/hero-images/maincampus.png",
            title: "Main Campus - Baguio City",
            subtitle: "Modern Learning Environment in the City of Pines",
        },
        {
            src: "/hero-images/old-building.png",
            title: "Heritage Building",
            subtitle: "Excellence in Education Since 2011",
        },
        {
            src: "/hero-images/image.png",
            title: "World-Class Facilities",
            subtitle: "State-of-the-Art IT & Business Labs",
        },
    ];

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % campusImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isHovered, campusImages.length]);

    return (
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-[160px] pb-8 sm:pb-12 md:pb-16 lg:pb-20 flex flex-col justify-start items-center px-2 sm:px-4 md:px-8 lg:px-0 w-full relative overflow-hidden">
            {/* Background Campus Image with Fade */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-[1400px] z-0 pointer-events-none">
                <div className="relative w-full h-full">
                    <img
                        src="/hero-images/maincampus.png"
                        alt="Data Center College Campus Background"
                        className="w-full h-full object-cover opacity-15"
                        style={{
                            maskImage:
                                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
                        }}
                    />
                </div>
            </div>

            {/* Decorative Pattern Overlay */}
            <div className="absolute top-[180px] sm:top-[200px] md:top-[220px] lg:top-[240px] left-1/2 transform -translate-x-1/2 z-[1] pointer-events-none">
                <img
                    src="/mask-group-pattern.svg"
                    alt=""
                    className="w-[936px] sm:w-[1404px] md:w-[2106px] lg:w-[2808px] h-auto opacity-15 sm:opacity-20 md:opacity-25 mix-blend-multiply"
                    style={{
                        filter: "hue-rotate(15deg) saturate(0.7) brightness(1.2)",
                    }}
                />
            </div>

            {/* Main Content Container */}
            <div className="w-full max-w-[1060px] lg:w-[1060px] relative z-10 flex flex-col items-center">
                {/* Hero Text Content */}
                <div className="w-full flex flex-col items-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                    {/* Animated Badge */}
                    <div className="mb-5 sm:mb-6 md:mb-7 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
                        <div className="px-[14px] py-[6px] bg-card/90 backdrop-blur-sm shadow-[0px_0px_0px_4px_oklch(0.5_0_0/0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border hover:shadow-md transition-shadow duration-300">
                            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="6"
                                        cy="6"
                                        r="2"
                                        fill="currentColor"
                                        className="animate-pulse text-foreground"
                                    />
                                </svg>
                            </div>
                            <div className="text-center flex justify-center flex-col text-foreground text-xs font-semibold leading-3 font-sans">
                                Est. 2011 • Baguio City
                            </div>
                        </div>
                    </div>

                    {/* Main Headline with Staggered Animation */}
                    <div className="w-full max-w-[900px] mb-6 sm:mb-7 md:mb-8">
                        <h1 className="text-center font-serif px-2 tracking-tight">
                            {/* Main Title */}
                            <span className="block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                                <span className="text-primary text-[32px] xs:text-[42px] sm:text-[56px] md:text-[68px] lg:text-[80px] font-bold leading-[1.05] block">
                                    Data Center College
                                </span>
                            </span>

                            {/* Subtitle Lines with elegant styling */}
                            <span className="block opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards] mt-2 sm:mt-3 md:mt-4">
                                <span
                                    className="text-foreground/70 text-[18px] xs:text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-semibold leading-[1.2] italic inline-block"
                                    style={{
                                        fontFamily: "'Brush Script MT', cursive",
                                    }}
                                >
                                    of The Philippines
                                    {/* Location */}
                                    <span className="ml-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
                                        <span className="text-muted-foreground text-[14px] xs:text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-[1.3] tracking-wide">
                                            of Baguio City, Inc.
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p className="w-full max-w-[620px] text-center text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-[1.6] sm:leading-[1.7] font-sans px-4 sm:px-6 md:px-0 font-normal mb-8 sm:mb-10 md:mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]">
                        {settings.tagline ||
                            "Empowering the next generation of IT professionals, business leaders, and innovators in the heart of Baguio City"}
                    </p>

                    {/* CTA Buttons with Animation */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.9s_forwards]">
                        <a
                            href="/#contact"
                            className="group h-12 sm:h-13 md:h-[54px] px-8 sm:px-10 md:px-12 lg:px-14 py-2 sm:py-[6px] relative bg-primary shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset,0px_4px_16px_oklch(0.5_0_0/0.2)] overflow-hidden rounded-full flex justify-center items-center hover:bg-primary/90 hover:shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset,0px_8px_28px_oklch(0.5_0_0/0.3)] transition-all duration-300 cursor-pointer hover:scale-105"
                        >
                            <div className="w-full h-full absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.12)] to-[rgba(0,0,0,0.12)] mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="flex items-center gap-2.5 text-primary-foreground text-sm sm:text-base md:text-[16px] font-bold leading-5 font-sans relative z-10">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="group-hover:scale-110 transition-transform duration-300"
                                >
                                    <path
                                        d="M8 2v12M2 8h12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span>Apply for Admission</span>
                            </div>
                        </a>

                        <a
                            href="/#programs"
                            className="h-12 sm:h-13 md:h-[54px] px-8 sm:px-10 md:px-12 py-2 sm:py-[6px] bg-card shadow-[0px_2px_8px_oklch(0.5_0_0/0.08)] overflow-hidden rounded-full flex justify-center items-center hover:bg-secondary hover:shadow-[0px_6px_20px_oklch(0.5_0_0/0.15)] transition-all duration-300 cursor-pointer border-2 border-border hover:border-primary/30 hover:scale-105 group"
                        >
                            <div className="flex items-center gap-2 text-foreground text-sm sm:text-base md:text-[16px] font-semibold leading-5 font-sans">
                                <span>Explore Programs</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                >
                                    <path
                                        d="M6 12L10 8L6 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Interactive Image Carousel */}
                <div
                    className="w-full max-w-[960px] lg:w-[960px] mt-4 sm:mt-6 md:mt-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Main Carousel Container */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-primary to-primary/80 shadow-[0px_0px_0px_1px_oklch(0_0_0/0.08),0px_8px_32px_oklch(0.5_0_0/0.12)] overflow-hidden rounded-[10px] sm:rounded-[12px] lg:rounded-[16px] group">
                        {/* Image Slides */}
                        {campusImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                    activeSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                                }`}
                            >
                                {/* Base Image */}
                                <img src={image.src} alt={image.title} className="w-full h-full object-cover" />

                                {/* Vignette Effect - Dark edges */}
                                <div
                                    className="absolute inset-0 bg-radial-gradient"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
                                    }}
                                ></div>

                                {/* Spotlight Effect - Subtle light from top */}
                                <div
                                    className="absolute inset-0 bg-gradient-radial"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                                    }}
                                ></div>

                                {/* Color Overlay - Warm tint */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-900/10 mix-blend-overlay"></div>

                                {/* Bottom Gradient - Text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                {/* Shimmer Effect on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out"></div>
                                </div>

                                {/* Top Edge Fade */}
                                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent"></div>

                                {/* Film Grain Effect */}
                                <div
                                    className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
                                        backgroundSize: "cover",
                                    }}
                                ></div>

                                {/* Text Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12">
                                    <div
                                        className={`transition-all duration-500 delay-200 ${
                                            activeSlide === index
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4"
                                        }`}
                                    >
                                        {/* Text glow effect */}
                                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-serif mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                            {image.title}
                                        </h3>
                                        <p className="text-white/95 text-sm sm:text-base md:text-lg font-normal font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                                            {image.subtitle}
                                        </p>

                                        {/* Decorative line */}
                                        <div className="mt-4 w-16 h-1 bg-gradient-to-r from-white/80 to-transparent rounded-full"></div>
                                    </div>
                                </div>

                                {/* Corner Accent - Top Left */}
                                <div className="absolute top-0 left-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gradient-to-br from-white/5 to-transparent rounded-br-full opacity-50"></div>

                                {/* Corner Accent - Bottom Right */}
                                <div className="absolute bottom-0 right-0 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full opacity-50"></div>
                            </div>
                        ))}

                        {/* Navigation Dots */}
                        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 md:right-10 lg:right-12 flex gap-2 z-10">
                            {campusImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeSlide === index
                                            ? "w-8 bg-white shadow-lg"
                                            : "w-2 bg-white/50 hover:bg-white/75"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Arrow Navigation */}
                        <button
                            onClick={() =>
                                setActiveSlide(prev => (prev - 1 + campusImages.length) % campusImages.length)
                            }
                            className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full items-center justify-center transition-all duration-300 z-10 group"
                            aria-label="Previous slide"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:-translate-x-0.5 transition-transform duration-300"
                            >
                                <path
                                    d="M12 15L7 10L12 5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => setActiveSlide(prev => (prev + 1) % campusImages.length)}
                            className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full items-center justify-center transition-all duration-300 z-10 group"
                            aria-label="Next slide"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group-hover:translate-x-0.5 transition-transform duration-300"
                            >
                                <path
                                    d="M8 15L13 10L8 5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
