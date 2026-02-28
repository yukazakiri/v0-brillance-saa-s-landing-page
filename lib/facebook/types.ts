// Facebook Graph API Types

export type FacebookPostAttachment = {
  media_type?: "photo" | "video" | "link" | "album" | "share";
  media?: {
    image?: {
      height?: number;
      width?: number;
      src?: string;
    };
    source?: string; // Video URL
  };
  target?: {
    id?: string;
    url?: string;
  };
  title?: string;
  description?: string;
  type?: string;
  url?: string;
};

// Original post data for shared posts
export type FacebookOriginalPost = {
  id?: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  full_picture?: string;
  picture?: string;
  from?: {
    id?: string;
    name?: string;
    category?: string;
  };
  attachments?: {
    data: FacebookPostAttachment[];
  };
  name?: string;
  description?: string;
  link?: string;
  type?: string;
  status_type?: string;
};

export type FacebookPost = {
  id: string;
  created_time: string;
  message?: string;
  story?: string;
  permalink_url?: string;
  attachments?: {
    data: FacebookPostAttachment[];
  };
  full_picture?: string;
  picture?: string;
  name?: string;
  description?: string;
  link?: string;
  type?: string;
  status_type?: string;
  // Shared post fields
  is_shared?: boolean;
  parent_id?: string;
  shared_from?: {
    id?: string;
    name?: string;
  };
  original_post?: FacebookOriginalPost;
  // Engagement fields
  likes?: {
    summary?: {
      total_count?: number;
    };
  };
  comments?: {
    summary?: {
      total_count?: number;
    };
  };
  shares?: {
    count?: number;
  };
};

export type FacebookPostsResponse = {
  data: FacebookPost[];
  paging?: {
    previous?: string;
    next?: string;
  };
};

export type FacebookPageInfo = {
  id: string;
  name: string;
  username?: string;
  about?: string;
  description?: string;
  category?: string;
  category_list?: Array<{
    id: string;
    name: string;
  }>;
  picture?: {
    data?: {
      url?: string;
      height?: number;
      width?: number;
      is_silhouette?: boolean;
    };
  };
  cover?: {
    source?: string;
    id?: string;
  };
  fan_count?: number;
  followers_count?: number;
  link?: string;
  website?: string;
};

// Config type for Facebook integration
export type FacebookConfig = {
  pageId: string;
  accessToken: string;
  appId?: string;
  appSecret?: string;
};

// Normalized post type for display in the app
export type NormalizedFacebookPost = {
  id: string;
  message: string | null;
  createdAt: string;
  permalink: string;
  image: string | null;
  link: string | null;
  type: "photo" | "video" | "link" | "status" | "album" | "share";
  likes: number;
  comments: number;
  shares: number;
  attachments: FacebookPostAttachment[];
  // Shared post fields
  isShared: boolean;
  sharedFrom?: {
    id?: string;
    name?: string;
  };
  originalPost?: {
    id?: string;
    message?: string;
    permalink?: string;
    image?: string;
    author?: {
      id?: string;
      name?: string;
    };
  };
};
