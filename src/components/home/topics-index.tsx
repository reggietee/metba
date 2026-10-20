import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Topic } from "@/lib/types";

/** The eight practice areas as a two-column contents page. */
export function TopicsIndex({ topics, hideHeading }: { topics: Topic[]; hideHeading?: boolean }) {
  return (
    <section aria-labelledby="topics-title" className="py-28 md:py-40">
      <div className="container-site">
        <div className={hideHeading ? "sr-only" : "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8"}>
          <h2 id="topics-title" className="text-display-lg lg:col-span-5">
            Eight areas of practice
          </h2>
          {/* [DRAFT] */}
          <p className="text-body max-w-md text-graphite lg:col-span-5 lg:col-start-8">
            Events, insights and members are organised by topic. Follow the areas that matter to your work.
          </p>
        </div>
        <ul className="mt-12 grid border-b border-line md:mt-16 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
          {topics.map((t) => (
            <li key={t.slug} className="border-t border-line">
              <Link href={`/topics/${t.slug}`} className="group flex items-start justify-between gap-6 py-6 md:py-7">
                <span>
                  <span className="block font-display text-[1.625rem] leading-tight tracking-[-0.012em] text-ink transition-colors duration-300 group-hover:text-brand md:text-[1.875rem]">
                    {t.name}
                  </span>
                  <span className="mt-2 block max-w-[46ch] text-[0.9375rem] leading-relaxed text-graphite">
                    {t.description}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="mt-2.5 size-4 shrink-0 text-subtle transition-transform duration-300 ease-[var(--ease-calm)] group-hover:translate-x-1 group-hover:text-brand"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
