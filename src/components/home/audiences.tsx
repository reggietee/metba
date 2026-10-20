import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/brand/reveal";

// Copy is [DRAFT].
const audiences = [
  {
    label: "For lawyers",
    title: "Practise at the edge of the law",
    body: "Meet peers across jurisdictions, attend CPD-eligible events and list your practice in the member directory.",
    href: "/membership",
    cta: "Membership for lawyers",
  },
  {
    label: "For students",
    title: "Start your career in technology law",
    body: "Join free, attend events with practitioners and find mentors working on the questions you are studying.",
    href: "/for-students",
    cta: "Student membership",
  },
  {
    label: "For the public",
    title: "Understand the directory",
    body: "Learn what the member directory is, what it is not, and how to find licensed counsel through your regulator.",
    href: "/for-the-public",
    cta: "Information for the public",
  },
];

export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="py-20 md:py-28">
      <div className="container-site">
        <h2 id="audiences-title" className="sr-only">
          Who MetBA is for
        </h2>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {audiences.map((a, i) => (
            <li key={a.href}>
              <Reveal delay={i * 80} className="group relative flex h-full flex-col border-t border-ink pt-6">
                <p className="text-label text-brand">{a.label}</p>
                <h3 className="text-display-md mt-4 text-balance">{a.title}</h3>
                <p className="mt-4 leading-relaxed text-graphite">{a.body}</p>
                <Link
                  href={a.href}
                  className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink after:absolute after:inset-0 after:content-['']"
                >
                  {a.cta}
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
