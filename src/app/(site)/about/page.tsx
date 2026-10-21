import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JoinCta } from "@/components/home/join-cta";
import { PageHeader, SplitSection } from "@/components/page/page-header";
import { getPeople } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "MetBA is a global community for legal professionals working in AI, blockchain, digital assets, Web3 and emerging technology law.",
  alternates: { canonical: "/about" },
};

// Copy on this page is [DRAFT].
const work = [
  {
    title: "Events and CPD",
    body: "Webinars, roundtables and in-person meetings where members compare how different jurisdictions are approaching new technology.",
    href: "/events",
  },
  {
    title: "Insights",
    body: "Neutral, informational articles on legal developments and the questions they raise for practice.",
    href: "/insights",
  },
  {
    title: "Member directory",
    body: "A directory of MetBA members, so lawyers and students working on the same questions can find each other.",
    href: "/directory",
  },
];

export default async function AboutPage() {
  const people = await getPeople();
  const board = people.filter((p) => p.group === "board");
  const advisory = people.filter((p) => p.group === "advisory");
  return (
    <>
      <PageHeader
        kicker="About MetBA"
        title="A professional community for the law of emerging technology"
        standfirst="The Metaverse Bar Association brings together lawyers, law students and legal professionals working on AI, digital assets, Web3 and online platforms."
      />

      <div className="container-site pb-20 md:pb-28">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]">
          <Image
            src="/images/towers.jpg"
            alt="Glass office towers seen from street level"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <SplitSection id="mission" title="Mission">
        <div className="space-y-6">
          <p className="text-display-md max-w-[30ch] text-ink">
            To help legal professionals understand and shape how the law applies to new technology.
          </p>
          <p className="text-body max-w-[62ch] text-graphite">
            New technology raises legal questions faster than any one practice or jurisdiction can answer them. MetBA
            gives the people working on those questions a place to meet, learn from each other and follow
            developments across borders. Membership is free and open to lawyers, law students and legal professionals
            worldwide.
          </p>
        </div>
      </SplitSection>

      <SplitSection id="what-we-do" title="What we do">
        <ul className="border-b border-line">
          {work.map((w) => (
            <li key={w.href} className="group relative grid gap-2 border-t border-line py-6 md:grid-cols-8 md:gap-6">
              <h3 className="font-display text-2xl leading-tight md:col-span-3">
                <Link href={w.href} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand">
                  {w.title}
                </Link>
              </h3>
              <p className="text-body text-graphite md:col-span-5">{w.body}</p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection id="board" title="Founding board">
        <PeopleList people={board} />
      </SplitSection>

      <SplitSection id="advisory" title="Global advisory board">
        <PeopleList people={advisory} />
      </SplitSection>

      <SplitSection
        id="contact"
        title="Contact"
        intro="For partnerships, speaking and press. MetBA cannot answer requests for legal advice."
      >
        {/* [DRAFT] Confirm the contact address. */}
        <p className="font-display text-[2rem] leading-tight md:text-[2.5rem]">
          <a href="mailto:hello@metba.io" className="underline decoration-line-strong underline-offset-[0.18em] hover:decoration-ink">
            hello@metba.io
          </a>
        </p>
        <p className="text-meta mt-4 text-subtle">
          Follow MetBA on{" "}
          <a href="https://www.linkedin.com/company/metaverse-bar-association" className="underline" rel="noopener">
            LinkedIn
          </a>{" "}
          and{" "}
          <a href="https://x.com/metaverseBA" className="underline" rel="noopener">
            X
          </a>
          .
        </p>
      </SplitSection>

      <JoinCta />
    </>
  );
}

function PeopleList({ people }: { people: { name: string; role: string; organisation: string }[] }) {
  return (
    <ul className="grid border-b border-line sm:grid-cols-2 sm:gap-x-10">
      {people.map((p) => (
        <li key={p.name} className="border-t border-line py-5">
          <p className="font-display text-[1.5rem] leading-tight">{p.name}</p>
          <p className="mt-1 text-[0.9375rem] text-graphite">{p.role}</p>
          <p className="text-meta mt-0.5 text-subtle">{p.organisation}</p>
        </li>
      ))}
    </ul>
  );
}
