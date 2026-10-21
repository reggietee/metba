"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarPlus, Radio } from "lucide-react";

import { LocalTime } from "@/components/brand/local-time";
import { Button } from "@/components/ui/button";
import { formatLabels } from "@/lib/format";
import type { MetbaEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const states = [
  ["upcoming", "Upcoming"],
  ["doors", "Doors open"],
  ["live", "Live now"],
] as const;
type State = (typeof states)[number][0];

/**
 * The dashboard's main card. In the product its state follows the clock and the host's
 * "Go live" button; in the preview, partners can switch between states.
 */
export function NextEventCard({ event }: { event: MetbaEvent }) {
  const [state, setState] = useState<State>("upcoming");
  const live = state === "live";
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 [&>*]:min-w-0">
        <span className="text-meta text-subtle">Preview the card as:</span>
        <span className="inline-flex rounded-sm border border-dashed border-control p-0.5">
          {states.map(([v, l]) => (
            <button
              key={v}
              type="button"
              onClick={() => setState(v)}
              aria-pressed={state === v}
              className={cn(
                "text-meta h-7 rounded-sm px-2.5 transition-colors",
                state === v ? "bg-ink text-paper" : "text-graphite hover:text-ink",
              )}
            >
              {l}
            </button>
          ))}
        </span>
      </div>

      <article
        className={cn(
          "grid overflow-hidden rounded-sm border md:grid-cols-[1fr_1.1fr] [&>*]:min-w-0",
          live ? "dark border-transparent bg-night text-ink" : "border-line bg-surface",
        )}
      >
        <div className="relative min-h-52 md:min-h-full">
          <Image src={event.image} alt={event.imageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          {live ? (
            <span className="text-meta absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-[oklch(0.55_0.2_27)] px-3 py-1.5 text-white">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              Live now
            </span>
          ) : null}
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <p className="text-kicker text-brand">
            {state === "upcoming" ? "Your next CPD event" : state === "doors" ? "Starting soon" : "Happening now"}
          </p>
          <h2 className="mt-3 font-display text-[1.875rem] leading-tight tracking-[-0.012em]">{event.title}</h2>
          <p className="text-meta mt-3 text-subtle">
            <LocalTime startsAt={event.startsAt} endsAt={event.endsAt} timezone={event.timezone} /> ·{" "}
            {formatLabels[event.format]}
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">
            {state === "upcoming"
              ? "You're registered. The room opens 10 minutes before the start, and your attendance is recorded automatically for your CPD log."
              : state === "doors"
                ? "The room is open. Join now to test your audio before the hosts go live."
                : "The session has started. Your attendance is being recorded for CPD."}
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {state === "upcoming" ? (
              <>
                <Button variant="outline">
                  <CalendarPlus aria-hidden /> Add to calendar
                </Button>
                <Button asChild variant="ghost">
                  <Link href={`/events/${event.slug}`}>Event details</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg" variant={live ? "inverse" : "default"}>
                <Link href={`/account/live/${event.slug}${state === "doors" ? "?state=waiting" : ""}`}>
                  <Radio aria-hidden /> {live ? "Join the live session" : "Enter the room"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
