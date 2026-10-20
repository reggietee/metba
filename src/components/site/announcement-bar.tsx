import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Announcement } from "@/lib/types";
import { DismissAnnouncement } from "./dismiss-announcement";

export const ANNOUNCEMENT_KEY = "metba-announcement-dismissed";

export function AnnouncementBar({ announcement }: { announcement: Announcement }) {
  if (!announcement) return null;
  const domId = "announcement-bar";
  return (
    <>
      <div id={domId} className="dark relative bg-deep text-ink">
        <div className="container-site flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center text-[0.8125rem] leading-snug">
          <p>
            <span className="text-graphite">{announcement.text}</span>{" "}
            <Link
              href={announcement.href}
              className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-brass underline decoration-brass/40 underline-offset-4 hover:decoration-brass"
            >
              {announcement.linkLabel}
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </p>
          <DismissAnnouncement id={announcement.id} target={domId} storageKey={ANNOUNCEMENT_KEY} />
        </div>
      </div>
      {/* Hide before first paint if this announcement was already dismissed. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem(${JSON.stringify(ANNOUNCEMENT_KEY)})===${JSON.stringify(announcement.id)}){document.getElementById(${JSON.stringify(domId)}).hidden=true}}catch(e){}`,
        }}
      />
    </>
  );
}
