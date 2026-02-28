import type {
  FacebookConfig,
  FacebookPageInfo,
  FacebookPost,
  FacebookPostsResponse,
  NormalizedFacebookPost,
} from "./types";

// Facebook Graph API base URL
const GRAPH_API_BASE = "https://graph.facebook.com/v19.0";

/**
 * Get Facebook configuration from environment variables
 */
export function getFacebookConfig(): FacebookConfig | null {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    console.warn(
      "Facebook integration not configured. Set FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN environment variables.",
    );
    return null;
  }

  return {
    pageId,
    accessToken,
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  };
}

/**
 * Build URL with query parameters for Facebook Graph API
 */
function buildGraphUrl(
  endpoint: string,
  params: Record<string, string>,
): string {
  const searchParams = new URLSearchParams(params);
  return `${GRAPH_API_BASE}/${endpoint}?${searchParams.toString()}`;
}

/**
 * Fetch data from Facebook Graph API
 */
async function fetchFromGraphAPI<T>(
  endpoint: string,
  params: Record<string, string>,
): Promise<T | null> {
  try {
    const url = buildGraphUrl(endpoint, params);
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Facebook API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from Facebook API:", error);
    return null;
  }
}

/**
 * Fetch page information from Facebook
 */
export async function fetchFacebookPageInfo(
  config: FacebookConfig,
): Promise<FacebookPageInfo | null> {
  const fields = [
    "id",
    "name",
    "username",
    "about",
    "description",
    "category",
    "picture.type(large)",
    "cover",
    "fan_count",
    "followers_count",
    "link",
    "website",
  ].join(",");

  const response = await fetchFromGraphAPI<FacebookPageInfo>(config.pageId, {
    fields,
    access_token: config.accessToken,
  });

  return response;
}

/**
 * Fetch posts from Facebook page
 */
export async function fetchFacebookPosts(
  config: FacebookConfig,
  options: {
    limit?: number;
    after?: string;
    before?: string;
  } = {},
): Promise<FacebookPostsResponse | null> {
  const { limit = 10, after, before } = options;

  // Use only supported fields for Graph API v19.0
  // Avoid deprecated aggregated fields
  const fields = [
    "id",
    "created_time",
    "message",
    "story",
    "permalink_url",
    "full_picture",
    "picture",
    "status_type",
  ].join(",");

  const params: Record<string, string> = {
    fields,
    limit: String(limit),
    access_token: config.accessToken,
  };

  if (after) {
    params.after = after;
  }
  if (before) {
    params.before = before;
  }

  const response = await fetchFromGraphAPI<FacebookPostsResponse>(
    `${config.pageId}/posts`,
    params,
  );

  return response;
}

/**
 * Normalize a Facebook post for display
 */
export function normalizeFacebookPost(
  post: FacebookPost,
): NormalizedFacebookPost {
  // Determine the primary image
  const image =
    post.full_picture ||
    post.picture ||
    post.attachments?.data?.[0]?.media?.image?.src ||
    null;

  // Determine the primary link
  const link = post.permalink_url || post.link || null;

  // Check if this is a shared post
  const isShared = Boolean(
    post.is_shared ||
    post.parent_id ||
    post.shared_from ||
    post.status_type === "shared_story" ||
    post.story?.toLowerCase().includes("shared"),
  );

  // Determine post type
  let type: NormalizedFacebookPost["type"] = "status";
  if (isShared) {
    type = "share";
  } else if (post.attachments?.data?.length) {
    const attachmentType = post.attachments.data[0].media_type;
    if (attachmentType === "photo") type = "photo";
    else if (attachmentType === "video") type = "video";
    else if (attachmentType === "link") type = "link";
    else if (attachmentType === "album") type = "album";
    else if (attachmentType === "share") type = "share";
  } else if (post.type === "photo") {
    type = "photo";
  } else if (post.type === "video") {
    type = "video";
  } else if (post.type === "link") {
    type = "link";
  }

  // Build the message
  const message = post.message || post.story || post.name || null;

  // Extract shared post information
  const sharedFrom =
    post.shared_from ||
    (isShared && post.story?.includes("shared")
      ? {
          name: post.story
            .replace(/.*shared.*from\s+/i, "")
            .replace(/'s post.*/i, ""),
        }
      : undefined);

  // Extract original post data if available
  const originalPost = post.original_post
    ? {
        id: post.original_post.id,
        message: post.original_post.message,
        permalink: post.original_post.permalink_url,
        image: post.original_post.full_picture || post.original_post.picture,
        author: post.original_post.from
          ? {
              id: post.original_post.from.id,
              name: post.original_post.from.name,
            }
          : undefined,
      }
    : undefined;

  return {
    id: post.id,
    message,
    createdAt: post.created_time,
    permalink: post.permalink_url || `https://www.facebook.com/${post.id}`,
    image,
    link,
    type,
    likes: post.likes?.summary?.total_count || 0,
    comments: post.comments?.summary?.total_count || 0,
    shares: post.shares?.count || 0,
    attachments: post.attachments?.data || [],
    isShared,
    sharedFrom,
    originalPost,
  };
}

/**
 * Fetch and normalize Facebook posts for display
 * This is the main function to use in your components
 */
export async function getFacebookPosts(options?: {
  limit?: number;
  after?: string;
  before?: string;
}): Promise<{
  posts: NormalizedFacebookPost[];
  pageInfo: FacebookPageInfo | null;
  hasNext: boolean;
  hasPrevious: boolean;
}> {
  const config = getFacebookConfig();

  if (!config) {
    return {
      posts: [],
      pageInfo: null,
      hasNext: false,
      hasPrevious: false,
    };
  }

  // Fetch posts and page info in parallel
  const [postsResponse, pageInfo] = await Promise.all([
    fetchFacebookPosts(config, options),
    fetchFacebookPageInfo(config),
  ]);

  if (!postsResponse) {
    return {
      posts: [],
      pageInfo,
      hasNext: false,
      hasPrevious: false,
    };
  }

  const normalizedPosts = postsResponse.data.map(normalizeFacebookPost);

  return {
    posts: normalizedPosts,
    pageInfo,
    hasNext: !!postsResponse.paging?.next,
    hasPrevious: !!postsResponse.paging?.previous,
  };
}

/**
 * Format date for display
 */
export function formatFacebookDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

/**
 * Truncate message for preview
 */
export function truncateMessage(
  message: string | null,
  maxLength: number = 200,
): string | null {
  if (!message) return null;
  if (message.length <= maxLength) return message;
  return message.slice(0, maxLength).trim() + "...";
}
