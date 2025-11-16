import { defineType, defineField } from "sanity";

// Sanity document types
export interface SanityPost {
  _id: string;
  _type: "post";
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: any[]; // Portable text blocks
  category?: string;
  tags?: string[];
  publishedAt: string;
  author?: string;
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  featured?: boolean;
  status: "draft" | "published" | "archived";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: {
      asset: {
        _ref: string;
        _type: "reference";
      };
      alt?: string;
    };
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

// Sanity schema definitions (for future reference/schema setup)
export const newsArticleSchema = defineType({
  title: "News Article",
  name: "newsArticle",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Announcement", value: "announcement" },
          { title: "Events", value: "events" },
          { title: "Achievement", value: "achievement" },
          { title: "News", value: "news" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      initialValue: false,
    }),
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "featuredImage",
      category: "category",
    },
    prepare(selection) {
      const { title, author, media, category } = selection;
      return {
        title,
        subtitle: `${author} • ${category}`,
        media,
      };
    },
  },
});
