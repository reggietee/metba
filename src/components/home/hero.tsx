import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero({ countries }: { countries?: number }) {
  // Rounded down to the nearest 10 so the claim stays true as counts change.
  const rounded = countries ? Math.floor(countries / 10) * 10 : 0;
  return (
    <section aria-labelledby="hero-title" className="dark relative isolate overflow-hidden bg-night text-ink">
      <Image
        src="/images/hero-dusk.jpg"
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover object-[50%_60%]"
      />
      {/* Overlay keeps white type above 7:1 on the brightest part of the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.35)_35%,rgba(11,11,12,0.85)_100%)]"
      />
      <div className="container-site flex min-h-[min(88svh,52rem)] flex-col justify-end pt-32 pb-14 md:pb-20">
        <p className="text-label text-[#c9c5bc]">Metaverse Bar Association</p>
        <h1 id="hero-title" className="text-display-2xl mt-5 max-w-[19ch] text-balance text-[#f5f3ee]">
          The global community for emerging technology law.
        </h1>
        {/* [DRAFT] */}
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#dedad2] md:text-xl">
          MetBA connects lawyers, law students and legal professionals working on AI, digital assets, Web3 and online
          platforms{rounded >= 20 ? `, in more than ${rounded} countries` : ", worldwide"}.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="inverse" size="lg">
            <Link href="/join">Join MetBA. It&apos;s free.</Link>
          </Button>
          <Button asChild variant="outline-inverse" size="lg">
            <Link href="/directory">Find a member</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
