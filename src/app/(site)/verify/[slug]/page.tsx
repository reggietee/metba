import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BadgeCheck } from "lucide-react";

import { PreviewBanner } from "@/components/portal/preview-banner";
import { Button } from "@/components/ui/button";
import { getDirectorySlugs, getProfile } from "@/lib/directory";
import { currentMember } from "@/lib/mock/portal";

export async function generateStaticParams() {
  return (await getDirectorySlugs()).map((slug) => ({ slug }));
}

export default function VerifyPage({ params }: PageProps<"/verify/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <Verify params={params} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: PageProps<"/verify/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProfile(slug, { kind: "public" });
  return { title: p ? `Verify ${p.fullName}` : "Verify membership", robots: { index: false } };
}

/** Where every membership badge links. Confirms status only, from public profile data. */
async function Verify({ params }: { params: PageProps<"/verify/[slug]">["params"] }) {
  const { slug } = await params;
  const p = await getProfile(slug, { kind: "public" });
  if (!p) notFound();
  const since = slug === currentMember.slug ? "March 2023" : "2024";
  return (
    <>
      <PreviewBanner />
      <div className="container-site max-w-3xl py-16 md:py-24">
        <p className="text-kicker text-brand">Membership verification</p>
        <div className="mt-8 flex flex-col gap-8 rounded-sm border border-line bg-surface p-6 sm:flex-row sm:items-center md:p-8">
          {p.photo ? (
            <span className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-sm">
              <Image src={p.photo} alt={`Photo of ${p.fullName}`} fill sizes="128px" className="object-cover" />
            </span>
          ) : null}
          <div>
            <p className="font-display text-[2.25rem] leading-tight">{p.fullName}</p>
            <p className="mt-1 text-[0.9375rem] text-graphite">
              {p.headline} · {p.city}, {p.country}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-[0.9375rem] text-brand">
              <BadgeCheck aria-hidden className="size-4" /> Active MetBA member since {since}
            </p>
            <p className="text-meta mt-3 text-subtle">Status is checked live each time this page loads.</p>
          </div>
        </div>
        <p className="text-body mt-8 max-w-[60ch] text-graphite">
          This page confirms that {p.fullName} is an approved member of the Metaverse Bar Association, a global professional
          community for emerging technology law. MetBA membership is not a licence to practise and MetBA does not verify
          licensure. To check that a lawyer is licensed, use the regulator in their jurisdiction.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/directory/${p.slug}`}>View profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">About MetBA</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/for-the-public">How to find licensed counsel</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
