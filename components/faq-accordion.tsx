"use client"

import { PortableText } from "next-sanity"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { SanityFAQ } from "@/lib/sanity/types"

interface FAQAccordionProps {
  items: SanityFAQ[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const safeItems = items || []

  if (safeItems.length === 0) {
    return (
      <p className="border-y border-border py-8 text-sm leading-6 text-muted-foreground">
        Answers are being updated. Please contact admissions and we will be happy
        to help.
      </p>
    )
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={safeItems[Math.min(1, safeItems.length - 1)]?._id}
      className="w-full border-t border-border"
    >
      {safeItems.map((item, index) => (
        <AccordionItem key={item._id} value={item._id}>
          <AccordionTrigger className="gap-4 py-4 sm:gap-6 sm:py-[1.125rem]">
            <span className="w-8 shrink-0 font-sans text-sm font-semibold tabular-nums tracking-[0.08em] text-secondary sm:w-10 sm:text-base">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mr-2 h-8 w-px shrink-0 bg-border" aria-hidden="true" />
            <span className="min-w-0 flex-1 font-serif text-xl leading-snug text-foreground sm:text-2xl">
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pb-5 pl-[4.5rem] pr-2 sm:pb-6 sm:pl-[6.5rem] sm:pr-14">
              {typeof item.answer === "string" ? (
                <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              ) : (
                <div className="prose prose-sm max-w-2xl text-muted-foreground prose-headings:font-serif prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-p:leading-7">
                  <PortableText value={item.answer} />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
