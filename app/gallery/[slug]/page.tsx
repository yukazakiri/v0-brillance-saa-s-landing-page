import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import CollegeHeader from "@/components/college-header";
import FooterSection from "@/components/footer-section";
import {
  ImageGallery,
  type ImageItem,
} from "@/components/shadix-ui/components/image-gallery";
import { Button } from "@/components/ui/button";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { VideoWithSkeleton } from "@/components/ui/video-with-skeleton";
import {
  getAbsoluteUrl,
  getSeoDescription,
  getSeoImage,
  getSeoKeywords,
  getTwitterHandle,
} from "@/lib/seo";
import {
  getCloudinaryPhotoUrl,
  getFirstGalleryMedia,
  getFirstGalleryPhoto,
  isGalleryVideo,
} from "@/lib/sanity/photo-gallery";
import {
  fetchPhotoGalleryBySlug,
  fetchPhotoGallerySlugs,
  fetchSettings,
} from "@/lib/sanity/queries";
import type { Settings } from "@/lib/sanity/types";

export const revalidate = 3600;

type GalleryAlbumPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await fetchPhotoGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GalleryAlbumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [gallery, settings] = await Promise.all([
    fetchPhotoGalleryBySlug(slug),
    fetchSettings(),
  ]);

  const siteName = settings?.shortTitle || "DCCP";

  if (!gallery) {
    return {
      title: `Gallery Album | ${siteName}`,
    };
  }
  const title = `${gallery.title} | ${siteName}`;
  const description = getSeoDescription(
    settings,
    gallery.summary ||
      `View photos and event media from ${gallery.title} at ${siteName}.`,
  );
  const canonicalUrl = getAbsoluteUrl(`/gallery/${gallery.slug.current}`);
  const coverUrl =
    getCloudinaryPhotoUrl(
      getFirstGalleryPhoto(gallery) || getFirstGalleryMedia(gallery),
    ) || getSeoImage(settings);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: getSeoKeywords(settings, [
      gallery.title,
      "Gallery Album",
      "Campus Event Photos",
      "School Album",
      "DCCP Photos",
    ]),
    category: "education",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_PH",
      url: canonicalUrl,
      title,
      description,
      siteName: siteName,
      images: coverUrl
        ? [
            {
              url: coverUrl,
              width: 1200,
              height: 630,
              alt: gallery.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverUrl ? [coverUrl] : [],
      creator: getTwitterHandle(settings),
    },
    other: coverUrl
      ? {
          "og:image:secure_url": coverUrl,
          "og:image:alt": gallery.title,
        }
      : undefined,
  };
}

export default async function GalleryAlbumPage({
  params,
}: GalleryAlbumPageProps) {
  const { slug } = await params;

  const [gallery, settings] = await Promise.all([
    fetchPhotoGalleryBySlug(slug),
    fetchSettings(),
  ]);

  if (!gallery) {
    notFound();
  }

  const siteSettings: Settings = settings ?? {
    _id: "default",
    _type: "settings",
    siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
    shortTitle: "Data Center College",
  };

  const images: ImageItem[] = (gallery.photos || [])
    .map(
      (photo): ImageItem => ({
        src: getCloudinaryPhotoUrl(photo) || "",
        alt: gallery.title || "Gallery photo",
        width: photo.width,
        height: photo.height,
        mediaType: isGalleryVideo(photo) ? "video" : "image",
      }),
    )
    .filter((photo) => Boolean(photo.src));

  const coverAsset =
    getFirstGalleryPhoto(gallery) || getFirstGalleryMedia(gallery);
  const coverUrl = getCloudinaryPhotoUrl(coverAsset);
  const coverIsVideo = isGalleryVideo(coverAsset);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: gallery.title,
    description: getSeoDescription(
      siteSettings,
      gallery.summary || `View photos and event media from ${gallery.title}.`,
    ),
    url: getAbsoluteUrl(`/gallery/${gallery.slug.current}`),
    isPartOf: {
      "@type": "CollectionPage",
      name: `${siteSettings.shortTitle || siteSettings.siteTitle || "DCCP"} Photo Gallery`,
      url: getAbsoluteUrl("/gallery"),
    },
    datePublished: gallery.publishedAt,
    numberOfItems: images.length,
    image: images
      .filter((item) => item.mediaType !== "video")
      .slice(0, 20)
      .map((item) => item.src),
    associatedMedia: images.slice(0, 20).map((item) => ({
      "@type": item.mediaType === "video" ? "VideoObject" : "ImageObject",
      contentUrl: item.src,
      name: item.alt,
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: getAbsoluteUrl(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gallery",
          item: getAbsoluteUrl("/gallery"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: gallery.title,
          item: getAbsoluteUrl(`/gallery/${gallery.slug.current}`),
        },
      ],
    },
  };

  return (
    <>
      <CollegeHeader settings={siteSettings} />
      <Script
        id="gallery-album-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen w-full flex flex-col items-center pt-24 pb-0">
        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-16 sm:py-20 flex justify-center">
          <div className="w-full max-w-[1180px] grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Link
                  href="/gallery"
                  className="transition-colors hover:text-foreground"
                >
                  Gallery
                </Link>
                <span>/</span>
                <span>{gallery.title}</span>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="text-foreground font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.95] tracking-tight">
                  {gallery.title}
                </h1>
                <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                  {gallery.summary ||
                    "A dedicated album view for this collection of campus moments."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="rounded-full border border-border px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-foreground">
                  {images.length} item{images.length === 1 ? "" : "s"}
                </div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/gallery">Back to albums</Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-border bg-card">
              <div className="relative aspect-[4/3] bg-muted">
                {coverUrl ? (
                  <>
                    {coverIsVideo ? (
                      <VideoWithSkeleton
                        src={coverUrl}
                        aria-label={gallery.title}
                      />
                    ) : (
                      <ImageWithSkeleton src={coverUrl} alt={gallery.title} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {coverIsVideo ? "Album preview" : "Album cover"}
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(231,229,228,0.8),_rgba(214,211,209,0.95))]">
                    <span className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      No cover available
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-b border-border px-4 sm:px-6 md:px-8 py-16 sm:py-20 flex justify-center">
          <div className="w-full max-w-[1180px]">
            {images.length > 0 ? (
              <ImageGallery
                images={images}
                gap={12}
                columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              />
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
                    No media in this album yet
                  </h2>
                  <p className="text-muted-foreground text-base font-sans leading-relaxed">
                    This album exists, but its photos or videos have not been
                    added yet.
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
