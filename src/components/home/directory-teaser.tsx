import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DirectoryTeaser() {
  return (
    <section aria-labelledby="directory-title" className="pb-20 md:pb-28">
      <div className="container-site">
        <div className="grid gap-10 rounded-md border border-line bg-surface p-6 md:p-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-label text-brand">Member directory</p>
            <h2 id="directory-title" className="text-display-lg mt-4 text-balance">
              Find a member.
            </h2>
            {/* [DRAFT] */}
            <p className="mt-4 max-w-md leading-relaxed text-graphite">
              Search lawyers, students and legal professionals by name, country or topic.
            </p>
          </div>
          <form action="/directory" method="get" role="search" className="lg:col-span-7">
            <label htmlFor="directory-q" className="mb-2 block text-sm text-graphite">
              Search members
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle" />
                <input
                  id="directory-q"
                  name="q"
                  type="search"
                  placeholder="Search members by name, country or topic"
                  className="h-12 w-full rounded-md border border-input bg-paper pr-4 pl-11 text-base text-ink placeholder:text-subtle focus-visible:border-ink"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              The directory lists MetBA members. It is not a referral service or a licensing register.{" "}
              <Link href="/for-the-public" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                How to find licensed counsel
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
