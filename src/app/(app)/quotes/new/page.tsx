import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuoteForm } from "@/components/QuoteForm";
import { requireUser } from "@/lib/auth";
import { FREE_QUOTE_LIMIT, isPaid } from "@/lib/plans";

export const metadata: Metadata = { title: "הצעת מחיר חדשה" };

export default async function NewQuotePage() {
  const user = await requireUser();
  if (!isPaid(user.plan) && user.quotesCreated >= FREE_QUOTE_LIMIT) redirect("/upgrade?reason=limit");
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">הצעת מחיר חדשה</h1>
      <QuoteForm
        nextNumber={1001 + user.quotesCreated}
        initial={{
          sellerName: user.businessName,
          sellerPhone: user.businessPhone,
          sellerEmail: user.businessEmail ?? user.email,
          sellerTaxId: user.businessTaxId,
          sellerLogo: user.businessLogo,
          vatEnabled: true,
          validityDays: 30,
        }}
      />
    </div>
  );
}
