import Link from "next/link";

import { VerifiedBadge } from "@/components/brand/verified-badge";
import type { DirectoryProfile } from "@/lib/directory";
import { topicBySlug } from "@/lib/mock/topics";
import { ProfilePhoto } from "./profile-photo";
import { SocialLinks } from "./social-links";

export function DirectoryRow({ profile, suffix }: { profile: DirectoryProfile; suffix: string }) {
  const p = profile;
  return (
    <li className="group relative border-t border-line">
      <div className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-4 py-7 md:grid-cols-[5.5rem_1fr_17rem] md:gap-x-7">
        <ProfilePhoto photo={p.photo} initials={p.initials} name={p.fullName} size={88} className="size-16 text-xl md:size-[5.5rem] md:text-2xl" />
        <div className="min-w-0">
          <h3 className="font-display text-[1.75rem] leading-tight tracking-[0.005em]">
            <Link
              href={`/directory/${p.slug}${suffix}`}
              className="decoration-line-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
            >
              {p.fullName}
            </Link>
          </h3>
          <p className="mt-1 text-[0.9375rem] text-graphite">
            {p.headline}
            {p.view === "member" ? <span className="text-subtle">, {p.organisation}</span> : null}
          </p>
          <p className="text-meta mt-1.5 text-subtle">
            {p.city === p.country ? p.country : `${p.city}, ${p.country}`}
          </p>
          <ul aria-label="Practice areas" className="mt-3 flex flex-wrap gap-1.5">
            {p.topics.map((t) => (
              <li key={t} className="text-meta rounded-sm bg-secondary px-2 py-1 text-graphite">
                {topicBySlug[t].short}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-start-2 flex flex-col gap-2 md:col-start-3 md:items-end md:text-right">
          <VerifiedBadge />
          {p.jurisdictions.length ? (
            <p className="text-meta text-graphite">
              {p.jurisdictions.join(", ")}
              <span className="block text-subtle">Jurisdictions, self-reported</span>
            </p>
          ) : null}
          {p.view === "member" && p.openToReferrals ? <span className="text-meta text-brand">Open to referrals</span> : null}
          <SocialLinks links={p.social} name={p.fullName} className="mt-1 md:justify-end" />
        </div>
      </div>
    </li>
  );
}
