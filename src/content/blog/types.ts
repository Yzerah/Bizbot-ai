/** A paragraph or list item may contain markdown-style links: [label](/path). */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "checklist"; items: string[] }
  | {
      type: "table";
      caption: string;
      columns: [string, string, string];
      rows: [string, string, string][];
      footer?: [string, string];
    }
  | { type: "note"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  blocks: BlogBlock[];
};
