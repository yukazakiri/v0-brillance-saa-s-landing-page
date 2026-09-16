import { getImageUrl } from "@/lib/sanity/image"
import type { Settings } from "@/lib/sanity/types"
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FooterSectionProps {
  settings: Settings
}

const linkClassName =
  "inline-flex rounded-sm text-sm leading-6 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"

const navigationGroups = [
  {
    title: "Academic Offerings",
    links: [
      {
        label: "BS Information Technology",
        href: "/courses/bs-information-technology",
      },
      {
        label: "BS Business Administration",
        href: "/courses/bs-business-administration-financial-management",
      },
      {
        label: "BS Hotel & Restaurant Mgt.",
        href: "/courses/bs-hotel-and-restaurant-management",
      },
      { label: "View all offerings", href: "/courses", emphasized: true },
    ],
  },
  {
    title: "College",
    links: [
      { label: "About us", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "News & updates", href: "/news" },
      { label: "Faculty", href: "/faculty" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Apply for admission", href: "/apply" },
      { label: "Frequently asked questions", href: "/#faq" },
      { label: "Student portal", href: "/portal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "For parents", href: "/parents" },
      { label: "Alumni", href: "/alumni" },
      { label: "Course catalog", href: "/courses" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
]

function SocialIcon({ platform }: { platform: string }) {
  const normalizedPlatform = platform.toLowerCase()

  if (normalizedPlatform.includes("facebook")) return <Facebook aria-hidden="true" />
  if (normalizedPlatform.includes("instagram")) return <Instagram aria-hidden="true" />
  if (normalizedPlatform.includes("linkedin")) return <Linkedin aria-hidden="true" />
  if (normalizedPlatform.includes("twitter") || normalizedPlatform === "x") {
    return <Twitter aria-hidden="true" />
  }
  if (normalizedPlatform.includes("youtube")) return <Youtube aria-hidden="true" />

  return <ExternalLink aria-hidden="true" />
}

export default function FooterSection({ settings }: FooterSectionProps) {
  const currentYear = new Date().getFullYear()
  const primaryAddress = settings.addresses?.find((address) => address.address)
  const primaryContact =
    settings.contactDirectory?.find((contact) => contact.email || contact.phone) ??
    settings.contactDirectory?.[0]
  const socialLinks = settings.socialLinks?.filter((link) => link.url) ?? []
  const logoUrl =
    getImageUrl(settings.logos?.primary, 192, 192) ||
    settings.logos?.primary?.externalUrl ||
    "/android-chrome-192x192.png"
  const logoAlt =
    settings.logos?.primary?.alt ||
    `${settings.shortTitle || settings.siteTitle || "Data Center College"} logo`
  const contactHref = primaryContact?.email
    ? `mailto:${primaryContact.email}`
    : primaryContact?.phone
      ? `tel:${primaryContact.phone}`
      : primaryContact?.url

  const groups = navigationGroups.map((group) =>
    group.title === "Support" && contactHref
      ? {
          ...group,
          links: [...group.links, { label: "Contact admissions", href: contactHref }],
        }
      : group,
  )

  return (
    <footer className="w-full border-t border-secondary/45 bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 pb-7 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20 xl:px-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(18rem,1.35fr)_minmax(0,2.65fr)] lg:gap-16 xl:gap-24">
          <section aria-labelledby="footer-brand-heading" className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={64}
                height={64}
                className="size-14 shrink-0 object-contain transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.03] sm:size-16"
              />
              <span className="min-w-0">
                <span
                  id="footer-brand-heading"
                  className="block font-serif text-2xl leading-none tracking-[-0.02em] text-primary sm:text-[1.75rem]"
                >
                  Data Center College
                </span>
                <span className="mt-1 block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  of the Philippines · Baguio City
                </span>
              </span>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
              {settings.tagline ||
                "Practical, industry-aligned education for students building what comes next."}
            </p>

            <address className="mt-7 space-y-3 not-italic">
              {primaryAddress?.address ? (
                <div className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="whitespace-pre-line">{primaryAddress.address}</span>
                </div>
              ) : null}
              {primaryContact?.phone ? (
                <div className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <a href={`tel:${primaryContact.phone}`} className={linkClassName}>
                    {primaryContact.phone}
                  </a>
                </div>
              ) : null}
              {primaryContact?.email ? (
                <div className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <a href={`mailto:${primaryContact.email}`} className={`${linkClassName} break-all`}>
                    {primaryContact.email}
                  </a>
                </div>
              ) : null}
            </address>

            {socialLinks.length > 0 ? (
              <div className="mt-7 flex items-center gap-2" aria-label="Social media">
                {socialLinks.map((link) => (
                  <a
                    key={`${link.platform}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${link.platform}`}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-secondary hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-4"
                  >
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              </div>
            ) : null}
          </section>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
            {groups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}-heading`}>
                <h2
                  id={`footer-${group.title.toLowerCase()}-heading`}
                  className="font-serif text-2xl leading-none tracking-[-0.02em] text-primary"
                >
                  {group.title}
                </h2>
                <div className="mt-4 h-0.5 w-10 bg-secondary" aria-hidden="true" />
                <ul className="mt-6 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className={`${linkClassName} ${"emphasized" in link && link.emphasized ? "font-semibold text-primary" : ""}`}
                      >
                        {link.label}
                        {"emphasized" in link && link.emphasized ? (
                          <span className="ml-2 text-secondary" aria-hidden="true">→</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-secondary/45 pt-6 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {settings.siteTitle || "Data Center College of the Philippines – Baguio"}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/sitemap.xml" className={linkClassName}>
              Sitemap
            </Link>
            {contactHref ? (
              <a href={contactHref} className={linkClassName}>
                Contact admissions
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
