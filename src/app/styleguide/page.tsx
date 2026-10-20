import type { Metadata } from "next";

import { CpdLabel } from "@/components/brand/cpd-label";
import { Eyebrow } from "@/components/brand/eyebrow";
import { VerifiedBadge } from "@/components/brand/verified-badge";
import { EventCard } from "@/components/cards/event-card";
import { InsightCard } from "@/components/cards/insight-card";
import { MemberCard } from "@/components/cards/member-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLatestInsights, getMembers, getUpcomingEvents } from "@/lib/data";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const swatches = [
  ["paper", "bg-paper"],
  ["surface", "bg-surface"],
  ["ink", "bg-ink"],
  ["graphite", "bg-graphite"],
  ["subtle", "bg-subtle"],
  ["stone", "bg-stone"],
  ["line", "bg-line"],
  ["brand", "bg-brand"],
  ["night", "bg-night"],
] as const;

export default async function StyleguidePage() {
  const [events, insights, members] = await Promise.all([getUpcomingEvents(), getLatestInsights(1), getMembers()]);
  return (
    <div className="container-site space-y-20 py-16">
      <header>
        <Eyebrow>Design system</Eyebrow>
        <h1 className="text-display-xl mt-4">Styleguide</h1>
        <p className="mt-4 max-w-2xl text-graphite">Tokens and components. Use the theme toggle in the footer to check dark mode.</p>
      </header>

      <section aria-labelledby="sg-colour">
        <h2 id="sg-colour" className="text-display-md mb-6">Colour</h2>
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {swatches.map(([name, cls]) => (
            <li key={name}>
              <div className={`h-16 rounded-md border border-line ${cls}`} />
              <p className="text-meta mt-2 text-subtle">{name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sg-type" className="space-y-6">
        <h2 id="sg-type" className="text-display-md">Type</h2>
        <p className="text-display-2xl">Display 2XL</p>
        <p className="text-display-xl">Display XL serif headline</p>
        <p className="text-display-lg">Display LG section heading</p>
        <p className="text-display-md">Display MD card title</p>
        <p className="max-w-2xl text-lg leading-relaxed text-graphite">
          Body large in Geist Sans. Copy is neutral, professional and written in plain English.
        </p>
        <p className="text-meta text-subtle">Mono label · 12 Nov 2026 · 1.5 CPD hours</p>
      </section>

      <section aria-labelledby="sg-buttons" className="space-y-6">
        <h2 id="sg-buttons" className="text-display-md">Buttons and inputs</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="dark flex flex-wrap gap-3 rounded-md bg-night p-6">
          <Button variant="inverse">Inverse</Button>
          <Button variant="outline-inverse">Outline inverse</Button>
        </div>
        <div className="max-w-sm">
          <label htmlFor="sg-input" className="mb-2 block text-sm text-graphite">Label</label>
          <Input id="sg-input" placeholder="Placeholder" />
        </div>
      </section>

      <section aria-labelledby="sg-trust" className="space-y-6">
        <h2 id="sg-trust" className="text-display-md">Trust and CPD wording</h2>
        <VerifiedBadge />
        {/* Fictional regulator: demonstrates both wording branches. */}
        <CpdLabel
          cpd={[
            {
              jurisdiction: "Example jurisdiction",
              hours: 1.5,
              category: "substantive",
              accreditationStatus: "accredited",
              regulator: "Example Regulator",
              accreditationRef: "SAMPLE-0001",
            },
            { jurisdiction: "Another jurisdiction", hours: 1, category: "ethics", accreditationStatus: "none" },
          ]}
        />
      </section>

      <section aria-labelledby="sg-cards">
        <h2 id="sg-cards" className="text-display-md mb-6">Cards</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <EventCard event={events[1]} />
          <InsightCard insight={insights[0]} />
          <MemberCard member={members[0]} />
        </div>
      </section>
    </div>
  );
}
