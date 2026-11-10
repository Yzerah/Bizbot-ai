import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, test } from "node:test";
import {
  entitledPlan,
  getPaddleCheckoutConfig,
  parseSubscriptionNotification,
  planFromPriceIds,
  verifyPaddleSignature,
} from "./paddle.ts";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

function sign(secret: string, body: string, ts: number) {
  const h1 = createHmac("sha256", secret).update(`${ts}:${body}`).digest("hex");
  return `ts=${ts};h1=${h1}`;
}

test("accepts a valid signature and a second h1 from secret rotation", () => {
  const secret = "pdl_ntfset_test_secret";
  const body = JSON.stringify({ event_type: "subscription.updated", data: { id: "sub_x" } });
  const ts = Math.floor(Date.now() / 1000) - 30;
  const header = sign(secret, body, ts);
  assert.equal(verifyPaddleSignature(body, header, secret), true);
  assert.equal(verifyPaddleSignature(body, `${header};h1=${"ab".repeat(32)}`, secret), true);
  assert.equal(verifyPaddleSignature(`${body} `, header, secret), false);
  assert.equal(verifyPaddleSignature(body, header, "other-secret"), false);
});

test("rejects timestamps outside the retry window", () => {
  const secret = "secret";
  const body = "{}";
  const now = Date.UTC(2026, 10, 10, 12, 0, 0);
  const fresh = sign(secret, body, Math.floor(now / 1000) - 6);
  const old = sign(secret, body, Math.floor(now / 1000) - 6 * 24 * 60 * 60);
  const future = sign(secret, body, Math.floor(now / 1000) + 10 * 60);
  assert.equal(verifyPaddleSignature(body, fresh, secret, now), true);
  assert.equal(verifyPaddleSignature(body, old, secret, now), false);
  assert.equal(verifyPaddleSignature(body, future, secret, now), false);
  assert.equal(verifyPaddleSignature(body, "nope", secret, now), false);
});

test("maps price ids and subscription status onto the stored plan", () => {
  assert.equal(planFromPriceIds(["pri_pro"], "pri_pro", "pri_biz"), "PRO");
  assert.equal(planFromPriceIds(["pri_addon", "pri_biz"], "pri_pro", "pri_biz"), "BUSINESS");
  assert.equal(planFromPriceIds(["pri_other"], "pri_pro", "pri_biz"), null);
  const later = new Date("2026-12-01T00:00:00Z");
  const now = new Date("2026-11-10T00:00:00Z");
  assert.equal(entitledPlan("active", "PRO", later, now), "PRO");
  assert.equal(entitledPlan("trialing", "BUSINESS", null, now), "BUSINESS");
  assert.equal(entitledPlan("past_due", "PRO", later, now), "FREE");
  assert.equal(entitledPlan("canceled", "PRO", later, now), "PRO");
  assert.equal(entitledPlan("canceled", "PRO", null, now), "FREE");
  assert.equal(entitledPlan("paused", "PRO", null, now), "FREE");
  assert.equal(entitledPlan("active", null, later, now), "FREE");
});

test("reads the subscription snapshot used to update a user", () => {
  const snapshot = parseSubscriptionNotification({
    event_type: "subscription.created",
    occurred_at: "2026-11-10T12:00:00.000Z",
    data: {
      id: "sub_01hv8x29kz0t586xy6zn1a62ny",
      customer_id: "ctm_01hv6y1jedq4p1n0yqn5ba3ky4",
      status: "active",
      custom_data: { userId: "user_123", email: "Zerahyaniv@gmail.com" },
      items: [{ price: { id: "pri_pro_monthly" } }],
      current_billing_period: { starts_at: "2026-11-10T12:00:00.000Z", ends_at: "2026-12-10T12:00:00.000Z" },
      scheduled_change: { action: "cancel", effective_at: "2026-12-10T12:00:00.000Z" },
    },
  });
  assert.ok(snapshot);
  assert.equal(snapshot.userId, "user_123");
  assert.equal(snapshot.email, "zerahyaniv@gmail.com");
  assert.equal(snapshot.status, "active");
  assert.deepEqual(snapshot.priceIds, ["pri_pro_monthly"]);
  assert.equal(snapshot.periodEnd?.toISOString(), "2026-12-10T12:00:00.000Z");
  assert.equal(snapshot.cancelAt?.toISOString(), "2026-12-10T12:00:00.000Z");
  assert.equal(parseSubscriptionNotification({ event_type: "transaction.completed", data: {} }), null);
});

test("checkout stays disabled until every public Paddle variable is set", () => {
  delete process.env.NEXT_PUBLIC_PADDLE_ENV;
  delete process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  delete process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO;
  delete process.env.NEXT_PUBLIC_PADDLE_PRICE_BUSINESS;
  assert.equal(getPaddleCheckoutConfig().enabled, false);

  process.env.NEXT_PUBLIC_PADDLE_ENV = "sandbox";
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN = "test_token";
  process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO = "pri_pro";
  assert.equal(getPaddleCheckoutConfig().enabled, false);

  process.env.NEXT_PUBLIC_PADDLE_PRICE_BUSINESS = "pri_biz";
  const config = getPaddleCheckoutConfig();
  assert.equal(config.enabled, true);
  assert.equal(config.environment, "sandbox");
  assert.equal(config.pricePro, "pri_pro");
});
