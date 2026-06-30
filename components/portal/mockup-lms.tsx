"use client"

import { BookOpen, Calendar, Clock, PlayCircle } from "lucide-react"

/**
 * Illustrative Learning Management System mockup. Pure TSX/CSS.
 * Shows course modules, upcoming deadlines, and lecture recordings.
 */
export default function MockupLms() {
  return (
    <div className="flex h-full w-full bg-[#F7F5F3] text-[#1a3a52]">
      {/* Course list sidebar */}
      <aside className="flex w-[26%] flex-col gap-1 bg-[#1a3a52] p-2 text-white/80">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <div className="h-4 w-4 rounded-sm bg-[#C79244]" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white">
            My Courses
          </span>
        </div>
        <CourseRow code="CS 101" title="Intro to Programming" active />
        <CourseRow code="IT 102" title="Data Structures" />
        <CourseRow code="MA 104" title="Discrete Math" />
        <CourseRow code="GE 103" title="Rizal Studies" />
        <CourseRow code="PE 101" title="Physical Fitness" />
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col gap-2 overflow-hidden p-2.5">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold">CS 101 — Intro to Programming</div>
            <div className="text-[8px] text-[#605A57]">Prof. Reyes Aquino · 3 units</div>
          </div>
          <span className="rounded-full bg-[#C79244]/20 px-1.5 py-0.5 text-[8px] font-bold text-[#a8742f]">
            68% complete
          </span>
        </header>

        <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-2 overflow-hidden">
          {/* Modules */}
          <section className="flex flex-col gap-1 overflow-hidden rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
            <div className="text-[7px] font-bold uppercase tracking-wider text-[#605A57]">
              Course modules
            </div>
            <Module title="Module 4: Loops & Iteration" progress={100} done />
            <Module title="Module 5: Functions" progress={100} done />
            <Module title="Module 6: Arrays" progress={60} active />
            <Module title="Module 7: Pointers" progress={0} />
            <Module title="Module 8: Final Project" progress={0} />
          </section>

          {/* Deadlines + recordings */}
          <section className="flex flex-col gap-1.5 overflow-hidden">
            <div className="flex flex-col gap-1 rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
              <div className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-wider text-[#605A57]">
                <Clock className="h-2.5 w-2.5" /> Upcoming
              </div>
              <Deadline title="MP6: Arrays" due="Fri 11:59 PM" urgent />
              <Deadline title="Quiz 4" due="Mon 10:00 AM" />
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-md border border-[#1a3a52]/10 bg-white p-1.5">
              <div className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-wider text-[#605A57]">
                <PlayCircle className="h-2.5 w-2.5" /> Recordings
              </div>
              <RecRow title="Lec 11 — Loops" length="48m" />
              <RecRow title="Lec 12 — Functions" length="52m" />
              <RecRow title="Lec 13 — Arrays" length="1h 03m" />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function CourseRow({
  code,
  title,
  active,
}: {
  code: string
  title: string
  active?: boolean
}) {
  return (
    <div
      className={`rounded-sm px-1.5 py-1 ${
        active ? "bg-white/10 text-white" : "text-white/60"
      }`}
    >
      <div className="flex items-center gap-1">
        <BookOpen className="h-2.5 w-2.5" />
        <span className="text-[8px] font-bold">{code}</span>
      </div>
      <div className="mt-0.5 truncate pl-3.5 text-[7px] text-white/50">{title}</div>
    </div>
  )
}

function Module({
  title,
  progress,
  done,
  active,
}: {
  title: string
  progress: number
  done?: boolean
  active?: boolean
}) {
  return (
    <div
      className={`rounded-sm border px-1.5 py-1 ${
        active ? "border-[#C79244]/40 bg-[#C79244]/5" : "border-[#1a3a52]/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="truncate text-[8px] font-semibold">{title}</span>
        {done ? (
          <span className="text-[7px] font-bold text-[#5ab564]">DONE</span>
        ) : (
          <span className="text-[7px] font-semibold text-[#605A57]">{progress}%</span>
        )}
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#1a3a52]/10">
        <div
          className={`h-full rounded-full ${done ? "bg-[#5ab564]" : "bg-[#C79244]"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function Deadline({
  title,
  due,
  urgent,
}: {
  title: string
  due: string
  urgent?: boolean
}) {
  return (
    <div className="flex items-center gap-1.5 border-t border-[#1a3a52]/5 py-1">
      <Calendar className={`h-2.5 w-2.5 ${urgent ? "text-[#e06c5a]" : "text-[#605A57]"}`} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[7px] font-semibold">{title}</div>
        <div className="text-[6px] text-[#605A57]">{due}</div>
      </div>
      {urgent && (
        <span className="rounded-sm bg-[#e06c5a]/15 px-1 py-0.5 text-[6px] font-bold text-[#c0463a]">
          2 days
        </span>
      )}
    </div>
  )
}

function RecRow({ title, length }: { title: string; length: string }) {
  return (
    <div className="flex items-center gap-1.5 border-t border-[#1a3a52]/5 py-1">
      <PlayCircle className="h-3 w-3 text-[#1a3a52]" />
      <span className="truncate text-[7px] font-medium">{title}</span>
      <span className="ml-auto text-[6px] text-[#605A57]">{length}</span>
    </div>
  )
}
