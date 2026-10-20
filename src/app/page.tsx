import type { Metadata } from "next";

import { Audiences } from "@/components/home/audiences";
import { DirectoryTeaser } from "@/components/home/directory-teaser";
import { FeaturedEvent } from "@/components/home/featured-event";
import { Hero } from "@/components/home/hero";
import { JoinCta } from "@/components/home/join-cta";
import { Latest } from "@/components/home/latest";
import { ProofStrip } from "@/components/home/proof-strip";
import { TopicsGrid } from "@/components/home/topics-grid";
import {
  getFeaturedEvent,
  getLatestInsights,
  getLatestRecap,
  getPublicStats,
  getTopicCounts,
  getTopics,
} from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} (${site.shortName}) | The global community for emerging technology law` },
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/brand/logo-ink.png`,
  sameAs: [site.social.linkedin, site.social.x],
};

export default async function HomePage() {
  const [stats, featured, topics, counts, insights, recap] = await Promise.all([
    getPublicStats(),
    getFeaturedEvent(),
    getTopics(),
    getTopicCounts(),
    getLatestInsights(3),
    getLatestRecap(),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Hero countries={stats.countries} />
      <ProofStrip stats={stats} />
      <Audiences />
      {featured ? <FeaturedEvent event={featured} /> : null}
      <TopicsGrid topics={topics} counts={counts} />
      <Latest insights={insights} recap={recap} />
      <DirectoryTeaser />
      <JoinCta />
    </>
  );
}
