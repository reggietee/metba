import Image from "next/image";
import Link from "next/link";

import { CpdLabel } from "@/components/brand/cpd-label";
import { LocalTime } from "@/components/brand/local-time";
import { Reveal } from "@/components/brand/reveal";
import { EventList } from "@/components/page/event-row";
import { Button } from "@/components/ui/button";
import { formatLabels } from "@/lib/format";
import type { MetbaEvent } from "@/lib/types";

function listNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export function FeaturedEvent({ event, upcoming }: { event: MetbaEvent; upcoming: MetbaEvent[] }) {
  const price = event.priceCents === 0 ? "Free" : `$${(event.priceCents / 100).toFixed(0)}`;
  return (
    <section
      aria-labelledby="featured-title"
      className="dark bg-night pt-20 pb-24 text-ink md:pt-28 md:pb-32 dark:border-y dark:border-line"
    >
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-kicker text-brass">Next event</p>
            <h2 id="featured-title" className="text-display-xl mt-6 text-balance">
              {event.title}
            </h2>
            <p className="text-lead mt-6 text-graphite">{event.summary}</p>
            <p className="text-body mt-6 text-graphite">
              With {listNames(event.speakers.map((s) => `${s.name} (${s.title})`))}.
            </p>

            <dl className="mt-10 border-t border-line">
              {[
                [
                  "Date",
                  <LocalTime key="d" startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} part="date" />,
                ],
                [
                  "Your time",
                  <LocalTime key="t" startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} part="time" />,
                ],
                ["Format", formatLabels[event.format]],
                ["Price", price],
              ].map(([k, v]) => (
                <div key={k as string} className="grid grid-cols-3 gap-4 border-b border-line py-3.5">
                  <dt className="text-meta text-subtle">{k}</dt>
                  <dd className="text-meta col-span-2 text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            {event.cpd.length > 0 ? (
              <div className="mt-6">
                <CpdLabel cpd={event.cpd} />
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="inverse" size="lg">
                <Link href={`/events/${event.slug}`}>Register</Link>
              </Button>
              <Button asChild variant="outline-inverse" size="lg">
                <Link href="/events">All events</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[4/5]">
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>

        {upcoming.length > 0 ? (
          <div className="mt-24 md:mt-32">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="text-display-sm">Also coming up</h3>
              <Link href="/events" className="text-kicker text-graphite hover:text-ink">
                Full calendar
              </Link>
            </div>
            <div className="mt-6">
              <EventList events={upcoming} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
