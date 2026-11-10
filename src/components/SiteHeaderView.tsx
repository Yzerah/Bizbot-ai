import Link from "next/link";
import { DesktopNav, MobileNav } from "./SiteNav";
import { Logo } from "./Logo";

export function SiteHeaderView({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <div className="flex min-w-0 items-center gap-6">
          <Logo />
          <DesktopNav />
        </div>
        <div className="flex items-center gap-2">
          {loggedIn ? (
            <Link href="/dashboard" className="btn-dark !px-3 !py-2 text-sm sm:!px-4">
              לאזור האישי
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-neutral-700 hover:text-ink lg:block">
                התחברות
              </Link>
              <Link href="/signup" className="btn-primary !px-3 !py-2 text-sm sm:!px-4">
                התחילו בחינם
              </Link>
            </>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
