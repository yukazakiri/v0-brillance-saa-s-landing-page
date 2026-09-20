import { ExternalLink, Globe, Mail, User } from "lucide-react";
import Link from "next/link";

import { buildImageUrl } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export interface AuthorProfile {
  _id?: string;
  fullName?: string;
  preferredName?: string;
  pronouns?: string;
  roleType?: string;
  titles?: string[];
  headshot?: SanityImage;
  biography?: any;
  departments?: Array<{ _id: string; title?: string }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    office?: string;
    website?: string;
  };
}

export interface ArticleAuthorCardProps {
  author?: AuthorProfile | null;
  fallbackName?: string;
  className?: string;
}

function extractBioText(biography?: any): string | null {
  if (!biography) return null;
  if (typeof biography === "string") return biography;
  if (Array.isArray(biography)) {
    return biography
      .map((block) => {
        if (block?._type === "block" && Array.isArray(block.children)) {
          return block.children.map((c: any) => c.text || "").join("");
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }
  return null;
}

export function ArticleAuthorCard({
  author,
  fallbackName = "Editorial Team",
  className,
}: ArticleAuthorCardProps) {
  const name = author?.preferredName || author?.fullName || fallbackName;
  const avatarUrl = author?.headshot ? buildImageUrl(author.headshot, 200, 200) : null;
  const bio = extractBioText(author?.biography) || "Contributing author and content specialist at Data Center College of the Philippines.";
  const title = author?.titles && author.titles.length > 0 ? author.titles[0] : author?.roleType;
  const department = author?.departments && author.departments.length > 0 ? author.departments[0].title : null;

  return (
    <section
      aria-labelledby="article-author-heading"
      className={cn(
        "rounded-[calc(var(--radius)+1rem)] border border-border bg-card p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="size-20 shrink-0 rounded-full border border-border object-cover shadow-sm sm:size-24"
          />
        ) : (
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/20 text-foreground sm:size-24">
            <User className="size-10 text-muted-foreground" aria-hidden="true" />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3
              id="article-author-heading"
              className="font-serif text-2xl font-semibold tracking-tight text-foreground"
            >
              {name}
            </h3>
            {title ? (
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                — {title}
              </span>
            ) : null}
          </div>

          {department ? (
            <p className="text-xs font-medium text-secondary">
              {department}
            </p>
          ) : null}

          <p className="font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
            {bio}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {author?.contactInfo?.website ? (
              <a
                href={author.contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Globe className="size-3.5" aria-hidden="true" />
                <span>Visit website</span>
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            ) : null}

            {author?.contactInfo?.email ? (
              <a
                href={`mailto:${author.contactInfo.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                <span>Contact author</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
