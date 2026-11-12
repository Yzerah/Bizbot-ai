import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("Search Console file is one verification line and is not redirected", () => {
  const raw = readFileSync(new URL("../../public/google30a65c06550bbcc7.html", import.meta.url), "utf8");
  const lines = raw.split(/\r?\n/).filter((line) => line.length > 0);
  assert.deepEqual(lines, ["google-site-verification: google30a65c06550bbcc7.html"]);

  const config = readFileSync(new URL("../../next.config.ts", import.meta.url), "utf8");
  assert.equal(config.includes("google30a65c06550bbcc7"), true);
  assert.equal(/source:\s*"\/google30a65c06550bbcc7/.test(config), false);
});
