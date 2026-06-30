import Link from "next/link";
import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

import GsapEditorialReveal from "@/components/gsap-editorial-reveal";
import type { Settings } from "@/lib/sanity/types";

type FooterSectionProps = {
  settings: Settings;
};

const navigateLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/academics", label: "Academics" },
  { href: "/news", label: "News" },
  { href: "/portal", label: "Portal" },
];

const legalLinks = [
  { href: "/about", label: "Institutional Information" },
  { href: "/news", label: "Official Updates" },
];

function getSocialIcon(platform: string) {
  const normalizedPlatform = platform.toLowerCase();

  if (normalizedPlatform.includes("facebook"))
    return <Facebook className="size-3.5" />;
  if (
    normalizedPlatform.includes("twitter") ||
    normalizedPlatform.includes("x")
  )
    return <Twitter className="size-3.5" />;
  if (normalizedPlatform.includes("linkedin"))
    return <Linkedin className="size-3.5" />;
  if (normalizedPlatform.includes("github"))
    return <Github className="size-3.5" />;
  if (normalizedPlatform.includes("instagram"))
    return <Instagram className="size-3.5" />;
  if (normalizedPlatform.includes("youtube"))
    return <Youtube className="size-3.5" />;

  return <ExternalLink className="size-3.5" />;
}

function getDisplayName(settings: Settings) {
  const title = settings.siteTitle || "Data Center College of The Philippines";

  return title
    .replace("of Baguio City, Inc.", "")
    .replace("Of Baguio City, Inc.", "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function FooterSection({ settings }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  const socialLinks = settings.socialLinks || [];
  const primaryContact = settings.contactDirectory?.[0];
  const primaryAddress = settings.addresses?.[0];
  const phone =
    primaryContact?.phone || primaryAddress?.phone || "(074) 442 4160";
  const email = primaryContact?.email || "baguio-campus@dccp.edu.ph";
  const address =
    primaryAddress?.address ||
    "118 Upper Bonifacio Street Baguio City 2600, Benguet, Philippines";
  const legalName =
    settings.siteTitle || "Data Center College of The Philippines";
  const displayName = getDisplayName(settings);

  return (
    <GsapEditorialReveal>
      <footer className="relative left-1/2 w-screen -translate-x-1/2 border-t border-border bg-background text-primary">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
            <div data-gsap-reveal className="space-y-4">
              <p className="text-sm font-bold tracking-tight text-primary">
                {phone}
              </p>
              <a
                href={`mailto:${email}`}
                className="block max-w-fit text-3xl font-bold tracking-[-0.045em] text-primary transition-colors hover:text-accent sm:text-4xl lg:text-5xl"
              >
                {email}
              </a>
              <p className="max-w-xl pt-3 text-sm leading-6 text-muted-foreground">
                {address}
              </p>
            </div>

            <div
              data-gsap-reveal
              className="grid grid-cols-2 gap-10 sm:gap-16 lg:justify-self-end"
            >
              <nav aria-label="Footer navigation">
                <h2 className="mb-6 text-sm font-medium text-muted-foreground">
                  Navigate
                </h2>
                <ul className="grid gap-3">
                  {navigateLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xl font-bold leading-none tracking-[-0.035em] text-primary transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Social links">
                <h2 className="mb-6 text-sm font-medium text-muted-foreground">
                  Social
                </h2>
                <ul className="grid gap-3">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link, index) => (
                      <li key={`${link.platform}-${index}`}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xl font-bold leading-none tracking-[-0.035em] text-primary transition-colors hover:text-accent"
                        >
                          {link.platform}
                          <span className="grid size-4 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover:text-accent">
                            {getSocialIcon(link.platform)}
                          </span>
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm leading-6 text-muted-foreground">
                      Social links coming soon.
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>

          <div
            data-gsap-reveal
            className="flex min-h-[220px] items-end justify-center py-12 sm:min-h-[280px] lg:min-h-[340px]"
          >
            <Link
              href="/"
              aria-label={`${legalName} homepage`}
              className="max-w-[1120px] text-center font-sans text-[clamp(3.5rem,10vw,9.5rem)] font-black leading-[0.83] tracking-[-0.1em] text-primary transition-colors hover:text-accent"
            >
              {displayName}
            </Link>
          </div>
        </div>

        <div className="bg-primary px-6 py-9 text-primary-foreground/70 sm:px-10 lg:px-20">
          <div
            data-gsap-reveal
            className="mx-auto flex max-w-[1440px] flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between"
          >
            <p>
              ©{currentYear} {legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-8">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </GsapEditorialReveal>
  );
}
