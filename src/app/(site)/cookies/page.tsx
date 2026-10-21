import type { Metadata } from "next";
import Link from "next/link";

import { PolicyPage } from "@/components/page/policy-page";

export const metadata: Metadata = {
  title: "Cookies",
  description: "The cookies metba.io uses.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <PolicyPage
      title="Cookies"
      standfirst="metba.io uses only the cookies it needs to work. There is no advertising or cross-site tracking."
      updated="20 October 2026"
      draftNote="[DRAFT – needs legal review]"
    >
      <h2>Essential cookies</h2>
      <p>
        These keep you signed in and protect the site and its forms from abuse. They are set by our sign-in provider and our
        spam protection, and the site cannot work without them, so they do not need consent.
      </p>
      <h2>Preferences stored on your device</h2>
      <p>
        Your colour theme and whether you have dismissed the announcement bar are stored in your browser&apos;s local
        storage. They never leave your device.
      </p>
      <h2>Fonts</h2>
      <p>
        The site&apos;s typefaces are delivered by Adobe Fonts. Your browser requests them from Adobe&apos;s servers, which
        see your IP address and browser details. Adobe Fonts does not use them to track you across sites.
        [DRAFT: confirm against Adobe&apos;s current privacy statement.]
      </p>
      <h2>Analytics</h2>
      <p>We use cookieless analytics that count page views without identifying you or following you across sites.</p>
      <h2>Changes</h2>
      <p>
        If we ever add a non-essential cookie, we will ask for your consent first, with &ldquo;Reject&rdquo; as easy as
        &ldquo;Accept&rdquo;. See also the <Link href="/privacy">privacy policy</Link>.
      </p>
    </PolicyPage>
  );
}
