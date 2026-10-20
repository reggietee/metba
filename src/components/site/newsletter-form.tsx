"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Phase 0: front end only. Double opt-in via Resend is wired up in Phase 4.
export function NewsletterForm({ className, tone = "night" }: { className?: string; tone?: "night" | "paper" }) {
  const id = useId();
  const [done, setDone] = useState(false);
  return (
    <form
      className={cn("w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor={id} className="mb-2 block text-sm text-graphite">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input id={id} type="email" name="email" required autoComplete="email" placeholder="you@firm.com" />
        <Button type="submit" variant={tone === "night" ? "inverse" : "default"} className="sm:w-auto">
          Subscribe
        </Button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-subtle">
        {done ? "Thanks. Check your inbox to confirm your subscription." : "Monthly. Unsubscribe at any time."}
      </p>
    </form>
  );
}
