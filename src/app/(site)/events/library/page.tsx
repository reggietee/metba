import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lock, Play } from "lucide-react";

import { PageHeader } from "@/components/page/page-header";
import { PreviewBanner } from "@/components/portal/preview-banner";
import { RecordingCard } from "@/components/portal/recording-card";
import { Button } from "@/components/ui/button";
import { formatLabels, formatShortDate } from "@/lib/format";
import { recordings } from "@/lib/mock/portal";

export const metadata: Metadata = {
  title: "CPD library",
  description: "Recordings of past MetBA CPD events. One is free to watch; members can watch them all.",
  alternates: { canonical: "/events/library" },
};

export default function PublicLibraryPage() {
  const sample = recordings.find((r) => r.publicSample) ?? recordings[0];
  const locked = recordings.filter((r) => r.slug !== sample.slug);
  const hours = recordings.reduce((s, r) => s + r.cpdHours, 0);
  return (
    <>
      <PreviewBanner />
      <PageHeader
        kicker="CPD library"
        title="Every MetBA session, on demand"
        standfirst={`${recordings.length} recordings and ${hours} CPD hours. Watch one free; members can watch them all and log them for CPD.`}
        aside={
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/join">Join to watch all</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sign-in">Log in</Link>
            </Button>
          </div>
        }
      />

      <section aria-labelledby="free-title" className="container-site pb-20 md:pb-28">
        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="dark relative aspect-video overflow-hidden rounded-sm bg-night">
              <Image src={sample.image} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover opacity-70" />
              <button type="button" className="absolute inset-0 grid place-items-center" aria-label={`Play ${sample.title} (preview, no video)`}>
                <span className="inline-flex size-20 items-center justify-center rounded-full bg-[oklch(0.97_0.004_150)] text-[oklch(0.2_0.014_172)]">
                  <Play aria-hidden className="ml-1 size-7" />
                </span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-4">
            <p className="text-kicker text-brand">Free to watch</p>
            <h2 id="free-title" className="mt-3 font-display text-[2rem] leading-tight tracking-[-0.012em]">
              {sample.title}
            </h2>
            <p className="text-meta mt-3 text-subtle">
              {formatShortDate(sample.heldAt)} · {formatLabels[sample.format]} · {sample.durationMin} min
            </p>
            <p className="text-body mt-4 text-graphite">{sample.summary}</p>
            <p className="text-meta mt-4 text-subtle">With {sample.speakers.join(", ")}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="members-title" className="border-t border-line py-16 md:py-24">
        <div className="container-site">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="members-title" className="text-display-lg">
                For members
              </h2>
              <p className="text-body mt-3 max-w-[52ch] text-graphite">
                Full details of every session are open to everyone. Recordings are for approved members.
              </p>
            </div>
            <p className="text-meta inline-flex items-center gap-1.5 text-ink">
              <Lock aria-hidden className="size-3.5" /> {locked.length} recordings locked
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {locked.map((r) => (
              <RecordingCard key={r.slug} r={r} href="/join" locked />
            ))}
          </ul>
          <div className="dark mt-16 flex flex-col gap-6 rounded-sm bg-deep p-8 text-ink md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="font-display text-[2rem] leading-tight">Membership is free</p>
              <p className="mt-2 text-graphite">Apply once. After approval, the whole library is yours.</p>
            </div>
            <Button asChild size="lg" variant="inverse">
              <Link href="/join">Apply to join</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
