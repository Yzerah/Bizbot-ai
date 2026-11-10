import Link from "next/link";
import { PaddleCheckoutButton } from "@/components/PaddleCheckoutButton";
import { getCurrentUser } from "@/lib/auth";
import { blocksNewCheckout, getPaddleCheckoutConfig } from "@/lib/paddle";
import { PLANS } from "@/lib/plans";

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-royal-600" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  );
}

export async function PricingCards() {
  const user = await getCurrentUser();
  const paddle = getPaddleCheckoutConfig();
  const manageInstead = blocksNewCheckout(user?.subscriptionStatus);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {PLANS.map((plan) => {
        const highlighted = plan.highlighted;
        const buttonClass = highlighted ? "btn bg-white text-ink hover:bg-neutral-100" : plan.id === "FREE" ? "btn-primary" : "btn-ghost";
        const signupHref = `/signup?next=${encodeURIComponent(`/upgrade?plan=${plan.id}`)}`;
        const priceId = plan.id === "BUSINESS" ? paddle.priceBusiness : paddle.pricePro;
        let action: React.ReactNode;
        if (plan.id === "FREE") {
          action = (
            <Link href={user ? "/quotes/new" : "/signup"} className={`mt-8 ${buttonClass}`}>
              צור מסמך ראשון בחינם
            </Link>
          );
        } else if (!paddle.enabled) {
          action = (
            <button type="button" className={`mt-8 ${buttonClass}`} disabled>
              בקרוב
            </button>
          );
        } else if (!user) {
          action = (
            <Link href={signupHref} className={`mt-8 ${buttonClass}`}>
              שדרוג ל-{plan.name}
            </Link>
          );
        } else if (manageInstead) {
          action = (
            <Link href="/upgrade" className={`mt-8 ${buttonClass}`}>
              ניהול המנוי
            </Link>
          );
        } else {
          action = (
            <div className="mt-8">
              <PaddleCheckoutButton
                label={`שדרוג ל-${plan.name}`}
                className={`${buttonClass} w-full`}
                environment={paddle.environment}
                clientToken={paddle.clientToken}
                priceId={priceId}
                userId={user.id}
                email={user.email}
              />
            </div>
          );
        }

        return (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              highlighted ? "border-ink bg-ink text-white shadow-2xl" : "border-neutral-200 bg-white"
            }`}
          >
            {highlighted && (
              <span className="absolute -top-3 right-7 rounded-full bg-royal-600 px-3 py-1 text-xs font-semibold text-white">
                הכי משתלם
              </span>
            )}
            <div className="text-sm font-semibold tracking-wide">{plan.name}</div>
            <div className={`mt-1 text-sm ${highlighted ? "text-neutral-300" : "text-neutral-500"}`}>{plan.tagline}</div>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold num">₪{plan.price}</span>
              <span className={`text-sm ${highlighted ? "text-neutral-400" : "text-neutral-500"}`}>
                {plan.price === 0 ? "לתמיד" : "לחודש, בשקלים"}
              </span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Check />
                  <span className={highlighted ? "text-neutral-200" : "text-neutral-700"}>{feature}</span>
                </li>
              ))}
            </ul>
            {action}
          </div>
        );
      })}
    </div>
  );
}
