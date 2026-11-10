import type { Metadata } from "next";
import Link from "next/link";
import { requestUpgrade } from "@/app/actions/upgrade";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { FREE_QUOTE_LIMIT, PLANS, isPaid } from "@/lib/plans";

export const metadata: Metadata = { title: "שדרוג" };

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; reason?: string; requested?: string }>;
}) {
  const sp = await searchParams;
  const user = await requireUser();
  const planId = sp.plan === "BUSINESS" ? "BUSINESS" : "PRO";
  const plan = PLANS.find((p) => p.id === planId)!;
  const pending = await db.upgradeRequest.findFirst({
    where: { userId: user.id, plan: planId, status: "PENDING_PAYMENT_PROVIDER" },
  });

  if (isPaid(user.plan)) {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <h1 className="text-xl font-bold">את/ה כבר במסלול {user.plan}</h1>
        <Link href="/quotes/new" className="btn-primary mt-6">הצעה חדשה</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      {sp.reason === "limit" && (
        <div className="mb-8 rounded-2xl border border-royal-200 bg-royal-50 px-5 py-4 text-sm text-royal-900">
          <strong>ניצלת את {FREE_QUOTE_LIMIT} ההצעות של המסלול החינמי.</strong> ההצעות הקיימות שלך זמינות לצפייה, עריכה והורדה. כדי ליצור הצעות חדשות — שדרוג ל-PRO.
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">שדרוג ל-{plan.name}</h1>
        <p className="mt-2 text-neutral-600">מנוי חודשי. ביטול בכל עת, בלי התחייבות.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-4 font-semibold">בחירת מסלול</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLANS.filter((p) => p.id !== "FREE").map((p) => {
                const active = p.id === planId;
                return (
                  <Link
                    key={p.id}
                    href={`/upgrade?plan=${p.id}${sp.reason ? `&reason=${sp.reason}` : ""}`}
                    className={`rounded-xl border p-4 transition ${active ? "border-royal-600 ring-4 ring-royal-100" : "border-neutral-200 hover:border-neutral-300"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{p.name}</span>
                      <span className={`h-4 w-4 rounded-full border-2 ${active ? "border-royal-600 bg-royal-600 shadow-[inset_0_0_0_2px_white]" : "border-neutral-300"}`} />
                    </div>
                    <div className="mt-1 text-sm text-neutral-500"><span className="num">₪{p.price}</span> לחודש</div>
                  </Link>
                );
              })}
            </div>
            <ul className="mt-6 grid gap-2.5 text-sm text-neutral-700 sm:grid-cols-2">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2"><span className="text-royal-600">✓</span>{f}</li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="mb-1 font-semibold">אמצעי תשלום</h2>
            <p className="mb-5 text-sm text-neutral-500">תשלום מאובטח בכרטיס אשראי דרך ספק סליקה מורשה. פרטי הכרטיס לא נשמרים אצלנו.</p>
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-royal-600 text-xs font-bold text-white">i</span>
                <div className="text-sm leading-relaxed text-neutral-700">
                  <div className="font-semibold text-ink">חיבור הסליקה מתבצע בימים אלה</div>
                  התשלום המקוון עדיין לא פעיל, ולכן <strong>לא נחייב אותך עכשיו</strong>. אפשר לשמור את המקום שלך ב-{plan.name} — ניצור איתך קשר באימייל <span dir="ltr" className="font-medium">{user.email}</span> ברגע שהתשלום יחובר, והשדרוג יופעל רק אחרי אישור התשלום שלך.
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="font-semibold">סיכום הזמנה</h2>
            <dl className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt>BizBot {plan.name} · חודשי</dt><dd className="num">₪{plan.price.toFixed(2)}</dd></div>
              <div className="flex justify-between text-neutral-500"><dt>חיוב</dt><dd>חודשי, מתחדש אוטומטית</dd></div>
              <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-bold"><dt>לתשלום כל חודש</dt><dd className="num">₪{plan.price.toFixed(2)}</dd></div>
            </dl>
            {sp.requested || pending ? (
              <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="font-semibold">שמרנו לך מקום ב-{plan.name} ✓</div>
                לא בוצע חיוב. נעדכן אותך במייל כשהתשלום המקוון יהיה זמין.
              </div>
            ) : (
              <form action={requestUpgrade} className="mt-6">
                <input type="hidden" name="plan" value={planId} />
                <button type="submit" className="btn-primary w-full">שמרו לי מקום ב-{plan.name}</button>
              </form>
            )}
            <p className="mt-3 text-center text-xs text-neutral-400">ללא חיוב כעת · ביטול בכל עת</p>
          </div>
          <Link href="/dashboard" className="mt-3 block text-center text-sm text-neutral-500 hover:text-ink">חזרה להצעות שלי</Link>
        </aside>
      </div>
    </div>
  );
}
