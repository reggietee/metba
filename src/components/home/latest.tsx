import Image from "next/image";

import { Reveal } from "@/components/brand/reveal";
import Link from "next/link";

import { formatLabels, formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import type { Insight, Recap } from "@/lib/types";

/** Lead story plus a text-only sidebar, like a front page. */
export function Latest({ insights, recap }: { insights: Insight[]; recap: Recap | null }) {
  const [lead, ...rest] = insights;
  if (!lead) return null;
  return (
    <section aria-labelledby="latest-title" className="border-t border-line pt-16 pb-28 md:pt-20 md:pb-36">
      <div className="container-site">
        <div className="mb-12 flex items-baseline justify-between gap-6 md:mb-16">
          <h2 id="latest-title" className="text-display-lg">
            Insights
          </h2>
          <Link href="/insights" className="text-kicker text-graphite hover:text-ink">
            All insights
          </Link>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <article className="group relative lg:col-span-8">
            <Reveal className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <p className="text-meta mt-6 text-subtle">
              {topicBySlug[lead.topics[0]].name} · {formatShortDate(lead.publishedAt)}
            </p>
            <h3 className="text-display-md mt-3 max-w-[28ch] text-balance">
              <Link href={`/insights/${lead.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {lead.title}
              </Link>
            </h3>
            <p className="text-body mt-4 max-w-[60ch] text-graphite">{lead.dek}</p>
          </article>

          <div className="flex flex-col lg:col-span-4">
            {rest.slice(0, 2).map((i) => (
              <article key={i.slug} className="group relative border-t border-line py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
                <p className="text-meta text-subtle">
                  {topicBySlug[i.topics[0]].name} · {i.readingMinutes} min read
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight tracking-[0.005em]">
                  <Link href={`/insights/${i.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:underline decoration-line-strong underline-offset-4">
                    {i.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">{i.dek}</p>
              </article>
            ))}
            {recap ? (
              <article className="group relative border-t border-line pt-7">
                <p className="text-kicker text-brand">Event recap</p>
                <h3 className="mt-3 font-display text-2xl leading-tight tracking-[0.005em]">
                  <Link href={`/events/${recap.eventSlug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:underline decoration-line-strong underline-offset-4">
                    {recap.title}
                  </Link>
                </h3>
                <p className="text-meta mt-3 text-subtle">
                  {formatLabels[recap.format]} · {formatShortDate(recap.heldAt)}
                </p>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
