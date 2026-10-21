import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PortalNav, type NavItem } from "./portal-nav";
import { PreviewBanner } from "./preview-banner";

/**
 * App shell for the member portal (paper) and admin (night).
 * Fixed rem type scale rather than the marketing site's fluid display sizes.
 */
export function PortalShell({
  tone,
  label,
  items,
  user,
  footerLink,
  children,
}: {
  tone: "paper" | "night";
  label: string;
  items: NavItem[];
  user: { name: string; detail: string; photo?: string };
  footerLink: { href: string; label: string };
  children: React.ReactNode;
}) {
  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 px-5">
        <Logo className="h-9" tone={tone === "night" ? "light" : "auto"} />
      </div>
      <p className="text-meta px-5 pt-2 pb-3 text-subtle">{label}</p>
      <nav aria-label={label} className="flex-1 px-3">
        <PortalNav items={items} tone={tone} />
      </nav>
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3">
          {user.photo ? (
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
              <Image src={user.photo} alt="" fill sizes="36px" className="object-cover" />
            </span>
          ) : (
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand text-sm text-paper">
              {user.name[0]}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm text-ink">{user.name}</p>
            <p className="text-meta truncate text-subtle">{user.detail}</p>
          </div>
        </div>
        <Link href={footerLink.href} className="text-meta mt-4 inline-flex items-center gap-1.5 text-graphite hover:text-ink">
          {footerLink.label} <ExternalLink aria-hidden className="size-3.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className={cn("flex min-h-svh flex-col", tone === "night" && "dark bg-paper text-ink")}>
      <PreviewBanner />
      <div className="flex flex-1">
        <aside
          className={cn(
            "sticky top-0 hidden h-svh w-64 shrink-0 border-r border-line lg:block",
            tone === "night" ? "bg-night" : "bg-surface",
          )}
        >
          {sidebar}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-line px-5 lg:hidden">
            <Logo className="h-8" tone={tone === "night" ? "light" : "auto"} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <Menu aria-hidden className="size-5" />
                  <span className="sr-only">Open {label} menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={cn("w-72 border-line p-0 shadow-none", tone === "night" ? "dark bg-night text-ink" : "bg-surface")}
              >
                <SheetTitle className="sr-only">{label}</SheetTitle>
                <SheetDescription className="sr-only">Navigation</SheetDescription>
                {sidebar}
              </SheetContent>
            </Sheet>
          </header>
          <main id="main" className="w-full min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

/** Page title block inside the portal. */
export function PortalHeader({
  title,
  description,
  actions,
  kicker,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  kicker?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-line px-5 pt-8 pb-7 md:flex-row md:items-end md:justify-between md:px-10 md:pt-10">
      <div>
        {kicker ? <p className="text-kicker mb-3 text-brand">{kicker}</p> : null}
        <h1 className="font-display text-[2.25rem] leading-tight tracking-[-0.015em] md:text-[2.75rem]">{title}</h1>
        {description ? <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-graphite">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function PortalSection({
  title,
  action,
  children,
  className,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-5 py-8 md:px-10", className)}>
      {title ? (
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-[1.625rem] leading-tight tracking-[-0.01em]">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}
