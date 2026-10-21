import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="container-site grid min-h-[60svh] content-center gap-8 py-24">
          <p className="text-kicker text-brand">Page not found</p>
          <h1 className="text-display-xl max-w-[18ch] text-balance">
            This page does not exist, or has moved
          </h1>
          <p className="text-lead max-w-[48ch] text-graphite">
            If you followed a link from the old MetBA website, the page may have
            a new address.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/">Go to the homepage</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">See upcoming events</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
