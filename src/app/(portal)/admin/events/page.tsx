import Link from "next/link";
import { Plus, Radio } from "lucide-react";

import { LocalTime } from "@/components/brand/local-time";
import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data";
import { formatLabels } from "@/lib/format";
import { recordings } from "@/lib/mock/portal";

export const metadata = { title: "Events" };

const lifecycle = ["Scheduled", "Green room", "Doors open", "Live", "Ended", "Recap"];

export default async function AdminEventsPage() {
  const events = await getUpcomingEvents();
  return (
    <>
      <PortalHeader
        title="Events"
        description="Each event moves through the same steps. Daily rooms are created automatically 24 hours before the start."
        actions={
          <Button variant="inverse">
            <Plus aria-hidden /> New event
          </Button>
        }
      />
      <PortalSection>
        <ol className="text-meta flex flex-wrap items-center gap-2 text-subtle">
          {lifecycle.map((s, i) => (
            <li key={s} className="inline-flex items-center gap-2">
              <span className="rounded-full border border-line px-3 py-1">{s}</span>
              {i < lifecycle.length - 1 ? <span aria-hidden>→</span> : null}
            </li>
          ))}
        </ol>
      </PortalSection>
      <PortalSection title="Upcoming">
        <ul className="border-b border-line">
          {events.map((e, i) => (
            <li key={e.slug} className="grid gap-3 border-t border-line py-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-meta text-subtle">
                  <LocalTime startsAt={e.startsAt} endsAt={e.endsAt} timezone={e.timezone} /> · {formatLabels[e.format]}
                </p>
                <p className="mt-1 font-display text-[1.5rem] leading-tight">{e.title}</p>
                <p className="text-meta mt-2 text-graphite">
                  {e.registered ?? 0} registered{e.capacity ? ` of ${e.capacity}` : ""} ·{" "}
                  <span className={i === 0 ? "text-brass" : "text-subtle"}>{i === 0 ? "Daily room ready" : "Scheduled"}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline-inverse" size="sm">
                  Edit
                </Button>
                <Button variant="outline-inverse" size="sm">
                  Registrations
                </Button>
                {i === 0 ? (
                  <Button asChild variant="inverse" size="sm">
                    <Link href={`/admin/events/${e.slug}/live`}>
                      <Radio aria-hidden /> Live control
                    </Link>
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </PortalSection>
      <PortalSection title="Past events">
        <ul className="border-b border-line">
          {recordings.slice(0, 3).map((r) => (
            <li key={r.slug} className="flex flex-col gap-2 border-t border-line py-4 md:flex-row md:items-center md:justify-between">
              <span className="font-display text-xl">{r.title}</span>
              <span className="text-meta text-subtle">
                Recording published · {r.publicSample ? "Public sample" : "Members only"} · Attendance processed
              </span>
            </li>
          ))}
        </ul>
      </PortalSection>
    </>
  );
}
