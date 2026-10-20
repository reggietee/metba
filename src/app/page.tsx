import type { Metadata } from "next";

import { Audiences } from "@/components/home/audiences";
import { DirectoryTeaser } from "@/components/home/directory-teaser";
import { FeaturedEvent } from "@/components/home/featured-event";
import { Hero } from "@/components/home/hero";
import { JoinCta } from "@/components/home/join-cta";
import { Latest } from "@/components/home/latest";
import { NewsletterMasthead } from "@/components/home/newsletter-masthead";
import { Proof } from "@/components/home/proof";
import { TopicsIndex } from "@/components/home/topics-index";
import {
  getFeaturedEvent,
  getLatestInsights,
  getLatestRecap,
  getPublicStats,
  getTopics,
  getUpcomingEvents,
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
  const [stats, featured, upcoming, topics, insights, recap] = await Promise.all([
    getPublicStats(),
    getFeaturedEvent(),
    getUpcomingEvents(),
    getTopics(),
    getLatestInsights(3),
    getLatestRecap(),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Hero />
      <Proof stats={stats} />
      <Audiences />
      {featured ? (
        <FeaturedEvent event={featured} upcoming={upcoming.filter((e) => e.slug !== featured.slug).slice(0, 3)} />
      ) : null}
      <TopicsIndex topics={topics} />
      <Latest insights={insights} recap={recap} />
      <NewsletterMasthead />
      <DirectoryTeaser />
      <JoinCta />
    </>
  );
}
