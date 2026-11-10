const TZ = "Asia/Jerusalem";

const currency = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Remove Unicode bidi control marks (Intl adds them; the PDF renderer draws them as boxes). */
export function stripBidi(s: string) {
  return s.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "");
}

export function formatILS(agorot: number) {
  return stripBidi(currency.format(agorot / 100));
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("he-IL", { maximumFractionDigits: 2 }).format(n);
}

export function formatDate(d: Date | string) {
  return new Intl.DateTimeFormat("he-IL", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(d));
}

export function addDays(d: Date | string, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}
