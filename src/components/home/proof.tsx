import { formatCount } from "@/lib/format";
import type { SiteStats } from "@/lib/types";

/**
 * Harvey-style proof: the numbers live inside a sentence.
 * Counts below their threshold are already removed by the data layer.
 */
export function Proof({ stats }: { stats: Partial<SiteStats> }) {
  const { members, countries, eventsHeld } = stats;
  if (!members && !countries && !eventsHeld) return null;
  const n = (v: number) => <span className="text-brand">{formatCount(v)}</span>;
  return (
    <section aria-label="MetBA in numbers" className="py-24 md:py-36">
      <div className="container-site grid gap-6 lg:grid-cols-12">
        <p className="text-kicker text-subtle lg:col-span-3 lg:pt-[0.9em]">MetBA today</p>
        {/* [DRAFT] */}
        <p className="text-display-lg max-w-[24ch] text-pretty lg:col-span-9">
          {members ? <>{n(members)} members</> : "Members"}
          {countries ? <> in {n(countries)} countries</> : null} are working out how the law applies to new technology
          {eventsHeld ? <>, across {n(eventsHeld)} events so far</> : null}.
        </p>
      </div>
    </section>
  );
}
