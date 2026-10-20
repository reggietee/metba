import Image from "next/image";
import Link from "next/link";

import { CpdTag } from "@/components/brand/cpd-label";
import { LocalTime } from "@/components/brand/local-time";
import { formatLabels } from "@/lib/format";
import type { MetbaEvent } from "@/lib/types";

export function EventCard({ event }: { event: MetbaEvent }) {
  const full = event.capacity !== undefined && (event.registered ?? 0) >= event.capacity;
  return (
    <article className="group relative flex h-full flex-col border-t border-line pt-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.015]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-meta text-subtle">
          <LocalTime startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} part="date" />
        </p>
        <h3 className="text-display-sm mt-3 text-balance">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {event.title}
          </Link>
        </h3>
        <p className="text-meta mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 text-subtle">
          <span>{formatLabels[event.format]}</span>
          {event.city ? <span>{event.city}</span> : null}
          <CpdTag cpd={event.cpd} />
          {full ? <span className="text-brand">Waitlist open</span> : null}
        </p>
      </div>
    </article>
  );
}
