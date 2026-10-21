import Image from "next/image";
import Link from "next/link";
import { Lock, Play } from "lucide-react";

import { formatLabels, formatShortDate } from "@/lib/format";
import type { Recording } from "@/lib/mock/portal";
import { topicBySlug } from "@/lib/mock/topics";
import { cn } from "@/lib/utils";

const duration = (m: number) => `${Math.floor(m / 60) ? `${Math.floor(m / 60)} h ` : ""}${m % 60} min`;

/** Library tile. `locked` shows full details with a locked player for visitors. */
export function RecordingCard({ r, href, locked }: { r: Recording; href: string; locked?: boolean }) {
  return (
    <li className="group relative flex flex-col">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-secondary">
        <Image
          src={r.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className={cn(
            "object-cover transition-[transform,filter] duration-700 ease-[var(--ease-out-quart)]",
            locked ? "brightness-[0.55] grayscale" : "group-hover:scale-[1.02]",
          )}
        />
        <span
          className={cn(
            "absolute inset-0 grid place-items-center",
            locked ? "" : "opacity-0 transition-opacity group-hover:opacity-100",
          )}
        >
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-[oklch(0.97_0.004_150)] text-[oklch(0.2_0.014_172)]">
            {locked ? <Lock aria-hidden className="size-5" /> : <Play aria-hidden className="ml-0.5 size-5" />}
          </span>
        </span>
        <span className="text-meta absolute right-2 bottom-2 rounded-sm bg-black/70 px-2 py-0.5 text-white">
          {duration(r.durationMin)}
        </span>
        {!locked && r.progressPct ? (
          <span className="absolute inset-x-0 bottom-0 h-1 bg-black/40">
            <span className="block h-full bg-brand" style={{ width: `${r.progressPct}%` }} />
          </span>
        ) : null}
      </div>
      <p className="text-meta mt-4 text-subtle">
        {formatShortDate(r.heldAt)} · {formatLabels[r.format]} · {r.cpdHours} CPD {r.cpdHours === 1 ? "hour" : "hours"}
      </p>
      <h3 className="mt-2 font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
        <Link href={href} className="decoration-line-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline">
          {r.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite">{r.summary}</p>
      <p className="text-meta mt-3 text-subtle">With {r.speakers.join(", ")}</p>
      <p className="text-meta mt-1 text-brand">{r.topics.map((t) => topicBySlug[t].short).join(" · ")}</p>
      {locked ? (
        <p className="text-meta mt-3 inline-flex items-center gap-1.5 text-ink">
          <Lock aria-hidden className="size-3.5" /> Members only
        </p>
      ) : null}
    </li>
  );
}
