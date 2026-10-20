import Link from "next/link";

import { formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import type { Insight, Recap } from "@/lib/types";

export function InsightRow({ insight }: { insight: Insight }) {
  return (
    <li className="group relative border-t border-line">
      <div className="grid gap-2 py-6 md:grid-cols-12 md:gap-6">
        <p className="text-meta text-subtle md:col-span-3">
          <time dateTime={insight.publishedAt}>{formatShortDate(insight.publishedAt)}</time>
          <span className="block">{topicBySlug[insight.topics[0]].short}</span>
        </p>
        <div className="md:col-span-9">
          <h3 className="font-display text-[1.625rem] leading-tight tracking-[-0.01em]">
            <Link
              href={`/insights/${insight.slug}`}
              className="decoration-line-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
            >
              {insight.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-graphite">{insight.dek}</p>
          <p className="text-meta mt-3 text-subtle">{insight.readingMinutes} min read</p>
        </div>
      </div>
    </li>
  );
}

export function RecapRow({ recap }: { recap: Recap }) {
  return (
    <li className="group relative border-t border-line">
      <div className="grid gap-2 py-6 md:grid-cols-12 md:gap-6">
        <p className="text-meta text-subtle md:col-span-3">
          <time dateTime={recap.heldAt}>{formatShortDate(recap.heldAt)}</time>
          <span className="block text-brand">Recap</span>
        </p>
        <div className="md:col-span-9">
          <h3 className="font-display text-[1.625rem] leading-tight tracking-[-0.01em]">
            <Link
              href={`/events/${recap.eventSlug}`}
              className="decoration-line-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
            >
              {recap.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-graphite">{recap.summary}</p>
        </div>
      </div>
    </li>
  );
}
