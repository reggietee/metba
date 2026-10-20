import type { Block } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Long-form reading styles. Used for articles and policy pages. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-body max-w-[66ch] text-graphite",
        "[&>*+*]:mt-6 [&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-[1.875rem] [&_h2]:leading-tight [&_h2]:tracking-[-0.012em] [&_h2]:text-ink",
        "[&_h3]:mt-10 [&_h3]:text-[1.125rem] [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_li]:pl-1 [&_li]:marker:text-subtle",
        "[&_a]:text-ink [&_a]:underline [&_a]:decoration-line-strong [&_a:hover]:decoration-ink [&_strong]:font-semibold [&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <Prose>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={i} className="!my-12 border-t border-b border-line py-8">
                <blockquote className="text-quote text-ink">&ldquo;{b.text}&rdquo;</blockquote>
                {b.cite ? <figcaption className="text-meta mt-4 text-subtle">{b.cite}</figcaption> : null}
              </figure>
            );
        }
      })}
    </Prose>
  );
}
