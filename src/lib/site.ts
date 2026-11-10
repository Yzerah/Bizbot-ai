/** Public site origin used for canonical URLs, sitemap, and JSON-LD. */
export function getSiteUrl() {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || "https://bizbot-ai.co.il").trim();
  return raw.replace(/\/+$/, "");
}
