import Link from "next/link";

import { AvatarInitials } from "@/components/brand/avatar-initials";
import { VerifiedBadge } from "@/components/brand/verified-badge";
import { memberTypeLabels } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import type { Member } from "@/lib/types";

export function MemberCard({ member }: { member: Member }) {
  const initials = member.fullName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <article className="relative flex h-full flex-col border-t border-line pt-5">
      <div className="flex items-start gap-4">
        <AvatarInitials initials={initials} className="size-14 text-xl" />
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight">
            <Link href={`/directory/${member.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {member.fullName}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-graphite">{member.headline}</p>
          <p className="text-meta mt-2 text-subtle">
            {memberTypeLabels[member.memberType]} · {member.city}, {member.country}
          </p>
        </div>
      </div>
      {member.status === "verified" ? <VerifiedBadge className="mt-5" /> : null}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {member.topics.map((t) => (
          <li key={t} className="text-meta rounded-sm bg-secondary px-2 py-1 text-graphite">
            {topicBySlug[t].short}
          </li>
        ))}
      </ul>
    </article>
  );
}
