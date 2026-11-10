export const MAIN_NAV = [
  { href: "/", label: "בית" },
  { href: "/websites", label: "אתרים לעסקים" },
  { href: "/#quotes", label: "הצעות מחיר" },
  { href: "/blog", label: "בלוג" },
  { href: "/pricing", label: "מחירים" },
  { href: "/contact", label: "צור קשר" },
] as const;

export function navIsActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  const path = href.split("#")[0];
  if (!path || path === "/") return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}
