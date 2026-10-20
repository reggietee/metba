"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { primaryNav, utilityNav } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="-mr-2 lg:hidden">
          <Menu aria-hidden className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 border-line bg-paper p-0 shadow-none">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <div className="flex h-16 items-center border-b border-line px-5">
          <Logo className="h-8" />
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="divide-y divide-line border-y border-line">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center font-display text-2xl text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3 text-[0.9375rem]">
            <li>
              <Link href="/search" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 text-graphite">
                <Search aria-hidden className="size-4" /> Search
              </Link>
            </li>
            {utilityNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={() => setOpen(false)} className="text-graphite">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line p-5">
          <Button asChild className="w-full">
            <Link href="/join" onClick={() => setOpen(false)}>
              Join MetBA. It&apos;s free.
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
