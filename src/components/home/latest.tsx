import Link from "next/link";

import { Reveal } from "@/components/brand/reveal";
import { SectionHeading } from "@/components/brand/section";
import { InsightCard } from "@/components/cards/insight-card";
import { RecapCard } from "@/components/cards/recap-card";
import { Button } from "@/components/ui/button";
import type { Insight, Recap } from "@/lib/types";

export function Latest({ insights, recap }: { insights: Insight[]; recap: Recap | null }) {
  const shown = insights.slice(0, recap ? 2 : 3);
  return (
    <section aria-labelledby="latest-title" className="border-t border-line py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          id="latest-title"
          eyebrow="Insights and recaps"
          title="Recent developments, explained."
          action={
            <Button asChild variant="outline">
              <Link href="/insights">All insights</Link>
            </Button>
          }
        />
        <ul className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {shown.map((i, idx) => (
            <li key={i.slug}>
              <Reveal delay={idx * 80} className="h-full">
                <InsightCard insight={i} />
              </Reveal>
            </li>
          ))}
          {recap ? (
            <li>
              <Reveal delay={160} className="h-full">
                <RecapCard recap={recap} />
              </Reveal>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
