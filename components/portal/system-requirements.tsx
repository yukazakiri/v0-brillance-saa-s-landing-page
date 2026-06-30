"use client"

import { portalDemo } from "@/lib/portal/demo-data"

export default function SystemRequirements() {
  const { specs } = portalDemo

  return (
    <section id="requirements" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold text-[#1a3a52] md:text-5xl">{specs.title}</h2>
          <p className="mt-5 text-lg leading-8 text-[#605A57]">{specs.description}</p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-[#1a3a52]/10 shadow-xl">
          <div className="grid grid-cols-[1fr_1.2fr_1.2fr] bg-[#1a3a52] text-[11px] font-bold uppercase tracking-[0.22em] text-white">
            <div className="p-4">Need</div>
            <div className="border-l border-white/10 p-4">Students</div>
            <div className="border-l border-white/10 p-4">Faculty</div>
          </div>
          {specs.groups.map((group) => (
            <div key={group.category}>
              <div className="bg-[#F7F5F3] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C79244]">
                {group.category}
              </div>
              {group.rows.map((row) => (
                <div key={`${group.category}-${row.label}`} className="grid grid-cols-[1fr_1.2fr_1.2fr] border-t border-[#1a3a52]/10 text-sm text-[#605A57]">
                  <div className="p-4 font-semibold text-[#1a3a52]">{row.label}</div>
                  <div className="border-l border-[#1a3a52]/10 p-4">{row.student}</div>
                  <div className="border-l border-[#1a3a52]/10 p-4">{row.faculty}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
