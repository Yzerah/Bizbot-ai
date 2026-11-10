"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { saveQuote } from "@/app/actions/quotes";
import { formatILS } from "@/lib/format";
import { computeTotals, lineTotalAgorot, type QuoteInput } from "@/lib/quote";

type Row = { key: number; description: string; quantity: string; unitPrice: string };

export type QuoteFormInitial = {
  title?: string | null;
  sellerName?: string | null;
  sellerPhone?: string | null;
  sellerEmail?: string | null;
  sellerTaxId?: string | null;
  sellerLogo?: string | null;
  clientName?: string | null;
  clientDetails?: string | null;
  items?: { description: string; quantity: number; unitPrice: number }[];
  vatEnabled?: boolean;
  validityDays?: number;
  notes?: string | null;
};

let rowKey = 0;
const newRow = (r?: Partial<Row>): Row => ({ key: ++rowKey, description: "", quantity: "1", unitPrice: "", ...r });

/** Downscale the uploaded logo so it stays small in the DB and the PDF. */
async function fileToLogo(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("bad image"));
      i.src = url;
    });
    const max = 360;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">
        {label} {hint && <span className="font-normal text-neutral-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export function QuoteForm({ initial, quoteId, nextNumber }: { initial: QuoteFormInitial; quoteId?: string; nextNumber?: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial.title ?? "");
  const [sellerName, setSellerName] = useState(initial.sellerName ?? "");
  const [sellerPhone, setSellerPhone] = useState(initial.sellerPhone ?? "");
  const [sellerEmail, setSellerEmail] = useState(initial.sellerEmail ?? "");
  const [sellerTaxId, setSellerTaxId] = useState(initial.sellerTaxId ?? "");
  const [sellerLogo, setSellerLogo] = useState<string | null>(initial.sellerLogo ?? null);
  const [clientName, setClientName] = useState(initial.clientName ?? "");
  const [clientDetails, setClientDetails] = useState(initial.clientDetails ?? "");
  const [rows, setRows] = useState<Row[]>(() =>
    initial.items?.length
      ? initial.items.map((i) => newRow({ description: i.description, quantity: String(i.quantity), unitPrice: String(i.unitPrice) }))
      : [newRow()],
  );
  const [vatEnabled, setVatEnabled] = useState(initial.vatEnabled ?? true);
  const [validityDays, setValidityDays] = useState(String(initial.validityDays ?? 30));
  const [notes, setNotes] = useState(initial.notes ?? "");

  const numericRows = rows.map((r) => ({ quantity: parseFloat(r.quantity) || 0, unitPrice: parseFloat(r.unitPrice) || 0 }));
  const totals = computeTotals(numericRows, vatEnabled);

  const update = (key: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  async function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/image\/(png|jpe?g)/.test(f.type)) {
      setError("לוגו חייב להיות קובץ PNG או JPG");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("קובץ הלוגו גדול מדי (עד 5MB)");
      return;
    }
    try {
      setSellerLogo(await fileToLogo(f));
      setError(null);
    } catch {
      setError("לא הצלחנו לקרוא את הקובץ");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const payload: QuoteInput = {
      title,
      sellerName,
      sellerPhone,
      sellerEmail,
      sellerTaxId,
      sellerLogo,
      clientName,
      clientDetails,
      items: rows
        .filter((r) => r.description.trim() || r.unitPrice)
        .map((r) => ({ description: r.description, quantity: parseFloat(r.quantity) || 0, unitPrice: parseFloat(r.unitPrice) || 0 })),
      vatEnabled,
      validityDays: parseInt(validityDays) || 0,
      notes,
    };
    startTransition(async () => {
      const res = await saveQuote(payload, quoteId);
      if (res.ok) {
        router.push(`/quotes/${res.id}${quoteId ? "" : "?created=1"}`);
        router.refresh();
      } else if (res.limitReached) {
        router.push("/upgrade?reason=limit");
      } else {
        setError(res.error);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <section className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">פרטי העסק שלך</h2>
            <span className="text-xs text-neutral-400">נשמרים להצעה הבאה</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-neutral-300 bg-neutral-50">
                {sellerLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={sellerLogo} alt="לוגו העסק" className="h-full w-full object-contain" />
                ) : (
                  <span className="text-xs text-neutral-400">לוגו</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-ghost !py-2 text-sm" onClick={() => fileRef.current?.click()}>
                  {sellerLogo ? "החלפת לוגו" : "העלאת לוגו"}
                </button>
                {sellerLogo && (
                  <button type="button" className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:text-red-600" onClick={() => setSellerLogo(null)}>
                    הסרה
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onLogo} />
                <p className="w-full text-xs text-neutral-400">PNG או JPG, רשות</p>
              </div>
            </div>
            <Field label="שם העסק">
              <input className="input" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required placeholder="לדוגמה: נועה סטודיו לעיצוב" />
            </Field>
            <Field label="עוסק מורשה / ח.פ" hint="(רשות)">
              <input className="input num text-right" inputMode="numeric" value={sellerTaxId} onChange={(e) => setSellerTaxId(e.target.value)} />
            </Field>
            <Field label="טלפון">
              <input className="input num text-right" type="tel" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} placeholder="050-0000000" />
            </Field>
            <Field label="אימייל">
              <input className="input text-right" dir="ltr" type="email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} placeholder="office@example.co.il" />
            </Field>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="mb-5 font-semibold">פרטי הלקוח</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="שם הלקוח">
              <input className="input" value={clientName} onChange={(e) => setClientName(e.target.value)} required placeholder="שם פרטי / שם חברה" />
            </Field>
            <Field label="נושא ההצעה" hint="(רשות)">
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="לדוגמה: עיצוב אתר תדמית" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="כתובת ופרטים נוספים" hint="(רשות)">
                <textarea className="input min-h-20" value={clientDetails} onChange={(e) => setClientDetails(e.target.value)} placeholder="כתובת, ח.פ של הלקוח, איש קשר..." />
              </Field>
            </div>
          </div>
        </section>

        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">פירוט העבודה</h2>
            <span className="text-xs text-neutral-400">מחירים לפני מע״מ</span>
          </div>
          <div className="hidden grid-cols-[1fr_90px_120px_110px_36px] gap-3 px-1 pb-2 text-xs font-medium text-neutral-500 md:grid">
            <span>תיאור</span><span>כמות</span><span>מחיר ליחידה (₪)</span><span>סה״כ</span><span />
          </div>
          <div className="space-y-3">
            {rows.map((r, idx) => (
              <div key={r.key} className="grid grid-cols-2 gap-3 rounded-xl border border-neutral-100 p-3 md:grid-cols-[1fr_90px_120px_110px_36px] md:items-center md:border-0 md:p-1">
                <input
                  className="input col-span-2 md:col-span-1"
                  value={r.description}
                  onChange={(e) => update(r.key, { description: e.target.value })}
                  placeholder={`תיאור שורה ${idx + 1}`}
                  aria-label="תיאור"
                />
                <input className="input num text-right" type="number" min="0" step="any" inputMode="decimal" value={r.quantity} onChange={(e) => update(r.key, { quantity: e.target.value })} aria-label="כמות" />
                <input className="input num text-right" type="number" min="0" step="any" inputMode="decimal" value={r.unitPrice} onChange={(e) => update(r.key, { unitPrice: e.target.value })} placeholder="0" aria-label="מחיר ליחידה" />
                <div className="num text-right text-sm font-medium text-neutral-700 md:px-1">
                  {formatILS(lineTotalAgorot(numericRows[idx]))}
                </div>
                <button
                  type="button"
                  onClick={() => setRows((rs) => (rs.length > 1 ? rs.filter((x) => x.key !== r.key) : [newRow()]))}
                  className="grid h-9 w-9 place-items-center justify-self-end rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="הסרת שורה"
                  title="הסרת שורה"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setRows((rs) => [...rs, newRow()])} className="mt-4 text-sm font-semibold text-royal-600 hover:text-royal-700">
            + הוספת שורה
          </button>
        </section>

        <section className="card p-6">
          <h2 className="mb-5 font-semibold">תנאים והערות</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="תוקף ההצעה (ימים)">
              <input className="input num text-right" type="number" min="1" max="365" value={validityDays} onChange={(e) => setValidityDays(e.target.value)} required />
            </Field>
            <div className="flex items-end">
              <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-200 px-4 py-2.5">
                <span className="text-sm font-medium">הוספת מע״מ 18%</span>
                <input type="checkbox" className="peer sr-only" checked={vatEnabled} onChange={(e) => setVatEnabled(e.target.checked)} />
                <span className="relative h-6 w-11 rounded-full bg-neutral-200 transition peer-checked:bg-royal-600 after:absolute after:top-0.5 after:right-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:-translate-x-5" />
              </label>
            </div>
            <div className="sm:col-span-2">
              <Field label="הערות ותנאי תשלום" hint="(רשות)">
                <textarea className="input min-h-24" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="לדוגמה: 50% מקדמה בתחילת העבודה, היתרה במסירה." />
              </Field>
            </div>
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <div className="text-xs font-medium text-royal-600">הצעת מחיר</div>
          <div className="mt-1 text-lg font-bold">{nextNumber ? <>מס׳ <span className="num">{nextNumber}</span></> : "סיכום"}</div>
          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between text-neutral-600"><dt>סכום ביניים</dt><dd className="num">{formatILS(totals.subtotal)}</dd></div>
            <div className="flex justify-between text-neutral-600"><dt>{vatEnabled ? "מע״מ 18%" : "מע״מ"}</dt><dd className="num">{vatEnabled ? formatILS(totals.vat) : "ללא"}</dd></div>
            <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-bold"><dt>סה״כ לתשלום</dt><dd className="num text-royal-700">{formatILS(totals.total)}</dd></div>
          </dl>
          <button type="submit" disabled={pending} className="btn-primary mt-6 w-full">
            {pending ? "שומר..." : quoteId ? "שמירת שינויים" : "יצירת הצעה ו-PDF"}
          </button>
          <Link href={quoteId ? `/quotes/${quoteId}` : "/dashboard"} className="mt-2 block rounded-xl py-2.5 text-center text-sm text-neutral-600 hover:bg-neutral-50">
            ביטול
          </Link>
        </div>
        <p className="mt-3 px-1 text-xs leading-relaxed text-neutral-400">המסמך הוא הצעת מחיר ואינו חשבונית מס.</p>
      </aside>
    </form>
  );
}
