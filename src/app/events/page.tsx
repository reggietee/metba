import type { Metadata } from "next";
import Link from "next/link";

import { EventList } from "@/components/page/event-row";
import { PageHeader } from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data";
import type { MetbaEvent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Events and CPD",
  description: "Upcoming MetBA webinars, roundtables and in-person events on emerging technology law.",
  alternates: { canonical: "/events" },
};

function byMonth(events: MetbaEvent[]) {
  const groups = new Map<string, MetbaEvent[]>();
  for (const e of events) {
    const key = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: e.timezone }).format(
      new Date(e.startsAt),
    );
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }
  return [...groups.entries()];
}

export default async function EventsPage() {
  const events = await getUpcomingEvents();
  return (
    <>
      <PageHeader
        kicker="Events and CPD"
        title="Upcoming events"
        standfirst="Webinars, roundtables and member meetings. Times are shown in your time zone. Many events are eligible for CPD; each event page explains how."
        aside={
          <Button asChild variant="outline" className="mt-8">
            <Link href="/events/past">Past events and recaps</Link>
          </Button>
        }
      />
      <div className="container-site space-y-16 pb-24 md:space-y-20 md:pb-32">
        {byMonth(events).map(([month, list]) => (
          <section key={month} aria-label={month}>
            <h2 className="text-display-sm mb-4">{month}</h2>
            <EventList events={list} />
          </section>
        ))}
      </div>
    </>
  );
}
