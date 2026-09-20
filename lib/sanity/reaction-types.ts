export const ARTICLE_REACTION_KINDS = ["like", "clap", "inspired", "proud"] as const;

export type ArticleReactionKind = (typeof ARTICLE_REACTION_KINDS)[number];
export type ArticleReactionSource = "sanity" | "facebook";

export type ArticleReactionIdentity = {
  source: ArticleReactionSource;
  sourceId: string;
  slug: string;
  title: string;
};

export type ArticleReactionCounts = Record<ArticleReactionKind, number>;

export type ArticleReactionState = {
  available: boolean;
  counts: ArticleReactionCounts;
  selected: ArticleReactionKind | null;
  total: number;
  message?: string;
};
