import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DirectoryTeaser() {
  return (
    <section aria-labelledby="directory-title" className="pb-28 md:pb-40">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="directory-title" className="text-display-lg">
            Find a member
          </h2>
          <p className="text-body mt-5 max-w-sm text-graphite">
            The directory lists MetBA members. It is not a referral service or a licensing register.{" "}
            <Link href="/for-the-public" className="text-ink underline decoration-line-strong hover:decoration-ink">
              How to find licensed counsel
            </Link>
          </p>
        </div>
        <form action="/directory" method="get" role="search" className="lg:col-span-8 lg:pt-2">
          <label htmlFor="directory-q" className="sr-only">
            Search members by name, country or topic
          </label>
          <div className="flex items-end gap-4 border-b-2 border-ink pb-3 focus-within:border-brand">
            <input
              id="directory-q"
              name="q"
              type="search"
              placeholder="Name, country or topic"
              className="w-full min-w-0 bg-transparent font-display text-3xl tracking-[0.005em] text-ink placeholder:text-subtle focus-visible:outline-none md:text-5xl"
            />
            <button
              type="submit"
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-sm bg-ink text-paper transition-colors hover:bg-graphite md:size-14"
            >
              <ArrowRight aria-hidden className="size-5" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <p className="text-meta mt-4 text-subtle">
            Try{" "}
            {["Singapore", "Privacy", "Tokenized assets", "Open to referrals"].map((q, i, arr) => (
              <span key={q}>
                <Link
                  href={`/directory?q=${encodeURIComponent(q)}`}
                  className="text-graphite underline decoration-line-strong underline-offset-4 hover:text-ink"
                >
                  {q}
                </Link>
                {i < arr.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </form>
      </div>
    </section>
  );
}
