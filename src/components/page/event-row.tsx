import Link from "next/link";

import { LocalTime } from "@/components/brand/local-time";
import { formatLabels } from "@/lib/format";
import type { MetbaEvent } from "@/lib/types";

/** Docket-style listing row. Works on paper and night surfaces. */
export function EventRow({ event }: { event: MetbaEvent }) {
  const full = event.capacity !== undefined && (event.registered ?? 0) >= event.capacity;
  return (
    <li className="group relative border-t border-line">
      <div className="grid gap-1 py-5 md:grid-cols-12 md:items-baseline md:gap-6">
        <p className="text-meta text-subtle md:col-span-3">
          <LocalTime startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} part="date" />
        </p>
        <p className="font-display text-xl leading-snug md:col-span-6 md:text-2xl">
          <Link
            href={`/events/${event.slug}`}
            className="decoration-line-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
          >
            {event.title}
          </Link>
        </p>
        <p className="text-meta text-subtle md:col-span-3 md:text-right">
          {formatLabels[event.format]}
          {event.city ? `, ${event.city}` : ""}
          {full ? <span className="text-brand"> · Waitlist</span> : null}
        </p>
      </div>
    </li>
  );
}

export function EventList({ events }: { events: MetbaEvent[] }) {
  return (
    <ul className="border-b border-line">
      {events.map((e) => (
        <EventRow key={e.slug} event={e} />
      ))}
    </ul>
  );
}
