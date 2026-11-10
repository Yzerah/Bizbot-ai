"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import {
  isPaddleCustomerId,
  isPaddlePortalUrl,
  isPaddleSubscriptionId,
  paddleApiBase,
  paddleApiKey,
  paddleBillingApiReady,
  paddleEnvironment,
  readSubscriptionEntity,
} from "@/lib/paddle";
import { syncSubscription } from "@/lib/paddle-sync";

export async function openCustomerPortal() {
  const user = await requireUser();
  if (!paddleBillingApiReady()) redirect("/upgrade?billing=unconfigured");
  if (!isPaddleCustomerId(user.paddleCustomerId)) redirect("/upgrade?billing=unavailable");

  const subscriptionIds = isPaddleSubscriptionId(user.paddleSubscriptionId) ? [user.paddleSubscriptionId] : [];
  const result = await paddlePost(`/customers/${user.paddleCustomerId}/portal-sessions`, {
    subscription_ids: subscriptionIds,
  });
  const overview = portalOverview(result?.json);
  if (!result?.ok || !overview) redirect("/upgrade?billing=error");
  redirect(overview);
}

export async function cancelSubscription() {
  const user = await requireUser();
  if (!paddleBillingApiReady()) redirect("/upgrade?billing=unconfigured");
  if (!isPaddleSubscriptionId(user.paddleSubscriptionId)) redirect("/upgrade?billing=unavailable");
  if (user.subscriptionCancelAt && user.subscriptionStatus === "active") {
    redirect("/upgrade?billing=cancel_scheduled");
  }

  const result = await paddlePost(`/subscriptions/${user.paddleSubscriptionId}/cancel`, {
    effective_from: "next_billing_period",
  });
  if (!result?.ok) redirect("/upgrade?billing=error");

  const snapshot = readSubscriptionEntity(paddleData(result.json), {
    eventType: "subscription.updated",
    occurredAt: new Date(),
  });
  if (snapshot && snapshot.subscriptionId === user.paddleSubscriptionId) {
    snapshot.userId = user.id;
    snapshot.email = user.email.toLowerCase();
    try {
      await syncSubscription(snapshot);
    } catch (error) {
      console.error("[paddle] saved the cancellation request; webhook will refresh the subscription", error instanceof Error ? error.name : "");
    }
  }

  revalidatePath("/upgrade");
  revalidatePath("/dashboard");
  redirect("/upgrade?billing=cancel_scheduled");
}

async function paddlePost(path: string, body: unknown) {
  const environment = paddleEnvironment();
  const key = paddleApiKey();
  if (!environment || !key) return null;
  try {
    const response = await fetch(`${paddleApiBase(environment)}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json: unknown = await response.json().catch(() => null);
    if (!response.ok) console.error(`[paddle] ${path} failed with status ${response.status}`);
    return { ok: response.ok, json };
  } catch {
    console.error(`[paddle] ${path} request failed`);
    return null;
  }
}

function paddleData(json: unknown) {
  if (!json || typeof json !== "object" || !("data" in json)) return null;
  return json.data;
}

function portalOverview(json: unknown) {
  const data = paddleData(json);
  if (!data || typeof data !== "object" || !("urls" in data)) return null;
  const urls = data.urls;
  if (!urls || typeof urls !== "object" || !("general" in urls)) return null;
  const general = urls.general;
  if (!general || typeof general !== "object" || !("overview" in general)) return null;
  const overview = general.overview;
  return typeof overview === "string" && isPaddlePortalUrl(overview) ? overview : null;
}
