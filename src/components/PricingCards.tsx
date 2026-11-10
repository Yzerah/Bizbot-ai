import Link from "next/link";
import { PLANS } from "@/lib/plans";

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  );
}

export function PricingCards({ loggedIn = false }: { loggedIn?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {PLANS.map((p) => {
        const href =
          p.id === "FREE" ? (loggedIn ? "/quotes/new" : "/signup") : loggedIn ? `/upgrade?plan=${p.id}` : `/signup?next=${encodeURIComponent(`/upgrade?plan=${p.id}`)}`;
        const cta = p.id === "FREE" ? "צור מסמך ראשון בחינם" : `בחירה ב-${p.name}`;
        return (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              p.highlighted ? "border-ink bg-ink text-white shadow-2xl" : "border-neutral-200 bg-white"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3 right-7 rounded-full bg-royal-600 px-3 py-1 text-xs font-semibold text-white">
                הכי משתלם
              </span>
            )}
            <div className="text-sm font-semibold tracking-wide">{p.name}</div>
            <div className={`mt-1 text-sm ${p.highlighted ? "text-neutral-300" : "text-neutral-500"}`}>{p.tagline}</div>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold num">₪{p.price}</span>
              <span className={`text-sm ${p.highlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                {p.price === 0 ? "לתמיד" : "לחודש"}
              </span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check />
                  <span className={p.highlighted ? "text-neutral-200" : "text-neutral-700"}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className={`mt-8 ${p.highlighted ? "btn bg-white text-ink hover:bg-neutral-100" : p.id === "FREE" ? "btn-primary" : "btn-ghost"}`}
            >
              {cta}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
