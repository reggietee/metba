import { ArrowUpRight } from "lucide-react";

import type { SocialLinks as Links } from "@/lib/types";
import { cn } from "@/lib/utils";

const labels: [keyof Links, string][] = [
  ["linkedin", "LinkedIn"],
  ["x", "X"],
  ["website", "Website"],
];

export function SocialLinks({ links, name, className }: { links: Links; name: string; className?: string }) {
  const items = labels.filter(([k]) => links[k]);
  if (!items.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {items.map(([k, label]) => (
        <li key={k}>
          <a
            href={links[k]}
            rel="noopener nofollow ugc"
            target="_blank"
            className="text-kicker relative z-10 inline-flex items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            {label}
            <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only">
              {" "}
              for {name} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
