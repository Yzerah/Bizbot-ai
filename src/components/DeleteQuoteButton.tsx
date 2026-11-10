"use client";

import { deleteQuote } from "@/app/actions/quotes";

export function DeleteQuoteButton({ id, className = "" }: { id: string; className?: string }) {
  return (
    <form
      action={deleteQuote}
      onSubmit={(e) => {
        if (!confirm("למחוק את ההצעה? לא ניתן לשחזר. (מחיקה לא מחזירה מכסה במסלול החינם)")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={className}>מחיקה</button>
    </form>
  );
}
