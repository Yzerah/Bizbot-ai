export const LEAD_LIMITS = {
  name: 80,
  message: 2000,
  perIpPerHour: 5,
  perPhonePerDay: 3,
} as const;

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
