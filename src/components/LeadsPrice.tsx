import Link from "next/link";
import { LEADS_OFFER, formatShekel } from "@/lib/website-packages";

export function LeadsPrice({ ctaHref = "/websites#lead" }: { ctaHref?: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <article className="flex flex-col rounded-2xl border border-ink bg-ink p-7 text-white">
        <h3 className="text-lg font-semibold">{LEADS_OFFER.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">{LEADS_OFFER.summary}</p>
        <div className="mt-6 flex flex-wrap gap-8">
          <div>
            <div className="text-sm text-neutral-400">הקמה</div>
            <div className="num text-4xl font-bold">{formatShekel(LEADS_OFFER.setupPrice)}</div>
            <div className="mt-1 text-sm text-neutral-400">אחרי שאתם מאשרים</div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">אחר כך</div>
            <div className="num text-4xl font-bold">{formatShekel(LEADS_OFFER.monthlyPrice)}</div>
            <div className="mt-1 text-sm text-neutral-400">לחודש, כשהמערכת באוויר</div>
          </div>
        </div>
        <ul className="mt-6 flex-1 space-y-2 text-sm leading-relaxed text-neutral-200">
          <li>דמי ההקמה משולמים רק אחרי שאתם מאשרים את מה שנבנה.</li>
          <li>אם תוך {LEADS_OFFER.guaranteeDays} יום לא נכנסת אף פנייה, דמי ההקמה חוזרים.</li>
          <li>הסכומים בשקלים. לא מצוין כאן אם הם כוללים מע״מ.</li>
        </ul>
        <Link href={ctaHref} className="btn mt-8 bg-white text-ink hover:bg-neutral-100">
          השארת פרטים
        </Link>
      </article>
      <article className="card p-7">
        <p className="text-sm font-medium text-royal-700">הצעת השקה</p>
        <h3 className="mt-2 text-lg font-semibold">לחמשת הלקוחות הראשונים</h3>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          <span className="num font-semibold text-ink">{formatShekel(LEADS_OFFER.launchSetupPrice)}</span>
          {" "}הקמה, ואחר כך{" "}
          <span className="num font-semibold text-ink">{formatShekel(LEADS_OFFER.launchMonthlyPrice)}</span>
          {" "}לחודש.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          את מספר המקומות שנשארו לא מציגים כאן. בשיחה נגיד אם ההצעה עדיין פתוחה. אם חמשת המקומות נתפסו, המחיר הוא{" "}
          <span className="num">{formatShekel(LEADS_OFFER.setupPrice)}</span>
          {" "}ו-<span className="num">{formatShekel(LEADS_OFFER.monthlyPrice)}</span>.
        </p>
      </article>
    </div>
  );
}
