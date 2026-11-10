import "server-only";
import { notFound } from "next/navigation";
import { requireUser } from "./auth";
import { db } from "./db";

export async function getOwnQuote(id: string) {
  const user = await requireUser();
  const quote = await db.quote.findFirst({ where: { id, userId: user.id } });
  if (!quote) notFound();
  return { user, quote };
}
