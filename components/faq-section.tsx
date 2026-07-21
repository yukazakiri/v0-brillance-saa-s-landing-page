import { fetchFAQs } from "@/lib/sanity/queries";
import FAQAccordion from "./faq-accordion";

export default async function FAQSection() {
  const faqData = await fetchFAQs()

  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full scroll-mt-28 border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20 lg:px-10 lg:py-20 xl:px-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            <span className="h-px w-10 bg-secondary" aria-hidden="true" />
            Admissions guide
          </p>
          <h2
            id="faq-heading"
            className="mt-7 max-w-xl text-balance font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Questions before you begin?
          </h2>
          <div className="mt-8 h-0.5 w-12 bg-secondary" aria-hidden="true" />
          <p className="mt-8 max-w-md text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Explore answers to the questions future students and families ask most.
            If you do not see what you need, our admissions team is ready to help.
          </p>
        </div>

        <div className="min-w-0">
          <FAQAccordion items={faqData} />
        </div>
      </div>
    </section>
  )
}
