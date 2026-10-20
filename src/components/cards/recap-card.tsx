import Image from "next/image";
import Link from "next/link";

import { formatLabels, formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import type { Recap } from "@/lib/types";

export function RecapCard({ recap }: { recap: Recap }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="rounded-md border border-line bg-surface p-2">
        <div className="grain relative aspect-[3/2] overflow-hidden rounded-sm">
          <Image
            src={recap.image}
            alt={recap.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>
      <p className="text-label mt-5 flex gap-3 text-subtle">
        <span className="text-brand">Recap</span>
        <span>{topicBySlug[recap.topics[0]].short}</span>
      </p>
      <h3 className="text-display-sm mt-3 text-balance">
        <Link href={`/events/${recap.eventSlug}`} className="after:absolute after:inset-0 after:content-['']">
          {recap.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">{recap.summary}</p>
      <p className="text-label mt-4 text-subtle">
        <time dateTime={recap.heldAt}>{formatShortDate(recap.heldAt)}</time> · {formatLabels[recap.format]}
      </p>
    </article>
  );
}
