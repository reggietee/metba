import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { footerNav, legalNav, site } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";
import { ThemeToggle } from "./theme-toggle";

const socials = [
  { href: site.social.linkedin, label: "LinkedIn" },
  { href: site.social.x, label: "X" },
  { href: site.social.instagram, label: "Instagram" },
  { href: site.social.threads, label: "Threads" },
];

export function SiteFooter() {
  return (
    <footer className="dark border-t border-line bg-night text-ink">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" className="h-12" />
            <h2 className="text-display-md mt-10">The Docket</h2>
            <p className="mt-2 max-w-sm text-[0.9375rem] text-graphite">
              The MetBA newsletter. New rules, cases and enforcement, once a month.
            </p>
            <NewsletterForm className="mt-6 max-w-md" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-meta text-subtle">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-[0.9375rem]">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-graphite transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-meta text-subtle">Follow</h3>
              <ul className="mt-4 space-y-3 text-[0.9375rem]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} rel="noopener" target="_blank" className="text-graphite transition-colors hover:text-ink">
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            {/* [DRAFT] */}
            <p>MetBA is a professional community. It does not provide legal advice or verify licensure.</p>
            <p>© 2026 {site.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
