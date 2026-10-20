import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MemberCard } from "@/components/cards/member-card";
import { EventList } from "@/components/page/event-row";
import { InsightRow, RecapRow } from "@/components/page/insight-row";
import { PageHeader, SplitSection } from "@/components/page/page-header";
import { getTopic, getTopicContent, getTopics } from "@/lib/data";

export async function generateStaticParams() {
  return (await getTopics()).map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/topics/[topic]">): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) return {};
  return { title: topic.name, description: topic.description, alternates: { canonical: `/topics/${slug}` } };
}

export default async function TopicPage({ params }: PageProps<"/topics/[topic]">) {
  const { topic: slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) notFound();
  const content = await getTopicContent(topic.slug);
  const empty =
    content.events.length + content.insights.length + content.recaps.length + content.members.length === 0;

  return (
    <>
      <PageHeader
        kicker={
          <Link href="/topics" className="hover:underline">
            Topics
          </Link>
        }
        title={topic.name}
        standfirst={topic.description}
      />

      {empty ? (
        <SplitSection id="empty" title="Nothing here yet">
          <p className="text-body max-w-[56ch] text-graphite">
            New events and insights on {topic.short.toLowerCase()} will appear here. Subscribe to The Docket to hear
            about them first.
          </p>
        </SplitSection>
      ) : null}

      {content.events.length > 0 ? (
        <SplitSection id="events" title="Upcoming events">
          <EventList events={content.events} />
        </SplitSection>
      ) : null}

      {content.insights.length > 0 ? (
        <SplitSection id="insights" title="Insights">
          <ul className="border-b border-line">
            {content.insights.map((i) => (
              <InsightRow key={i.slug} insight={i} />
            ))}
          </ul>
        </SplitSection>
      ) : null}

      {content.recaps.length > 0 ? (
        <SplitSection id="recaps" title="Event recaps">
          <ul className="border-b border-line">
            {content.recaps.map((r) => (
              <RecapRow key={r.eventSlug} recap={r} />
            ))}
          </ul>
        </SplitSection>
      ) : null}

      {content.members.length > 0 ? (
        <SplitSection
          id="members"
          title="Members working on this"
          intro="Members who list this topic and have chosen a public profile."
        >
          <div className="grid gap-8 sm:grid-cols-2">
            {content.members.map((m) => (
              <MemberCard key={m.slug} member={m} />
            ))}
          </div>
        </SplitSection>
      ) : null}
    </>
  );
}
