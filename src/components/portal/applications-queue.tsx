"use client";

import { useState } from "react";
import { Check, ExternalLink, MailQuestion, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { memberTypeLabels } from "@/lib/format";
import type { Application } from "@/lib/mock/portal";
import { topicBySlug } from "@/lib/mock/topics";
import { cn } from "@/lib/utils";
import { PreviewNote } from "./preview-banner";

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(
    new Date(iso),
  );

export function ApplicationsQueue({ items }: { items: Application[] }) {
  const [selected, setSelected] = useState(items[0]?.id);
  const [acted, setActed] = useState<string | null>(null);
  const a = items.find((x) => x.id === selected);

  return (
    <div className="grid min-h-[60svh] lg:grid-cols-[22rem_1fr]">
      <ul className="border-b border-line lg:border-r lg:border-b-0">
        {items.map((x) => (
          <li key={x.id}>
            <button
              type="button"
              onClick={() => {
                setSelected(x.id);
                setActed(null);
              }}
              aria-current={x.id === selected ? "true" : undefined}
              className={cn(
                "w-full border-b border-line px-5 py-4 text-left transition-colors md:px-6",
                x.id === selected ? "bg-night-raised" : "hover:bg-night-raised/60",
              )}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-xl">{x.fullName}</span>
                {x.status === "more_info" ? <span className="text-meta text-brass">Waiting on applicant</span> : null}
              </span>
              <span className="text-meta block text-subtle">
                {memberTypeLabels[x.memberType]} · {x.country} · {when(x.submittedAt)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {a ? (
        <div className="px-5 py-8 md:px-10">
          <p className="text-meta text-subtle">Application {a.id}</p>
          <h2 className="mt-2 font-display text-[2.25rem] leading-tight">{a.fullName}</h2>
          <p className="mt-1 text-[0.9375rem] text-graphite">
            {memberTypeLabels[a.memberType]}, {a.organisation} · {a.city}, {a.country}
          </p>

          <dl className="mt-8 border-t border-line text-[0.9375rem]">
            {(
              [
                ["Email", a.email],
                [
                  "Email domain",
                  a.emailDomainMatch ? (
                    <span key="d" className="text-brand">Matches stated organisation</span>
                  ) : (
                    <span key="d" className="text-brass">Personal email, does not match organisation</span>
                  ),
                ],
                [
                  "LinkedIn",
                  a.linkedin ? (
                    <a key="l" href={a.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4">
                      View profile <ExternalLink aria-hidden className="size-3.5" />
                    </a>
                  ) : (
                    "Not provided"
                  ),
                ],
                ["Jurisdictions", a.jurisdictions.length ? `${a.jurisdictions.join(", ")} (self-reported)` : "None listed"],
                ["Practice areas", a.topics.map((t) => topicBySlug[t].name).join(", ")],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-4 sm:gap-4">
                <dt className="text-meta text-subtle">{k}</dt>
                <dd className="sm:col-span-3">{v}</dd>
              </div>
            ))}
          </dl>

          {a.note ? <p className="text-meta mt-4 text-brass">{a.note}</p> : null}

          <div className="mt-8">
            <label htmlFor="decision-note" className="mb-2 block text-[0.9375rem]">
              Note to applicant (optional)
            </label>
            <textarea
              id="decision-note"
              rows={3}
              className="w-full rounded-md border border-input bg-night-raised px-3.5 py-3 text-base text-ink"
              placeholder="Included in the email they receive"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="inverse" onClick={() => setActed(`Approved ${a.fullName}`)}>
              <Check aria-hidden /> Approve
            </Button>
            <Button variant="outline-inverse" onClick={() => setActed(`Asked ${a.fullName} for more information`)}>
              <MailQuestion aria-hidden /> Request more information
            </Button>
            <Button variant="ghost" onClick={() => setActed(`Rejected ${a.fullName}`)}>
              <X aria-hidden /> Reject
            </Button>
          </div>
          {acted ? (
            <div className="mt-4">
              <PreviewNote>
                Preview: &ldquo;{acted}&rdquo; would send the matching email and be written to the audit log.
              </PreviewNote>
            </div>
          ) : null}
          <p className="text-meta mt-8 max-w-[60ch] text-subtle">
            Approval confirms MetBA membership only. It is not a check of the applicant&apos;s licence or right to practise.
          </p>
        </div>
      ) : null}
    </div>
  );
}
