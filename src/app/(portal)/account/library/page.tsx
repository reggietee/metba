import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { RecordingCard } from "@/components/portal/recording-card";
import { recordings } from "@/lib/mock/portal";

export const metadata = { title: "CPD library" };

export default function MemberLibraryPage() {
  const total = recordings.reduce((s, r) => s + r.cpdHours, 0);
  return (
    <>
      <PortalHeader
        title="CPD library"
        description={`Every MetBA session, recorded. ${recordings.length} recordings, ${total} CPD hours. Watching a recording to the end adds it to your CPD log.`}
      />
      <PortalSection>
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", "AI governance", "Digital assets", "Privacy", "Online safety", "Blockchain and Web3", "Legal tech"].map((t, i) => (
            <button
              key={t}
              type="button"
              aria-pressed={i === 0}
              className={
                i === 0
                  ? "text-meta h-9 rounded-full bg-ink px-4 text-paper"
                  : "text-meta h-9 rounded-full border border-line px-4 text-graphite hover:border-ink hover:text-ink"
              }
            >
              {t}
            </button>
          ))}
        </div>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {recordings.map((r) => (
            <RecordingCard key={r.slug} r={r} href={`/account/library/${r.slug}`} />
          ))}
        </ul>
      </PortalSection>
    </>
  );
}
