import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";

import { LocalTime } from "@/components/brand/local-time";
import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { getFeaturedEvent } from "@/lib/data";
import { adminActivity, applications, currentAdmin } from "@/lib/mock/portal";

export const metadata = { title: "Overview" };

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(
    new Date(iso),
  );

export default async function AdminOverview() {
  const next = await getFeaturedEvent();
  const waiting = applications.filter((a) => a.status === "submitted").length;
  return (
    <>
      <PortalHeader kicker="Admin" title={`Welcome back, ${currentAdmin.firstName}`} />
      <div className="grid border-b border-line md:grid-cols-3">
        {[
          ["Applications waiting", String(waiting), "/admin/applications"],
          ["Verified members", "1,240", "/admin#members"],
          ["Registered for next event", "312", "/admin/events"],
        ].map(([label, value, href], i) => (
          <Link
            key={label}
            href={href}
            className={`group block px-5 py-7 transition-colors hover:bg-night-raised md:px-10 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
          >
            <p className="text-meta text-subtle">{label}</p>
            <p className="mt-2 font-display text-[2.75rem] leading-none">{value}</p>
            <p className="text-meta mt-3 inline-flex items-center gap-1 text-graphite group-hover:text-ink">
              Open <ArrowRight aria-hidden className="size-3.5" />
            </p>
          </Link>
        ))}
      </div>

      {next ? (
        <PortalSection title="Next event">
          <div className="flex flex-col gap-5 rounded-sm border border-line p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-[1.625rem] leading-tight">{next.title}</p>
              <p className="text-meta mt-2 text-subtle">
                <LocalTime startsAt={next.startsAt} endsAt={next.endsAt} timezone={next.timezone} /> · Daily room created 24 h
                before
              </p>
            </div>
            <Button asChild variant="inverse">
              <Link href={`/admin/events/${next.slug}/live`}>
                <Radio aria-hidden /> Open live control
              </Link>
            </Button>
          </div>
        </PortalSection>
      ) : null}

      <PortalSection title="Recent activity">
        <ul className="border-b border-line">
          {adminActivity.map((a) => (
            <li key={a.at} className="flex flex-col gap-1 border-t border-line py-3.5 sm:flex-row sm:gap-6">
              <span className="text-meta w-32 shrink-0 text-subtle">{when(a.at)}</span>
              <span className="text-[0.9375rem]">{a.text}</span>
            </li>
          ))}
        </ul>
      </PortalSection>

      <PortalSection>
        <p id="members" className="text-meta text-subtle">
          Members, library and settings screens are planned for later phases. See docs/member-portal-spec.md.
        </p>
        <span id="library" />
        <span id="settings" />
      </PortalSection>
    </>
  );
}
