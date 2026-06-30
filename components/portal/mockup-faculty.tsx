"use client"

import type { ReactNode } from "react"

import { BarChart, Bell, ClipboardCheck, Users } from "lucide-react"

/**
 * Illustrative faculty gradebook mockup. Pure TSX/CSS — no screenshot needed.
 * Shows a class roster, grade entry cells, at-risk flags, and a distribution
 * chart so the analytics feature reads instantly.
 */
export default function MockupFaculty() {
  return (
    <div className="flex h-full w-full bg-[#F7F5F3] text-[#1a3a52]">
      {/* Sidebar */}
      <aside className="flex w-[24%] flex-col gap-1 bg-[#1a3a52] p-2 text-white/80">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <div className="h-4 w-4 rounded-sm bg-[#C79244]" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white">
            DCCPHub
          </span>
        </div>
        <NavRow icon={<BarChart className="h-3 w-3" />} label="Overview" active />
        <NavRow icon={<ClipboardCheck className="h-3 w-3" />} label="Gradebook" />
        <NavRow icon={<Users className="h-3 w-3" />} label="Rosters" />
        <NavRow icon={<Bell className="h-3 w-3" />} label="Alerts" />
        <div className="mt-auto rounded-md bg-white/5 p-1.5">
          <div className="h-4 w-4 rounded-full bg-[#C79244]" />
          <div className="mt-1 text-[7px] font-semibold text-white">Prof. Aquino</div>
          <div className="text-[6px] text-white/50">Computer Studies</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col gap-2 overflow-hidden p-2.5">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold">CS 101 — Intro to Programming</div>
            <div className="text-[8px] text-[#605A57]">42 students · Midterm period</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[#e06c5a]/15 px-1.5 py-0.5 text-[8px] font-bold text-[#c0463a]">
              3 at-risk
            </span>
            <span className="rounded-full bg-[#1a3a52] px-1.5 py-0.5 text-[8px] font-bold text-white">
              Class avg 2.18
            </span>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-2 overflow-hidden">
          {/* Gradebook table */}
          <section className="flex flex-col overflow-hidden rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
            <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr_0.5fr] gap-1 border-b border-[#1a3a52]/10 pb-1 text-[7px] font-bold uppercase tracking-wider text-[#605A57]">
              <span>Student</span>
              <span className="text-center">Mid</span>
              <span className="text-center">Fin</span>
              <span className="text-center">Avg</span>
              <span className="text-center">Flag</span>
            </div>
            <GradeRow name="Santos, M." mid="1.25" fin="1.00" avg="1.12" />
            <GradeRow name="Mendoza, J." mid="2.50" fin="2.25" avg="2.37" />
            <GradeRow name="Cruz, A." mid="1.75" fin="1.50" avg="1.62" />
            <GradeRow name="Dela Pe\u00f1a, M." mid="3.00" fin="3.25" avg="3.12" risk />
            <GradeRow name="Reyes, K." mid="2.00" fin="1.75" avg="1.87" />
            <GradeRow name="Bautista, R." mid="3.25" fin="3.50" avg="3.37" risk />
            <GradeRow name="Ocampo, T." mid="1.50" fin="1.25" avg="1.37" />
            <GradeRow name="Lim, S." mid="2.75" fin="3.00" avg="2.87" risk />
          </section>

          {/* Distribution chart */}
          <section className="flex flex-col gap-1.5 rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
            <div className="text-[7px] font-bold uppercase tracking-wider text-[#605A57]">
              Grade distribution
            </div>
            <div className="flex flex-1 items-end justify-between gap-1 pt-1">
              <Bar height={30} label="1.0" />
              <Bar height={55} label="1.5" />
              <Bar height={70} label="2.0" />
              <Bar height={48} label="2.5" />
              <Bar height={32} label="3.0" />
              <Bar height={20} label="5.0" />
            </div>
            <div className="rounded-sm bg-[#e06c5a]/10 px-1.5 py-1 text-[7px] text-[#c0463a]">
              3 students below 3.00 — flagged for outreach
            </div>
          </section>
        </div>

        {/* Bulk action strip */}
        <div className="flex items-center justify-between rounded-md bg-[#1a3a52] px-2 py-1.5 text-white">
          <span className="text-[8px] uppercase tracking-wider text-white/70">
            Bulk entry mode
          </span>
          <span className="rounded-sm bg-[#C79244] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#1a3a52]">
            Save grades
          </span>
        </div>
      </main>
    </div>
  )
}

function NavRow({
  icon,
  label,
  active,
}: {
  icon: ReactNode
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-[8px] font-medium ${
        active ? "bg-white/10 text-white" : "text-white/60"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

function GradeRow({
  name,
  mid,
  fin,
  avg,
  risk,
}: {
  name: string
  mid: string
  fin: string
  avg: string
  risk?: boolean
}) {
  return (
    <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr_0.5fr] items-center gap-1 border-t border-[#1a3a52]/5 py-1 text-[8px]">
      <span className="truncate font-medium">{name}</span>
      <Cell>{mid}</Cell>
      <Cell>{fin}</Cell>
      <span
        className={`text-center text-[9px] font-bold ${
          risk ? "text-[#c0463a]" : "text-[#C79244]"
        }`}
      >
        {avg}
      </span>
      <span className="flex justify-center">
        {risk ? (
          <span className="h-1.5 w-1.5 rounded-full bg-[#e06c5a]" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-[#5ab564]" />
        )}
      </span>
    </div>
  )
}

function Cell({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-[#1a3a52]/5 py-0.5 text-center text-[8px] font-medium">
      {children}
    </span>
  )
}

function Bar({ height, label }: { height: number; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-0.5">
      <div
        className="w-full rounded-t-sm bg-gradient-to-t from-[#1a3a52] to-[#C79244]"
        style={{ height: `${height}%` }}
      />
      <span className="text-[6px] text-[#605A57]">{label}</span>
    </div>
  )
}
