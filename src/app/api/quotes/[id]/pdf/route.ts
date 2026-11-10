import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { QuoteDocument } from "@/lib/pdf/QuoteDocument";
import { parseItems } from "@/lib/quote";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const quote = await db.quote.findFirst({ where: { id, userId: user.id } });
  if (!quote) return new Response("Not found", { status: 404 });

  const doc = createElement(QuoteDocument, { q: { ...quote, items: parseItems(quote.itemsJson) } });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(doc as any);

  const inline = new URL(req.url).searchParams.has("inline");
  const filename = `quote-${quote.number}.pdf`;
  const utf8Name = encodeURIComponent(`הצעת-מחיר-${quote.number}.pdf`);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"; filename*=UTF-8''${utf8Name}`,
      "Cache-Control": "private, no-store",
    },
  });
}
