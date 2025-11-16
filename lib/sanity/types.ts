// Sanity Asset types
export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
  };
}

export interface SanityImage {
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  credit?: string;
  externalUrl?: string;
}

// Sanity document types
export interface SanityPost {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any[]; // Portable text blocks with resolved image assets
  postKind?: "news" | "story" | "announcement" | "alert";
  contentFocus?: "news" | "research" | "student-life" | "athletics" | "press";
  priority?: "normal" | "high" | "critical";
  category?: string; // Legacy field
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  author?: string; // Legacy field
  authors?: Array<{ _id: string; name: string }>; // Author profiles
  featuredImage?: SanityImage;
  featured?: boolean;
  status: "draft" | "scheduled" | "published" | "archived";
  primaryCategory?: {
    _id: string;
    title: string;
  };
  audiences?: string[];
  channels?: string[];
  activationWindow?: {
    start?: string;
    end?: string;
  };
  cta?: {
    label?: string;
    url?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: SanityImage;
    canonicalUrl?: string;
  };
}

// Local article interface (with processed image URLs)
export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  featured: boolean;
  content?: string;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface SiteConfig {
  _id: string;
  _type: "siteConfig";
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  ogImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface NewsListingPage {
  _id: string;
  _type: "newsListingPage";
  title: string;
  description: string;
  heroImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

// Global Settings types
export interface ContactDirectory {
  label?: string;
  email?: string;
  phone?: string;
  hours?: string;
  url?: string;
}

export interface Address {
  label?: string;
  address?: string;
  phone?: string;
}

export interface SocialLink {
  platform: string;
  handle?: string;
  url: string;
}

export interface Logos {
  primary?: SanityImage;
  horizontal?: SanityImage;
  icon?: SanityImage;
}

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
}

export interface DefaultSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  shareImage?: SanityImage;
}

export interface EmergencyAlert {
  isActive?: boolean;
  severity?: "info" | "reminder" | "urgent" | "emergency";
  message?: string;
  audiences?: string[];
  linkLabel?: string;
  linkUrl?: string;
  startTime?: string;
  endTime?: string;
}

export interface Governance {
  contentOwner?: string;
  lastReviewed?: string;
  reviewCadence?: string;
}

export interface Analytics {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  matomoSiteId?: string;
  metaPixelId?: string;
}

export interface Settings {
  _id: string;
  _type: "settings";
  siteTitle?: string;
  shortTitle?: string;
  tagline?: string;
  logos?: Logos;
  themeColors?: ThemeColors;
  contactDirectory?: ContactDirectory[];
  addresses?: Address[];
  campusLocations?: any[]; // Reference to campusLocation documents
  socialLinks?: SocialLink[];
  defaultSeo?: DefaultSeo;
  emergencyAlert?: EmergencyAlert;
  governance?: Governance;
  analytics?: Analytics;
}

// Course types - Full schema from Sanity
export interface SanityCourse {
  _id: string;
  _type: "course";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  heroImage?: SanityImage;
  offeringCategory: "ched" | "tesda" | "short";
  degreeType?: "bachelor" | "master" | "doctorate" | "certificate";
  credential?: string;
  majors?: string[];
  tesdaQualification?: string;
  tesdaCompetencyLevel?: string;
  trainingHours?: string;
  department?: {
    _id: string;
    title: string;
  };
  deliveryMode?: "on-campus" | "hybrid" | "online" | "modular";
  duration?: string;
  level?: "undergrad" | "graduate" | "tvet";
  summary?: string;
  overview?: any[]; // Portable text
  highlights?: string[];
  learningOutcomes?: string[];
  curriculumStructure?: Array<{
    term?: string;
    description?: string;
  }>;
  relatedOfferings?: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }>;
  code?: string;
  creditHours?: number;
  semesterAvailability?: string[];
  prerequisites?: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }>;
  prerequisiteNotes?: string[];
  corequisites?: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }>;
  instructors?: Array<{
    _id: string;
    name: string;
  }>;
  syllabus?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  admissionsRequirements?: string[];
  applicationDeadlines?: string[];
  tuition?: string;
  financialAidHighlight?: string;
  admissionsContact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  cta?: {
    label?: string;
    url?: string;
  };
  outcomes?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: SanityImage;
  };
  status?: "active" | "inactive" | "archived";
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: "ched" | "tesda" | "short";
  description?: string;
  duration: string;
  highlights: string[];
  credential?: string;
  scholarshipsAvailable?: boolean;
}
