/** One block of an article. Add a post by filling this shape and registering it. */
export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description and index-card summary. */
  description: string;
  kicker: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  /** Reading order on the index. Lower comes first. */
  order: number;
  /** Contract-related guides show a short “not legal advice” note. */
  legalNote: boolean;
  relatedSlugs: string[];
  intro: string[];
  sections: BlogSection[];
};
