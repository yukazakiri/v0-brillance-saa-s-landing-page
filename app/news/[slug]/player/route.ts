import { NextResponse } from "next/server";

import {
  buildMuxStreamUrl,
  buildMuxThumbnailUrl,
  getMuxVideoAsset,
  isMuxVideoReady,
} from "@/lib/mux-video";
import { fetchPostBySlug } from "@/lib/sanity/queries";

export const revalidate = 60;

type NewsPlayerRouteContext = {
  params: Promise<{ slug: string }>;
};

function getSiteBaseUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return siteUrl.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://dccp.edu.ph";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET(
  _request: Request,
  { params }: NewsPlayerRouteContext,
) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  const asset = getMuxVideoAsset(post?.video);

  if (!post || !asset?.playbackId || !isMuxVideoReady(post.video)) {
    return new NextResponse("Video not found", { status: 404 });
  }

  const baseUrl = getSiteBaseUrl();
  const playerUrl = `${baseUrl}/news/${post.slug}/player`;
  const title = escapeHtml(post.video?.title || post.video?.alt || post.title);
  const description = escapeHtml(
    post.seo?.metaDescription ??
      post.excerpt ??
      "Watch this video from Data Center College of the Philippines.",
  );
  const playbackId = escapeHtml(asset.playbackId);
  const posterUrl = escapeHtml(
    buildMuxThumbnailUrl(asset.playbackId, asset.thumbTime),
  );
  const streamUrl = escapeHtml(buildMuxStreamUrl(asset.playbackId));
  const escapedPlayerUrl = escapeHtml(playerUrl);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="video.other" />
    <meta property="og:url" content="${escapedPlayerUrl}" />
    <meta property="og:image" content="${posterUrl}" />
    <meta property="og:video" content="${streamUrl}" />
    <meta property="og:video:secure_url" content="${streamUrl}" />
    <meta property="og:video:type" content="application/x-mpegURL" />
    <meta property="og:video:width" content="1280" />
    <meta property="og:video:height" content="720" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${posterUrl}" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/@mux/mux-player@3/dist/mux-player.mjs"></script>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        background: #000;
        overflow: hidden;
      }

      mux-player {
        width: 100vw;
        height: 100vh;
        display: block;
        --media-object-fit: contain;
      }

      .fallback {
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
        color: #fff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        text-align: center;
      }

      .fallback a {
        color: #fff;
      }
    </style>
  </head>
  <body>
    <mux-player
      playback-id="${playbackId}"
      stream-type="on-demand"
      poster="${posterUrl}"
      accent-color="#1a3a52"
      metadata-video-title="${title}"
      default-hidden-captions
      controls
    ></mux-player>
    <noscript>
      <div class="fallback">
        <a href="${streamUrl}">Watch video</a>
      </div>
    </noscript>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      "Content-Type": "text/html; charset=utf-8",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
