"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MAIN_NAV, navIsActive } from "@/lib/nav";
import { usePathname } from "next/navigation";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="ניווט ראשי" className="hidden items-center gap-5 text-sm lg:flex">
      {MAIN_NAV.map((item) => {
        const active = navIsActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={active ? "font-semibold text-ink" : "text-neutral-600 hover:text-ink"}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-lg border border-neutral-200 text-ink"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="vh">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
          {open ? (
            <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" />
          )}
        </svg>
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="ניווט ראשי" className="absolute inset-x-0 top-16 border-b border-neutral-200 bg-white px-5 py-3 shadow-lg">
          <ul className="divide-y divide-neutral-100">
            {MAIN_NAV.map((item) => {
              const active = navIsActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3 text-base ${active ? "font-semibold text-ink" : "text-neutral-700"}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
