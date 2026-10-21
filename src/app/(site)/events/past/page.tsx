import type { Metadata } from "next";

import { PageHeader } from "@/components/page/page-header";
import { getRecaps, getTopics } from "@/lib/data";
import { PastEventsArchive } from "./archive";

export const metadata: Metadata = {
  title: "Past events and recaps",
  description: "Recaps, key takeaways and recordings from past MetBA events, filterable by topic, year and format.",
  alternates: { canonical: "/events/past" },
};

export default async function PastEventsPage() {
  const [recaps, topics] = await Promise.all([getRecaps(), getTopics()]);
  return (
    <>
      <PageHeader
        kicker="Events and CPD"
        title="Past events and recaps"
        standfirst="Summaries, key takeaways and, where available, recordings from past MetBA events."
      />
      <div className="container-site pb-24 md:pb-32">
        <PastEventsArchive recaps={recaps} topics={topics.map((t) => ({ slug: t.slug, name: t.short }))} />
      </div>
    </>
  );
}
