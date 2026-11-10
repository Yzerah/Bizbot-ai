import { createHmac, timingSafeEqual } from "crypto";
import type { PlanId } from "./plans";

export const PADDLE_WEBHOOK_PATH = "/api/paddle/webhook";

/** Subscribe the notification destination to these subscription lifecycle events. */
export const PADDLE_SUBSCRIPTION_EVENTS = [
  "subscription.created",
  "subscription.updated",
  "subscription.activated",
  "subscription.canceled",
  "subscription.past_due",
  "subscription.paused",
  "subscription.resumed",
  "subscription.trialing",
] as const;

// Paddle's sample rejects signatures older than five seconds. That window also
// rejects legitimate retries: the timestamp is when the payload was signed, and
// Paddle redelivers the same payload for days. HMAC is required; timestamps more
// than five minutes ahead or five days old are rejected.
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000;
const MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000;

const CUSTOMER_ID = /^ctm_[a-z\d]{26}$/;
const SUBSCRIPTION_ID = /^sub_[a-z\d]{26}$/;

export type PaddleEnvironment = "sandbox" | "production";

export type PaddleCheckoutConfig = {
  enabled: boolean;
  environment: PaddleEnvironment;
  clientToken: string;
  pricePro: string;
  priceBusiness: string;
};

export type SubscriptionSnapshot = {
  eventType: string;
  occurredAt: Date;
  subscriptionId: string;
  customerId: string;
  status: string;
  priceIds: string[];
  periodEnd: Date | null;
  cancelAt: Date | null;
  userId: string | null;
  email: string | null;
};

function envValue(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

export function paddleEnvironment(): PaddleEnvironment | null {
  const value = envValue("NEXT_PUBLIC_PADDLE_ENV");
  if (value === "sandbox" || value === "production") return value;
  return null;
}

export function paddleApiBase(environment: PaddleEnvironment) {
  return environment === "sandbox" ? "https://sandbox-api.paddle.com" : "https://api.paddle.com";
}

export function getPaddleCheckoutConfig(): PaddleCheckoutConfig {
  const environment = paddleEnvironment();
  const clientToken = envValue("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
  const pricePro = envValue("NEXT_PUBLIC_PADDLE_PRICE_PRO");
  const priceBusiness = envValue("NEXT_PUBLIC_PADDLE_PRICE_BUSINESS");
  return {
    enabled: Boolean(environment && clientToken && pricePro && priceBusiness),
    environment: environment ?? "production",
    clientToken,
    pricePro,
    priceBusiness,
  };
}

export function paddleApiKey() {
  return envValue("PADDLE_API_KEY");
}

export function paddleWebhookSecret() {
  return envValue("PADDLE_WEBHOOK_SECRET");
}

export function paddleBillingApiReady() {
  return Boolean(paddleApiKey() && paddleEnvironment());
}

export function verifyPaddleSignature(rawBody: string, signatureHeader: string, secret: string, now = Date.now()) {
  if (!rawBody || !signatureHeader || !secret) return false;
  const parsed = parseSignatureHeader(signatureHeader);
  if (!parsed) return false;
  const timestampMs = Number(parsed.ts) * 1000;
  if (!Number.isFinite(timestampMs)) return false;
  const drift = now - timestampMs;
  if (drift < -MAX_FUTURE_SKEW_MS || drift > MAX_AGE_MS) return false;

  const expected = createHmac("sha256", secret).update(`${parsed.ts}:${rawBody}`, "utf8").digest("hex");
  return parsed.h1.some((candidate) => safeEqual(expected, candidate));
}

function parseSignatureHeader(header: string) {
  let ts = "";
  const h1: string[] = [];
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (!value) continue;
    if (key === "ts") ts = value;
    else if (key === "h1") h1.push(value);
  }
  if (!/^\d+$/.test(ts) || h1.length === 0) return null;
  return { ts, h1 };
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function planFromPriceIds(priceIds: string[], pricePro: string, priceBusiness: string): PlanId | null {
  if (priceBusiness && priceIds.includes(priceBusiness)) return "BUSINESS";
  if (pricePro && priceIds.includes(pricePro)) return "PRO";
  return null;
}

/** Paid access follows the stored subscription. past_due does not keep the paid plan. */
export function entitledPlan(status: string, catalogPlan: PlanId | null, periodEnd: Date | null, now = new Date()): PlanId {
  if (!catalogPlan) return "FREE";
  if (status === "active" || status === "trialing") return catalogPlan;
  if ((status === "canceled" || status === "paused") && periodEnd && periodEnd.getTime() > now.getTime()) {
    return catalogPlan;
  }
  return "FREE";
}

export function blocksNewCheckout(status: string | null | undefined) {
  return status === "active" || status === "trialing" || status === "past_due" || status === "paused";
}

export function isPaddleCustomerId(value: string | null | undefined): value is string {
  return typeof value === "string" && CUSTOMER_ID.test(value);
}

export function isPaddleSubscriptionId(value: string | null | undefined): value is string {
  return typeof value === "string" && SUBSCRIPTION_ID.test(value);
}

export function isPaddlePortalUrl(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname;
    return (
      url.protocol === "https:" &&
      (host === "paddle.com" || host.endsWith(".paddle.com") || host === "paddle.net" || host.endsWith(".paddle.net"))
    );
  } catch {
    return false;
  }
}

export function parseSubscriptionNotification(body: unknown): SubscriptionSnapshot | null {
  if (!body || typeof body !== "object") return null;
  const event = body as Record<string, unknown>;
  if (typeof event.event_type !== "string" || !event.event_type.startsWith("subscription.")) return null;
  return readSubscriptionEntity(event.data, {
    eventType: event.event_type,
    occurredAt: parseDate(event.occurred_at) ?? new Date(),
  });
}

export function readSubscriptionEntity(
  data: unknown,
  meta: { eventType: string; occurredAt: Date },
): SubscriptionSnapshot | null {
  if (!data || typeof data !== "object") return null;
  const subscription = data as Record<string, unknown>;
  if (!isPaddleSubscriptionId(asString(subscription.id))) return null;
  if (!isPaddleCustomerId(asString(subscription.customer_id))) return null;
  const status = asString(subscription.status);
  if (!status) return null;

  const custom = subscription.custom_data;
  const userId = readCustomString(custom, ["userId", "user_id"]);
  const email = readCustomString(custom, ["email"]);
  let cancelAt: Date | null = null;
  if (subscription.scheduled_change && typeof subscription.scheduled_change === "object") {
    const change = subscription.scheduled_change as Record<string, unknown>;
    if (change.action === "cancel") cancelAt = parseDate(change.effective_at);
  }
  let periodEnd: Date | null = null;
  if (subscription.current_billing_period && typeof subscription.current_billing_period === "object") {
    periodEnd = parseDate((subscription.current_billing_period as Record<string, unknown>).ends_at);
  }

  return {
    eventType: meta.eventType,
    occurredAt: meta.occurredAt,
    subscriptionId: subscription.id as string,
    customerId: subscription.customer_id as string,
    status,
    priceIds: priceIdsFromItems(subscription.items),
    periodEnd,
    cancelAt,
    userId: userId && /^[A-Za-z0-9_-]{1,80}$/.test(userId) ? userId : null,
    email: email ? email.trim().toLowerCase() : null,
  };
}

function priceIdsFromItems(items: unknown) {
  if (!Array.isArray(items)) return [];
  const ids: string[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const price = (item as Record<string, unknown>).price;
    if (!price || typeof price !== "object") continue;
    const id = (price as Record<string, unknown>).id;
    if (typeof id === "string" && id.startsWith("pri_")) ids.push(id);
  }
  return ids;
}

function readCustomString(custom: unknown, keys: string[]) {
  if (!custom || typeof custom !== "object") return null;
  const record = custom as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return null;
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseDate(value: unknown) {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
