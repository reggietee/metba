import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Copy is [DRAFT]. Ruled rows rather than cards (after Harvey's feature list).
const audiences = [
  {
    title: "For lawyers",
    body: "Meet peers across jurisdictions, attend CPD-eligible events and list your practice in the member directory.",
    href: "/membership",
    cta: "Membership",
  },
  {
    title: "For students",
    body: "Join free, attend events with practitioners and find mentors working on the questions you are studying.",
    href: "/for-students",
    cta: "Student membership",
  },
  {
    title: "For the public",
    body: "What the member directory is, what it is not, and how to find licensed counsel through your regulator.",
    href: "/for-the-public",
    cta: "Read the guide",
  },
];

export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="pb-24 md:pb-32">
      <div className="container-site">
        <h2 id="audiences-title" className="sr-only">
          Who MetBA is for
        </h2>
        <ul className="border-b border-line">
          {audiences.map((a) => (
            <li key={a.href} className="group relative border-t border-line">
              <div className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                <h3 className="text-display-md md:col-span-4">{a.title}</h3>
                <p className="text-body max-w-[52ch] text-graphite md:col-span-5">{a.body}</p>
                <Link
                  href={a.href}
                  className="text-kicker inline-flex items-center gap-2 text-ink after:absolute after:inset-0 after:content-[''] md:col-span-3 md:justify-self-end"
                >
                  {a.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 ease-[var(--ease-calm)] group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
