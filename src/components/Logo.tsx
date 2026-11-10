import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="BizBot — דף הבית">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-white">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden>
          <path d="M7 4h7a4 4 0 0 1 1.5 7.7A4.2 4.2 0 0 1 14.5 20H7V4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="18.5" cy="5.5" r="2" fill="#3d5afe" />
        </svg>
      </span>
      <span dir="ltr" className="text-[17px] font-bold tracking-tight">
        BizBot
      </span>
    </Link>
  );
}
