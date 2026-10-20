import Link from "next/link";
import { Search } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { primaryNav, utilityNav } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b border-line bg-paper">
      {/* Utility row (D.C. Bar / CBA pattern) */}
      <div className="hidden border-b border-line lg:block">
        <div className="container-site flex h-9 items-center justify-end gap-6 text-[0.8125rem]">
          <nav aria-label="Utility">
            <ul className="flex items-center gap-6">
              {utilityNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-subtle transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="container-site flex h-16 items-center gap-6 lg:h-[4.5rem]">
        <Logo className="h-10 lg:h-12" priority />

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex">
            <Link href="/search">
              <Search aria-hidden />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button asChild size="sm" className="lg:h-10 lg:px-4">
            <Link href="/join">Join MetBA</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
