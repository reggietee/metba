import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AvatarInitials } from "@/components/brand/avatar-initials";
import { VerifiedBadge } from "@/components/brand/verified-badge";
import { ContactForm, ReportForm } from "@/components/directory/contact-form";
import { DirectoryDisclaimer } from "@/components/directory/disclaimer";
import { PortraitCard } from "@/components/directory/portrait-card";
import { SocialLinks } from "@/components/directory/social-links";
import { StickyContact } from "@/components/directory/sticky-contact";
import { ViewerPreview } from "@/components/directory/viewer-preview";
import { EventList } from "@/components/page/event-row";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/data";
import { getDirectorySlugs, getProfile, searchDirectory, type DirectoryProfile, type MemberProfile } from "@/lib/directory";
import { formatShortDate, memberTypeLabels } from "@/lib/format";
import { topicBySlug } from "@/lib/mock/topics";
import { viewerFromSearch, type Viewer } from "@/lib/viewer";

export async function generateStaticParams() {
  return (await getDirectorySlugs()).map((slug) => ({ slug }));
}

// Metadata uses the public view only, so members-only details never reach search engines.
export async function generateMetadata({ params }: PageProps<"/directory/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfile(slug, { kind: "public" });
  if (!profile) return { title: "Member", robots: { index: false } };
  return {
    title: profile.fullName,
    description: `${profile.fullName}, ${profile.headline}. ${profile.city}, ${profile.country}. Verified MetBA member.`,
    alternates: { canonical: `/directory/${slug}` },
    openGraph: profile.photo ? { images: [profile.photo] } : undefined,
  };
}

export default function ProfilePage({ params, searchParams }: PageProps<"/directory/[slug]">) {
  return (
    <Suspense fallback={<div className="container-site min-h-[80svh] py-20" />}>
      <Profile params={params} searchParams={searchParams} />
    </Suspense>
  );
}

const where = (p: DirectoryProfile) => (p.city === p.country ? p.country : `${p.city}, ${p.country}`);

async function Profile({
  params,
  searchParams,
}: {
  params: PageProps<"/directory/[slug]">["params"];
  searchParams: PageProps<"/directory/[slug]">["searchParams"];
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const viewer = viewerFromSearch(sp.as);
  const profile = await getProfile(slug, viewer);
  if (!profile) notFound();
  const member = profile.view === "member";
  const suffix = member ? "?as=member" : "";
  const first = profile.fullName.split(" ")[0];
  const qs = new URLSearchParams();
  if (typeof sp.as === "string") qs.set("as", sp.as);

  const [related, events] = await Promise.all([relatedMembers(profile, viewer), getUpcomingEvents()]);
  const topicEvents = events.filter((e) => e.topics.some((t) => profile.topics.includes(t))).slice(0, 3);

  return (
    <article>
      <div className="container-site flex flex-wrap items-center justify-between gap-4 pt-8 md:pt-10">
        <Link href={`/directory${suffix}`} className="text-kicker inline-flex items-center gap-2 text-graphite hover:text-ink">
          <ArrowLeft aria-hidden className="size-4" /> Member directory
        </Link>
        <ViewerPreview viewer={viewer} path={`/directory/${slug}`} params={qs} />
      </div>

      {/* Portrait and identity */}
      <div className="container-site grid gap-10 pt-8 pb-16 md:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-8">
            {/* Compact on phones so the name stays in the first screen; full column from desktop. */}
            <div className="motion-wipe relative aspect-[4/5] w-40 overflow-hidden rounded-sm bg-secondary sm:w-56 lg:w-full">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={`Photo of ${profile.fullName}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 224px"
                  className="object-cover"
                />
              ) : (
                <div className="grid size-full place-items-center">
                  <AvatarInitials initials={profile.initials} className="size-40 border-0 bg-transparent text-7xl" />
                </div>
              )}
            </div>
            {member ? (
              <p className="text-meta mt-3 text-subtle">Member since {formatShortDate(profile.memberSince)}</p>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <VerifiedBadge />
            <Link href="/membership#verification" className="text-meta text-subtle underline decoration-line-strong underline-offset-4 hover:text-ink">
              What this means
            </Link>
          </div>
          <h1 className="text-display-2xl motion-rise mt-6 text-balance">{profile.fullName}</h1>
          <p className="text-lead motion-rise mt-5 max-w-[40ch] text-graphite" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {profile.headline}
            {member ? <span className="text-subtle">, {profile.organisation}</span> : null}
          </p>

          {/* Credentials at a glance, where a lawyer's bio usually puts them. */}
          <dl className="mt-10 grid border-t border-ink sm:grid-cols-2">
            <div className="border-b border-line py-4 sm:pr-6">
              <dt className="text-meta text-subtle">Based in</dt>
              <dd className="mt-1 font-display text-[1.5rem] leading-tight">{where(profile)}</dd>
            </div>
            <div className="border-b border-line py-4 sm:border-l sm:pl-6">
              <dt className="text-meta text-subtle">Jurisdictions (self-reported)</dt>
              <dd className="mt-1 font-display text-[1.5rem] leading-tight">
                {profile.jurisdictions.length ? profile.jurisdictions.join(", ") : "None listed"}
              </dd>
            </div>
          </dl>

          <h2 className="text-kicker mt-10 mb-4 text-ink">Practice areas</h2>
          <ul className="flex flex-wrap gap-2">
            {profile.topics.map((t) => (
              <li key={t}>
                <Link
                  href={`/topics/${t}`}
                  className="inline-flex h-10 items-center rounded-full border border-line px-4 text-[0.9375rem] text-ink transition-colors hover:border-ink"
                >
                  {topicBySlug[t].name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button asChild size="lg">
              <a href="#contact">
                Contact {first} <ArrowRight aria-hidden />
              </a>
            </Button>
            <SocialLinks links={profile.social} name={profile.fullName} />
          </div>

          {member ? <MemberDetails profile={profile} /> : <PublicNote first={first} />}

          {/* Contact */}
          <section id="contact" aria-labelledby="contact-title" className="mt-16 scroll-mt-8 border-t border-ink pt-6">
            <h2 id="contact-title" className="text-display-md">
              Contact {first}
            </h2>
            {member ? (
              <>
                <p className="text-body mt-3 mb-8 max-w-[52ch] text-graphite">
                  Messages are relayed by MetBA. Email addresses are never shown on profiles.
                </p>
                <ContactForm slug={profile.slug} name={profile.fullName} preview="member" />
              </>
            ) : (
              <>
                <p className="text-body mt-3 max-w-[52ch] text-graphite">
                  Members contact each other through MetBA. Log in to send {first} a message.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href={`/sign-in?next=/directory/${profile.slug}`}>Log in to contact</Link>
                </Button>
              </>
            )}
          </section>

          <DirectoryDisclaimer className="mt-12" />
          <details className="group mt-6">
            <summary className="text-meta cursor-pointer list-none text-subtle underline decoration-line-strong underline-offset-4 hover:text-ink [&::-webkit-details-marker]:hidden">
              Report this profile
            </summary>
            <ReportForm slug={profile.slug} />
          </details>
        </div>
      </div>

      {topicEvents.length ? (
        <section aria-labelledby="events-title" className="dark bg-night py-16 text-ink md:py-24">
          <div className="container-site">
            <h2 id="events-title" className="text-display-md mb-8">
              Upcoming events in {first}&apos;s practice areas
            </h2>
            <EventList events={topicEvents} />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="related-title" className="container-site py-16 md:py-24">
          <h2 id="related-title" className="text-display-md mb-10">
            Members in the same practice areas
          </h2>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4">
            {related.map((p) => (
              <PortraitCard key={p.slug} profile={p} suffix={suffix} />
            ))}
          </ul>
        </section>
      ) : null}

      {/* Mobile: the one primary action stays within thumb reach. */}
      <StickyContact first={first} />
    </article>
  );
}

/** Other members sharing a practice area, visible to this viewer, alphabetical, no ranking. */
async function relatedMembers(profile: DirectoryProfile, viewer: Viewer) {
  const lists = await Promise.all(profile.topics.map((t) => searchDirectory({ topic: t }, viewer)));
  const seen = new Map<string, DirectoryProfile>();
  for (const l of lists) for (const p of l.results) if (p.slug !== profile.slug) seen.set(p.slug, p);
  return [...seen.values()].sort((a, b) => a.fullName.localeCompare(b.fullName)).slice(0, 4);
}

function PublicNote({ first }: { first: string }) {
  return (
    <p className="text-body mt-14 max-w-[56ch] border-t border-line pt-6 text-graphite">
      Signed-in members also see {first}&apos;s organisation, biography and languages.
    </p>
  );
}

function MemberDetails({ profile }: { profile: MemberProfile }) {
  return (
    <section aria-labelledby="about-title" className="mt-16 border-t border-line pt-6">
      <h2 id="about-title" className="text-kicker text-ink">
        About
      </h2>
      {profile.bio ? <p className="text-quote mt-5 max-w-[34ch] text-ink">{profile.bio}</p> : null}
      <dl className="mt-10 border-t border-line">
        {(
          [
            ["Organisation", profile.organisation],
            ["Member type", memberTypeLabels[profile.memberType]],
            ["Languages", profile.languages.join(", ")],
            ["Referrals", profile.openToReferrals ? "Open to referrals from other lawyers" : "Not taking referrals"],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-4">
            <dt className="text-meta text-subtle">{k}</dt>
            <dd className="text-[0.9375rem] text-ink sm:col-span-2">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
