import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { DirectoryDisclaimer } from "@/components/directory/disclaimer";
import { DirectoryRow } from "@/components/directory/directory-row";
import { DirectoryFiltersForm } from "@/components/directory/filters";
import { PortraitCard } from "@/components/directory/portrait-card";
import { ResultToolbar } from "@/components/directory/result-toolbar";
import { ViewerPreview } from "@/components/directory/viewer-preview";
import { PageHeader } from "@/components/page/page-header";
import { Button } from "@/components/ui/button";
import { searchDirectory, type DirectoryFilters } from "@/lib/directory";
import { memberTypeLabels } from "@/lib/format";
import type { MemberType } from "@/lib/types";
import { topicBySlug } from "@/lib/mock/topics";
import { viewerFromSearch } from "@/lib/viewer";

export const metadata: Metadata = {
  title: "Member directory",
  description:
    "Find MetBA members by name, country or topic. The directory lists MetBA members and is not a referral service or licensing register.",
  alternates: { canonical: "/directory" },
};

const KEYS = ["q", "country", "jurisdiction", "topic", "type", "language", "referrals"] as const;

export default function DirectoryPage({ searchParams }: PageProps<"/directory">) {
  return (
    <>
      <PageHeader
        kicker="Member directory"
        title="Find a member"
        standfirst="Lawyers working on emerging technology law, around the world."
      />
      <div className="container-site pb-24 md:pb-32">
        <DirectoryDisclaimer className="mb-10" />
        <Suspense fallback={<ResultsSkeleton />}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

async function Results({ searchParams }: { searchParams: PageProps<"/directory">["searchParams"] }) {
  const sp = await searchParams;
  const viewer = viewerFromSearch(sp.as);
  const filters: DirectoryFilters = {};
  for (const k of KEYS) {
    const v = sp[k];
    if (typeof v === "string" && v.trim()) filters[k] = v.trim().slice(0, 100);
  }
  const { results, total, options } = await searchDirectory(filters, viewer);
  const member = viewer.kind === "member";
  const preview = member ? "member" : undefined;
  const suffix = preview ? "?as=member" : "";

  const view = sp.view === "list" ? "list" : "grid";
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (typeof v === "string") params.set(k, v);

  const chips = [
    filters.country && { key: "country", label: filters.country },
    filters.jurisdiction && { key: "jurisdiction", label: `${filters.jurisdiction} (self-reported)` },
    filters.topic && topicBySlug[filters.topic as keyof typeof topicBySlug] && {
      key: "topic",
      label: topicBySlug[filters.topic as keyof typeof topicBySlug].short,
    },
    member && filters.type && { key: "type", label: memberTypeLabels[filters.type as MemberType] ?? filters.type },
    member && filters.language && { key: "language", label: filters.language },
    member && filters.referrals === "1" && { key: "referrals", label: "Open to referrals" },
    filters.q && { key: "q", label: `\u201c${filters.q}\u201d` },
  ].filter(Boolean) as { key: string; label: string }[];

  const fields = [
    { name: "country" as const, label: "Country", options: options.countries.map((c) => ({ value: c, label: c })) },
    {
      name: "jurisdiction" as const,
      label: "Jurisdiction (self-reported)",
      options: options.jurisdictions.map((j) => ({ value: j, label: j })),
    },
    {
      name: "topic" as const,
      label: "Topic",
      options: options.topics.map((t) => ({ value: t, label: topicBySlug[t].short })),
    },
    ...(member
      ? [
          {
            name: "type" as const,
            label: "Member type",
            options: options.types.map((t) => ({ value: t, label: memberTypeLabels[t] })),
          },
          { name: "language" as const, label: "Language", options: options.languages.map((l) => ({ value: l, label: l })) },
        ]
      : []),
  ];

  return (
    <>
      <div className="mb-10">
        <ViewerPreview viewer={viewer} path="/directory" params={params} />
      </div>

      <DirectoryFiltersForm
        values={filters}
        fields={fields}
        showReferrals={member}
        preview={preview}
        view={view === "list" ? "list" : undefined}
      />

      {!member ? (
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] text-graphite">
            You are seeing public profiles only. Members can see every profile, filter by language and referrals, and
            contact other members.
          </p>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/sign-in?next=/directory">Log in</Link>
          </Button>
        </div>
      ) : null}

      <ResultToolbar params={params} chips={chips} count={results.length} total={total} view={view} />
      <div className="mt-8" />

      {results.length > 0 ? (
        view === "grid" ? (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4">
            {results.map((p) => (
              <PortraitCard key={p.slug} profile={p} suffix={suffix} />
            ))}
          </ul>
        ) : (
          <ul className="border-b border-line">
            {results.map((p) => (
              <DirectoryRow key={p.slug} profile={p} suffix={suffix} />
            ))}
          </ul>
        )
      ) : (
        <div className="border-t border-line py-14">
          <p className="font-display text-[1.75rem] leading-tight">No members match your search</p>
          <p className="text-body mt-3 max-w-[56ch] text-graphite">
            Try fewer words, or remove a filter. Search looks at names, headlines, cities, countries, jurisdictions and
            practice areas{member ? ", and for members also organisations" : ""}.
          </p>
        </div>
      )}
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-16 border-b-2 border-line" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-11 rounded-md bg-secondary" />
        <div className="h-11 rounded-md bg-secondary" />
      </div>
      <div className="mt-14 space-y-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 border-t border-line" />
        ))}
      </div>
    </div>
  );
}
