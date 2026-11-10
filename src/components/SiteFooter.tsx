import Link from "next/link";
import { LegalNav } from "@/components/LegalNav";
import { Logo } from "@/components/Logo";
import { MAIN_NAV } from "@/lib/nav";
import { SELLER_EMAIL, SELLER_NAME } from "@/lib/seller";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-neutral-600">
            אתרים לעסקים קטנים בישראל, והצעות מחיר לעצמאים. מופעל על ידי {SELLER_NAME}.
          </p>
          <p className="text-sm text-neutral-600">
            <a dir="ltr" className="font-medium text-ink hover:underline" href={`mailto:${SELLER_EMAIL}`}>
              {SELLER_EMAIL}
            </a>
          </p>
        </div>
        <nav aria-label="ניווט תחתון" className="flex flex-col gap-2 text-sm text-neutral-700">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-ink">מסמכים</div>
          <LegalNav className="flex flex-col gap-2 text-sm text-neutral-700" />
          <p className="max-w-sm text-xs leading-relaxed text-neutral-600">
            מנוי ההצעות מחויב דרך Paddle.com, Merchant of Record. בניית אתר אינה הזמנה ב-Paddle.
          </p>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-4 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} BizBot · bizbot-ai.co.il · הצעת מחיר אינה חשבונית מס
      </div>
    </footer>
  );
}
