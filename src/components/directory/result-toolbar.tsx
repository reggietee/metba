import Link from "next/link";
import { LayoutGrid, List, X } from "lucide-react";

import { cn } from "@/lib/utils";

type Chip = { key: string; label: string };

const withParams = (base: URLSearchParams, patch: Record<string, string | null>) => {
  const p = new URLSearchParams(base);
  for (const [k, v] of Object.entries(patch)) {
    if (v === null) p.delete(k);
    else p.set(k, v);
  }
  const qs = p.toString();
  return qs ? `/directory?${qs}` : "/directory";
};

/** Result count, removable filter chips and the grid or list switch. All plain links. */
export function ResultToolbar({
  params,
  chips,
  count,
  total,
  view,
}: {
  params: URLSearchParams;
  chips: Chip[];
  count: number;
  total: number;
  view: "grid" | "list";
}) {
  return (
    <div className="mt-12 flex flex-col gap-4 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <p role="status" className="text-meta mr-2 text-ink">
          {count === total ? `${total} ${total === 1 ? "member" : "members"}` : `${count} of ${total} members`}
        </p>
        {chips.map((c) => (
          <Link
            key={c.key}
            href={withParams(params, { [c.key]: null })}
            className="text-meta inline-flex h-8 items-center gap-1.5 rounded-full bg-secondary pr-2.5 pl-3 text-ink transition-colors hover:bg-accent"
          >
            {c.label}
            <X aria-hidden className="size-3.5 text-subtle" />
            <span className="sr-only">, remove filter</span>
          </Link>
        ))}
      </div>
      <nav aria-label="Result layout" className="inline-flex self-start rounded-sm border border-line p-0.5 md:self-auto">
        {(
          [
            ["grid", "Portraits", LayoutGrid],
            ["list", "List", List],
          ] as const
        ).map(([v, label, Icon]) => (
          <Link
            key={v}
            href={withParams(params, { view: v === "grid" ? null : v })}
            aria-current={view === v ? "true" : undefined}
            scroll={false}
            className={cn(
              "text-meta inline-flex h-8 items-center gap-1.5 rounded-sm px-3 transition-colors",
              view === v ? "bg-ink text-paper" : "text-graphite hover:text-ink",
            )}
          >
            <Icon aria-hidden className="size-3.5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
