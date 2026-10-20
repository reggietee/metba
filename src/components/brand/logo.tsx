import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

// Interim logo from the current site's PNG. Swap for the SVG when it arrives.
export function Logo({
  tone = "auto",
  className,
  priority,
}: {
  tone?: "auto" | "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const common = { width: 557, height: 200, loading: priority ? "eager" : "lazy" } as const;
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
      <span className="sr-only">Metaverse Bar Association, home</span>
      {tone === "light" ? (
        <Image src="/brand/logo-white.png" alt="" {...common} className="h-full w-auto" />
      ) : tone === "dark" ? (
        <Image src="/brand/logo-ink.png" alt="" {...common} className="h-full w-auto" />
      ) : (
        <>
          <Image src="/brand/logo-ink.png" alt="" {...common} className="h-full w-auto dark:hidden" />
          <Image src="/brand/logo-white.png" alt="" {...common} className="hidden h-full w-auto dark:block" />
        </>
      )}
    </Link>
  );
}
