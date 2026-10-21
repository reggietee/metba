import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { NewsletterMasthead } from "@/components/home/newsletter-masthead";
import { InsightRow } from "@/components/page/insight-row";
import { PageHeader } from "@/components/page/page-header";
import { getInsights, getTopics } from "@/lib/data";
import { formatShortDate } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";

export const metadata: Metadata = {
  title: "Insights",
  description: "Neutral, informational articles on developments in AI, digital asset, platform, privacy and technology law.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const [insights, topics] = await Promise.all([getInsights(), getTopics()]);
  const [lead, ...rest] = insights;
  return (
    <>
      <PageHeader
        kicker="Insights"
        title="Legal developments in emerging technology"
        standfirst="Informational articles on new rules, cases and enforcement, and the questions they raise for practice. Not legal advice."
      />

      <nav aria-label="Browse by topic" className="container-site pb-12">
        <ul className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${t.slug}`}
                className="text-meta inline-flex h-9 items-center rounded-sm border border-line px-3 text-graphite transition-colors hover:border-ink hover:text-ink"
              >
                {t.short}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {lead ? (
        <section aria-label="Latest" className="container-site pb-16 md:pb-24">
          <article className="group relative grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm lg:col-span-7">
              <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <p className="text-meta text-subtle">
                {topicBySlug[lead.topics[0]].name} · {formatShortDate(lead.publishedAt)}
              </p>
              <h2 className="text-display-lg mt-4 text-balance">
                <Link href={`/insights/${lead.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:underline decoration-line-strong underline-offset-4">
                  {lead.title}
                </Link>
              </h2>
              <p className="text-lead mt-5 text-graphite">{lead.dek}</p>
              <p className="text-meta mt-5 text-subtle">
                {lead.author} · {lead.readingMinutes} min read
              </p>
            </div>
          </article>
        </section>
      ) : null}

      <section aria-labelledby="all-insights" className="container-site pb-24 md:pb-32">
        <h2 id="all-insights" className="sr-only">
          More insights
        </h2>
        <ul className="border-b border-line">
          {rest.map((i) => (
            <InsightRow key={i.slug} insight={i} />
          ))}
        </ul>
      </section>

      <NewsletterMasthead />
    </>
  );
}
