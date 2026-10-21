"use client";

import { useId, useMemo, useState } from "react";

import { RecapRow } from "@/components/page/insight-row";
import { formatLabels } from "@/lib/format";
import type { EventFormat, Recap } from "@/lib/types";

const selectClass =
  "h-11 w-full appearance-none rounded-md border border-input bg-surface bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pr-9 pl-3.5 text-[0.9375rem] text-ink";
const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")";

export function PastEventsArchive({ recaps, topics }: { recaps: Recap[]; topics: { slug: string; name: string }[] }) {
  const id = useId();
  const [topic, setTopic] = useState("");
  const [year, setYear] = useState("");
  const [format, setFormat] = useState("");

  const years = useMemo(() => [...new Set(recaps.map((r) => r.heldAt.slice(0, 4)))].sort().reverse(), [recaps]);
  const formats = useMemo(() => [...new Set(recaps.map((r) => r.format))], [recaps]);
  const shown = recaps.filter(
    (r) =>
      (!topic || r.topics.includes(topic as Recap["topics"][number])) &&
      (!year || r.heldAt.startsWith(year)) &&
      (!format || r.format === format),
  );

  const filters = [
    { label: "Topic", value: topic, set: setTopic, options: topics.map((t) => [t.slug, t.name]) },
    { label: "Year", value: year, set: setYear, options: years.map((y) => [y, y]) },
    { label: "Format", value: format, set: setFormat, options: formats.map((f) => [f, formatLabels[f as EventFormat]]) },
  ] as const;

  return (
    <div>
      <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
        {filters.map((f) => (
          <div key={f.label}>
            <label htmlFor={`${id}-${f.label}`} className="text-meta mb-2 block text-subtle">
              {f.label}
            </label>
            <select
              id={`${id}-${f.label}`}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className={selectClass}
              style={{ backgroundImage: chevron }}
            >
              <option value="">All</option>
              {f.options.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <p role="status" className="text-meta mt-8 mb-2 text-subtle">
        {shown.length} {shown.length === 1 ? "event" : "events"}
      </p>
      {shown.length > 0 ? (
        <ul className="border-b border-line">
          {shown.map((r) => (
            <RecapRow key={r.eventSlug} recap={r} />
          ))}
        </ul>
      ) : (
        <div className="border-t border-line py-12">
          <p className="font-display text-2xl">No events match these filters</p>
          <button
            type="button"
            onClick={() => {
              setTopic("");
              setYear("");
              setFormat("");
            }}
            className="text-kicker mt-4 text-ink underline decoration-line-strong underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
