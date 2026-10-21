import Link from "next/link";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

export function DirectoryDisclaimer({ className }: { className?: string }) {
  return (
    <aside
      aria-label="About this directory"
      className={cn("flex gap-3 rounded-sm bg-secondary px-5 py-4 text-[0.9375rem] leading-relaxed text-graphite", className)}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
      <p>
        This directory lists MetBA members. It is not a referral service or a licensing register, and MetBA does not
        verify anyone&apos;s right to practise. Jurisdictions are self-reported.{" "}
        <Link href="/for-the-public" className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
          How to find licensed counsel
        </Link>
      </p>
    </aside>
  );
}
