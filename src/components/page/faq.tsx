import { Plus } from "lucide-react";

import type { Faq } from "@/lib/types";

/** Native disclosure list: works without JavaScript and with the keyboard. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-b border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.375rem] leading-snug tracking-[-0.008em] text-ink md:text-2xl">{f.q}</span>
            <Plus
              aria-hidden
              className="mt-1.5 size-5 shrink-0 text-subtle transition-transform duration-300 ease-[var(--ease-out-quart)] group-open:rotate-45"
            />
          </summary>
          <p className="text-body max-w-[60ch] pb-7 text-graphite">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
