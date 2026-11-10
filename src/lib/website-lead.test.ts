import assert from "node:assert/strict";
import test from "node:test";
import { isPlausiblePhone, isRateLimited, normalizePhone } from "./website-lead.ts";

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

test("rate limit trips on either window", () => {
  assert.equal(isRateLimited({ ipCountLastHour: 5, phoneCountLastDay: 0 }), true);
  assert.equal(isRateLimited({ ipCountLastHour: 0, phoneCountLastDay: 3 }), true);
  assert.equal(isRateLimited({ ipCountLastHour: 4, phoneCountLastDay: 2 }), false);
});
