"use client";

import { useRef, useState, type ReactNode } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { portalDemo, type MockupKey } from "@/lib/portal/demo-data";
import { useReducedMotion } from "@/lib/portal/use-reduced-motion";
import { cn } from "@/lib/utils";

import AnnotationPin from "./annotation-pin";
import DeviceFrame from "./device-frame";
import MockupDashboard from "./mockup-dashboard";
import MockupFaculty from "./mockup-faculty";
import MockupLms from "./mockup-lms";
import PortalMockup from "./portal-mockup";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TweenVars = gsap.TweenVars;

type ShowcaseSceneId = "student" | "lms" | "faculty" | "hub";

interface ShowcaseScene {
  id: ShowcaseSceneId;
  kicker: string;
  title: string;
  description: string;
  mockup: MockupKey;
  bullets: string[];
}

const scenes: ShowcaseScene[] = [
  {
    id: "student",
    kicker: "Student Command Desk",
    title: "A calm home base for every learner.",
    description:
      "Grades, schedules, balances, messages, and course work live together so students understand their day before they step on campus.",
    mockup: "dashboard",
    bullets: [
      "Live GWA and grade trends",
      "Today’s classes and rooms",
      "Fees, receipts, and reminders",
    ],
  },
  {
    id: "lms",
    kicker: "Learning Flow",
    title: "Courses stay connected to the portal.",
    description:
      "Assignments, deadlines, modules, and recordings are placed beside academic records, giving students one continuous learning journey.",
    mockup: "lms",
    bullets: [
      "Module progress tracking",
      "Deadline urgency cards",
      "Lecture recordings in context",
    ],
  },
  {
    id: "faculty",
    kicker: "Faculty Workspace",
    title: "Faculty get signal, not noise.",
    description:
      "Gradebook tools, class analytics, and risk signals help instructors intervene earlier while spending less time on manual work.",
    mockup: "faculty",
    bullets: [
      "Bulk grade entry",
      "At-risk learner flags",
      "Class-wide performance pulse",
    ],
  },
  {
    id: "hub",
    kicker: "Connected Hub",
    title: "One academic system, three connected views.",
    description:
      "DCCPHub works best when student, LMS, and faculty tools operate as one campus layer instead of separate destinations.",
    mockup: "dashboard",
    bullets: [
      "Shared source of truth",
      "Role-aware experience",
      "One path from enrollment to completion",
    ],
  },
];

const sceneMap = Object.fromEntries(
  scenes.map((scene) => [scene.id, scene]),
) as Record<ShowcaseSceneId, ShowcaseScene>;

export default function ShowcaseExperience() {
  const reduced = useReducedMotion();
  const [activeScene, setActiveScene] = useState<ShowcaseSceneId>("student");
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = sceneMap[activeScene];

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from(".showcase-heading > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".workbench-shell", {
        autoAlpha: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".workbench-shell",
          start: "top 78%",
          once: true,
        },
      });

      ScrollTrigger.batch(".showcase-step", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            x: -16,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (reduced) return;

      const stage = stageRef.current;
      if (!stage) return;

      const rotateX = gsap.quickTo(".workbench-tilt", "rotateX", {
        duration: 0.35,
        ease: "power3.out",
      });
      const rotateY = gsap.quickTo(".workbench-tilt", "rotateY", {
        duration: 0.35,
        ease: "power3.out",
      });

      const onPointerMove = (event: PointerEvent) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY(x * 9);
        rotateX(y * -7);
      };

      const onPointerLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      stage.addEventListener("pointermove", onPointerMove);
      stage.addEventListener("pointerleave", onPointerLeave);

      return () => {
        stage.removeEventListener("pointermove", onPointerMove);
        stage.removeEventListener("pointerleave", onPointerLeave);
      };
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      const positions: Record<ShowcaseSceneId, Record<string, TweenVars>> = {
        student: {
          ".product-student": {
            xPercent: -5,
            yPercent: -4,
            scale: 1.03,
            rotateY: -2,
            rotateX: 0,
            zIndex: 40,
            opacity: 1,
          },
          ".product-lms": {
            xPercent: 36,
            yPercent: 28,
            scale: 0.72,
            rotateY: 14,
            rotateX: 4,
            zIndex: 20,
            opacity: 0.72,
          },
          ".product-faculty": {
            xPercent: 42,
            yPercent: -12,
            scale: 0.68,
            rotateY: 18,
            rotateX: 3,
            zIndex: 10,
            opacity: 0.58,
          },
        },
        lms: {
          ".product-student": {
            xPercent: -42,
            yPercent: 26,
            scale: 0.72,
            rotateY: -16,
            rotateX: 5,
            zIndex: 12,
            opacity: 0.62,
          },
          ".product-lms": {
            xPercent: -8,
            yPercent: 0,
            scale: 1.04,
            rotateY: 0,
            rotateX: 0,
            zIndex: 45,
            opacity: 1,
          },
          ".product-faculty": {
            xPercent: 42,
            yPercent: 22,
            scale: 0.72,
            rotateY: 15,
            rotateX: 4,
            zIndex: 18,
            opacity: 0.62,
          },
        },
        faculty: {
          ".product-student": {
            xPercent: -48,
            yPercent: 16,
            scale: 0.68,
            rotateY: -18,
            rotateX: 4,
            zIndex: 10,
            opacity: 0.56,
          },
          ".product-lms": {
            xPercent: 34,
            yPercent: 30,
            scale: 0.7,
            rotateY: 16,
            rotateX: 4,
            zIndex: 18,
            opacity: 0.66,
          },
          ".product-faculty": {
            xPercent: -2,
            yPercent: -4,
            scale: 1.05,
            rotateY: 0,
            rotateX: 0,
            zIndex: 45,
            opacity: 1,
          },
        },
        hub: {
          ".product-student": {
            xPercent: -40,
            yPercent: -2,
            scale: 0.82,
            rotateY: -8,
            rotateX: 2,
            zIndex: 28,
            opacity: 0.88,
          },
          ".product-lms": {
            xPercent: -1,
            yPercent: 26,
            scale: 0.78,
            rotateY: 0,
            rotateX: 4,
            zIndex: 36,
            opacity: 0.9,
          },
          ".product-faculty": {
            xPercent: 38,
            yPercent: -2,
            scale: 0.82,
            rotateY: 8,
            rotateX: 2,
            zIndex: 28,
            opacity: 0.88,
          },
        },
      };

      Object.entries(positions[activeScene]).forEach(([target, vars]) => {
        gsap.to(target, {
          ...vars,
          duration: 0.75,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      });

      gsap.fromTo(
        ".inspector-content > *",
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    },
    { scope: rootRef, dependencies: [activeScene], revertOnUpdate: false },
  );

  return (
    <section
      id="showcase"
      ref={rootRef}
      className="relative overflow-hidden border-y border-[rgba(26,58,82,0.12)] bg-background py-20 text-[#1a3a52] md:py-28"
    >
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C79244]/20 blur-3xl" />

      <div className="showcase-heading relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C79244]">
          Interactive showcase
        </p>
        <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#1a3a52] md:text-6xl">
          Explore DCCPHub like a product console.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#605A57]">
          Select a role or workflow and watch the product rearrange around what
          matters most. The interface is no longer just shown; it responds.
        </p>
      </div>

      <div className="relative z-10 px-4 pt-12 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[rgba(26,58,82,0.12)] bg-white/80 p-4 shadow-xl">
          <div className="mb-5 grid grid-cols-2 gap-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveScene(scene.id)}
                className={cn(
                  "rounded-xl border px-3 py-2 text-left text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                  activeScene === scene.id
                    ? "border-[#1a3a52] bg-[#1a3a52] text-white"
                    : "border-[rgba(26,58,82,0.12)] bg-[#F7F5F3] text-[#605A57]",
                )}
              >
                {scene.kicker}
              </button>
            ))}
          </div>
          <DeviceFrame>
            <div className="aspect-[16/10]">
              <PortalMockup type={active.mockup} />
            </div>
          </DeviceFrame>
          <div className="mt-5 rounded-2xl bg-[#F7F5F3] p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C79244]">
              {active.kicker}
            </p>
            <h3 className="mt-2 font-serif text-3xl text-[#1a3a52]">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#605A57]">
              {active.description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden px-6 pt-14 lg:block lg:px-8">
        <div className="workbench-shell mx-auto grid max-w-7xl grid-cols-[260px_minmax(0,1fr)_320px] gap-6 rounded-[2rem] border border-[rgba(26,58,82,0.12)] bg-white/70 p-6 shadow-2xl backdrop-blur">
          <aside className="space-y-3">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveScene(scene.id)}
                className={cn(
                  "showcase-step group w-full rounded-2xl border p-4 text-left transition-all",
                  activeScene === scene.id
                    ? "border-[#1a3a52] bg-[#1a3a52] text-white shadow-navy-deep"
                    : "border-[rgba(26,58,82,0.12)] bg-[#F7F5F3] text-[#1a3a52] hover:border-[#C79244]/60 hover:bg-white",
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.22em]",
                    activeScene === scene.id
                      ? "text-[#C79244]"
                      : "text-[#605A57]",
                  )}
                >
                  0{index + 1}
                </span>
                <span className="mt-2 block font-serif text-2xl leading-tight">
                  {scene.kicker}
                </span>
              </button>
            ))}
          </aside>

          <div
            ref={stageRef}
            className="perspective-distant relative min-h-[590px] overflow-hidden rounded-[1.5rem] border border-[rgba(26,58,82,0.12)] bg-[#F7F5F3]"
          >
            <div className="absolute inset-0 blueprint-grid opacity-50" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C79244]/20 blur-3xl" />
            <div className="workbench-tilt absolute inset-0 preserve-3d">
              <ProductCard className="product-student left-[12%] top-[12%] w-[68%]">
                <DeviceFrame>
                  <div className="relative aspect-[16/10]">
                    <MockupDashboard />
                    {activeScene === "student" &&
                      portalDemo.features[0]!.annotations.map((pin, idx) => (
                        <AnnotationPin
                          key={pin.id}
                          index={idx + 1}
                          label={pin.label}
                          x={pin.x}
                          y={pin.y}
                        />
                      ))}
                  </div>
                </DeviceFrame>
              </ProductCard>

              <ProductCard className="product-lms left-[24%] top-[20%] w-[56%]">
                <DeviceFrame variant="tablet">
                  <div className="relative h-full w-full">
                    <MockupLms />
                    {activeScene === "lms" &&
                      portalDemo.features[2]!.annotations.slice(0, 2).map(
                        (pin, idx) => (
                          <AnnotationPin
                            key={pin.id}
                            index={idx + 1}
                            label={pin.label}
                            x={pin.x}
                            y={pin.y}
                          />
                        ),
                      )}
                  </div>
                </DeviceFrame>
              </ProductCard>

              <ProductCard className="product-faculty left-[18%] top-[12%] w-[64%]">
                <DeviceFrame>
                  <div className="relative aspect-[16/10]">
                    <MockupFaculty />
                    {activeScene === "faculty" &&
                      portalDemo.features[3]!.annotations.map((pin, idx) => (
                        <AnnotationPin
                          key={pin.id}
                          index={idx + 1}
                          label={pin.label}
                          x={pin.x}
                          y={pin.y}
                        />
                      ))}
                  </div>
                </DeviceFrame>
              </ProductCard>
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-[rgba(26,58,82,0.12)] bg-white p-6 shadow-sm">
            <div className="inspector-content">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C79244]">
                {active.kicker}
              </p>
              <h3 className="mt-3 font-serif text-4xl leading-tight text-[#1a3a52]">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#605A57]">
                {active.description}
              </p>
              <div className="mt-8 space-y-3">
                {active.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-xl bg-[#F7F5F3] p-3"
                  >
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#C79244]" />
                    <span className="text-sm leading-6 text-[#1a3a52]">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-[#1a3a52] p-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                  Interaction tip
                </p>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Move your pointer over the workbench and choose another
                  workflow to recompose the interface.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("absolute origin-center will-change-transform", className)}
    >
      {children}
    </div>
  );
}
