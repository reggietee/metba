import { Download, FileBadge, Plus } from "lucide-react";

import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { cpdCategoryLabels, formatShortDate } from "@/lib/format";
import { cpdLog } from "@/lib/mock/portal";

export const metadata = { title: "CPD log" };

const sourceLabel = { live: "MetBA live event", recording: "MetBA recording", external: "External" } as const;

export default function CpdLogPage() {
  const years = [...new Set(cpdLog.map((c) => c.date.slice(0, 4)))].sort().reverse();
  return (
    <>
      <PortalHeader
        title="CPD log"
        description="MetBA events are added automatically after you attend or finish a recording. Add other activities yourself."
        actions={
          <>
            <Button variant="outline">
              <Download aria-hidden /> Export CSV
            </Button>
            <Button variant="outline">
              <Download aria-hidden /> Export PDF
            </Button>
            <Button>
              <Plus aria-hidden /> Add activity
            </Button>
          </>
        }
      />
      {years.map((y) => {
        const entries = cpdLog.filter((c) => c.date.startsWith(y));
        const total = entries.reduce((s, c) => s + c.hours, 0);
        const byCat = Object.entries(
          entries.reduce<Record<string, number>>((acc, c) => ({ ...acc, [c.category]: (acc[c.category] ?? 0) + c.hours }), {}),
        );
        return (
          <PortalSection key={y} title={y}>
            <div className="mb-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <p className="font-display text-[2.5rem] leading-none">
                {total} <span className="font-sans text-base text-subtle">hours</span>
              </p>
              {byCat.map(([cat, h]) => (
                <p key={cat} className="text-meta text-graphite">
                  {cpdCategoryLabels[cat as keyof typeof cpdCategoryLabels]}: <span className="text-ink">{h} h</span>
                </p>
              ))}
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[40rem] border-b border-line text-left text-[0.9375rem]">
                <thead>
                  <tr className="text-meta text-subtle">
                    <th scope="col" className="border-b border-ink py-2.5 pr-4 font-medium">Date</th>
                    <th scope="col" className="border-b border-ink py-2.5 pr-4 font-medium">Activity</th>
                    <th scope="col" className="border-b border-ink py-2.5 pr-4 font-medium">Category</th>
                    <th scope="col" className="border-b border-ink py-2.5 pr-4 text-right font-medium">Hours</th>
                    <th scope="col" className="border-b border-ink py-2.5 font-medium"><span className="sr-only">Certificate</span></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((c) => (
                    <tr key={c.id} className="border-t border-line">
                      <td className="text-meta py-3.5 pr-4 align-top text-subtle">{formatShortDate(c.date)}</td>
                      <td className="py-3.5 pr-4 align-top">
                        <span className="text-ink">{c.title}</span>
                        <span className="text-meta block text-subtle">
                          {c.provider} · {sourceLabel[c.source]}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 align-top text-graphite">{cpdCategoryLabels[c.category]}</td>
                      <td className="py-3.5 pr-4 text-right align-top tabular-nums">{c.hours}</td>
                      <td className="py-3.5 text-right align-top">
                        {c.certificateId ? (
                          <button type="button" className="text-meta inline-flex items-center gap-1.5 text-ink underline decoration-line-strong underline-offset-4">
                            <FileBadge aria-hidden className="size-3.5" /> Certificate
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PortalSection>
        );
      })}
      <PortalSection>
        <p className="text-meta max-w-[70ch] text-subtle">
          Your CPD log is a personal record to help you report to your regulator. MetBA does not report hours to any
          regulator on your behalf.
        </p>
      </PortalSection>
    </>
  );
}
