import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AvatarInitials } from "@/components/brand/avatar-initials";
import { CpdLabel } from "@/components/brand/cpd-label";
import { LocalTime } from "@/components/brand/local-time";
import { InsightRow } from "@/components/page/insight-row";
import { JsonLd } from "@/components/page/json-ld";
import { Prose } from "@/components/page/prose";
import { Button } from "@/components/ui/button";
import { getEvent, getEventSlugs, getInsights, getRecap } from "@/lib/data";
import { formatLabels, formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import { site } from "@/lib/site";
import type { MetbaEvent, Recap, Speaker } from "@/lib/types";

export async function generateStaticParams() {
  return (await getEventSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  const recap = event ? null : await getRecap(slug);
  const title = event?.title ?? recap?.title;
  if (!title) return {};
  return {
    title: recap ? `${title}: recap` : title,
    description: event?.summary ?? recap?.summary,
    alternates: { canonical: `/events/${slug}` },
  };
}

// One URL per event. It shows the upcoming view, then switches to the recap after the event.
export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (event) return <UpcomingEvent event={event} />;
  const recap = await getRecap(slug);
  if (recap) return <RecapView recap={recap} />;
  notFound();
}

function UpcomingEvent({ event }: { event: MetbaEvent }) {
  const full = event.capacity !== undefined && (event.registered ?? 0) >= event.capacity;
  const remaining = event.capacity !== undefined ? event.capacity - (event.registered ?? 0) : undefined;
  const online = event.format === "webinar" || event.format === "virtual_venue";
  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          description: event.summary,
          startDate: event.startsAt,
          endDate: event.endsAt,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: online
            ? "https://schema.org/OnlineEventAttendanceMode"
            : event.format === "hybrid"
              ? "https://schema.org/MixedEventAttendanceMode"
              : "https://schema.org/OfflineEventAttendanceMode",
          location: online
            ? { "@type": "VirtualLocation", url: `${site.url}/events/${event.slug}` }
            : { "@type": "Place", name: event.venue, address: event.city },
          image: `${site.url}${event.image}`,
          organizer: { "@type": "Organization", name: site.name, url: site.url },
          performer: event.speakers.map((s) => ({ "@type": "Person", name: s.name })),
          offers: {
            "@type": "Offer",
            price: (event.priceCents / 100).toFixed(2),
            priceCurrency: "USD",
            availability: full ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
            url: `${site.url}/events/${event.slug}`,
          },
        }}
      />

      <header className="container-site pt-14 pb-12 md:pt-20 md:pb-16">
        <p className="text-meta motion-rise flex flex-wrap gap-x-4 text-subtle">
          <Link href="/events" className="text-brand hover:underline">
            Events
          </Link>
          <span>{formatLabels[event.format]}</span>
        </p>
        <h1 className="text-display-xl motion-rise mt-6 max-w-[20ch] text-balance">{event.title}</h1>
        <p className="text-lead motion-rise mt-6 max-w-[56ch] text-graphite" style={{ "--delay": "120ms" } as React.CSSProperties}>
          {event.summary}
        </p>
      </header>

      <div className="container-site grid gap-12 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-10">
        {/* Details and registration: first on mobile, sticky alongside on desktop. */}
        <aside aria-label="Event details" className="lg:order-2 lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <dl className="border-t border-ink">
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
                ...(event.venue ? [["Venue", event.venue]] : []),
                ["Price", event.priceCents === 0 ? "Free" : `$${(event.priceCents / 100).toFixed(0)}`],
                ...(remaining !== undefined
                  ? [["Places", full ? "Full. Join the waitlist" : `${remaining} remaining`]]
                  : []),
              ].map(([k, v]) => (
                <div key={k as string} className="grid grid-cols-3 gap-4 border-b border-line py-3.5">
                  <dt className="text-meta text-subtle">{k}</dt>
                  <dd className="text-meta col-span-2 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            {/* Registration is wired up in Phase 3; until then this leads to sign-up. */}
            <Button asChild size="lg" className="mt-6 w-full">
              <Link href={`/join?event=${event.slug}`}>{full ? "Join the waitlist" : "Register"}</Link>
            </Button>
            <p className="text-meta mt-3 text-subtle">
              {online || event.format === "hybrid"
                ? "The joining link is sent to registered attendees and shown on this page once you are signed in."
                : "Registered attendees receive the venue details by email."}
            </p>

            {event.cpd.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-kicker mb-3 text-ink">CPD</h2>
                <CpdLabel cpd={event.cpd} />
              </div>
            ) : null}
          </div>
        </aside>

        <div className="lg:order-1 lg:col-span-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
            <Image src={event.image} alt={event.imageAlt} fill preload sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>

          {event.description ? (
            <section aria-labelledby="about-event" className="mt-14">
              <h2 id="about-event" className="text-display-md mb-6">
                About this event
              </h2>
              <Prose>
                {event.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Prose>
            </section>
          ) : null}

          {event.agenda ? (
            <section aria-labelledby="agenda" className="mt-14">
              <h2 id="agenda" className="text-display-md mb-6">
                Programme
              </h2>
              <dl className="border-b border-line">
                {event.agenda.map((a) => (
                  <div key={a.time} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-line py-3.5">
                    <dt className="text-meta text-subtle">{a.time}</dt>
                    <dd className="text-body text-ink">{a.item}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <SpeakerList speakers={event.speakers} />
          <TopicLinks topics={event.topics} />
        </div>
      </div>
    </article>
  );
}

async function RecapView({ recap }: { recap: Recap }) {
  const related = (await getInsights()).filter((i) => i.topics.some((t) => recap.topics.includes(t))).slice(0, 3);
  return (
    <article>
      <header className="container-site pt-14 pb-12 md:pt-20 md:pb-16">
        <p className="text-meta motion-rise flex flex-wrap gap-x-4 text-subtle">
          <Link href="/events/past" className="text-brand hover:underline">
            Recap
          </Link>
          <span>
            {formatLabels[recap.format]} · <time dateTime={recap.heldAt}>{formatShortDate(recap.heldAt)}</time>
          </span>
        </p>
        <h1 className="text-display-xl motion-rise mt-6 max-w-[20ch] text-balance">{recap.title}</h1>
        <p className="text-lead motion-rise mt-6 max-w-[56ch] text-graphite" style={{ "--delay": "120ms" } as React.CSSProperties}>
          {recap.summary}
        </p>
      </header>

      <div className="container-site">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]">
          <Image src={recap.image} alt={recap.imageAlt} fill preload sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {recap.takeaways ? (
            <section aria-labelledby="takeaways">
              <h2 id="takeaways" className="text-display-md mb-6">
                Key takeaways
              </h2>
              <ol className="border-b border-line">
                {recap.takeaways.map((t, i) => (
                  <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5">
                    <span className="font-display text-2xl text-brand">{i + 1}</span>
                    <span className="text-lead text-ink">{t}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          {recap.speakers ? <SpeakerList speakers={recap.speakers} /> : null}
          <TopicLinks topics={recap.topics} />
        </div>
        <aside aria-label="Recording" className="lg:col-span-4">
          <div className="border-t border-ink pt-5">
            <h2 className="text-kicker text-ink">Recording</h2>
            <p className="text-body mt-3 text-graphite">
              {recap.recordingVisibility === "public"
                ? "The recording is available to everyone. It will play here once recordings are connected."
                : recap.recordingVisibility === "members"
                  ? "The recording is available to signed-in members."
                  : "This event was not recorded."}
            </p>
            {recap.recordingVisibility === "members" ? (
              <Button asChild variant="outline" className="mt-5">
                <Link href="/sign-in">Log in to watch</Link>
              </Button>
            ) : null}
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related" className="container-site pb-24 md:pb-32">
          <h2 id="related" className="text-display-md mb-8">
            Related insights
          </h2>
          <ul className="border-b border-line">
            {related.map((i) => (
              <InsightRow key={i.slug} insight={i} />
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}

function SpeakerList({ speakers }: { speakers: Speaker[] }) {
  return (
    <section aria-labelledby="speakers" className="mt-14">
      <h2 id="speakers" className="text-display-md mb-6">
        Speakers
      </h2>
      <ul className="border-b border-line">
        {speakers.map((s) => (
          <li key={s.id} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-5 sm:grid-cols-[4rem_1fr]">
            <AvatarInitials initials={s.initials} className="size-12 text-lg sm:size-14" />
            <div>
              <p className="font-display text-[1.5rem] leading-tight">{s.name}</p>
              <p className="text-[0.9375rem] text-graphite">
                {s.title}, {s.organisation}
              </p>
              {s.bio ? <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-subtle">{s.bio}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TopicLinks({ topics }: { topics: MetbaEvent["topics"] }) {
  return (
    <p className="text-meta mt-10 flex flex-wrap gap-2">
      {topics.map((t) => (
        <Link
          key={t}
          href={`/topics/${t}`}
          className="inline-flex h-9 items-center rounded-sm border border-line px-3 text-graphite hover:border-ink hover:text-ink"
        >
          {topicBySlug[t].name}
        </Link>
      ))}
    </p>
  );
}
