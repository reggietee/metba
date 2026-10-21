import type { Metadata } from "next";
import Link from "next/link";

import { VerifiedBadge } from "@/components/brand/verified-badge";
import { JoinCta } from "@/components/home/join-cta";
import { FaqList } from "@/components/page/faq";
import { JsonLd } from "@/components/page/json-ld";
import { PageHeader, SplitSection } from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { getMembershipFaqs, getPublicStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Membership",
  description: "Free membership for lawyers, law students and legal professionals working in emerging technology law.",
  alternates: { canonical: "/membership" },
};

// Copy on this page is [DRAFT].
const types = [
  {
    title: "Lawyers",
    body: "Qualified lawyers in any jurisdiction, in private practice, in-house, in government or in academia.",
  },
  {
    title: "Law students",
    body: "Students studying law at any level, including those preparing for admission.",
  },
  {
    title: "Legal professionals",
    body: "Associates, paralegals, legal engineers, policy specialists and others whose work is closely tied to the law.",
  },
];

const benefits = [
  "Free webinars and member events, many eligible for CPD in your jurisdiction",
  "A certificate of attendance and a personal CPD log for MetBA events",
  "A profile in the member directory, with control over who can see it",
  "The Docket, a monthly briefing on emerging technology law",
  "A global network of peers working on the same questions",
];

const steps = [
  { title: "Sign up", body: "Create an account with your email address or LinkedIn." },
  {
    title: "Complete your profile",
    body: "Tell us your role, organisation, location and the topics you work on. Jurisdictions are self-reported.",
  },
  {
    title: "Review",
    body: "An administrator reviews your application. A LinkedIn profile or a firm or university email address helps.",
  },
  {
    title: "Verified member",
    body: "Once approved, your profile shows the Verified MetBA member badge and you can register for member events.",
  },
];

export default async function MembershipPage() {
  const [faqs, stats] = await Promise.all([getMembershipFaqs(), getPublicStats()]);
  // Rounded down to the nearest 10 so the claim stays true as counts change.
  const countries = stats.countries ? Math.floor(stats.countries / 10) * 10 : 0;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHeader
        kicker="Membership"
        title="Free membership for everyone working on technology law"
        standfirst={`Join lawyers, law students and legal professionals${countries >= 20 ? ` in more than ${countries} countries` : " worldwide"}.`}
        aside={
          <Button asChild size="lg" className="mt-8">
            <Link href="/join">Join MetBA</Link>
          </Button>
        }
      />

      <SplitSection id="who" title="Who can join">
        <ul className="border-b border-line">
          {types.map((t) => (
            <li key={t.title} className="grid gap-2 border-t border-line py-6 md:grid-cols-8 md:gap-6">
              <h3 className="font-display text-2xl leading-tight md:col-span-3">{t.title}</h3>
              <p className="text-body text-graphite md:col-span-5">{t.body}</p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection id="benefits" title="What membership includes">
        <ul className="border-b border-line">
          {benefits.map((b) => (
            <li key={b} className="border-t border-line py-4 text-lead text-ink">
              {b}
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection
        id="verification"
        title="How verification works"
        intro="Verification confirms MetBA membership. It is not a check of anyone's licence or right to practise."
      >
        <ol className="grid gap-x-10 border-b border-line sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-line py-6">
              <p className="text-meta text-subtle">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 rounded-sm bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between">
          <VerifiedBadge />
          <p className="text-[0.9375rem] text-graphite sm:max-w-[40ch]">
            This badge means an administrator has approved the membership. Jurisdictions shown on profiles are
            self-reported.
          </p>
        </div>
      </SplitSection>

      <SplitSection id="faq" title="Questions">
        <FaqList items={faqs} />
      </SplitSection>

      <JoinCta />
    </>
  );
}
