// Mock data for the Phase 1 member portal and admin preview. Nothing here is real or saved.
import type { CpdCategory, EventFormat, TopicSlug } from "@/lib/types";

export const currentMember = {
  slug: "adaeze-okafor",
  fullName: "Adaeze Okafor",
  firstName: "Adaeze",
  email: "adaeze@okafor.example",
  photo: "/images/members/adaeze-okafor.jpg",
  headline: "Fintech and digital assets counsel",
  organisation: "Okafor & Partners",
  city: "Lagos",
  country: "Nigeria",
  jurisdictions: ["Nigeria"],
  topics: ["crypto-digital-assets", "tokenized-assets"] as TopicSlug[],
  languages: ["English", "Yoruba"],
  bio: "Advises exchanges, custodians and payment companies on licensing and market conduct rules across West Africa. Previously in-house at a regional bank.",
  social: { linkedin: "https://www.linkedin.com/", website: "https://example.com/okafor" },
  visibility: "public" as const,
  openToReferrals: true,
  memberSince: "2023-03-14",
};

export const currentAdmin = { firstName: "Madaline", fullName: "Madaline Zannes", role: "Admin" };

/** Events the member has registered for (slugs from mock/events). */
export const registrations = ["tokenized-funds-across-jurisdictions", "online-safety-regimes-compared"];

export type CpdEntry = {
  id: string;
  date: string;
  title: string;
  provider: string;
  hours: number;
  category: CpdCategory;
  source: "live" | "recording" | "external";
  certificateId?: string;
};

export const cpdLog: CpdEntry[] = [
  {
    id: "c1",
    date: "2026-09-24",
    title: "DAO liability after recent rulings",
    provider: "MetBA",
    hours: 1.5,
    category: "substantive",
    source: "live",
    certificateId: "MBA-2026-7K3QX",
  },
  {
    id: "c2",
    date: "2026-07-02",
    title: "Privacy enforcement trends in 2026",
    provider: "MetBA",
    hours: 1,
    category: "substantive",
    source: "recording",
    certificateId: "MBA-2026-R4VTM",
  },
  {
    id: "c3",
    date: "2026-05-15",
    title: "Professional responsibility in fintech practice",
    provider: "Nigerian Bar Association",
    hours: 2,
    category: "ethics",
    source: "external",
  },
  {
    id: "c4",
    date: "2026-03-10",
    title: "Stablecoin regulation workshop",
    provider: "Lagos Business School",
    hours: 3,
    category: "substantive",
    source: "external",
  },
  {
    id: "c5",
    date: "2025-11-20",
    title: "Smart contract disputes in practice",
    provider: "MetBA",
    hours: 1.5,
    category: "substantive",
    source: "live",
    certificateId: "MBA-2025-9HPLC",
  },
];

export type Recording = {
  slug: string;
  title: string;
  summary: string;
  heldAt: string;
  durationMin: number;
  format: EventFormat;
  topics: TopicSlug[];
  speakers: string[];
  cpdHours: number;
  image: string;
  imageAlt: string;
  publicSample?: boolean;
  progressPct?: number;
  chapters?: { at: string; title: string }[];
};

export const recordings: Recording[] = [
  {
    slug: "dao-liability-after-recent-rulings",
    title: "DAO liability after recent rulings",
    summary: "How courts have treated governance token holders, and what that means for protocol design.",
    heldAt: "2026-09-24",
    durationMin: 88,
    format: "webinar",
    topics: ["blockchain-web3", "platform-liability"],
    speakers: ["Haruka Ito", "Erik Lindqvist"],
    cpdHours: 1.5,
    image: "/images/presentation.jpg",
    imageAlt: "Speaker presenting to a seated audience in a dark hall",
    publicSample: true,
    progressPct: 100,
    chapters: [
      { at: "0:00", title: "Introduction" },
      { at: "6:40", title: "How courts have characterised DAOs" },
      { at: "31:15", title: "Active participation and passive holding" },
      { at: "52:30", title: "Legal wrappers and their limits" },
      { at: "71:05", title: "Questions from members" },
    ],
  },
  {
    slug: "privacy-enforcement-trends-2026",
    title: "Privacy enforcement trends in 2026",
    summary: "Where data protection regulators focused this year, and what has changed in remedies.",
    heldAt: "2026-06-18",
    durationMin: 62,
    format: "webinar",
    topics: ["privacy", "ai-governance"],
    speakers: ["Camille Moreau"],
    cpdHours: 1,
    image: "/images/paris.jpg",
    imageAlt: "Paris at dusk with the Eiffel Tower across the Seine",
    progressPct: 100,
  },
  {
    slug: "stablecoin-rules-compared",
    title: "Stablecoin rules compared",
    summary: "Reserve, redemption and disclosure requirements across five jurisdictions.",
    heldAt: "2026-04-09",
    durationMin: 74,
    format: "webinar",
    topics: ["crypto-digital-assets"],
    speakers: ["Mei Ling Tan", "Adaeze Okafor"],
    cpdHours: 1,
    image: "/images/new-york.jpg",
    imageAlt: "Lower Manhattan skyline at dusk",
    progressPct: 40,
  },
  {
    slug: "ai-act-for-deployers",
    title: "The AI Act for deployers",
    summary: "What organisations using AI systems, rather than building them, need to have in place.",
    heldAt: "2026-02-19",
    durationMin: 90,
    format: "hybrid",
    topics: ["ai-governance", "legal-tech"],
    speakers: ["Sofia Marchetti", "Priya Shah"],
    cpdHours: 1.5,
    image: "/images/towers.jpg",
    imageAlt: "Glass office towers seen from street level",
  },
  {
    slug: "smart-contract-disputes-2025",
    title: "Smart contract disputes in practice",
    summary: "Arbitrators and litigators on evidence, interpretation and remedies when code is part of the bargain.",
    heldAt: "2025-11-20",
    durationMin: 85,
    format: "hybrid",
    topics: ["blockchain-web3", "legal-tech"],
    speakers: ["Haruka Ito"],
    cpdHours: 1.5,
    image: "/images/chicago.jpg",
    imageAlt: "Chicago skyline along the lake at dusk",
    progressPct: 100,
  },
  {
    slug: "online-safety-duties-2025",
    title: "Online safety duties for platforms",
    summary: "Risk assessments, transparency reporting and the first enforcement actions.",
    heldAt: "2025-09-30",
    durationMin: 58,
    format: "webinar",
    topics: ["online-safety", "platform-liability"],
    speakers: ["Nadia Haddad", "Tom Brennan"],
    cpdHours: 1,
    image: "/images/sydney.jpg",
    imageAlt: "Sydney Harbour with the Opera House and city skyline",
  },
];

export type Application = {
  id: string;
  fullName: string;
  email: string;
  memberType: "lawyer" | "student" | "associate";
  organisation: string;
  city: string;
  country: string;
  jurisdictions: string[];
  topics: TopicSlug[];
  linkedin?: string;
  emailDomainMatch: boolean;
  submittedAt: string;
  status: "submitted" | "more_info";
  note?: string;
};

// Fictitious applicants for the admin queue preview.
export const applications: Application[] = [
  {
    id: "app-1042",
    fullName: "Jonas Becker",
    email: "j.becker@becker-legal.example",
    memberType: "lawyer",
    organisation: "Becker Legal",
    city: "Berlin",
    country: "Germany",
    jurisdictions: ["Germany"],
    topics: ["ai-governance", "privacy"],
    linkedin: "https://www.linkedin.com/",
    emailDomainMatch: true,
    submittedAt: "2026-10-20T09:14:00Z",
    status: "submitted",
  },
  {
    id: "app-1041",
    fullName: "Amara Nwosu",
    email: "amara.nwosu@unilag.example",
    memberType: "student",
    organisation: "University of Lagos",
    city: "Lagos",
    country: "Nigeria",
    jurisdictions: [],
    topics: ["crypto-digital-assets"],
    linkedin: "https://www.linkedin.com/",
    emailDomainMatch: true,
    submittedAt: "2026-10-19T16:40:00Z",
    status: "submitted",
  },
  {
    id: "app-1039",
    fullName: "Rafael Ortiz",
    email: "rafael.ortiz@gmail.example",
    memberType: "lawyer",
    organisation: "Ortiz Abogados",
    city: "Madrid",
    country: "Spain",
    jurisdictions: ["Spain"],
    topics: ["tokenized-assets", "blockchain-web3"],
    emailDomainMatch: false,
    submittedAt: "2026-10-18T11:05:00Z",
    status: "more_info",
    note: "Asked for a LinkedIn profile or firm email on 19 Oct.",
  },
  {
    id: "app-1038",
    fullName: "Grace Liu",
    email: "grace.liu@harbourcounsel.example",
    memberType: "associate",
    organisation: "Harbour Counsel",
    city: "Hong Kong",
    country: "Hong Kong",
    jurisdictions: [],
    topics: ["legal-tech"],
    linkedin: "https://www.linkedin.com/",
    emailDomainMatch: true,
    submittedAt: "2026-10-17T03:22:00Z",
    status: "submitted",
  },
];

export const liveSession = {
  eventSlug: "tokenized-funds-across-jurisdictions",
  registered: 312,
  inRoom: 187,
  peak: 203,
  stage: [
    { name: "Mei Ling Tan", role: "Host", photo: "/images/members/mei-ling-tan.jpg", speaking: true },
    { name: "Daniel Reyes", role: "Speaker", photo: "/images/members/daniel-reyes.jpg" },
    { name: "Erik Lindqvist", role: "Speaker", initials: "EL" },
  ],
  hands: [
    { name: "Jonas Becker", at: "12:41" },
    { name: "Sofia Marchetti", at: "12:43" },
  ],
  chat: [
    { name: "Nadia Haddad", at: "12:31", text: "Good afternoon from Dubai." },
    { name: "Camille Moreau", at: "12:34", text: "Is the slide deck shared afterwards?" },
    { name: "MetBA", at: "12:35", text: "Yes, slides will be on the recap page for members.", staff: true },
    { name: "Jonas Becker", at: "12:40", text: "How is settlement finality treated in the Singapore pilots?" },
  ],
  questions: [
    { name: "Jonas Becker", text: "How is settlement finality treated in the Singapore pilots?", votes: 14 },
    { name: "Priya Shah", text: "Do the Ontario rules distinguish between tokenized units and the register itself?", votes: 9 },
    { name: "Lucas Ferreira", text: "Any guidance on distribution to retail investors?", votes: 4 },
  ],
};

export const adminActivity = [
  { at: "2026-10-20T09:14:00Z", text: "Jonas Becker applied (Lawyer, Germany)" },
  { at: "2026-10-19T18:02:00Z", text: "Madaline Zannes approved Sofia Marchetti" },
  { at: "2026-10-19T16:40:00Z", text: "Amara Nwosu applied (Law student, Nigeria)" },
  { at: "2026-10-19T10:15:00Z", text: "Recording published: DAO liability after recent rulings" },
  { at: "2026-10-18T12:00:00Z", text: "Reggie Tan requested more information from Rafael Ortiz" },
];
