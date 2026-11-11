"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitWebsiteLead, type LeadState } from "@/app/actions/website-leads";
import {
  BUSINESS_TYPES,
  WEBSITE_HOSTING,
  WEBSITE_PACKAGES,
  formatShekel,
  isWebsitePackageId,
} from "@/lib/website-packages";

export function WebsiteLeadForm({ initialPackage }: { initialPackage?: string }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitWebsiteLead, undefined);
  const selected = isWebsitePackageId(initialPackage) ? initialPackage : "business";

  if (state?.ok) {
    return (
      <div role="status" className="card p-8">
        <h3 className="text-2xl font-bold tracking-tight">הפנייה נשמרה</h3>
        <p className="mt-3 leading-relaxed text-neutral-600">
          תודה. נחזור אליך לטלפון שמילאת כדי לתאם את האתר.
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
        <label htmlFor="lead-email" className="label">אימייל (נחזור אליכם גם במייל)</label>
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
        <label htmlFor="lead-business" className="label">סוג העסק</label>
        <select id="lead-business" name="businessType" required className="input" defaultValue="professional">
          {BUSINESS_TYPES.map((type) => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="lead-package" className="label">חבילה</label>
        <select id="lead-package" name="packageId" required className="input" defaultValue={selected}>
          {WEBSITE_PACKAGES.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} · {formatShekel(pkg.price)}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-start gap-3 text-sm text-neutral-700">
        <input type="checkbox" name="hosting" className="mt-1 h-4 w-4 accent-royal-600" />
        <span>
          גם {WEBSITE_HOSTING.name}, <span className="num">{formatShekel(WEBSITE_HOSTING.price)}</span> {WEBSITE_HOSTING.unit}
        </span>
      </label>
      <div>
        <label htmlFor="lead-message" className="label">הודעה <span className="font-normal text-neutral-400">(רשות)</span></label>
        <textarea id="lead-message" name="message" rows={4} maxLength={2000} className="input" placeholder="מה העסק עושה, ומה חשוב שיופיע באתר" />
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
        השם, הטלפון, ואימייל אם מילאתם, נשמרים אצלנו כדי לחזור אליכם בעניין האתר.{" "}
        <Link href="/privacy" className="underline">מדיניות הפרטיות</Link>
      </p>
    </form>
  );
}
