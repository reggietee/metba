import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { LocalTime } from "@/components/brand/local-time";
import { EventList } from "@/components/page/event-row";
import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data";
import { formatLabels } from "@/lib/format";
import { registrations } from "@/lib/mock/portal";

export const metadata = { title: "Events and CPD" };

export default async function MemberEventsPage() {
  const events = await getUpcomingEvents();
  const mine = events.filter((e) => registrations.includes(e.slug));
  const others = events.filter((e) => !registrations.includes(e.slug));
  return (
    <>
      <PortalHeader title="Events and CPD" description="Your registrations, and upcoming events you can register for." />
      <PortalSection title="You're registered">
        <ul className="border-b border-line">
          {mine.map((e) => (
            <li key={e.slug} className="grid gap-3 border-t border-line py-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-meta text-subtle">
                  <LocalTime startsAt={e.startsAt} endsAt={e.endsAt} timezone={e.timezone} /> · {formatLabels[e.format]}
                </p>
                <p className="mt-1 font-display text-[1.5rem] leading-tight">{e.title}</p>
                <p className="text-meta mt-2 inline-flex items-center gap-1.5 text-brand">
                  <CalendarCheck aria-hidden className="size-3.5" /> Registered. The room opens 10 minutes before the start.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/events/${e.slug}`}>Details</Link>
                </Button>
                <Button variant="ghost" size="sm">
                  Cancel registration
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </PortalSection>
      <PortalSection title="More events">
        <EventList events={others} />
      </PortalSection>
    </>
  );
}
