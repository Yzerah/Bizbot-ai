export const MAIN_NAV = [
  { href: "/", label: "בית" },
  { href: "/websites", label: "המערכת" },
  { href: "/pricing", label: "מחיר" },
  { href: "/blog", label: "בלוג" },
  { href: "/#quotes", label: "הצעות מחיר" },
  { href: "/contact", label: "צור קשר" },
] as const;

export function navIsActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  const path = href.split("#")[0];
  if (!path || path === "/") return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}
