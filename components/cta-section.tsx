import Link from "next/link"

import { Button } from "@/components/ui/button"
import type { Settings } from "@/lib/sanity/types"

interface CTASectionProps {
    settings: Settings;
}

export default function CTASection({ settings }: CTASectionProps) {
  const admissionsContact = settings.contactDirectory?.find(
    (contact) => contact.url || contact.email || contact.phone,
  )
  const admissionsHref = admissionsContact?.email
    ? `mailto:${admissionsContact.email}`
    : admissionsContact?.phone
      ? `tel:${admissionsContact.phone}`
      : admissionsContact?.url ?? null

  return (
    <section aria-labelledby="closing-cta-heading" className="w-full border-y border-primary/70 bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10 lg:py-20 xl:px-0">
        <div className="max-w-3xl">
          <div className="h-0.5 w-12 bg-secondary" aria-hidden="true" />
          <h2
            id="closing-cta-heading"
            className="mt-7 text-balance font-serif text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            Your next chapter can start here.
          </h2>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="h-14 min-w-52 rounded-sm bg-secondary px-8 text-base font-semibold text-foreground hover:bg-secondary/90"
          >
            <Link href="/apply">Apply now</Link>
          </Button>
          {admissionsHref ? (
            <Button
              asChild
              variant="link"
              className="h-auto px-0 py-2 text-base text-primary-foreground underline decoration-secondary underline-offset-8 hover:text-secondary"
            >
              <a href={admissionsHref}>Talk to admissions</a>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
