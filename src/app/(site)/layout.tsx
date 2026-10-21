import { Suspense } from "react";

import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getAnnouncement } from "@/lib/data";

async function Announcement() {
  return <AnnouncementBar announcement={await getAnnouncement()} />;
}

/** Public website: announcement bar, marketing header and footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Suspense>
        <Announcement />
      </Suspense>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
