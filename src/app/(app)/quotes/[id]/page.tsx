import type { Metadata } from "next";
import Link from "next/link";
import { DeleteQuoteButton } from "@/components/DeleteQuoteButton";
import { addDays, formatDate, formatILS, formatNumber } from "@/lib/format";
import { getOwnQuote } from "@/lib/getQuote";
import { lineTotalAgorot, parseItems } from "@/lib/quote";

export const metadata: Metadata = { title: "הצעת מחיר" };

export default async function QuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { id } = await params;
  const { created } = await searchParams;
  const { quote } = await getOwnQuote(id);
  const items = parseItems(quote.itemsJson);
  const pdf = `/api/quotes/${quote.id}/pdf`;

  return (
    <div className="mx-auto max-w-4xl">
      {created && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-600 text-xs text-white">✓</span>
          ההצעה נשמרה. אפשר להוריד אותה כ-PDF ולשלוח ללקוח.
        </div>
      )}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-ink">→ ההצעות שלי</Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            הצעת מחיר מס׳ <span className="num">{quote.number}</span> · {quote.clientName}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={pdf} className="btn-primary">הורדת PDF</a>
          <a href={`${pdf}?inline=1`} target="_blank" rel="noopener" className="btn-ghost">תצוגה</a>
          <Link href={`/quotes/${quote.id}/edit`} className="btn-ghost">עריכה</Link>
        </div>
      </div>

      {/* On-screen version of the document */}
      <div className="card p-6 shadow-sm sm:p-10">
        <div className="flex flex-col-reverse justify-between gap-6 border-b border-neutral-100 pb-6 sm:flex-row">
          <div>
            <div className="text-xs font-semibold tracking-wide text-royal-600">הצעת מחיר</div>
            <div className="mt-1 text-3xl font-bold">מס׳ <span className="num">{quote.number}</span></div>
            <div className="mt-3 space-y-0.5 text-sm text-neutral-600">
              <div>תאריך: <span className="num">{formatDate(quote.createdAt)}</span></div>
              <div>בתוקף עד: <span className="num">{formatDate(addDays(quote.createdAt, quote.validityDays))}</span></div>
            </div>
          </div>
          <div className="sm:text-left">
            {quote.sellerLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={quote.sellerLogo} alt="" className="mb-2 h-14 max-w-40 object-contain sm:mr-auto" />
            )}
            <div className="font-semibold">{quote.sellerName}</div>
            <div className="space-y-0.5 text-sm text-neutral-600">
              {quote.sellerTaxId && <div>ע.מ / ח.פ <span className="num">{quote.sellerTaxId}</span></div>}
              {quote.sellerPhone && <div className="num">{quote.sellerPhone}</div>}
              {quote.sellerEmail && <div dir="ltr">{quote.sellerEmail}</div>}
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="text-xs font-medium text-neutral-500">לכבוד</div>
          <div className="mt-1 font-semibold">{quote.clientName}</div>
          {quote.clientDetails && <div className="mt-1 whitespace-pre-line text-sm text-neutral-600">{quote.clientDetails}</div>}
          {quote.title && <div className="mt-4 text-sm"><span className="text-neutral-500">הנדון: </span><span className="font-medium">{quote.title}</span></div>}
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-neutral-50 text-xs text-neutral-500">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">#</th>
                <th className="px-4 py-2.5 text-right font-medium">תיאור</th>
                <th className="px-4 py-2.5 text-right font-medium">כמות</th>
                <th className="px-4 py-2.5 text-right font-medium">מחיר ליחידה</th>
                <th className="px-4 py-2.5 text-left font-medium">סה״כ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {items.map((it, i) => (
                <tr key={i}>
                  <td className="num px-4 py-3 text-right text-neutral-400">{i + 1}</td>
                  <td className="px-4 py-3">{it.description}</td>
                  <td className="num px-4 py-3 text-right">{formatNumber(it.quantity)}</td>
                  <td className="num px-4 py-3 text-right">{formatILS(Math.round(it.unitPrice * 100))}</td>
                  <td className="num px-4 py-3 text-left font-medium">{formatILS(lineTotalAgorot(it))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <dl className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600"><dt>סכום ביניים</dt><dd className="num">{formatILS(quote.subtotalAgorot)}</dd></div>
            <div className="flex justify-between text-neutral-600"><dt>{quote.vatEnabled ? "מע״מ 18%" : "מע״מ"}</dt><dd className="num">{quote.vatEnabled ? formatILS(quote.vatAgorot) : "ללא"}</dd></div>
            <div className="flex justify-between rounded-xl bg-ink px-4 py-3 text-base font-bold text-white"><dt>סה״כ לתשלום</dt><dd className="num">{formatILS(quote.totalAgorot)}</dd></div>
          </dl>
        </div>

        {quote.notes && (
          <div className="mt-8 rounded-xl bg-neutral-50 p-5 text-sm">
            <div className="mb-1 font-semibold">הערות</div>
            <p className="whitespace-pre-line text-neutral-700">{quote.notes}</p>
          </div>
        )}
        <p className="mt-8 text-center text-xs text-neutral-400">מסמך זה הינו הצעת מחיר ואינו מהווה חשבונית מס.</p>
      </div>

      <div className="mt-6 flex justify-end">
        <DeleteQuoteButton id={quote.id} className="rounded-lg px-3 py-2 text-sm text-neutral-400 hover:bg-red-50 hover:text-red-600" />
      </div>
    </div>
  );
}
