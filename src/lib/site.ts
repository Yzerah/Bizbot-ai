/** Production origin used for canonical URLs, Open Graph, JSON-LD, sitemap and robots. */
export const SITE_URL = "https://bizbot-ai.co.il";
export const SITE_NAME = "BizBot";

/**
 * PLACEHOLDER — public phone on the marketing pages.
 * Leave both strings empty. PhoneLink renders nothing until `tel` and `display` are set.
 * Do not invent a number. WhatsApp stays on NEXT_PUBLIC_WHATSAPP_NUMBER and stays hidden when that variable is empty.
 */
export const PUBLIC_PHONE = {
  tel: "",
  display: "",
} as const;
