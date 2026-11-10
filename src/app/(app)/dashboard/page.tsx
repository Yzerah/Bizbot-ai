import type { Metadata } from "next";
import Link from "next/link";
import { DeleteQuoteButton } from "@/components/DeleteQuoteButton";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate, formatILS } from "@/lib/format";
import { FREE_QUOTE_LIMIT, isPaid } from "@/lib/plans";

export const metadata: Metadata = { title: "ההצעות שלי" };

export default async function Dashboard() {
  const user = await requireUser();
  const quotes = await db.quote.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, number: true, title: true, clientName: true, totalAgorot: true, createdAt: true, validityDays: true },
  });
  const paid = isPaid(user.plan);
  const left = Math.max(0, FREE_QUOTE_LIMIT - user.quotesCreated);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{user.name ? `שלום, ${user.name}` : "ההצעות שלי"}</h1>
          <p className="mt-1 text-sm text-neutral-600">כל הצעות המחיר שיצרת, מוכנות לעריכה ולהורדה.</p>
        </div>
        <Link href={!paid && left === 0 ? "/upgrade?reason=limit" : "/quotes/new"} className="btn-primary">
          + הצעת מחיר חדשה
        </Link>
      </div>

      {paid && (
        <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <div className="font-medium">מסלול {user.plan} פעיל</div>
            {user.subscriptionPeriodEnd && (
              <p className="mt-1 text-neutral-500">התקופה הנוכחית עד <span className="num">{formatDate(user.subscriptionPeriodEnd)}</span></p>
            )}
            {user.subscriptionCancelAt && (
              <p className="mt-1 text-neutral-500">המנוי יבוטל ב-<span className="num">{formatDate(user.subscriptionCancelAt)}</span></p>
            )}
          </div>
          <Link href="/upgrade" className="btn-ghost !py-2 text-sm">ניהול המנוי</Link>
        </div>
      )}

      {!paid && (
        <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">מסלול חינם</span>
              <span className="text-neutral-500">
                <span className="num">{Math.min(user.quotesCreated, FREE_QUOTE_LIMIT)}</span> מתוך <span className="num">{FREE_QUOTE_LIMIT}</span> הצעות
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-royal-600" style={{ width: `${(Math.min(user.quotesCreated, FREE_QUOTE_LIMIT) / FREE_QUOTE_LIMIT) * 100}%` }} />
            </div>
          </div>
          <Link href="/upgrade" className="btn-ghost !py-2 text-sm sm:mr-6">
            {left === 0 ? "שדרוג ל-PRO להמשך" : `נשארו ${left} · שדרוג ל-PRO`}
          </Link>
        </div>
      )}

      {quotes.length === 0 ? (
        <div className="card flex flex-col items-center px-6 py-16 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-50 text-xl text-royal-600">₪</div>
          <h2 className="mt-4 text-lg font-semibold">עוד אין הצעות מחיר</h2>
          <p className="mt-1 max-w-sm text-sm text-neutral-600">צרו את ההצעה הראשונה — זה לוקח פחות מדקה, ובפעם הבאה פרטי העסק כבר יהיו ממולאים.</p>
          <Link href={!paid && left === 0 ? "/upgrade?reason=limit" : "/quotes/new"} className="btn-primary mt-6">צור מסמך ראשון</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-right text-xs font-medium text-neutral-500">
              <tr>
                <th className="px-5 py-3 font-medium">מס׳</th>
                <th className="px-5 py-3 font-medium">לקוח</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">תאריך</th>
                <th className="px-5 py-3 font-medium">סה״כ</th>
                <th className="px-5 py-3"><span className="sr-only">פעולות</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-neutral-50/60">
                  <td className="num px-5 py-4 text-right font-medium">{q.number}</td>
                  <td className="px-5 py-4">
                    <Link href={`/quotes/${q.id}`} className="font-medium hover:text-royal-600">{q.clientName}</Link>
                    {q.title && <div className="text-xs text-neutral-500">{q.title}</div>}
                  </td>
                  <td className="num hidden px-5 py-4 text-right text-neutral-600 md:table-cell">{formatDate(q.createdAt)}</td>
                  <td className="num px-5 py-4 text-right font-semibold">{formatILS(q.totalAgorot)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/api/quotes/${q.id}/pdf`} className="rounded-lg px-2.5 py-1.5 font-medium text-royal-600 hover:bg-royal-50">PDF</a>
                      <Link href={`/quotes/${q.id}/edit`} className="rounded-lg px-2.5 py-1.5 text-neutral-700 hover:bg-neutral-100">עריכה</Link>
                      <DeleteQuoteButton id={q.id} className="hidden rounded-lg px-2.5 py-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 sm:block" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
