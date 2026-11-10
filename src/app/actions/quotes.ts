"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { FREE_QUOTE_LIMIT, isPaid } from "@/lib/plans";
import { computeTotals, quoteInputSchema, VAT_RATE, type QuoteInput } from "@/lib/quote";

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; error: string; limitReached?: boolean };

export async function saveQuote(input: QuoteInput, quoteId?: string): Promise<SaveResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "פג תוקף ההתחברות. יש להתחבר מחדש." };

  const parsed = quoteInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const q = parsed.data;
  const totals = computeTotals(q.items, q.vatEnabled);

  const data = {
    title: q.title,
    sellerName: q.sellerName,
    sellerPhone: q.sellerPhone,
    sellerEmail: q.sellerEmail,
    sellerTaxId: q.sellerTaxId,
    sellerLogo: q.sellerLogo,
    clientName: q.clientName,
    clientDetails: q.clientDetails,
    itemsJson: JSON.stringify(q.items),
    vatEnabled: q.vatEnabled,
    vatRate: VAT_RATE,
    validityDays: q.validityDays,
    notes: q.notes,
    subtotalAgorot: totals.subtotal,
    vatAgorot: totals.vat,
    totalAgorot: totals.total,
  };

  const rememberSeller = {
    businessName: q.sellerName,
    businessPhone: q.sellerPhone,
    businessEmail: q.sellerEmail,
    businessTaxId: q.sellerTaxId,
    businessLogo: q.sellerLogo,
  };

  if (quoteId) {
    const existing = await db.quote.findFirst({ where: { id: quoteId, userId: user.id } });
    if (!existing) return { ok: false, error: "ההצעה לא נמצאה" };
    await db.$transaction([
      db.quote.update({ where: { id: quoteId }, data }),
      db.user.update({ where: { id: user.id }, data: rememberSeller }),
    ]);
    revalidatePath("/dashboard");
    revalidatePath(`/quotes/${quoteId}`);
    return { ok: true, id: quoteId };
  }

  try {
    const created = await db.$transaction(async (tx) => {
      const fresh = await tx.user.findUniqueOrThrow({ where: { id: user.id } });
      if (!isPaid(fresh.plan) && fresh.quotesCreated >= FREE_QUOTE_LIMIT) {
        throw new Error("LIMIT");
      }
      // Running number never reuses a deleted quote's number
      const quote = await tx.quote.create({
        data: { ...data, userId: user.id, number: 1001 + fresh.quotesCreated },
      });
      await tx.user.update({
        where: { id: user.id },
        data: { ...rememberSeller, quotesCreated: { increment: 1 } },
      });
      return quote;
    });
    revalidatePath("/dashboard");
    return { ok: true, id: created.id };
  } catch (e) {
    if (e instanceof Error && e.message === "LIMIT") {
      return {
        ok: false,
        limitReached: true,
        error: `ניצלת את ${FREE_QUOTE_LIMIT} ההצעות של המסלול החינמי.`,
      };
    }
    throw e;
  }
}

export async function deleteQuote(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  await db.quote.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
