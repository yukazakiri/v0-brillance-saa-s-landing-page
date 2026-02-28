// Facebook Graph API integration
// Exports all types and functions for fetching and displaying Facebook posts

export type {
  FacebookPostAttachment,
  FacebookPost,
  FacebookPostsResponse,
  FacebookPageInfo,
  FacebookConfig,
  NormalizedFacebookPost,
} from "./types";

export {
  getFacebookConfig,
  fetchFacebookPageInfo,
  fetchFacebookPosts,
  normalizeFacebookPost,
  getFacebookPosts,
  formatFacebookDate,
  truncateMessage,
} from "./client";
