"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

/** Mobile-only contact bar. Steps aside once the contact form itself is on screen. */
export function StickyContact({ first }: { first: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    io.observe(target);
    return () => io.disconnect();
  }, []);
  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 py-3 backdrop-blur-sm transition-[opacity,transform] duration-300 ease-[var(--ease-out-quart)] lg:hidden ${
        hidden ? "pointer-events-none translate-y-full opacity-0" : ""
      }`}
    >
      <Button asChild className="w-full">
        <a href="#contact" tabIndex={hidden ? -1 : undefined}>
          Contact {first}
        </a>
      </Button>
    </div>
  );
}
