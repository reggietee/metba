import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Captions, Download, FileText, Play } from "lucide-react";

import { PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { formatLabels, formatShortDate } from "@/lib/format";
import { recordings } from "@/lib/mock/portal";

export const metadata = { title: "Recording" };

export function generateStaticParams() {
  return recordings.map((r) => ({ slug: r.slug }));
}

export default async function RecordingPage({ params }: PageProps<"/account/library/[slug]">) {
  const { slug } = await params;
  const r = recordings.find((x) => x.slug === slug);
  if (!r) notFound();
  const pct = r.progressPct ?? 0;
  return (
    <>
      <div className="px-5 pt-6 md:px-10">
        <Link href="/account/library" className="text-kicker inline-flex items-center gap-2 text-graphite hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" /> CPD library
        </Link>
      </div>
      <PortalSection>
        <div className="grid gap-10 xl:grid-cols-[1fr_20rem]">
          <div>
            <div className="dark relative aspect-video overflow-hidden rounded-sm bg-night">
              <Image src={r.image} alt="" fill preload sizes="(min-width: 1280px) 60vw, 100vw" className="object-cover opacity-60" />
              <button
                type="button"
                className="absolute inset-0 grid place-items-center"
                aria-label={`Play ${r.title} (preview, no video)`}
              >
                <span className="inline-flex size-20 items-center justify-center rounded-full bg-[oklch(0.97_0.004_150)] text-[oklch(0.2_0.014_172)]">
                  <Play aria-hidden className="ml-1 size-7" />
                </span>
              </button>
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-3 text-white">
                <span className="text-meta">{Math.round((r.durationMin * pct) / 100)}:00</span>
                <span className="h-1 flex-1 rounded-full bg-white/30">
                  <span className="block h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
                </span>
                <span className="text-meta">{r.durationMin}:00</span>
                <Captions aria-hidden className="size-4" />
              </div>
            </div>
            <p className="text-meta mt-6 text-subtle">
              {formatShortDate(r.heldAt)} · {formatLabels[r.format]} · With {r.speakers.join(", ")}
            </p>
            <h1 className="mt-3 font-display text-[2.25rem] leading-tight tracking-[-0.015em] md:text-[2.75rem]">{r.title}</h1>
            <p className="mt-4 max-w-[62ch] text-lead text-graphite">{r.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <FileText aria-hidden /> Transcript
              </Button>
              <Button variant="outline" size="sm">
                <Download aria-hidden /> Slides
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/events/${r.slug}`}>Recap and takeaways</Link>
              </Button>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="border-t border-ink pt-4">
              <h2 className="text-kicker text-ink">CPD</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite">
                {r.cpdHours} {r.cpdHours === 1 ? "hour" : "hours"}. Watch at least 90% to add a &ldquo;viewed recording&rdquo;
                entry to your CPD log. May be eligible for self-reported CPD. Check your regulator&apos;s rules.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-meta mt-2 text-subtle">{pct >= 90 ? "Added to your CPD log" : `${pct}% watched`}</p>
            </div>
            {r.chapters ? (
              <div className="border-t border-line pt-4">
                <h2 className="text-kicker text-ink">Chapters</h2>
                <ol className="mt-3">
                  {r.chapters.map((c) => (
                    <li key={c.at}>
                      <button type="button" className="flex w-full gap-4 border-b border-line py-2.5 text-left hover:text-brand">
                        <span className="text-meta w-12 shrink-0 text-subtle">{c.at}</span>
                        <span className="text-[0.9375rem]">{c.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </aside>
        </div>
      </PortalSection>
    </>
  );
}
