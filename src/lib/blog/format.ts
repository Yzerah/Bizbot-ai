const HEBREW_MONTHS = [
  "בינואר",
  "בפברואר",
  "במרץ",
  "באפריל",
  "במאי",
  "ביוני",
  "ביולי",
  "באוגוסט",
  "בספטמבר",
  "באוקטובר",
  "בנובמבר",
  "בדצמבר",
] as const;

export function formatHebrewDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const label = HEBREW_MONTHS[month - 1];
  if (!year || !label || !day) return isoDate;
  return `${day} ${label} ${year}`;
}

/** Visible words, ignoring markdown link targets. */
export function countWords(parts: string[]) {
  const visible = parts
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (!visible) return 0;
  return visible.split(" ").length;
}

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 200));
}
