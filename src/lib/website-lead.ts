export const LEAD_LIMITS = {
  name: 80,
  message: 2000,
  email: 254,
  perIpPerHour: 5,
  perPhonePerDay: 3,
} as const;

/** One @, a dot in the domain, no whitespace. Same bar as the quote form. */
const LEAD_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Digits only, with an Israeli 972 prefix folded into a local 0-prefix. */
export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("972")) digits = `0${digits.slice(3)}`;
  if (/^5\d{8}$/.test(digits)) digits = `0${digits}`;
  return digits;
}

export function isPlausiblePhone(digits: string) {
  return /^0\d{8,9}$/.test(digits);
}

export function isRateLimited(input: { ipCountLastHour: number; phoneCountLastDay: number }) {
  return input.ipCountLastHour >= LEAD_LIMITS.perIpPerHour || input.phoneCountLastDay >= LEAD_LIMITS.perPhonePerDay;
}

/** Empty is allowed. A non-empty value must be a short, plausible address. */
export function parseLeadEmail(input: string): { ok: true; email: string | null } | { ok: false } {
  const email = input.trim().toLowerCase();
  if (!email) return { ok: true, email: null };
  if (email.length > LEAD_LIMITS.email || !LEAD_EMAIL_RE.test(email)) return { ok: false };
  return { ok: true, email };
}
