// Domain types shared by mock data now and Supabase later (PLAN.md section 7).

export type TopicSlug =
  | "ai-governance"
  | "crypto-digital-assets"
  | "platform-liability"
  | "privacy"
  | "online-safety"
  | "tokenized-assets"
  | "legal-tech"
  | "blockchain-web3";

export type Topic = {
  slug: TopicSlug;
  number: number;
  name: string;
  short: string;
  description: string;
};

export type MemberType = "lawyer" | "student" | "associate";
export type MembershipStatus = "pending" | "verified" | "lapsed";
export type Visibility = "hidden" | "members" | "public";

export type Member = {
  slug: string;
  fullName: string;
  headline: string;
  organisation: string;
  memberType: MemberType;
  status: MembershipStatus;
  visibility: Visibility;
  countryCode: string;
  country: string;
  city: string;
  jurisdictions: string[];
  topics: TopicSlug[];
  languages: string[];
  openToReferrals: boolean;
  bio?: string;
  photo?: string;
  social: SocialLinks;
  memberSince: string;
};

export type SocialLinks = { linkedin?: string; x?: string; website?: string };

export type EventFormat = "webinar" | "in_person" | "hybrid" | "virtual_venue";
export type CpdCategory =
  | "substantive"
  | "professionalism"
  | "ethics"
  | "practice_management"
  | "other";
export type AccreditationStatus = "none" | "pending" | "accredited";

export type EventCpd = {
  jurisdiction: string;
  hours: number;
  category: CpdCategory;
  accreditationStatus: AccreditationStatus;
  regulator?: string;
  accreditationRef?: string;
};

export type Speaker = {
  id: string;
  name: string;
  title: string;
  organisation: string;
  initials: string;
  bio?: string;
};

export type MetbaEvent = {
  slug: string;
  title: string;
  summary: string;
  description?: string[];
  agenda?: { time: string; item: string }[];
  startsAt: string; // ISO 8601 with offset
  endsAt: string;
  timezone: string; // IANA
  format: EventFormat;
  venue?: string;
  city?: string;
  image: string;
  imageAlt: string;
  topics: TopicSlug[];
  speakers: Speaker[];
  cpd: EventCpd[];
  capacity?: number;
  registered?: number;
  featured?: boolean;
  priceCents: number;
};

/** Article body as simple blocks; the CMS editor (Phase 4) produces the same shape. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "ul"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  body?: Block[];
  relatedEvents?: string[];
  author: string;
  publishedAt: string;
  readingMinutes: number;
  topics: TopicSlug[];
  image: string;
  imageAlt: string;
};

export type Recap = {
  eventSlug: string;
  title: string;
  summary: string;
  takeaways?: string[];
  speakers?: Speaker[];
  recordingVisibility?: "public" | "members";
  heldAt: string;
  format: EventFormat;
  topics: TopicSlug[];
  image: string;
  imageAlt: string;
};

export type Person = {
  name: string;
  role: string;
  organisation: string;
  group: "board" | "advisory";
};

export type Faq = { q: string; a: string };

export type SiteStats = {
  members: number;
  countries: number;
  eventsHeld: number;
};

export type Announcement = {
  id: string;
  text: string;
  href: string;
  linkLabel: string;
} | null;
