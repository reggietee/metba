import Link from "next/link";

import { AvatarInitials } from "@/components/brand/avatar-initials";
import { CpdLabel } from "@/components/brand/cpd-label";
import { FramedMedia } from "@/components/brand/framed-media";
import { LocalTime } from "@/components/brand/local-time";
import { Reveal } from "@/components/brand/reveal";
import { Button } from "@/components/ui/button";
import { formatLabels } from "@/lib/format";
import type { MetbaEvent } from "@/lib/types";

export function FeaturedEvent({ event }: { event: MetbaEvent }) {
  const price = event.priceCents === 0 ? "Free" : `$${(event.priceCents / 100).toFixed(0)}`;
  return (
    <section aria-labelledby="featured-title" className="dark bg-night py-20 text-ink md:py-28 dark:border-y dark:border-line">
      <div className="container-site">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <p className="text-label text-brand">Featured event</p>
          <Link href="/events" className="text-[0.9375rem] text-graphite underline decoration-line-strong underline-offset-4 hover:text-ink">
            All events
          </Link>
        </div>

        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <FramedMedia
            src={event.image}
            alt={event.imageAlt}
            aspect="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]"
            className="border-line bg-night-raised lg:col-span-6"
          />

          <div className="flex flex-col lg:col-span-6">
            <p className="text-label text-subtle">
              <LocalTime startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} part="date" />
            </p>
            <h2 id="featured-title" className="text-display-xl mt-4 text-balance">
              {event.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">{event.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-label text-subtle">Time</dt>
                <dd className="mt-1.5 text-[0.9375rem]">
                  <LocalTime startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} part="time" />
                  <span className="block text-sm text-subtle">Shown in your time zone</span>
                </dd>
              </div>
              <div>
                <dt className="text-label text-subtle">Format</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{formatLabels[event.format]}</dd>
              </div>
              <div>
                <dt className="text-label text-subtle">Price</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{price}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-label text-subtle">Speakers</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {event.speakers.map((s) => (
                  <li key={s.id} className="flex items-center gap-3">
                    <AvatarInitials initials={s.initials} className="bg-night-raised" />
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] leading-tight">{s.name}</p>
                      <p className="truncate text-sm text-subtle">{s.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {event.cpd.length > 0 ? (
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-label mb-3 text-subtle">CPD</p>
                <CpdLabel cpd={event.cpd} />
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="inverse" size="lg">
                <Link href={`/events/${event.slug}`}>Register</Link>
              </Button>
              <Button asChild variant="outline-inverse" size="lg">
                <Link href={`/events/${event.slug}`}>Event details</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
