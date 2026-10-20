import { formatCount } from "@/lib/format";
import type { SiteStats } from "@/lib/types";

const labels: Record<keyof SiteStats, string> = {
  members: "Members",
  countries: "Countries",
  eventsHeld: "Events held",
};

/** Live counts. Any count below its threshold is already removed by the data layer. */
export function ProofStrip({ stats }: { stats: Partial<SiteStats> }) {
  const entries = (Object.keys(labels) as (keyof SiteStats)[]).filter((k) => stats[k] !== undefined);
  if (entries.length === 0) return null;
  return (
    <section aria-label="MetBA in numbers" className="border-b border-line">
      <div className="container-site">
        <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {entries.map((k) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-6 sm:block sm:px-8 sm:py-10 sm:first:pl-0">
              <dt className="text-label order-2 text-subtle sm:mt-3">{labels[k]}</dt>
              <dd className="font-display order-1 text-5xl leading-none text-ink tabular-nums md:text-6xl sm:mb-3">
                {formatCount(stats[k]!)}
                {k === "members" ? <span className="text-subtle">+</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
