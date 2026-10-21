import { notFound } from "next/navigation";

import { LocalTime } from "@/components/brand/local-time";
import { LiveControl } from "@/components/portal/live-control";
import { PortalHeader } from "@/components/portal/portal-shell";
import { getEvent, getUpcomingEvents } from "@/lib/data";
import { liveSession } from "@/lib/mock/portal";

export const metadata = { title: "Live control" };

export async function generateStaticParams() {
  return (await getUpcomingEvents()).map((e) => ({ slug: e.slug }));
}

export default async function LiveControlPage({ params }: PageProps<"/admin/events/[slug]/live">) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  return (
    <>
      <PortalHeader
        kicker="Live control"
        title={event.title}
        description={<LocalTime startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} />}
      />
      <LiveControl
        stage={liveSession.stage}
        hands={liveSession.hands}
        questions={liveSession.questions}
        counts={{ registered: liveSession.registered, inRoom: liveSession.inRoom, peak: liveSession.peak }}
      />
    </>
  );
}
