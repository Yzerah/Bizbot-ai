import type { Metadata } from "next";
import Link from "next/link";
import { cancelSubscription, openCustomerPortal } from "@/app/actions/billing";
import { requestUpgrade } from "@/app/actions/upgrade";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { LegalNav } from "@/components/LegalNav";
import { MerchantOfRecordNotice } from "@/components/MerchantOfRecordNotice";
import { PaddleCheckoutButton } from "@/components/PaddleCheckoutButton";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { blocksNewCheckout, getPaddleCheckoutConfig, paddleBillingApiReady } from "@/lib/paddle";
import { FREE_QUOTE_LIMIT, PLANS, isPaid } from "@/lib/plans";
import { SELLER_EMAIL } from "@/lib/seller";

export const metadata: Metadata = { title: "שדרוג" };

const STATUS_LABEL: Record<string, string> = {
  active: "פעיל",
  trialing: "תקופת ניסיון",
  past_due: "תשלום נכשל",
  paused: "מושהה",
  canceled: "בוטל",
};

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; reason?: string; requested?: string; checkout?: string; billing?: string }>;
}) {
  const sp = await searchParams;
  const user = await requireUser();
  const paddle = getPaddleCheckoutConfig();
  const billingReady = paddleBillingApiReady();
  const planId = sp.plan === "BUSINESS" ? "BUSINESS" : "PRO";
  const plan = PLANS.find((item) => item.id === planId)!;
  const priceId = planId === "BUSINESS" ? paddle.priceBusiness : paddle.pricePro;
  const managing = isPaid(user.plan) || blocksNewCheckout(user.subscriptionStatus);

  return (
    <div className="mx-auto max-w-5xl">
      <StatusBanner search={sp} />
      {sp.reason === "limit" && !managing && (
        <div className="mb-8 rounded-2xl border border-royal-200 bg-royal-50 px-5 py-4 text-sm text-royal-900">
          <strong>ניצלת את {FREE_QUOTE_LIMIT} ההצעות של המסלול החינמי.</strong> ההצעות הקיימות שלך זמינות לצפייה, עריכה והורדה. כדי ליצור הצעות חדשות צריך מסלול בתשלום.
        </div>
      )}

      {managing ? (
        <SubscriptionManager user={user} billingReady={billingReady} />
      ) : (
        <Checkout
          user={user}
          plan={plan}
          planId={planId}
          priceId={priceId}
          paddle={paddle}
          reason={sp.reason}
          requested={sp.requested}
        />
      )}
    </div>
  );
}

function StatusBanner({ search }: { search: { checkout?: string; billing?: string; requested?: string } }) {
  if (search.checkout === "success") {
    return (
      <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
        אם התשלום אושר, המסלול יופעל אוטומטית ברגע ש-Paddle תאשר את המנוי. רעננו את העמוד בעוד כמה רגעים.
      </div>
    );
  }
  if (search.billing === "cancel_scheduled") {
    return (
      <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
        הביטול נקבע לסוף תקופת החיוב. המסלול נשאר פעיל עד אז, ולא יחויב שוב.
      </div>
    );
  }
  if (search.billing === "error") {
    return (
      <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
        לא הצלחנו לדבר עם Paddle כרגע. נסו שוב, או כתבו אל <span dir="ltr">{SELLER_EMAIL}</span>.
      </div>
    );
  }
  if (search.billing === "unconfigured" || search.billing === "unavailable") {
    return (
      <div className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm text-neutral-700">
        ניהול המנוי עדיין לא זמין בחשבון הזה. אפשר לכתוב אל <span dir="ltr">{SELLER_EMAIL}</span>.
      </div>
    );
  }
  if (search.requested) {
    return (
      <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
        שמרנו את הבקשה. לא בוצע חיוב.
      </div>
    );
  }
  return null;
}

function SubscriptionManager({
  user,
  billingReady,
}: {
  user: {
    plan: string;
    email: string;
    subscriptionStatus: string | null;
    subscriptionPeriodEnd: Date | null;
    subscriptionCancelAt: Date | null;
    paddleCustomerId: string | null;
  };
  billingReady: boolean;
}) {
  const cancelScheduled = Boolean(user.subscriptionCancelAt);
  const status = user.subscriptionStatus ? STATUS_LABEL[user.subscriptionStatus] ?? user.subscriptionStatus : "לא מחובר ל-Paddle";

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight">המנוי שלי</h1>
      <p className="mt-2 text-neutral-600">מסלול {isPaid(user.plan) ? user.plan : "חינם"}. ניהול התשלום מתבצע אצל Paddle.</p>
      <div className="card mt-8 p-6">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-neutral-500">סטטוס</dt><dd className="font-medium">{status}</dd></div>
          {user.subscriptionPeriodEnd && (
            <div className="flex justify-between gap-4"><dt className="text-neutral-500">סוף התקופה הנוכחית</dt><dd className="num">{formatDate(user.subscriptionPeriodEnd)}</dd></div>
          )}
          {cancelScheduled && user.subscriptionCancelAt && (
            <div className="flex justify-between gap-4"><dt className="text-neutral-500">יבוטל בתאריך</dt><dd className="num">{formatDate(user.subscriptionCancelAt)}</dd></div>
          )}
          <div className="flex justify-between gap-4"><dt className="text-neutral-500">אימייל לחיוב</dt><dd dir="ltr">{user.email}</dd></div>
        </dl>
        {user.subscriptionStatus === "past_due" && (
          <p className="mt-4 text-sm text-red-700">התשלום האחרון נכשל. עדכנו את אמצעי התשלום בפורטל של Paddle כדי להפעיל את המסלול מחדש.</p>
        )}
        {billingReady && user.paddleCustomerId ? (
          <div className="mt-6 space-y-3">
            <ConfirmSubmitButton action={openCustomerPortal} className="btn-primary w-full">
              ניהול מנוי ותשלום ב-Paddle
            </ConfirmSubmitButton>
            {!cancelScheduled && (user.subscriptionStatus === "active" || user.subscriptionStatus === "trialing" || user.subscriptionStatus === "past_due") && (
              <ConfirmSubmitButton
                action={cancelSubscription}
                confirm="לבטל את המנוי בסוף תקופת החיוב? הגישה נשארת עד סוף התקופה ששולמה, ולא יבוצע חיוב נוסף."
                className="btn-ghost w-full"
              >
                ביטול בסוף התקופה
              </ConfirmSubmitButton>
            )}
          </div>
        ) : (
          <p className="mt-6 text-sm text-neutral-600">
            {isPaid(user.plan)
              ? "המסלול פעיל. פורטל הניהול יופיע כאן אחרי שמנוי Paddle יקושר לחשבון."
              : "אין עדיין מנוי Paddle מקושר לחשבון."}
          </p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          ביטול עוצר את החידוש הבא. החזר כספי תוך 14 יום מתואר ב<Link href="/refund" className="text-royal-600 hover:underline">מדיניות ההחזרים</Link>.
        </p>
      </div>
      <LegalNav className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-neutral-500" />
      <Link href="/dashboard" className="mt-4 block text-center text-sm text-neutral-500 hover:text-ink">חזרה להצעות שלי</Link>
    </div>
  );
}

async function Checkout({
  user,
  plan,
  planId,
  priceId,
  paddle,
  reason,
  requested,
}: {
  user: { id: string; email: string };
  plan: (typeof PLANS)[number];
  planId: "PRO" | "BUSINESS";
  priceId: string;
  paddle: ReturnType<typeof getPaddleCheckoutConfig>;
  reason?: string;
  requested?: string;
}) {
  const pending = !paddle.enabled
    ? await db.upgradeRequest.findFirst({
        where: { userId: user.id, plan: planId, status: "PENDING_PAYMENT_PROVIDER" },
      })
    : null;
  const reasonQuery = reason ? `&reason=${reason}` : "";

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">שדרוג ל-{plan.name}</h1>
        <p className="mt-2 text-neutral-600">מנוי חודשי בשקלים. ביטול בכל עת, והגישה נשארת עד סוף התקופה ששולמה.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-4 font-semibold">בחירת מסלול</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLANS.filter((item) => item.id !== "FREE").map((item) => {
                const active = item.id === planId;
                return (
                  <Link
                    key={item.id}
                    href={`/upgrade?plan=${item.id}${reasonQuery}`}
                    className={`rounded-xl border p-4 transition ${active ? "border-royal-600 ring-4 ring-royal-100" : "border-neutral-200 hover:border-neutral-300"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{item.name}</span>
                      <span className={`h-4 w-4 rounded-full border-2 ${active ? "border-royal-600 bg-royal-600 shadow-[inset_0_0_0_2px_white]" : "border-neutral-300"}`} />
                    </div>
                    <div className="mt-1 text-sm text-neutral-500"><span className="num">₪{item.price}</span> לחודש</div>
                  </Link>
                );
              })}
            </div>
            <ul className="mt-6 grid gap-2.5 text-sm text-neutral-700 sm:grid-cols-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2"><span className="text-royal-600">✓</span>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6 text-sm leading-relaxed text-neutral-600">
            <h2 className="mb-2 font-semibold text-ink">תשלום</h2>
            {paddle.enabled ? (
              <MerchantOfRecordNotice />
            ) : (
              <p>חלון התשלום עדיין לא מחובר בסביבה הזו, ולכן אי אפשר לחייב עכשיו. כפתור השדרוג יופעל כשפרטי Paddle יוגדרו.</p>
            )}
            <LegalNav className="mt-4 flex flex-wrap gap-4" />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="font-semibold">סיכום הזמנה</h2>
            <dl className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4"><dt>BizBot {plan.name} · חודשי</dt><dd className="num">₪{plan.price.toFixed(2)}</dd></div>
              <div className="flex justify-between gap-4 text-neutral-500"><dt>חיוב</dt><dd>חודשי, מתחדש עד לביטול</dd></div>
              <div className="flex justify-between gap-4 text-neutral-500"><dt>מטבע</dt><dd>שקל חדש (ILS)</dd></div>
              <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-bold"><dt>לתשלום כל חודש</dt><dd className="num">₪{plan.price.toFixed(2)}</dd></div>
            </dl>
            {paddle.enabled ? (
              <div className="mt-6">
                <PaddleCheckoutButton
                  label={`תשלום מאובטח · ₪${plan.price} לחודש`}
                  className="btn-primary w-full"
                  environment={paddle.environment}
                  clientToken={paddle.clientToken}
                  priceId={priceId}
                  userId={user.id}
                  email={user.email}
                />
                <p className="mt-3 text-center text-xs leading-relaxed text-neutral-500">
                  בלחיצה אתם מאשרים את <Link href="/terms" className="underline">תנאי השימוש</Link> ואת <Link href="/refund" className="underline">מדיניות ההחזרים</Link> (14 יום). המסלול יופעל רק אחרי אישור התשלום.
                </p>
              </div>
            ) : requested || pending ? (
              <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="font-semibold">שמרנו לך מקום ב-{plan.name}</div>
                לא בוצע חיוב. נעדכן אותך במייל כשהתשלום המקוון יהיה זמין.
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <button type="button" className="btn-primary w-full" disabled>בקרוב</button>
                <form action={requestUpgrade}>
                  <input type="hidden" name="plan" value={planId} />
                  <button type="submit" className="btn-ghost w-full">שמרו לי מקום ב-{plan.name}</button>
                </form>
                <p className="text-center text-xs text-neutral-400">ללא חיוב כעת</p>
              </div>
            )}
          </div>
          <Link href="/dashboard" className="mt-3 block text-center text-sm text-neutral-500 hover:text-ink">חזרה להצעות שלי</Link>
        </aside>
      </div>
    </>
  );
}
