import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHeader, SplitSection } from "@/components/page/page-header";

export const metadata: Metadata = {
  title: "For the public",
  description:
    "What the MetBA member directory is and is not, and how to find a licensed lawyer through the regulator in your jurisdiction.",
  alternates: { canonical: "/for-the-public" },
};

// Copy on this page is [DRAFT]. Regulator list is [DRAFT – verify links].
const regulators: { region: string; items: { name: string; note: string; href: string }[] }[] = [
  {
    region: "Canada",
    items: [
      { name: "Federation of Law Societies of Canada", note: "Links to every provincial and territorial law society", href: "https://flsc.ca/" },
      { name: "Law Society of Ontario", note: "Lawyer and paralegal directory", href: "https://lso.ca/" },
      { name: "Barreau du Québec", note: "Find a lawyer", href: "https://www.barreau.qc.ca/en/find-a-lawyer/" },
    ],
  },
  {
    region: "United States",
    items: [
      {
        name: "American Bar Association",
        note: "Lawyers are licensed state by state; the ABA lists state bar directories",
        href: "https://www.americanbar.org/",
      },
    ],
  },
  {
    region: "United Kingdom and Ireland",
    items: [
      { name: "Solicitors Regulation Authority", note: "Register of solicitors in England and Wales", href: "https://www.sra.org.uk/" },
      { name: "The Law Society: Find a Solicitor", note: "England and Wales", href: "https://solicitors.lawsociety.org.uk/" },
      { name: "Law Society of Ireland", note: "Find a solicitor", href: "https://www.lawsociety.ie/find-a-solicitor" },
    ],
  },
  {
    region: "Europe",
    items: [{ name: "Council of Bars and Law Societies of Europe", note: "Links to national bars", href: "https://www.ccbe.eu/" }],
  },
  {
    region: "Asia Pacific",
    items: [
      { name: "Law Council of Australia", note: "Links to state and territory law societies", href: "https://lawcouncil.au/" },
      { name: "Law Society of NSW", note: "Find a lawyer", href: "https://www.lawsociety.com.au/for-the-public/find-a-lawyer" },
      { name: "New Zealand Law Society", note: "Find a lawyer", href: "https://www.lawsociety.org.nz/" },
      { name: "Law Society of Singapore", note: "Find a lawyer", href: "https://www.lawsociety.org.sg/" },
      { name: "Law Society of Hong Kong", note: "Law list", href: "https://www.hklawsoc.org.hk/" },
    ],
  },
];

export default function ForThePublicPage() {
  return (
    <>
      <PageHeader
        kicker="For the public"
        title="Looking for a lawyer?"
        standfirst="MetBA is a professional community, not a referral service. Here is what our directory can and cannot tell you, and where to find licensed counsel."
      />

      <section aria-labelledby="directory-is" className="border-t border-line py-16 md:py-24">
        <div className="container-site grid gap-12 md:grid-cols-2 md:gap-10">
          <div>
            <h2 id="directory-is" className="text-display-md">
              The member directory is
            </h2>
            <ul className="mt-6 border-b border-line">
              {[
                "A list of people who have joined MetBA and been approved as members",
                "A way to see who is working on a topic, and in which country",
                "Based on information members provide about themselves",
              ].map((t) => (
                <li key={t} className="border-t border-line py-4 text-body text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-display-md">It is not</h2>
            <ul className="mt-6 border-b border-line">
              {[
                "A register of licensed lawyers. MetBA does not check anyone's right to practise",
                "A referral service, or a recommendation of any member",
                "A source of legal advice. MetBA does not provide legal advice",
              ].map((t) => (
                <li key={t} className="border-t border-line py-4 text-body text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SplitSection
        id="find-counsel"
        title="How to find licensed counsel"
        intro="Lawyers are licensed by a regulator in each jurisdiction. The regulator's register is the authoritative place to check that someone is entitled to practise."
      >
        <div className="space-y-12">
          {regulators.map((r) => (
            <div key={r.region}>
              <h3 className="text-kicker text-subtle">{r.region}</h3>
              <ul className="mt-3 border-b border-line">
                {r.items.map((i) => (
                  <li key={i.href} className="group relative border-t border-line">
                    <a
                      href={i.href}
                      rel="noopener"
                      target="_blank"
                      className="flex items-start justify-between gap-6 py-4"
                    >
                      <span>
                        <span className="block font-display text-[1.375rem] leading-snug text-ink group-hover:text-brand">
                          {i.name}
                        </span>
                        <span className="text-meta block text-subtle">{i.note}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="mt-1.5 size-4 shrink-0 text-subtle group-hover:text-brand" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-body max-w-[60ch] text-graphite">
            If your jurisdiction is not listed, search for the law society or bar of that country, state or province.
            Many also run referral services that can match you with a lawyer.
          </p>
        </div>
      </SplitSection>

      <SplitSection id="report" title="Concerns about a profile">
        <p className="text-body max-w-[60ch] text-graphite">
          Every profile in the directory has a &ldquo;Report this profile&rdquo; link. Reports go to MetBA administrators,
          who review them under our <Link href="/code-of-conduct" className="text-ink underline">code of conduct</Link>.
          Concerns about a lawyer&apos;s conduct should also be raised with their regulator.
        </p>
      </SplitSection>
    </>
  );
}
