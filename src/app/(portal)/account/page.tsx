import Link from "next/link";
import { ArrowRight, Award, Download } from "lucide-react";

import { EventList } from "@/components/page/event-row";
import { NextEventCard } from "@/components/portal/next-event-card";
import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data";
import { formatShortDate } from "@/lib/format";
import { cpdLog, currentMember, recordings, registrations } from "@/lib/mock/portal";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const events = await getUpcomingEvents();
  const next = events.find((e) => registrations.includes(e.slug)) ?? events[0];
  const others = events.filter((e) => e.slug !== next.slug).slice(0, 3);
  const year = cpdLog.filter((c) => c.date.startsWith("2026"));
  const hours = year.reduce((s, c) => s + c.hours, 0);
  const continueWatching = recordings.find((r) => r.progressPct && r.progressPct < 100);

  return (
    <>
      <PortalHeader
        kicker="Member portal"
        title={`Good afternoon, ${currentMember.firstName}`}
        description="Your events, recordings and CPD in one place."
      />

      <PortalSection>
        <NextEventCard event={next} />
      </PortalSection>

      <div className="grid grid-cols-1 border-t border-line lg:grid-cols-[1.4fr_1fr]">
        <PortalSection
          title="Coming up"
          action={
            <Link href="/account/events" className="text-kicker text-graphite hover:text-ink">
              All events
            </Link>
          }
        >
          <EventList events={others} />
        </PortalSection>

        <PortalSection title="Your CPD in 2026" className="border-t border-line lg:border-t-0 lg:border-l">
          <p className="font-display text-[3.5rem] leading-none tracking-[-0.02em]">
            {hours}
            <span className="ml-2 align-baseline font-sans text-base text-subtle">hours logged</span>
          </p>
          <ul className="mt-6 border-b border-line">
            {year.slice(0, 3).map((c) => (
              <li key={c.id} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] text-ink">{c.title}</span>
                  <span className="text-meta text-subtle">{formatShortDate(c.date)}</span>
                </span>
                <span className="text-meta shrink-0 text-ink">{c.hours} h</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/account/cpd">
                CPD log <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <Download aria-hidden /> Export
            </Button>
          </div>
        </PortalSection>
      </div>

      <div className="grid grid-cols-1 border-t border-line lg:grid-cols-2">
        {continueWatching ? (
          <PortalSection title="Continue watching">
            <Link href={`/account/library/${continueWatching.slug}`} className="group block">
              <p className="font-display text-[1.375rem] leading-snug group-hover:underline">{continueWatching.title}</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-brand" style={{ width: `${continueWatching.progressPct}%` }} />
              </div>
              <p className="text-meta mt-2 text-subtle">
                {continueWatching.progressPct}% watched · {continueWatching.durationMin} min
              </p>
            </Link>
          </PortalSection>
        ) : null}
        <PortalSection title="Show your membership" className="border-t border-line lg:border-t-0 lg:border-l">
          <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-graphite">
            Add the Verified MetBA member badge to your website. It updates automatically and links to your verification
            page.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-5">
            <Link href="/account/badge">
              <Award aria-hidden /> Get your badge
            </Link>
          </Button>
        </PortalSection>
      </div>
    </>
  );
}
