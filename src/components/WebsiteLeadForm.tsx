"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitWebsiteLead, type LeadState } from "@/app/actions/website-leads";
import { LEADS_OFFER, TRADES, formatShekel, isWebsitePackageId } from "@/lib/website-packages";

export function WebsiteLeadForm({ initialPackage }: { initialPackage?: string }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitWebsiteLead, undefined);
  const packageId = isWebsitePackageId(initialPackage) ? initialPackage : LEADS_OFFER.id;

  if (state?.ok) {
    return (
      <div role="status" className="card p-8">
        <h3 className="text-2xl font-bold tracking-tight">הפנייה נשמרה</h3>
        <p className="mt-3 leading-relaxed text-neutral-600">
          תודה. נחזור לטלפון שמילאת. שליחת הטופס לא מחייבת. דמי ההקמה משולמים רק אחרי שתאשרו את מה שנבנה.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card relative space-y-4 p-6 sm:p-8">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="bizbot_hp">השאר ריק</label>
        <input id="bizbot_hp" name="bizbot_hp" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div>
        <label htmlFor="lead-name" className="label">שם</label>
        <input id="lead-name" name="name" required maxLength={80} autoComplete="name" className="input" />
      </div>
      <div>
        <label htmlFor="lead-phone" className="label">טלפון</label>
        <input id="lead-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" dir="ltr" className="input text-right" />
      </div>
      <div>
        <label htmlFor="lead-email" className="label">אימייל <span className="font-normal text-neutral-400">(רשות)</span></label>
        <input
          id="lead-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          maxLength={254}
          className="input text-right"
        />
      </div>
      <div>
        <label htmlFor="lead-business" className="label">תחום</label>
        <select id="lead-business" name="businessType" required className="input" defaultValue="renovation">
          {TRADES.map((type) => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="lead-trade" className="label">התמחות <span className="font-normal text-neutral-400">(רשות)</span></label>
        <input
          id="lead-trade"
          name="trade"
          maxLength={80}
          className="input"
          placeholder="למשל: שיפוץ דירות, חדרי רחצה"
        />
      </div>
      <input type="hidden" name="packageId" value={packageId} />
      <p className="rounded-xl bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-700">
        <span className="font-medium text-ink">{LEADS_OFFER.name}.</span>{" "}
        <span className="num">{formatShekel(LEADS_OFFER.setupPrice)}</span> הקמה אחרי אישור, ו-
        <span className="num">{formatShekel(LEADS_OFFER.monthlyPrice)}</span> לחודש.
        {" "}לחמשת הלקוחות הראשונים, אם ההצעה עדיין פתוחה:{" "}
        <span className="num">{formatShekel(LEADS_OFFER.launchSetupPrice)}</span> ו-
        <span className="num">{formatShekel(LEADS_OFFER.launchMonthlyPrice)}</span>.
      </p>
      <div>
        <label htmlFor="lead-message" className="label">הודעה <span className="font-normal text-neutral-400">(רשות)</span></label>
        <textarea id="lead-message" name="message" rows={4} maxLength={2000} className="input" placeholder="אזור העבודה, ומה חשוב שיופיע בדף" />
      </div>
      {state?.error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "שולחים..." : "שליחת פנייה"}
      </button>
      <p className="text-xs leading-relaxed text-neutral-500">
        השם, הטלפון, התחום, וההתמחות או האימייל אם מילאתם, נשמרים אצלנו כדי לחזור אליכם.{" "}
        <Link href="/privacy" className="underline">מדיניות הפרטיות</Link>
      </p>
    </form>
  );
}
