import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const pattern = new RegExp(LINK.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const label = match[1];
    const href = match[2];
    const className =
      "font-medium text-royal-600 underline decoration-royal-200 underline-offset-4 hover:decoration-royal-600";
    nodes.push(
      href.startsWith("/") ? (
        <Link key={index} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} className={className}>
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
    index += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
