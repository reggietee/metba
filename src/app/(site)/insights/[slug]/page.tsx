import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EventList } from "@/components/page/event-row";
import { InsightRow } from "@/components/page/insight-row";
import { JsonLd } from "@/components/page/json-ld";
import { Blocks } from "@/components/page/prose";
import { getEvent, getInsight, getInsights } from "@/lib/data";
import { formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import { site } from "@/lib/site";
import type { MetbaEvent } from "@/lib/types";

export async function generateStaticParams() {
  return (await getInsights()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.dek,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { type: "article", publishedTime: insight.publishedAt, title: insight.title, description: insight.dek },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const related = (await Promise.all((insight.relatedEvents ?? []).map((s) => getEvent(s)))).filter(
    (e): e is MetbaEvent => e !== null,
  );
  const more = (await getInsights()).filter((i) => i.slug !== slug && i.topics.some((t) => insight.topics.includes(t))).slice(0, 3);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.dek,
          datePublished: insight.publishedAt,
          author: { "@type": "Organization", name: insight.author },
          publisher: { "@type": "Organization", name: site.name, logo: `${site.url}/brand/logo-ink.png` },
          image: `${site.url}${insight.image}`,
          mainEntityOfPage: `${site.url}/insights/${slug}`,
        }}
      />
      <header className="container-site pt-14 pb-12 md:pt-20 md:pb-16">
        <p className="text-meta motion-rise flex flex-wrap gap-x-4 gap-y-1 text-subtle">
          <Link href="/insights" className="text-brand hover:underline">
            Insights
          </Link>
          {insight.topics.map((t) => (
            <Link key={t} href={`/topics/${t}`} className="hover:text-ink">
              {topicBySlug[t].name}
            </Link>
          ))}
        </p>
        <h1 className="text-display-xl motion-rise mt-6 max-w-[22ch] text-balance">{insight.title}</h1>
        <p className="text-lead motion-rise mt-6 max-w-[52ch] text-graphite" style={{ "--delay": "120ms" } as React.CSSProperties}>
          {insight.dek}
        </p>
        <p className="text-meta mt-8 text-subtle">
          {insight.author} · <time dateTime={insight.publishedAt}>{formatShortDate(insight.publishedAt)}</time> ·{" "}
          {insight.readingMinutes} min read
        </p>
      </header>

      <div className="container-site">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]">
          <Image src={insight.image} alt={insight.imageAlt} fill preload sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:col-start-3">
          {insight.body ? <Blocks blocks={insight.body} /> : null}
          {/* [DRAFT] */}
          <p className="text-meta mt-14 border-t border-line pt-6 text-subtle">
            MetBA insights are for general information. They are not legal advice and do not take a position on whether
            any technology is good or bad.
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-events" className="dark bg-night py-16 text-ink md:py-24">
          <div className="container-site">
            <h2 id="related-events" className="text-display-md mb-8">
              Related events
            </h2>
            <EventList events={related} />
          </div>
        </section>
      ) : null}

      {more.length > 0 ? (
        <section aria-labelledby="more-insights" className="container-site py-16 md:py-24">
          <h2 id="more-insights" className="text-display-md mb-8">
            More on this topic
          </h2>
          <ul className="border-b border-line">
            {more.map((i) => (
              <InsightRow key={i.slug} insight={i} />
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
