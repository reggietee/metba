import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";

// Wording is fixed by the brief. Do not change it.
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span className={cn("text-meta inline-flex items-center gap-1.5 text-brand", className)}>
      <BadgeCheck aria-hidden className="size-3.5" />
      Verified MetBA member
    </span>
  );
}
