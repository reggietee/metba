// Member directory: visibility rules and filtering.
// The server decides what each viewer may see and only those fields leave it.
import { members } from "@/lib/mock/members";
import { topicBySlug } from "@/lib/mock/topics";
import type { Member, MemberType, SocialLinks, TopicSlug } from "@/lib/types";
import type { Viewer } from "@/lib/viewer";

/**
 * What the public may see on a public profile: full name, photo, headline, country and city,
 * self-reported jurisdictions, practice areas and social links.
 */
export type PublicProfile = {
  view: "public";
  slug: string;
  fullName: string;
  initials: string;
  photo?: string;
  headline: string;
  country: string;
  city: string;
  jurisdictions: string[];
  topics: TopicSlug[];
  social: SocialLinks;
};

/** What signed-in members additionally see. Email addresses are never included. */
export type MemberProfile = Omit<PublicProfile, "view"> & {
  view: "member";
  organisation: string;
  memberType: MemberType;
  languages: string[];
  openToReferrals: boolean;
  bio?: string;
  memberSince: string;
};

export type DirectoryProfile = PublicProfile | MemberProfile;

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

/** Visibility rules. Mirrors the RLS policies planned for Supabase. */
export function canSee(m: Member, viewer: Viewer) {
  if (m.status !== "verified" || m.visibility === "hidden") return false;
  return m.visibility === "public" || viewer.kind === "member";
}

function project(m: Member, viewer: Viewer): DirectoryProfile {
  const base = {
    slug: m.slug,
    fullName: m.fullName,
    initials: initialsOf(m.fullName),
    photo: m.photo,
    headline: m.headline,
    country: m.country,
    city: m.city,
    jurisdictions: m.jurisdictions,
    topics: m.topics,
    social: m.social,
  };
  if (viewer.kind === "public") return { view: "public", ...base };
  return {
    view: "member",
    ...base,
    organisation: m.organisation,
    memberType: m.memberType,
    languages: m.languages,
    openToReferrals: m.openToReferrals,
    bio: m.bio,
    memberSince: m.memberSince,
  };
}

export type DirectoryFilters = {
  q?: string;
  country?: string;
  jurisdiction?: string;
  topic?: string;
  type?: string;
  language?: string;
  referrals?: string;
};

const norm = (s: string) =>
  s
    .toLocaleLowerCase("en")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

/** Filters only use fields the viewer is allowed to see, so results never reveal hidden data. */
function matches(m: Member, f: DirectoryFilters, viewer: Viewer) {
  const member = viewer.kind === "member";
  if (f.q) {
    const fields = [m.fullName, m.headline, m.country, m.city, ...m.jurisdictions, ...m.topics.map((t) => topicBySlug[t].name)];
    if (member) fields.push(m.organisation);
    const hay = norm(fields.join(" "));
    if (!norm(f.q).split(/\s+/).filter(Boolean).every((w) => hay.includes(w))) return false;
  }
  if (f.country && m.country !== f.country) return false;
  if (f.topic && !m.topics.includes(f.topic as TopicSlug)) return false;
  if (f.jurisdiction && !m.jurisdictions.includes(f.jurisdiction)) return false;
  if (member) {
    if (f.type && m.memberType !== f.type) return false;
    if (f.language && !m.languages.includes(f.language)) return false;
    if (f.referrals === "1" && !m.openToReferrals) return false;
  }
  return true;
}

export async function searchDirectory(filters: DirectoryFilters, viewer: Viewer) {
  const visible = members.filter((m) => canSee(m, viewer));
  const results = visible
    .filter((m) => matches(m, filters, viewer))
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((m) => project(m, viewer));

  // Filter options are built from what this viewer can see, so they leak nothing either.
  const uniq = (xs: string[]) => [...new Set(xs)].sort((a, b) => a.localeCompare(b));
  const options = {
    countries: uniq(visible.map((m) => m.country)),
    topics: uniq(visible.flatMap((m) => m.topics)) as TopicSlug[],
    jurisdictions: uniq(visible.flatMap((m) => m.jurisdictions)),
    languages: viewer.kind === "member" ? uniq(visible.flatMap((m) => m.languages)) : [],
    types: viewer.kind === "member" ? (uniq(visible.map((m) => m.memberType)) as MemberType[]) : [],
  };
  return { results, total: visible.length, options };
}

export async function getProfile(slug: string, viewer: Viewer) {
  const m = members.find((x) => x.slug === slug);
  // Not found and not visible look the same, so the existence of a profile is not revealed.
  if (!m || !canSee(m, viewer)) return null;
  return project(m, viewer);
}

export async function getDirectorySlugs() {
  return members.filter((m) => m.status === "verified" && m.visibility !== "hidden").map((m) => m.slug);
}
