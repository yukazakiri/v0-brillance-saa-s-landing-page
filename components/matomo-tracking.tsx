"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Matomo instance used by default. Override with NEXT_PUBLIC_MATOMO_SERVER_URL.
const DEFAULT_SERVER_URL = "https://matomo.koamishin.com/"

// Matomo site id used by default. Override with NEXT_PUBLIC_MATOMO_SITE_ID.
const DEFAULT_SITE_ID = "2"

type MatomoWindow = Window & {
  _paq?: unknown[][]
}

export type MatomoTrackingProps = {
  siteId?: string
  serverUrl?: string
}

export default function MatomoTracking({
  siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || DEFAULT_SITE_ID,
  serverUrl = process.env.NEXT_PUBLIC_MATOMO_SERVER_URL || DEFAULT_SERVER_URL,
}: MatomoTrackingProps) {
  const pathname = usePathname()
  const lastPathname = useRef(pathname)

  // App Router navigations never reload the page, so the initial `trackPageView`
  // from the tracker snippet only covers the first page. Send a page view for
  // every client-side route change.
  useEffect(() => {
    if (lastPathname.current === pathname) return
    lastPathname.current = pathname

    const paq = (window as MatomoWindow)._paq
    if (!paq) return

    paq.push(["setCustomUrl", window.location.href])
    paq.push(["setDocumentTitle", document.title])
    paq.push(["trackPageView"])
  }, [pathname])

  const trackerUrl = serverUrl.endsWith("/") ? serverUrl : `${serverUrl}/`

  const trackerSnippet = `
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u = "${trackerUrl}";
      _paq.push(['setTrackerUrl', u + 'matomo.php']);
      _paq.push(['setSiteId', '${siteId}']);
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
    })();
  `

  return (
    <Script
      id="matomo-tracker"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: trackerSnippet }}
    />
  )
}
