import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { PreviewBanner } from "@/components/portal/preview-banner";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Application status", robots: { index: false } };

const steps = [
  { label: "Account created", done: true, when: "20 Oct 2026" },
  { label: "Application submitted", done: true, when: "20 Oct 2026" },
  { label: "Review by a MetBA administrator", current: true, when: "Usually within 3 working days" },
  { label: "Approved: sign in to the member portal", when: "" },
];

export default function JoinStatusPage() {
  return (
    <>
      <PreviewBanner />
      <div className="container-site max-w-3xl py-16 md:py-24">
        <p className="text-kicker text-brand">Application received</p>
        <h1 className="text-display-xl mt-5">Thank you, Jonas</h1>
        <p className="text-lead mt-6 max-w-[48ch] text-graphite">
          We have your application. You will get an email as soon as it has been reviewed. You can come back to this page
          at any time to check its status.
        </p>
        <ol className="mt-12 border-b border-line">
          {steps.map((s) => (
            <li key={s.label} className="flex gap-4 border-t border-line py-5">
              <span
                className={
                  s.done
                    ? "inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-paper"
                    : s.current
                      ? "inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-brand"
                      : "inline-flex size-7 shrink-0 rounded-full border border-line"
                }
              >
                {s.done ? <Check aria-hidden className="size-4" /> : null}
              </span>
              <span>
                <span className={s.current ? "block text-[1.0625rem] text-ink" : "block text-[1.0625rem] text-graphite"}>
                  {s.label}
                  {s.current ? <span className="sr-only"> (current step)</span> : null}
                </span>
                {s.when ? <span className="text-meta text-subtle">{s.when}</span> : null}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/join">Edit application</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/events">Browse upcoming events</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
