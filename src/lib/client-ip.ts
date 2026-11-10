import "server-only";
import { createHash } from "crypto";
import { headers } from "next/headers";

export async function clientIpHash() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip") || "unknown";
  const salt = process.env.AUTH_SECRET || "bizbot-lead";
  return createHash("sha256").update(`${salt}|${ip}`).digest("hex").slice(0, 40);
}
