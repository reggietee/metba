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
        if (el) el.hidden = true;
      }}
      className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-subtle hover:text-ink"
    >
      <X aria-hidden className="size-4" />
      <span className="sr-only">Dismiss announcement</span>
    </button>
  );
}
