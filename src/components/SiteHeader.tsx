import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Logo } from "./Logo";

export async function SiteHeader() {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-neutral-600 sm:flex">
            <Link href="/#how" className="hover:text-ink">איך זה עובד</Link>
            <Link href="/pricing" className="hover:text-ink">מחירים</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <Link href="/dashboard" className="btn-dark !py-2 !px-4 text-sm">
              לאזור האישי
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-neutral-700 hover:text-ink sm:block">
                התחברות
              </Link>
              <Link href="/signup" className="btn-primary !py-2 !px-4 text-sm">
                התחילו בחינם
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
