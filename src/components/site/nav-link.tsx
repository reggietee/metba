"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex h-10 items-center rounded-sm px-2.5 text-[0.9375rem] text-graphite transition-colors hover:text-ink",
        active && "text-ink after:absolute after:inset-x-2.5 after:-bottom-[15px] after:h-px after:bg-ink",
      )}
    >
      {children}
    </Link>
  );
}
