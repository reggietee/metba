import type { MetbaEvent, Recap, Speaker } from "@/lib/types";

// Mock data for design review. Speakers are fictional placeholders.
const sp = (id: string, name: string, title: string, organisation: string): Speaker => ({
  id,
  name,
  title,
  organisation,
  initials: name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2),
});

const speakers = {
  okafor: sp("okafor", "Adaeze Okafor", "Partner, Fintech and Digital Assets", "Lagos"),
  lindqvist: sp("lindqvist", "Erik Lindqvist", "Counsel, Capital Markets", "Stockholm"),
  tan: sp("tan", "Mei Ling Tan", "Head of Regulatory", "Singapore"),
  moreau: sp("moreau", "Camille Moreau", "Associate, Data Protection", "Paris"),
  shah: sp("shah", "Priya Shah", "Legal Engineer", "London"),
  reyes: sp("reyes", "Daniel Reyes", "General Counsel", "Toronto"),
  haddad: sp("haddad", "Nadia Haddad", "Senior Associate, Technology", "Dubai"),
  brennan: sp("brennan", "Tom Brennan", "Professor of Law", "Sydney"),
};

export const events: MetbaEvent[] = [
  {
    slug: "tokenized-funds-across-jurisdictions",
    title: "Tokenized funds across jurisdictions",
    summary:
      "How Singapore, the EU and Ontario are approaching tokenized fund units, and what counsel should expect in the next twelve months.",
    startsAt: "2026-11-12T12:00:00-05:00",
    endsAt: "2026-11-12T13:30:00-05:00",
    timezone: "America/Toronto",
    format: "webinar",
    image: "/images/audience.jpg",
    imageAlt: "Audience seated in a darkened auditorium facing a stage",
    topics: ["tokenized-assets", "crypto-digital-assets"],
    speakers: [speakers.tan, speakers.lindqvist, speakers.reyes],
    cpd: [
      { jurisdiction: "Ontario", hours: 1.5, category: "substantive", accreditationStatus: "none" },
      { jurisdiction: "England and Wales", hours: 1.5, category: "substantive", accreditationStatus: "none" },
    ],
    capacity: 500,
    registered: 312,
    featured: true,
    priceCents: 0,
  },
  {
    slug: "ai-in-practice-professional-duties",
    title: "AI in practice: professional duties for the working lawyer",
    summary:
      "A practical session on supervision, confidentiality and competence when legal teams adopt AI tools.",
    startsAt: "2026-11-26T17:00:00+00:00",
    endsAt: "2026-11-26T18:00:00+00:00",
    timezone: "Europe/London",
    format: "hybrid",
    venue: "Holborn, London",
    city: "London",
    image: "/images/london.jpg",
    imageAlt: "Aerial view of London and the River Thames at dusk",
    topics: ["legal-tech", "ai-governance"],
    speakers: [speakers.shah, speakers.moreau],
    cpd: [{ jurisdiction: "England and Wales", hours: 1, category: "ethics", accreditationStatus: "none" }],
    capacity: 80,
    registered: 80,
    priceCents: 0,
  },
  {
    slug: "online-safety-regimes-compared",
    title: "Online safety regimes compared",
    summary:
      "The UK Online Safety Act, the EU Digital Services Act and Australia's framework, side by side.",
    startsAt: "2026-12-09T09:00:00+11:00",
    endsAt: "2026-12-09T10:00:00+11:00",
    timezone: "Australia/Sydney",
    format: "webinar",
    image: "/images/sydney.jpg",
    imageAlt: "Sydney Harbour with the Opera House and city skyline",
    topics: ["online-safety", "platform-liability"],
    speakers: [speakers.brennan, speakers.haddad],
    cpd: [{ jurisdiction: "New South Wales", hours: 1, category: "substantive", accreditationStatus: "none" }],
    priceCents: 0,
  },
  {
    slug: "metba-singapore-roundtable-2027",
    title: "MetBA Singapore roundtable",
    summary: "An evening roundtable for members working on digital asset licensing in Asia.",
    startsAt: "2027-01-21T18:30:00+08:00",
    endsAt: "2027-01-21T21:00:00+08:00",
    timezone: "Asia/Singapore",
    format: "in_person",
    venue: "Marina Bay, Singapore",
    city: "Singapore",
    image: "/images/singapore.jpg",
    imageAlt: "Marina Bay Sands and the Singapore waterfront at sunset",
    topics: ["crypto-digital-assets", "blockchain-web3"],
    speakers: [speakers.tan, speakers.okafor],
    cpd: [],
    capacity: 40,
    registered: 22,
    priceCents: 0,
  },
];

export const recaps: Recap[] = [
  {
    eventSlug: "dao-liability-after-recent-rulings",
    title: "DAO liability after recent rulings",
    summary:
      "Panelists traced how courts have treated governance token holders and what that means for protocol design.",
    heldAt: "2026-09-24T12:00:00-04:00",
    format: "webinar",
    topics: ["blockchain-web3", "platform-liability"],
    image: "/images/presentation.jpg",
    imageAlt: "Speaker presenting to a seated audience in a dark hall",
  },
];
