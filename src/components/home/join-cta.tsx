import Link from "next/link";

import { Button } from "@/components/ui/button";

export function JoinCta() {
  return (
    <section aria-labelledby="join-title" className="dark relative isolate overflow-hidden bg-night text-ink dark:border-t dark:border-line">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-px max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(143,193,181,0.5),transparent)]"
      />
      <div className="container-site py-24 text-center md:py-36">
        <p className="text-label text-brand">Membership is free</p>
        {/* [DRAFT] */}
        <h2 id="join-title" className="text-display-xl mx-auto mt-6 max-w-[18ch] text-balance">
          Join the people building technology law.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-graphite">
          Open to lawyers, law students and legal professionals, wherever you practise or study.
        </p>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="inverse" size="lg">
            <Link href="/join">Join MetBA</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
