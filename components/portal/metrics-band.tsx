"use client"

import { portalDemo } from "@/lib/portal/demo-data"

import CountUp from "./count-up"

export default function MetricsBand() {
  return (
    <section id="metrics" className="bg-[#1a3a52] py-10 text-white">
      <div className="container mx-auto grid gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {portalDemo.metrics.map((metric) => (
          <div key={metric.label} className="border-[#C79244]/25 text-center sm:border-l first:border-l-0">
            <div className="font-serif text-4xl text-[#C79244] md:text-5xl">
              <CountUp value={metric.value} suffix={metric.suffix} decimals={metric.value % 1 ? 1 : 0} />
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
