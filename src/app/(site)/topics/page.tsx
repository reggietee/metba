import type { Metadata } from "next";

import { PageHeader } from "@/components/page/page-header";
import { TopicsIndex } from "@/components/home/topics-index";
import { getTopics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Topics",
  description: "The eight areas of emerging technology law that MetBA events, insights and members are organised around.",
  alternates: { canonical: "/topics" },
};

export default async function TopicsPage() {
  const topics = await getTopics();
  return (
    <>
      <PageHeader
        kicker="Topics"
        title="Eight areas where the law is changing"
        standfirst="Every event, insight and member profile is tagged to one or more topics. Choose an area to see everything in it."
      />
      <div className="-mt-28 md:-mt-40">
        <TopicsIndex topics={topics} hideHeading />
      </div>
    </>
  );
}
