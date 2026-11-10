import Link from "next/link";

const LINKS = [
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/refund", label: "מדיניות החזרים" },
  { href: "/contact", label: "יצירת קשר" },
];

export function LegalNav({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="hover:text-ink">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
