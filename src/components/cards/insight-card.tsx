import Image from "next/image";
import Link from "next/link";

import { formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import type { Insight } from "@/lib/types";

export function InsightCard({ insight }: { insight: Insight }) {
  const topic = topicBySlug[insight.topics[0]];
  return (
    <article className="group relative flex h-full flex-col border-t border-line pt-5">
      <div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
          <Image
            src={insight.image}
            alt={insight.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.015]"
          />
        </div>
      </div>
      <p className="text-meta mt-5 flex gap-3 text-subtle">
        <span className="text-brand">Insight</span>
        <span>{topic.short}</span>
      </p>
      <h3 className="text-display-sm mt-2 text-balance">
        <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {insight.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">{insight.dek}</p>
      <p className="text-meta mt-4 text-subtle">
        <time dateTime={insight.publishedAt}>{formatShortDate(insight.publishedAt)}</time> · {insight.readingMinutes} min read
      </p>
    </article>
  );
}
