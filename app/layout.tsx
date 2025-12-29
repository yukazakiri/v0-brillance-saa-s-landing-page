import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"

import { fetchSettings } from "@/lib/sanity/queries"
import { buildImageUrl } from "@/lib/sanity/image"
import "./globals.css"

import { Inter, Instrument_Serif, Libre_Baskerville as V0_Font_Libre_Baskerville, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Lora as V0_Font_Lora } from 'next/font/google'

// Initialize fonts
const _libreBaskerville = V0_Font_Libre_Baskerville({ subsets: ['latin'], weight: ["400", "700"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700"] })
const _lora = V0_Font_Lora({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings()

  const title = settings?.siteTitle || "Data Center College of The Philippines"
  const description = settings?.defaultSeo?.metaDescription || 
    settings?.tagline || 
    "Empowering the next generation of IT professionals, business leaders, and innovators"
  const ogImage = buildImageUrl(settings?.defaultSeo?.shareImage) || "/hero-images/maincampus.png"

  return {
    title: {
      default: title,
      template: `%s | ${settings?.shortTitle || "DCCP"}`,
    },
    description,
    keywords: settings?.defaultSeo?.keywords || ["Data Center College", "DCCP", "Baguio City", "IT School", "Business School"],
    authors: [{ name: "Data Center College of The Philippines" }],
    creator: "Data Center College of The Philippines",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dccp.edu.ph"),
    openGraph: {
      type: "website",
      locale: "en_PH",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://dccp.edu.ph",
      title,
      description,
      siteName: settings?.shortTitle || "DCCP",
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: settings?.defaultSeo?.shareImage?.alt || title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
      creator: "@dccp_official", // Placeholder if not in settings
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png" },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
        },
      ],
    },
    manifest: "/site.webmanifest",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap" />
      </head>
      <body className="font-sans antialiased">
        <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
          <div className="relative flex flex-col justify-start items-center w-full">
            <div className="w-full absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-border shadow-[0px_2px_0px_white]" />
            <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1400px] lg:w-[1400px] relative flex flex-col justify-start items-start min-h-screen">
              <div className="w-[1px] h-full absolute left-4 sm:left-6 md:left-8 lg:left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0" />
              <div className="self-stretch pt-[9px] overflow-hidden border-b border-[rgba(55,50,47,0.06)] flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[66px] relative z-10">
                {children}
              </div>
              <div className="w-[1px] h-full absolute right-4 sm:right-6 md:right-8 lg:right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] z-0" />
            </div>
          </div>
        </div>
        <Script src="https://cdn.botpress.cloud/webchat/v3.5/inject.js" strategy="afterInteractive" />
        <Script src="https://files.bpcontent.cloud/2025/03/12/02/20250312025656-J40NI3RT.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
