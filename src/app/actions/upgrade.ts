"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Used only while Paddle checkout is not configured.
 * Records intent to upgrade and does not mark the plan as paid.
 */
export async function requestUpgrade(formData: FormData) {
  const user = await requireUser();
  const plan = formData.get("plan") === "BUSINESS" ? "BUSINESS" : "PRO";
  const existing = await db.upgradeRequest.findFirst({
    where: { userId: user.id, plan, status: "PENDING_PAYMENT_PROVIDER" },
  });
  if (!existing) {
    await db.upgradeRequest.create({ data: { userId: user.id, plan } });
  }
  redirect(`/upgrade?plan=${plan}&requested=1`);
}
