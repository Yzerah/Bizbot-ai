import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { getOwnQuote } from "@/lib/getQuote";
import { parseItems } from "@/lib/quote";

export const metadata: Metadata = { title: "עריכת הצעה" };

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { quote } = await getOwnQuote(id);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">עריכת הצעה מס׳ <span className="num">{quote.number}</span></h1>
      <QuoteForm
        quoteId={quote.id}
        nextNumber={quote.number}
        initial={{ ...quote, items: parseItems(quote.itemsJson) }}
      />
    </div>
  );
}
