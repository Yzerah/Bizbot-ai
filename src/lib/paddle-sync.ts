import "server-only";
import { db } from "./db";
import { getPaddleCheckoutConfig, entitledPlan, parseSubscriptionNotification, planFromPriceIds, type SubscriptionSnapshot } from "./paddle";
import type { PlanId } from "./plans";

export class PaddleRetryError extends Error {}

export async function applyPaddleNotification(body: unknown) {
  const snapshot = parseSubscriptionNotification(body);
  if (!snapshot) return;
  await syncSubscription(snapshot);
}

export async function syncSubscription(snapshot: SubscriptionSnapshot) {
  const { pricePro, priceBusiness } = getPaddleCheckoutConfig();
  const catalogPlan = planFromPriceIds(snapshot.priceIds, pricePro, priceBusiness);
  const activating = snapshot.status === "active" || snapshot.status === "trialing";
  if (activating && !catalogPlan && (!pricePro || !priceBusiness)) {
    throw new PaddleRetryError("Paddle price ids are not configured");
  }

  const user = await findUser(snapshot);
  if (!user) {
    console.warn(`[paddle] ignored ${snapshot.eventType} ${snapshot.subscriptionId}: no matching user`);
    return;
  }
  if (snapshot.email && user.email.toLowerCase() !== snapshot.email) {
    console.warn(`[paddle] ignored ${snapshot.eventType} ${snapshot.subscriptionId}: email does not match user ${user.id}`);
    return;
  }
  if (user.paddleLastEventAt && snapshot.occurredAt < user.paddleLastEventAt) return;
  if (user.paddleSubscriptionId && user.paddleSubscriptionId !== snapshot.subscriptionId && !activating && isStoredPaid(user.plan)) {
    return;
  }

  let plan: PlanId;
  if (catalogPlan) {
    plan = entitledPlan(snapshot.status, catalogPlan, snapshot.periodEnd);
  } else if (!activating && user.paddleSubscriptionId === snapshot.subscriptionId) {
    plan = "FREE";
  } else {
    plan = isStoredPaid(user.plan) ? user.plan : "FREE";
    console.error(`[paddle] price ${snapshot.priceIds.join(",") || "none"} is not a configured plan; left ${user.id} on ${plan}`);
  }

  const priceId =
    catalogPlan === "BUSINESS" ? priceBusiness : catalogPlan === "PRO" ? pricePro : (snapshot.priceIds[0] ?? null);

  await db.user.update({
    where: { id: user.id },
    data: {
      plan,
      paddleCustomerId: snapshot.customerId,
      paddleSubscriptionId: snapshot.subscriptionId,
      subscriptionStatus: snapshot.status,
      subscriptionPriceId: priceId,
      subscriptionPeriodEnd: snapshot.periodEnd,
      subscriptionCancelAt: snapshot.cancelAt,
      paddleLastEventAt: snapshot.occurredAt,
    },
  });
  console.info(`[paddle] ${snapshot.eventType} ${snapshot.subscriptionId} -> user ${user.id} plan ${plan} status ${snapshot.status}`);
}

function isStoredPaid(plan: string): plan is "PRO" | "BUSINESS" {
  return plan === "PRO" || plan === "BUSINESS";
}

async function findUser(snapshot: SubscriptionSnapshot) {
  if (snapshot.userId) {
    const byId = await db.user.findUnique({ where: { id: snapshot.userId } });
    if (byId) return byId;
  }
  const bySubscription = await db.user.findUnique({ where: { paddleSubscriptionId: snapshot.subscriptionId } });
  if (bySubscription) return bySubscription;
  return db.user.findFirst({ where: { paddleCustomerId: snapshot.customerId } });
}
