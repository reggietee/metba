import type { Topic } from "@/lib/types";

// The eight topic areas from the brief. Descriptions are [DRAFT].
export const topics: Topic[] = [
  {
    slug: "ai-governance",
    number: 1,
    name: "AI governance and legal implications",
    short: "AI governance",
    description:
      "How legislatures, regulators and courts are shaping the development and use of artificial intelligence.",
  },
  {
    slug: "crypto-digital-assets",
    number: 2,
    name: "Crypto and digital asset regulation",
    short: "Digital assets",
    description:
      "Licensing regimes, market rules and enforcement for crypto assets and the businesses that serve them.",
  },
  {
    slug: "platform-liability",
    number: 3,
    name: "Platform liability and design",
    short: "Platform liability",
    description:
      "The duties of online platforms, and how product design is becoming a legal question.",
  },
  {
    slug: "privacy",
    number: 4,
    name: "Privacy law and enforcement",
    short: "Privacy",
    description:
      "Data protection frameworks, cross-border transfers and the direction of regulatory enforcement.",
  },
  {
    slug: "online-safety",
    number: 5,
    name: "Online safety regulation",
    short: "Online safety",
    description:
      "New online safety regimes, risk assessments and the obligations they create for services.",
  },
  {
    slug: "tokenized-assets",
    number: 6,
    name: "Tokenized assets and securities law",
    short: "Tokenized assets",
    description:
      "How securities law applies to tokenized funds, real-world assets and on-chain settlement.",
  },
  {
    slug: "legal-tech",
    number: 7,
    name: "Legal tech and AI in legal practice",
    short: "Legal tech",
    description:
      "The tools changing legal work, and the professional responsibility questions they raise.",
  },
  {
    slug: "blockchain-web3",
    number: 8,
    name: "Blockchain and Web3 law developments",
    short: "Blockchain and Web3",
    description:
      "Smart contracts, DAOs, decentralised protocols and the case law forming around them.",
  },
];

export const topicBySlug = Object.fromEntries(topics.map((t) => [t.slug, t])) as Record<
  Topic["slug"],
  Topic
>;
