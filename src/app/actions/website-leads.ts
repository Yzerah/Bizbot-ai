"use server";

import { db } from "@/lib/db";
import { clientIpHash } from "@/lib/client-ip";
import { SELLER_EMAIL } from "@/lib/seller";
import { BUSINESS_TYPES, isWebsitePackageId } from "@/lib/website-packages";
import { isPlausiblePhone, isRateLimited, LEAD_LIMITS, normalizePhone, parseLeadEmail } from "@/lib/website-lead";

export type LeadState = { ok?: boolean; error?: string } | undefined;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export async function submitWebsiteLead(_: LeadState, formData: FormData): Promise<LeadState> {
  if (String(formData.get("bizbot_hp") ?? "").trim()) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  const parsedEmail = parseLeadEmail(String(formData.get("email") ?? ""));
  const businessType = String(formData.get("businessType") ?? "");
  const packageId = String(formData.get("packageId") ?? "");
  const hosting = formData.get("hosting") === "on";
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > LEAD_LIMITS.name) return { error: "צריך שם, עד 80 תווים." };
  if (!isPlausiblePhone(phone)) return { error: "מספר טלפון ישראלי לא תקין." };
  if (!parsedEmail.ok) return { error: "כתובת האימייל לא תקינה." };
  if (!BUSINESS_TYPES.some((type) => type.id === businessType)) return { error: "בחרו סוג עסק." };
  if (!isWebsitePackageId(packageId)) return { error: "בחרו חבילה." };
  if (message.length > LEAD_LIMITS.message) return { error: "ההודעה ארוכה מדי." };

  try {
    const ipHash = await clientIpHash();
    const now = Date.now();
    const [ipCountLastHour, phoneCountLastDay] = await Promise.all([
      db.websiteLead.count({ where: { ipHash, createdAt: { gte: new Date(now - HOUR_MS) } } }),
      db.websiteLead.count({ where: { phone, createdAt: { gte: new Date(now - DAY_MS) } } }),
    ]);
    if (isRateLimited({ ipCountLastHour, phoneCountLastDay })) {
      return { error: "קיבלנו כמה פניות בזמן קצר. אפשר לנסות שוב מאוחר יותר." };
    }

    await db.websiteLead.create({
      data: {
        name,
        phone,
        email: parsedEmail.email,
        businessType,
        packageId,
        hosting,
        message: message || null,
        ipHash,
      },
    });
  } catch (error) {
    console.error("[website-lead] save failed", error);
    return { error: `לא הצלחנו לשמור את הפנייה. כתבו אל ${SELLER_EMAIL}.` };
  }

  return { ok: true };
}
