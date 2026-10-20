import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip pt-14 md:pt-20 lg:pt-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1 id="hero-title" className="motion-rise text-display-2xl text-balance lg:col-span-8">
            The global community for emerging technology law
          </h1>
          <div className="lg:col-span-4 lg:pb-3">
            {/* [DRAFT] */}
            <p className="motion-rise text-lead max-w-md text-graphite" style={{ "--delay": "120ms" } as React.CSSProperties}>
              For lawyers, law students and legal professionals working on AI, digital assets, Web3 and online
              platforms.
            </p>
            <div className="motion-rise mt-8 flex flex-wrap gap-3" style={{ "--delay": "200ms" } as React.CSSProperties}>
              <Button asChild size="lg">
                <Link href="/join">Join MetBA. It&apos;s free.</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/directory">Find a member</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* The page's one bleed: off the right edge on desktop, inside the gutters on mobile. */}
        <div
          style={{ "--delay": "280ms" } as React.CSSProperties}
          className="motion-wipe relative mt-14 aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[16/8] md:mt-20 lg:mr-[calc((100%-100vw)/2)] lg:aspect-[21/8] lg:rounded-r-none">
          <Image
            src="/images/hero-dusk.jpg"
            alt="A city at dusk seen from the hills, lights spreading to the horizon"
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[50%_62%]"
          />
        </div>
      </div>
    </section>
  );
}
