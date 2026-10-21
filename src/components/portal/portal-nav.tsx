"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BookOpen,
  CalendarDays,
  Home,
  Inbox,
  LayoutDashboard,
  Radio,
  ScrollText,
  Settings,
  UserRound,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Icons are referenced by name: components can't be passed from server layouts to this client component.
const icons = { Award, BookOpen, CalendarDays, Home, Inbox, LayoutDashboard, Radio, ScrollText, Settings, UserRound, Users };
export type IconName = keyof typeof icons;
export type NavItem = { href: string; label: string; icon: IconName; exact?: boolean; badge?: string };

export function PortalNav({ items, tone = "paper" }: { items: NavItem[]; tone?: "paper" | "night" }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-0.5">
      {items.map(({ href, label, icon, exact, badge }) => {
        const Icon = icons[icon];
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-10 items-center gap-3 rounded-sm px-3 text-[0.9375rem] transition-colors",
                tone === "paper"
                  ? active
                    ? "bg-ink text-paper"
                    : "text-graphite hover:bg-accent hover:text-ink"
                  : active
                    ? "bg-[oklch(0.955_0.006_160)] text-[oklch(0.2_0.014_172)]"
                    : "text-graphite hover:bg-night-raised hover:text-ink",
              )}
            >
              <Icon aria-hidden className="size-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span className={cn("text-meta rounded-full px-2 py-0.5", active ? "bg-paper/20" : "bg-brand text-paper")}>
                  {badge}
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
