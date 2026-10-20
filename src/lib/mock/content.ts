import type { Announcement, Insight, Person, SiteStats } from "@/lib/types";

// Mock insights for design review. Titles and deks are [DRAFT].
export const insights: Insight[] = [
  {
    slug: "eu-ai-act-general-purpose-models",
    title: "The EU AI Act's rules for general-purpose models, one year in",
    dek: "What the code of practice asks of providers, and the open questions for downstream deployers.",
    author: "MetBA Editorial",
    publishedAt: "2026-10-14",
    readingMinutes: 7,
    topics: ["ai-governance"],
    image: "/images/towers.jpg",
    imageAlt: "Glass office towers seen from street level",
  },
  {
    slug: "stablecoin-frameworks-converge",
    title: "Stablecoin frameworks are starting to converge",
    dek: "Reserve, redemption and disclosure rules in five jurisdictions, compared.",
    author: "MetBA Editorial",
    publishedAt: "2026-10-02",
    readingMinutes: 9,
    topics: ["crypto-digital-assets"],
    image: "/images/new-york.jpg",
    imageAlt: "Lower Manhattan skyline at dusk",
  },
  {
    slug: "design-codes-and-platform-duties",
    title: "When product design becomes a legal duty",
    dek: "Age-appropriate design codes and the shift from content rules to design rules.",
    author: "MetBA Editorial",
    publishedAt: "2026-09-18",
    readingMinutes: 6,
    topics: ["platform-liability", "online-safety"],
    image: "/images/paris.jpg",
    imageAlt: "Paris at dusk with the Eiffel Tower across the Seine",
  },
];

// From the current metba.io About page. Bios and titles to be confirmed (PLAN.md Q1).
export const people: Person[] = [
  { name: "Aaron Grinhaus", role: "Founder", organisation: "Grinhaus Law Firm", group: "board" },
  { name: "Madaline Zannes", role: "Founder", organisation: "Zannes Law Firm", group: "board" },
  { name: "Reggie Tan", role: "Founder", organisation: "Story Mode Web3 Marketing", group: "board" },
  { name: "Amy Trachter", role: "Founder", organisation: "The Brillo Agency", group: "board" },
];

// Placeholder counts until the database exists.
export const stats: SiteStats = { members: 1240, countries: 46, eventsHeld: 31 };

// Proposed thresholds (PLAN.md Q6). A count below its threshold is hidden.
export const statThresholds: SiteStats = { members: 250, countries: 15, eventsHeld: 10 };

export const announcement: Announcement = {
  id: "2026-11-tokenized-funds",
  text: "12 November: Tokenized funds across jurisdictions. Free webinar for members and guests.",
  href: "/events/tokenized-funds-across-jurisdictions",
  linkLabel: "Register",
};
