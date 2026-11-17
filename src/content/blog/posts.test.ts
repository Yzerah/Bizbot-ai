import assert from "node:assert/strict";
import test from "node:test";
import { posts } from "./posts";
import { postPlainText, postWordCount } from "./text";

const BLOG_LINK = /\]\(\/blog\/([^)]+)\)/g;

test("blog has eight unique Hebrew articles in the requested length", () => {
  assert.equal(posts.length, 8);
  const slugs = new Set(posts.map((post) => post.slug));
  assert.equal(slugs.size, posts.length);

  for (const post of posts) {
    const words = postWordCount(post);
    assert.ok(
      words >= 900 && words <= 1400,
      `${post.slug} has ${words} words, expected 900–1400`,
    );
    assert.ok(post.blocks.some((block) => block.type === "h2"));
    assert.ok(post.blocks.some((block) => block.type === "h3"));
    assert.ok(post.blocks.some((block) => block.type === "checklist"));
    assert.match(post.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(post.updatedAt >= post.publishedAt, true);

    const ids = post.blocks.flatMap((block) =>
      block.type === "h2" || block.type === "h3" ? [block.id] : [],
    );
    assert.equal(new Set(ids).size, ids.length, `${post.slug} has duplicate heading ids`);

    for (const match of postPlainText(post).matchAll(BLOG_LINK)) {
      assert.ok(slugs.has(match[1]), `${post.slug} links to unknown /blog/${match[1]}`);
    }
  }
});
