import { NewsletterForm } from "@/components/site/newsletter-form";

/** Spellbook-style newsletter masthead. Newsletter name is [DRAFT]. */
export function NewsletterMasthead() {
  return (
    <section aria-labelledby="newsletter-title" className="pb-28 md:pb-36">
      <div className="container-site">
        <div className="border-t border-ink pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="text-meta text-subtle">The MetBA newsletter</p>
            <p className="text-meta text-subtle">Monthly · Free</p>
          </div>
          <div className="mt-6 grid gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
            <h2 id="newsletter-title" className="text-display-xl lg:col-span-7">
              The Docket
            </h2>
            <div className="lg:col-span-5">
              <p className="text-body mb-6 max-w-md text-graphite">
                One email a month on new rules, cases and enforcement in emerging technology law, with MetBA events
                ahead.
              </p>
              <NewsletterForm tone="paper" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
