"use client"

import type { ReactNode } from "react"

import { Bell, BookOpen, Calendar, ClipboardCheck, MessageSquare, Wallet } from "lucide-react"

/**
 * Illustrative student dashboard mockup. Pure TSX/CSS — no screenshot needed.
 * Fills its parent container; designed to look crisp at any device-frame size.
 */
export default function MockupDashboard() {
  return (
    <div className="flex h-full w-full bg-[#F7F5F3] text-[#1a3a52]">
      {/* Sidebar */}
      <aside className="flex w-[26%] flex-col gap-1 bg-[#1a3a52] p-2 text-white/80">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <div className="h-4 w-4 rounded-sm bg-[#C79244]" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white">
            DCCPHub
          </span>
        </div>
        <NavRow icon={<ClipboardCheck className="h-3 w-3" />} label="Dashboard" active />
        <NavRow icon={<BookOpen className="h-3 w-3" />} label="Grades" />
        <NavRow icon={<Calendar className="h-3 w-3" />} label="Enrollment" />
        <NavRow icon={<BookOpen className="h-3 w-3" />} label="Courses" />
        <NavRow icon={<MessageSquare className="h-3 w-3" />} label="Messages" />
        <NavRow icon={<Wallet className="h-3 w-3" />} label="Fees" />
        <div className="mt-auto rounded-md bg-white/5 p-1.5">
          <div className="h-4 w-4 rounded-full bg-[#C79244]" />
          <div className="mt-1 h-1.5 w-14 rounded-full bg-white/20" />
          <div className="mt-1 h-1 w-10 rounded-full bg-white/10" />
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col gap-2 overflow-hidden p-2.5">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold">Welcome back, Maria</div>
            <div className="text-[8px] text-[#605A57]">Tuesday, June 20</div>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell className="h-3 w-3 text-[#605A57]" />
            <span className="rounded-full bg-[#1a3a52] px-1.5 py-0.5 text-[8px] font-bold text-white">
              GWA 1.42
            </span>
          </div>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-1.5">
          <Stat label="Current GWA" value="1.42" trend="up" />
          <Stat label="Units Enrolled" value="18" />
          <Stat label="Pending" value="2 tasks" />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2 overflow-hidden">
          {/* Recent grades */}
          <section className="flex flex-col gap-1 rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
            <div className="text-[8px] font-bold uppercase tracking-wider text-[#605A57]">
              Recent Grades
            </div>
            <GradeRow subject="CS 101" name="Intro to Programming" grade="1.25" />
            <GradeRow subject="IT 102" name="Data Structures" grade="1.50" />
            <GradeRow subject="GE 103" name="Rizal Studies" grade="1.00" />
            <GradeRow subject="MA 104" name="Discrete Math" grade="1.75" />
          </section>

          {/* Schedule */}
          <section className="flex flex-col gap-1 rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
            <div className="text-[8px] font-bold uppercase tracking-wider text-[#605A57]">
              Today
            </div>
            <SchedRow time="08:00" title="CS 101 — Lab" room="Rm 204" accent />
            <SchedRow time="10:30" title="IT 102" room="Rm 110" />
            <SchedRow time="13:00" title="MA 104" room="Rm 302" />
            <SchedRow time="15:30" title="GE 103" room="Aud A" />
          </section>
        </div>

        {/* Fees strip */}
        <div className="flex items-center justify-between rounded-md bg-[#1a3a52] px-2 py-1.5 text-white">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-white/60">
              Current Balance
            </div>
            <div className="text-[11px] font-bold">PHP 12,450.00</div>
          </div>
          <span className="rounded-sm bg-[#C79244] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#1a3a52]">
            Pay Now
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

function Stat({
  label,
  value,
  trend,
}: {
  label: string
  value: string
  trend?: "up" | "down"
}) {
  return (
    <div className="rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
      <div className="text-[7px] uppercase tracking-wider text-[#605A57]">{label}</div>
      <div className="flex items-center gap-1">
        <span className="text-[12px] font-bold text-[#1a3a52]">{value}</span>
        {trend === "up" && <span className="text-[8px] text-[#5ab564]">&#9650;</span>}
      </div>
    </div>
  )
}

function GradeRow({
  subject,
  name,
  grade,
}: {
  subject: string
  name: string
  grade: string
}) {
  const isHigh = Number(grade) <= 1.5
  return (
    <div className="flex items-center justify-between border-t border-[#1a3a52]/5 py-0.5">
      <div className="min-w-0">
        <div className="text-[8px] font-semibold">{subject}</div>
        <div className="truncate text-[7px] text-[#605A57]">{name}</div>
      </div>
      <span
        className={`text-[9px] font-bold ${
          isHigh ? "text-[#C79244]" : "text-[#1a3a52]"
        }`}
      >
        {grade}
      </span>
    </div>
  )
}

function SchedRow({
  time,
  title,
  room,
  accent,
}: {
  time: string
  title: string
  room: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center gap-1.5 border-t border-[#1a3a52]/5 py-0.5">
      <span className="text-[7px] font-semibold text-[#605A57]">{time}</span>
      <div
        className={`h-5 flex-1 rounded-sm px-1.5 py-0.5 ${
          accent ? "bg-[#C79244]/15" : "bg-[#1a3a52]/5"
        }`}
      >
        <div className="text-[7px] font-semibold leading-tight">{title}</div>
        <div className="text-[6px] text-[#605A57]">{room}</div>
      </div>
    </div>
  )
}
