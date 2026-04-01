import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import { Button } from "@/components/ui/button";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { VideoWithSkeleton } from "@/components/ui/video-with-skeleton";
import {
  getCloudinaryPhotoUrl,
  getFirstGalleryMedia,
  getFirstGalleryPhoto,
  isGalleryVideo,
} from "@/lib/sanity/photo-gallery";
import { fetchPhotoGalleries, fetchSettings } from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  const siteName = settings?.shortTitle || "DCCP";

  return {
    title: `Photo Gallery | ${siteName}`,
    description:
      "Browse campus albums from events, student life, and milestones at Data Center College of the Philippines.",
    openGraph: {
      title: `Photo Gallery | ${siteName}`,
      description:
        "Browse campus albums from events, student life, and milestones at Data Center College of the Philippines.",
    },
  };
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-card shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-border">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center flex justify-center flex-col text-foreground text-xs font-medium leading-3 font-sans tracking-wide uppercase">
        {text}
      </div>
    </div>
  );
}

export default async function GalleryPage() {
  const [galleries, settings] = await Promise.all([
    fetchPhotoGalleries(),
    fetchSettings(),
  ]);

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  };

  const totalPhotos = galleries.reduce((count, gallery) => {
    return count + (Array.isArray(gallery.photos) ? gallery.photos.length : 0);
  }, 0);

  return (
    <>
      <CollegeHeader settings={siteSettings} />

      <main className="min-h-screen w-full flex flex-col items-center pt-24 pb-0">
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-20 sm:py-28 md:py-36 flex justify-center">
          <div className="w-full max-w-[1180px] grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="flex flex-col gap-8">
              <Badge
                icon={
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="10"
                      height="10"
                      stroke="currentColor"
                      strokeWidth="1"
                      rx="1"
                    />
                    <path
                      d="M2.5 8.5 5 6l1.6 1.6L8.6 5.6 10 7"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <circle cx="4" cy="4" r="1" fill="currentColor" />
                  </svg>
                }
                text="Photo Gallery"
              />

              <div className="flex flex-col gap-5">
                <h1 className="text-foreground font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tight">
                  Browse albums before opening the moments inside.
                </h1>
                <p className="max-w-2xl text-muted-foreground text-lg sm:text-xl leading-relaxed font-sans">
                  Each collection groups campus events, student life, and school
                  milestones in one place. Open an album to view the full set of
                  photos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
              <div className="bg-card p-6 sm:p-8">
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Albums
                </p>
                <p className="mt-4 text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
                  {galleries.length || "—"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Organized by event and story instead of one long photo wall.
                </p>
              </div>
              <div className="bg-card p-6 sm:p-8">
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Photos
                </p>
                <p className="mt-4 text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
                  {totalPhotos || "—"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Covers use the first photo from each album for a clearer
                  starting point.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-16 sm:py-20 flex justify-center">
          <div className="w-full max-w-[1180px]">
            {galleries.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {galleries.map((gallery, index) => {
                  const coverAsset =
                    getFirstGalleryPhoto(gallery) ||
                    getFirstGalleryMedia(gallery);
                  const coverUrl = getCloudinaryPhotoUrl(coverAsset);
                  const coverIsVideo = isGalleryVideo(coverAsset);
                  const photoCount = Array.isArray(gallery.photos)
                    ? gallery.photos.length
                    : 0;

                  return (
                    <article
                      key={gallery._id}
                      className="group overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Link
                        href={`/gallery/${gallery.slug.current}`}
                        className="block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-muted">
                          {coverUrl ? (
                            <>
                              {coverIsVideo ? (
                                <VideoWithSkeleton
                                  src={coverUrl}
                                  aria-label={gallery.title}
                                  className="transition-transform duration-500 group-hover:scale-105"
                                  fallbackLabel="No preview"
                                />
                              ) : (
                                <ImageWithSkeleton
                                  src={coverUrl}
                                  alt={gallery.title}
                                  className="transition-transform duration-500 group-hover:scale-105"
                                  fallbackLabel="No cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            </>
                          ) : (
                            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_rgba(230,230,230,0.7),_rgba(214,211,209,0.9))]">
                              <span className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                No cover
                              </span>
                            </div>
                          )}

                          <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                            Album {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                            <div>
                              <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-white/80">
                                {photoCount} item{photoCount === 1 ? "" : "s"}
                              </p>
                              <h2 className="mt-2 text-2xl font-serif font-semibold leading-tight">
                                {gallery.title}
                              </h2>
                            </div>
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="flex flex-col gap-5 p-6">
                        <p className="min-h-12 text-sm leading-relaxed text-muted-foreground">
                          {gallery.summary ||
                            "Open this album to view the full collection of campus photos."}
                        </p>

                        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
                          <div className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            First image used as cover
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-4"
                          >
                            <Link href={`/gallery/${gallery.slug.current}`}>
                              Open album
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8 py-28 text-center border border-border rounded-[28px] bg-card">
                <div className="w-16 h-16 flex items-center justify-center border border-border rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
                <div className="flex max-w-md flex-col gap-3">
                  <h2 className="text-foreground text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
                    No albums yet
                  </h2>
                  <p className="text-muted-foreground text-base font-sans leading-relaxed">
                    Album collections will appear here once gallery entries are
                    published in the content management system.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <FooterSection settings={siteSettings} />
    </>
  );
}
