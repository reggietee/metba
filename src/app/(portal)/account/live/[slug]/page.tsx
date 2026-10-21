import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LiveRoom } from "@/components/portal/live-room";
import { getEvent, getUpcomingEvents } from "@/lib/data";
import { liveSession } from "@/lib/mock/portal";

export const metadata = { title: "Live room" };

export async function generateStaticParams() {
  return (await getUpcomingEvents()).map((e) => ({ slug: e.slug }));
}

export default async function LiveRoomPage({ params }: PageProps<"/account/live/[slug]">) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  return (
    <Suspense fallback={<div className="dark min-h-[calc(100svh-6rem)] bg-night" />}>
      <LiveRoom title={event.title} session={liveSession} />
    </Suspense>
  );
}
