import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/brand/section";
import type { Topic } from "@/lib/types";

export function TopicsGrid({ topics, counts }: { topics: Topic[]; counts: Record<string, number> }) {
  return (
    <section aria-labelledby="topics-title" className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          id="topics-title"
          eyebrow="Topics"
          title="Eight areas where the law is being written now."
          intro="Events, insights and members are organised by topic, so you can follow the developments that matter to your practice."
        />
        <ul className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <li key={t.slug} className="border-r border-b border-line">
              <Link
                href={`/topics/${t.slug}`}
                className="group flex h-full min-h-32 flex-col p-5 transition-colors duration-300 hover:bg-surface sm:min-h-48 sm:p-6 md:min-h-56"
              >
                <span className="text-label flex items-center justify-between text-subtle">
                  {String(t.number).padStart(2, "0")}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
                <span className="text-display-sm mt-auto pt-6 text-balance sm:pt-8">{t.name}</span>
                {counts[t.slug] ? (
                  <span className="text-label mt-4 text-subtle">
                    {counts[t.slug]} {counts[t.slug] === 1 ? "item" : "items"}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
