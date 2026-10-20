"use client";

import { X } from "lucide-react";

export function DismissAnnouncement({
  id,
  target,
  storageKey,
}: {
  id: string;
  target: string;
  storageKey: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.setItem(storageKey, id);
        } catch {}
        const el = document.getElementById(target);
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          el.hidden = true;
          return;
        }
        el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: "cubic-bezier(0.25, 1, 0.5, 1)" }).finished.then(
          () => (el.hidden = true),
        );
      }}
      className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-subtle hover:text-ink"
    >
      <X aria-hidden className="size-4" />
      <span className="sr-only">Dismiss announcement</span>
    </button>
  );
}
