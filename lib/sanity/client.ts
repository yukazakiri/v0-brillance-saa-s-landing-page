import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4pzjiopf";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-11-16";

// Use drafts perspective if token is available, otherwise use published
// To see draft posts, set SANITY_API_TOKEN in .env with a read token from Sanity
const hasToken = Boolean(process.env.SANITY_API_TOKEN);
const perspective = hasToken ? "drafts" : "published";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective,
  ...(hasToken && { token: process.env.SANITY_API_TOKEN }),
});

// Preview client for draft content (use in preview routes)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "drafts",
  token: process.env.SANITY_API_TOKEN, // Read token for previews
});
