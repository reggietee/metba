import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JoinCta } from "@/components/home/join-cta";
import { EventList } from "@/components/page/event-row";
import { PageHeader, SplitSection } from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "For students",
  description: "Free MetBA membership for law students interested in AI, digital assets, Web3 and technology law.",
  alternates: { canonical: "/for-students" },
};

// Copy on this page is [DRAFT].
const reasons = [
  {
    title: "Learn from practitioners",
    body: "Hear how lawyers are handling questions that textbooks have not caught up with yet.",
  },
  {
    title: "Meet people in the field",
    body: "Members work in firms, companies, regulators and universities around the world.",
  },
  {
    title: "Build a public profile",
    body: "Show the topics you are working on in the member directory, and choose who can see it.",
  },
];

export default async function ForStudentsPage() {
  const events = (await getUpcomingEvents()).filter((e) => e.format !== "in_person").slice(0, 4);
  return (
    <>
      <PageHeader
        kicker="For students"
        title="Start your career in technology law"
        standfirst="Membership is free for law students. Attend events, meet practitioners and follow the developments shaping the field."
        aside={
          <Button asChild size="lg" className="mt-8">
            <Link href="/join">Join as a student</Link>
          </Button>
        }
      />

      <div className="container-site pb-20 md:pb-28">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]">
          <Image
            src="/images/microphone.jpg"
            alt="A microphone on a stage in front of a blurred audience"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <SplitSection id="why" title="Why join as a student">
        <ul className="border-b border-line">
          {reasons.map((r) => (
            <li key={r.title} className="grid gap-2 border-t border-line py-6 md:grid-cols-8 md:gap-6">
              <h3 className="font-display text-2xl leading-tight md:col-span-3">{r.title}</h3>
              <p className="text-body text-graphite md:col-span-5">{r.body}</p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection id="events" title="Events you can join online" intro="Webinars are open to student members wherever you study.">
        <EventList events={events} />
        <Link href="/events" className="text-kicker mt-6 inline-block text-ink underline decoration-line-strong underline-offset-4">
          All events
        </Link>
      </SplitSection>

      <SplitSection
        id="careers"
        title="Mentoring and careers"
        intro="A mentoring programme pairing students with practising members is in development."
      >
        <p className="text-body max-w-[60ch] text-graphite">
          Student members will be the first to hear when it opens. In the meantime, the member directory and events are
          the best way to meet practitioners working in the areas you are interested in.
        </p>
      </SplitSection>

      <JoinCta />
    </>
  );
}
