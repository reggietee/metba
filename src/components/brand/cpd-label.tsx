import { cpdCategoryLabels, cpdStatement, formatHours } from "@/lib/format";
import type { EventCpd } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The only component that renders CPD wording. See cpdStatement() for the rule.
 */
export function CpdLabel({ cpd, className }: { cpd: EventCpd[]; className?: string }) {
  if (cpd.length === 0) return null;
  return (
    <ul className={cn("space-y-2", className)}>
      {cpd.map((c) => (
        <li key={`${c.jurisdiction}-${c.category}`} className="text-sm leading-snug">
          <span className="text-label mr-2 text-ink">
            {formatHours(c.hours)} · {cpdCategoryLabels[c.category]} · {c.jurisdiction}
          </span>
          <span className="block text-subtle">{cpdStatement(c)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Compact one-line variant for cards. Never states accreditation. */
export function CpdTag({ cpd }: { cpd: EventCpd[] }) {
  if (cpd.length === 0) return null;
  const max = Math.max(...cpd.map((c) => c.hours));
  return <span>{formatHours(max)}</span>;
}
