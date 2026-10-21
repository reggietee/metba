import Image from "next/image";
import Link from "next/link";

import { AvatarInitials } from "@/components/brand/avatar-initials";
import type { DirectoryProfile } from "@/lib/directory";
import { topicBySlug } from "@/lib/mock/topics";

/**
 * Editorial portrait tile, like a publication's contributors page. Every member gets the same
 * size and treatment: the directory never gives one member more prominence than another.
 */
export function PortraitCard({ profile, suffix }: { profile: DirectoryProfile; suffix: string }) {
  const p = profile;
  const shown = p.topics.slice(0, 2);
  const more = p.topics.length - shown.length;
  return (
    <li className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        {p.photo ? (
          <Image
            src={p.photo}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
            className="object-cover grayscale-[0.85] contrast-[1.04] transition-[filter,transform] duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-within:grayscale-0"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <AvatarInitials initials={p.initials} className="size-24 border-0 bg-transparent text-5xl" />
          </div>
        )}
      </div>
      <h3 className="mt-4 font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
        <Link
          href={`/directory/${p.slug}${suffix}`}
          className="decoration-line-strong underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
        >
          {p.fullName}
        </Link>
      </h3>
      <p className="mt-1 text-[0.9375rem] leading-snug text-graphite">{p.headline}</p>
      <p className="text-meta mt-2 text-subtle">
        {p.city === p.country ? p.country : `${p.city}, ${p.country}`}
        {p.jurisdictions.length ? (
          <span className="block">
            {p.jurisdictions.join(", ")} <span className="italic">(self-reported)</span>
          </span>
        ) : null}
      </p>
      <p className="text-meta mt-2 text-brand">
        {shown.map((t) => topicBySlug[t].short).join(" · ")}
        {more > 0 ? ` · +${more}` : ""}
      </p>
    </li>
  );
}
