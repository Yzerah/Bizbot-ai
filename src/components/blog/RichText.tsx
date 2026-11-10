import Link from "next/link";

const LINK = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;

/** Renders plain text with internal markdown links: [label](/path). */
export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(LINK)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const label = match[1];
    const href = match[2];
    nodes.push(
      <Link key={`${href}-${index}`} href={href} className="font-medium text-royal-600 underline decoration-royal-200 underline-offset-4 hover:decoration-royal-600">
        {label}
      </Link>,
    );
    index += 1;
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
