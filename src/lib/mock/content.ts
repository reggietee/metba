import type { Announcement, Faq, Insight, Person, SiteStats } from "@/lib/types";

// Mock insights for design review. All article text is [DRAFT] placeholder copy, written to show
// the reading experience. It is not legal analysis and must be replaced before launch.
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
    relatedEvents: ["ai-in-practice-professional-duties"],
    body: [
      {
        type: "p",
        text: "The obligations for providers of general-purpose AI models have now applied for a year. In that time the conversation has moved from what the text says to how providers are documenting their compliance, and what organisations that build on those models should ask for.",
      },
      { type: "h2", text: "What providers are documenting" },
      {
        type: "p",
        text: "Providers have focused on technical documentation, information for downstream providers, and policies on copyright. The voluntary code of practice has given many of them a shared structure for that work, although its use is not mandatory.",
      },
      {
        type: "ul",
        items: [
          "Model documentation kept for authorities and downstream providers",
          "A summary of training content, using the published template",
          "A policy for complying with copyright rules, including opt-outs",
        ],
      },
      { type: "h2", text: "Questions for deployers" },
      {
        type: "p",
        text: "Organisations that integrate a general-purpose model into their own systems are not providers of that model, but they still need enough information to meet their own obligations. Contract terms and procurement questionnaires are where much of this is being worked out.",
      },
      {
        type: "quote",
        text: "The practical question for most clients is not whether the model provider is compliant, but whether they have what they need to show that they are.",
        cite: "Panel discussion, MetBA webinar",
      },
      { type: "h2", text: "What to watch" },
      {
        type: "p",
        text: "Guidance from the AI Office, the treatment of fine-tuned models, and the first supervisory requests will shape practice over the next year. MetBA will continue to track these developments in insights and events.",
      },
    ],
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
    relatedEvents: ["tokenized-funds-across-jurisdictions"],
    body: [
      {
        type: "p",
        text: "Several jurisdictions now have dedicated rules for fiat-backed stablecoins. Their details differ, but the core building blocks are increasingly similar: high-quality reserves, a clear redemption right, and regular public disclosure.",
      },
      { type: "h2", text: "Reserves" },
      {
        type: "p",
        text: "Most frameworks require reserves to be held in cash and short-dated government instruments, segregated from the issuer's own assets, and subject to independent attestation.",
      },
      { type: "h2", text: "Redemption" },
      {
        type: "p",
        text: "Holders are generally given a right to redeem at par within a set period. Frameworks differ on fees, minimum amounts and who may redeem directly with the issuer.",
      },
      { type: "h2", text: "Where differences remain" },
      {
        type: "ul",
        items: [
          "Whether foreign-issued stablecoins may be offered to local users",
          "How interest or yield arrangements are treated",
          "The licensing route for intermediaries that hold stablecoins for clients",
        ],
      },
    ],
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
    relatedEvents: ["online-safety-regimes-compared"],
    body: [
      {
        type: "p",
        text: "Platform regulation has traditionally focused on content: what may be published and how quickly it must be removed. Newer rules increasingly address how services are designed, including default settings, recommendation systems and the experience offered to younger users.",
      },
      { type: "h2", text: "From removal to risk" },
      {
        type: "p",
        text: "Risk assessment duties ask services to consider how features could lead to harm before launch. That moves legal review earlier in the product cycle and closer to design teams.",
      },
      {
        type: "p",
        text: "For counsel, the practical change is that documentation of design choices becomes evidence. Product decisions that were once informal now benefit from a written rationale.",
      },
    ],
  },
  {
    slug: "legal-ai-supervision",
    title: "Supervising AI tools in legal teams",
    dek: "How existing professional conduct rules apply when lawyers use generative AI.",
    author: "MetBA Editorial",
    publishedAt: "2026-08-27",
    readingMinutes: 5,
    topics: ["legal-tech"],
    image: "/images/microphone.jpg",
    imageAlt: "A microphone on a stage in front of a blurred audience",
    relatedEvents: ["ai-in-practice-professional-duties"],
    body: [
      {
        type: "p",
        text: "Regulators in several jurisdictions have published guidance on generative AI. Most of it applies familiar principles: lawyers remain responsible for their work, must protect client information, and should understand the tools they rely on.",
      },
      { type: "h2", text: "Common themes" },
      {
        type: "ul",
        items: [
          "Verify outputs before relying on them",
          "Understand how client data is used by the tool provider",
          "Consider whether and how to tell clients that AI tools are used",
          "Supervise junior staff who use AI tools",
        ],
      },
    ],
  },
  {
    slug: "cross-border-data-transfers-2026",
    title: "Cross-border data transfers in 2026",
    dek: "Adequacy decisions, transfer assessments and the frameworks organisations rely on.",
    author: "MetBA Editorial",
    publishedAt: "2026-07-30",
    readingMinutes: 8,
    topics: ["privacy"],
    image: "/images/london.jpg",
    imageAlt: "Aerial view of London and the River Thames at dusk",
    body: [
      {
        type: "p",
        text: "International data transfers remain one of the most practical questions in privacy work. Organisations combine adequacy decisions, contractual clauses and certification schemes, and document their assessments of the destination country.",
      },
      { type: "h2", text: "What has changed" },
      {
        type: "p",
        text: "Several new adequacy relationships and regional frameworks have widened the options available. Review cycles for existing decisions also mean that transfer strategies need periodic attention.",
      },
    ],
  },
];

// From the current metba.io About page. Titles to be confirmed (PLAN.md Q1).
export const people: Person[] = [
  { name: "Aaron Grinhaus", role: "Founder", organisation: "Grinhaus Law Firm", group: "board" },
  { name: "Madaline Zannes", role: "Founder", organisation: "Zannes Law Firm", group: "board" },
  { name: "Reggie Tan", role: "Founder", organisation: "Story Mode Web3 Marketing", group: "board" },
  { name: "Amy Trachter", role: "Founder", organisation: "The Brillo Agency", group: "board" },
  { name: "Mitch Jackson", role: "Lawyer and Co-Founder", organisation: "Jackson & Wilson and ManeuVR", group: "advisory" },
  { name: "Harrison Jordan", role: "Lawyer", organisation: "The NFT Lawyer", group: "advisory" },
  { name: "Sherena Hussain", role: "Lawyer and Founder", organisation: "Academic Collaboration Consulting", group: "advisory" },
  {
    name: "Michael Kasdan",
    role: "Partner, IP Group; Adjunct Professor, NYU School of Law",
    organisation: "Wiggin and Dana LLP",
    group: "advisory",
  },
  { name: "Tara Frater", role: "Principal and Founder", organisation: "FT Legal", group: "advisory" },
  { name: "John Tengström", role: "Lawyer and Partner", organisation: "Astra Advokater", group: "advisory" },
];

// [DRAFT] Membership FAQ.
export const membershipFaqs: Faq[] = [
  {
    q: "Does MetBA check whether I am licensed to practise?",
    a: "No. Verification confirms your MetBA membership only. MetBA does not check anyone's licence or right to practise. Jurisdictions on profiles are self-reported and labelled as such.",
  },
  {
    q: "How much does membership cost?",
    a: "Membership is free for lawyers, law students and legal professionals.",
  },
  {
    q: "How long does verification take?",
    a: "An administrator reviews each application. Most are reviewed within a few working days.",
  },
  {
    q: "Who can see my profile?",
    a: "You choose. Profiles can be hidden, visible to members only (the default), or public. A public profile shows your name, photo, headline, location, self-reported jurisdictions, practice areas and social links. Email addresses are never shown.",
  },
  {
    q: "Can I export or delete my data?",
    a: "Yes. From your account you can download a copy of your data or delete your account at any time.",
  },
  {
    q: "Are MetBA events accredited for CPD?",
    a: "It depends on the event and your jurisdiction. Where an event has been accredited, the event page names the regulator and the reference. Otherwise it may be eligible for self-reported CPD, and you should check your regulator's rules.",
  },
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
