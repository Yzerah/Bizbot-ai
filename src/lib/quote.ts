import { z } from "zod";

export const VAT_RATE = 0.18;

export type LineItem = { description: string; quantity: number; unitPrice: number };

export const lineItemSchema = z.object({
  description: z.string().trim().min(1, "יש למלא תיאור לכל שורה").max(300),
  quantity: z.coerce.number().positive("כמות חייבת להיות גדולה מ-0").max(1_000_000),
  unitPrice: z.coerce.number().min(0, "מחיר לא יכול להיות שלילי").max(100_000_000),
});

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

export const quoteInputSchema = z.object({
  title: optional(120),
  sellerName: z.string().trim().min(1, "יש למלא את שם העסק").max(120),
  sellerPhone: optional(40),
  sellerEmail: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? v : null))
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "כתובת האימייל של העסק לא תקינה"),
  sellerTaxId: optional(20),
  sellerLogo: z
    .string()
    .max(400_000, "הלוגו גדול מדי (עד 250KB)")
    .optional()
    .nullable()
    .transform((v) => (v ? v : null))
    .refine((v) => !v || /^data:image\/(png|jpeg|jpg);base64,/.test(v), "לוגו חייב להיות PNG או JPG"),
  clientName: z.string().trim().min(1, "יש למלא את שם הלקוח").max(120),
  clientDetails: optional(500),
  items: z.array(lineItemSchema).min(1, "יש להוסיף לפחות שורה אחת").max(50),
  vatEnabled: z.boolean(),
  validityDays: z.coerce.number().int().min(1, "תוקף מינימלי: יום אחד").max(365),
  notes: optional(2000),
});

export type QuoteInput = z.input<typeof quoteInputSchema>;

/** All money math in agorot (integers). */
export function lineTotalAgorot(item: { quantity: number; unitPrice: number }) {
  const q = Number(item.quantity) || 0;
  const p = Number(item.unitPrice) || 0;
  return Math.round(q * Math.round(p * 100));
}

export function computeTotals(items: { quantity: number; unitPrice: number }[], vatEnabled: boolean) {
  const subtotal = items.reduce((sum, it) => sum + lineTotalAgorot(it), 0);
  const vat = vatEnabled ? Math.round(subtotal * VAT_RATE) : 0;
  return { subtotal, vat, total: subtotal + vat };
}

export function parseItems(json: string): LineItem[] {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
