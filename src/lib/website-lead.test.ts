import assert from "node:assert/strict";
import test from "node:test";
import { isPlausiblePhone, isRateLimited, normalizePhone, parseLeadEmail } from "./website-lead.ts";

test("normalizes Israeli phone numbers", () => {
  assert.equal(normalizePhone("050-123-4567"), "0501234567");
  assert.equal(normalizePhone("+972 50 123 4567"), "0501234567");
  assert.equal(normalizePhone("03-555-0101"), "035550101");
  assert.equal(normalizePhone("501234567"), "0501234567");
  assert.equal(isPlausiblePhone("0501234567"), true);
  assert.equal(isPlausiblePhone("035550101"), true);
  assert.equal(isPlausiblePhone("123"), false);
  assert.equal(isPlausiblePhone("050123"), false);
});

test("accepts an optional lead email", () => {
  assert.deepEqual(parseLeadEmail(""), { ok: true, email: null });
  assert.deepEqual(parseLeadEmail("   "), { ok: true, email: null });
  assert.deepEqual(parseLeadEmail("Owner@Example.co.il"), { ok: true, email: "owner@example.co.il" });
  assert.deepEqual(parseLeadEmail("a.b+tag@mail.example.com"), { ok: true, email: "a.b+tag@mail.example.com" });
});

test("rejects a lead email that is not a short address", () => {
  assert.deepEqual(parseLeadEmail("not-an-email"), { ok: false });
  assert.deepEqual(parseLeadEmail("a@b"), { ok: false });
  assert.deepEqual(parseLeadEmail("a @b.com"), { ok: false });
  assert.deepEqual(parseLeadEmail(`${"a".repeat(249)}@b.co`), { ok: true, email: `${"a".repeat(249)}@b.co` });
  assert.deepEqual(parseLeadEmail(`${"a".repeat(250)}@b.co`), { ok: false });
});

test("rate limit trips on either window", () => {
  assert.equal(isRateLimited({ ipCountLastHour: 5, phoneCountLastDay: 0 }), true);
  assert.equal(isRateLimited({ ipCountLastHour: 0, phoneCountLastDay: 3 }), true);
  assert.equal(isRateLimited({ ipCountLastHour: 4, phoneCountLastDay: 2 }), false);
});
