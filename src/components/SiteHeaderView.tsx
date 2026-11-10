import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeaderView({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-4 sm:gap-8">
          <Logo />
          <Link href="/blog" className="text-sm text-neutral-600 hover:text-ink sm:hidden">
            בלוג
          </Link>
          <nav aria-label="ניווט ראשי" className="hidden items-center gap-6 text-sm text-neutral-600 sm:flex">
            <Link href="/#how" className="hover:text-ink">
              איך זה עובד
            </Link>
            <Link href="/pricing" className="hover:text-ink">
              מחירים
            </Link>
            <Link href="/blog" className="hover:text-ink">
              בלוג
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {loggedIn ? (
            <Link href="/dashboard" className="btn-dark !px-4 !py-2 text-sm">
              לאזור האישי
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-neutral-700 hover:text-ink sm:block">
                התחברות
              </Link>
              <Link href="/signup" className="btn-primary !px-4 !py-2 text-sm">
                התחילו בחינם
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
