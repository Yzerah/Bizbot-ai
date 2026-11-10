import type { BlogBlock, BlogPost } from "./types";

const LINK = /\[([^\]]+)\]\([^)]+\)/g;

export function visibleText(text: string) {
  return text.replace(LINK, "$1");
}

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
    case "note":
      return block.text;
    case "ul":
    case "ol":
    case "checklist":
      return block.items.join(" ");
    case "table": {
      const cells = block.rows.flat().join(" ");
      const footer = block.footer ? block.footer.join(" ") : "";
      return [block.caption, ...block.columns, cells, footer].join(" ");
    }
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export function postPlainText(post: Pick<BlogPost, "title" | "description" | "blocks">) {
  return [post.title, post.description, ...post.blocks.map(blockText)].join("\n");
}

/** Whitespace-separated words that contain a letter or number. Link URLs are not counted. */
export function countWords(text: string) {
  const visible = visibleText(text);
  const tokens = visible.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token));
  return tokens.length;
}

export function postWordCount(post: Pick<BlogPost, "title" | "description" | "blocks">) {
  return countWords(postPlainText(post));
}

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 200));
}
