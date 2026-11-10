import type { BlogBlock } from "@/content/blog/types";
import { RichText } from "./RichText";

function BulletList({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const className = "space-y-2 pr-5 marker:text-royal-600 " + (ordered ? "list-decimal" : "list-disc");
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag className={className}>
      {items.map((item) => (
        <li key={item}>
          <RichText text={item} />
        </li>
      ))}
    </ListTag>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={block.id} className="scroll-mt-24 pt-6 text-2xl font-bold tracking-tight text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id} className="scroll-mt-24 pt-2 text-xl font-semibold text-ink">
          {block.text}
        </h3>
      );
    case "ul":
      return <BulletList items={block.items} />;
    case "ol":
      return <BulletList items={block.items} ordered />;
    case "checklist":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden
                className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-royal-50 text-xs font-bold text-royal-700"
              >
                ✓
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="rounded-2xl border border-royal-100 bg-royal-50 px-4 py-3 text-sm leading-relaxed text-royal-900">
          <RichText text={block.text} />
        </p>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-neutral-200">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="px-4 py-3 text-start text-sm leading-relaxed text-neutral-500">
              {block.caption}
            </caption>
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-2.5 text-start font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-neutral-100">
                  <th scope="row" className="px-4 py-3 text-start font-semibold text-ink">
                    {row[0]}
                  </th>
                  <td className="px-4 py-3 text-neutral-600">{row[1]}</td>
                  <td className="num px-4 py-3 font-medium text-ink">{row[2]}</td>
                </tr>
              ))}
            </tbody>
            {block.footer ? (
              <tfoot>
                <tr className="border-t border-neutral-200 bg-neutral-50">
                  <th scope="row" colSpan={2} className="px-4 py-3 text-start font-semibold text-ink">
                    {block.footer[0]}
                  </th>
                  <td className="num px-4 py-3 font-bold text-ink">{block.footer[1]}</td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5 text-[17px] leading-8 text-neutral-700">
      {blocks.map((block, index) => (
        <Block key={blockKey(block, index)} block={block} />
      ))}
    </div>
  );
}

function blockKey(block: BlogBlock, index: number) {
  if (block.type === "h2" || block.type === "h3") return block.id;
  return `${block.type}-${index}`;
}

export function articleHeadings(blocks: BlogBlock[]) {
  return blocks.flatMap((block) => (block.type === "h2" ? [{ id: block.id, text: block.text }] : []));
}
