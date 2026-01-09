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

export interface SanityFAQ {
    _id: string;
    _type: "faq";
    question: string;
    answer: any;
    order?: number;
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

export interface InstitutionProfile {
    aboutTitle?: string;
    overview?: string;
    vision?: string;
    mission?: string;
    chedPrograms?: Array<{
        name: string;
        majors?: string[];
        description?: string;
    }>;
    tesdaPrograms?: Array<{
        name: string;
        description?: string;
    }>;
    entryRequirements?: {
        freshmen?: string[];
        transferees?: string[];
        crossRegistrants?: string[];
        degreeHolders?: string[];
    };
}

export interface Settings {
    _id: string;
    _type: "settings";
    siteTitle?: string;
    shortTitle?: string;
    tagline?: string;
    logos?: Logos;
    themeColors?: ThemeColors;
    institutionProfile?: InstitutionProfile;
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
    offeringCategory: "ched" | "tesda" | "short" | "shs";
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

    // Properties referenced in mapCourseToLocalCourse that were missing
    description?: string;
    durationYears?: number;
    careerPaths?: string[];
    competencies?: string[];
    scholarshipsAvailable?: boolean;
    tuitionRange?: string;
    enrollmentCap?: number;
    programType?: string;
    qualificationLevel?: string;
    tesdaRegistrationNumber?: string;
}

export interface Course {
    id: string;
    slug: string;
    title: string;
    category: "ched" | "tesda" | "short" | "shs";
    description?: string;
    duration: string;
    highlights: string[];
    credential?: string;
    scholarshipsAvailable?: boolean;
}

// Student Portal Page types
export interface LinkObject {
    label: string;
    style: "primary" | "secondary" | "text";
    linkType: "page" | "program" | "external" | "email";
    page?: { _ref: string }; // Reference to page
    program?: { _ref: string }; // Reference to course
    url?: string;
    email?: string;
    openInNewTab?: boolean;
}

export interface SoftwareFeature {
    featureName: string;
    shortDescription?: string;
    icon?: SanityImage;
    screenshot?: SanityImage;
    detailedDescription?: any[]; // Portable Text
    highlight?: boolean;
}

export interface SoftwareFeatureSection {
    _key: string;
    _type: "softwareFeatureSection";
    sectionTitle: string;
    sectionDescription?: string;
    layout: "grid" | "list" | "tabs";
    features: SoftwareFeature[];
}

export interface MediaItem {
    title?: string;
    description?: string;
    image?: SanityImage;
    videoUrl?: string;
    order?: number;
}

export interface SoftwareShowcaseSection {
    _key: string;
    _type: "softwareShowcaseSection";
    showcaseTitle: string;
    showcaseSubtitle?: string;
    showcaseType: "gallery" | "video" | "interactive" | "carousel";
    mediaItems: MediaItem[];
}

export interface TechnicalSpecItem {
    label: string;
    value: string;
    description?: string;
}

export interface TechnicalSpecCategory {
    category: string;
    items: TechnicalSpecItem[];
}

export interface TechnicalSpecsSection {
    _key: string;
    _type: "technicalSpecsSection";
    sectionTitle: string;
    sectionDescription?: string;
    specifications: TechnicalSpecCategory[];
}

export interface StudentTestimonial {
    studentName: string;
    studentProgram?: string;
    testimonial: string;
    studentPhoto?: SanityImage;
    rating?: number;
    highlight?: boolean;
}

export interface StudentTestimonialSection {
    _key: string;
    _type: "studentTestimonialSection";
    sectionTitle: string;
    sectionDescription?: string;
    testimonials: StudentTestimonial[];
}

export interface Resource {
    resourceTitle?: string;
    resourceUrl?: string;
    resourceType?: "documentation" | "tutorial" | "download" | "video";
}

export interface GettingStartedStep {
    stepNumber: number;
    stepTitle: string;
    stepDescription?: string;
    stepImage?: SanityImage;
    resources?: Resource[];
}

export interface GettingStartedSection {
    _key: string;
    _type: "gettingStartedSection";
    sectionTitle: string;
    sectionDescription?: string;
    steps: GettingStartedStep[];
}

export type PortalSection =
    | SoftwareFeatureSection
    | SoftwareShowcaseSection
    | TechnicalSpecsSection
    | StudentTestimonialSection
    | GettingStartedSection;

export interface HeroImage {
    image: SanityImage;
    title?: string;
    description?: string;
    cta?: { label?: string; url?: string };
    order?: number;
    isPrimary?: boolean;
}

export interface HeroSection {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    heroLayout: "single" | "carousel" | "gallery" | "alternating";
    heroImages?: HeroImage[];
    heroImage?: SanityImage; // Primary image for 'single' layout
    backgroundImage?: SanityImage;
    carouselSettings?: {
        autoPlay?: boolean;
        interval?: number;
        showDots?: boolean;
        showArrows?: boolean;
    };
    ctas?: LinkObject[];
}

export interface OverviewSection {
    overviewTitle: string;
    overviewDescription: string;
    keyBenefits?: Array<{ benefit: string; description?: string }>;
}

export interface TargetAudience {
    audienceType: string;
    customAudience?: string;
}

export interface AccessInfo {
    accessMethod?: "free-all" | "free-program" | "subscription" | "purchase" | "campus";
    accessLink?: string;
    accessInstructions?: string;
}

export interface SupportInfo {
    supportEmail?: string;
    documentationLink?: string;
    tutorialLink?: string;
    supportHours?: string;
}

export interface StudentPortalPage {
    _id: string;
    _type: "studentPortalPage";
    title: string;
    slug: { current: string };
    softwareName: string;
    hero?: HeroSection;
    softwareVersion?: string;
    softwareCategory?: string;
    overview?: OverviewSection;
    sections?: PortalSection[];
    targetAudience?: TargetAudience[];
    accessInfo?: AccessInfo;
    supportInfo?: SupportInfo;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        shareImage?: SanityImage;
        noIndex?: boolean;
    };
    lastUpdated?: string;
}
