"use client";

import { useSyncExternalStore } from "react";

import { formatEventDate, formatEventTime } from "@/lib/format";

const subscribe = () => () => {};

/**
 * Renders the event time in the event's own timezone on the server,
 * then switches to the viewer's timezone after hydration.
 */
export function LocalTime({
  startsAt,
  endsAt,
  timezone,
  part = "both",
}: {
  startsAt: string;
  endsAt: string;
  timezone: string;
  part?: "date" | "time" | "both";
}) {
  const tz = useSyncExternalStore(
    subscribe,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    () => timezone,
  );
  const date = formatEventDate(startsAt, tz);
  const time = formatEventTime(startsAt, endsAt, tz);
  return (
    <time dateTime={startsAt} suppressHydrationWarning>
      {part !== "time" ? date : null}
      {part === "both" ? " · " : null}
      {part !== "date" ? time : null}
    </time>
  );
}
