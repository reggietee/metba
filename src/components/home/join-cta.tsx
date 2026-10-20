import Link from "next/link";

import { Button } from "@/components/ui/button";

export function JoinCta() {
  return (
    <section aria-labelledby="join-title" className="dark bg-deep text-ink">
      <div className="container-site grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        {/* [DRAFT] */}
        <h2 id="join-title" className="text-display-2xl text-balance lg:col-span-8">
          Join the people building technology law
        </h2>
        <div className="lg:col-span-4 lg:pb-3">
          <p className="text-lead text-graphite">
            Membership is free for lawyers, law students and legal professionals, wherever you practise or study.
          </p>
          <Button asChild variant="inverse" size="lg" className="mt-8">
            <Link href="/join">Join MetBA</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
