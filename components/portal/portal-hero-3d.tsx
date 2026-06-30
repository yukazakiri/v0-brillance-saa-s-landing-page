"use client"

import { useRef } from "react"
import Link from "next/link"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRight, ExternalLink } from "lucide-react"

import { portalDemo } from "@/lib/portal/demo-data"
import { Button } from "@/components/ui/button"

import CountUp from "./count-up"
import DeviceFrame from "./device-frame"
import MockupDashboard from "./mockup-dashboard"
import MockupFaculty from "./mockup-faculty"
import MockupLms from "./mockup-lms"

gsap.registerPlugin(useGSAP)

export default function PortalHero3D() {
  const { hero } = portalDemo
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      gsap.set(".hero-kicker, .hero-title, .hero-copy, .hero-cta, .hero-stat", {
        autoAlpha: reduced ? 1 : 0,
        y: reduced ? 0 : 24,
      })
      gsap.set(".hero-mockup", {
        autoAlpha: reduced ? 1 : 0,
        y: reduced ? 0 : 36,
        rotateX: reduced ? 0 : 10,
        rotateY: reduced ? 0 : -8,
        transformPerspective: 1400,
      })
      gsap.set(".hero-orbit", {
        autoAlpha: reduced ? 1 : 0,
        scale: reduced ? 1 : 0.92,
      })

      if (reduced) return

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.to(".hero-kicker", { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(".hero-title", { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.25")
        .to(".hero-copy", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.2")
        .to(".hero-mockup", { autoAlpha: 1, y: 0, rotateX: 0, rotateY: 0, duration: 0.85 }, "-=0.25")
        .to(".hero-orbit", { autoAlpha: 1, scale: 1, duration: 0.55, stagger: 0.08 }, "-=0.45")
        .to(".hero-stat", { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.2")

      gsap.to(".hero-mockup", {
        y: -10,
        rotateY: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
      gsap.to(".hero-orbit-left", {
        y: 12,
        rotate: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
      gsap.to(".hero-orbit-right", {
        y: -14,
        rotate: 8,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    },
    { scope: rootRef },
  )

  return (
    <section
      id="portal-hero"
      ref={rootRef}
      className="relative isolate overflow-hidden border-x border-y border-[rgba(26,58,82,0.12)] bg-background pt-40 text-[#1a3a52] md:pt-48"
    >
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="absolute -right-28 top-16 h-80 w-80 rounded-full bg-[#C79244]/20 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#1a3a52]/10 blur-3xl" />
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-12 border-r border-[rgba(26,58,82,0.12)] z-10 overflow-hidden">
        <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]" />
          ))}
        </div>
      </div>
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-12 border-l border-[rgba(26,58,82,0.12)] z-10 overflow-hidden">
        <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(26,58,82,0.08)] outline-offset-[-0.25px]" />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(26,58,82,0.1)] bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#605A57] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C79244]" />
            {hero.eyebrow}
          </div>
          <h1 className="hero-title text-balance font-serif text-5xl font-semibold tracking-tight text-[#1a3a52] sm:text-6xl lg:text-7xl">
            {hero.heading}
          </h1>
          <p className="hero-copy mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-[#605A57] md:text-xl">
            {hero.subheading}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="hero-cta portal-breathe h-14 rounded-md bg-[#1a3a52] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg hover:bg-[#143047]">
              <Link href={hero.primaryCta.href} target="_blank">
                {hero.primaryCta.label}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hero-cta h-14 rounded-md border-[rgba(26,58,82,0.2)] bg-white/50 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1a3a52] hover:bg-white/80">
              <Link href={hero.secondaryCta.href} target="_blank">
                {hero.secondaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="perspective-distant relative mx-auto mt-16 max-w-6xl pb-24">
          <div className="hero-orbit hero-orbit-left absolute left-0 top-12 hidden w-48 -rotate-12 opacity-70 lg:block">
            <DeviceFrame variant="phone"><MockupDashboard /></DeviceFrame>
          </div>
          <div className="hero-orbit hero-orbit-right absolute right-0 top-20 hidden w-64 rotate-12 opacity-80 lg:block">
            <DeviceFrame variant="tablet"><MockupLms /></DeviceFrame>
          </div>
          <div className="hero-mockup motion-3d relative z-10 mx-auto max-w-4xl">
            <DeviceFrame>
              <MockupFaculty />
            </DeviceFrame>
          </div>
        </div>

        <div className="grid border-t border-[rgba(26,58,82,0.12)] bg-background/80 py-8 sm:grid-cols-3">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="hero-stat border-[rgba(26,58,82,0.12)] py-4 text-center sm:border-l first:sm:border-l-0">
              <div className="font-serif text-4xl text-[#C79244] md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#605A57]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
