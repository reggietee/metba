import type { Metadata } from "next";

import { PolicyPage } from "@/components/page/policy-page";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "MetBA's commitment to an accessible website, and how to tell us about a barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <PolicyPage
      title="Accessibility statement"
      standfirst="We want everyone to be able to use metba.io, whatever device or assistive technology they use."
      updated="20 October 2026"
      draftNote="[DRAFT]"
    >
      <h2>Our standard</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. Every page is tested with automated
        checks in light and dark mode, and key journeys are tested with a keyboard and a screen reader.
      </p>
      <h2>What this means in practice</h2>
      <ul>
        <li>All functionality works with a keyboard, with a visible focus indicator.</li>
        <li>Text and controls meet AA contrast in both colour themes.</li>
        <li>Pages work at 360px wide and at 200% zoom without horizontal scrolling.</li>
        <li>Animations are switched off if you have asked your device to reduce motion.</li>
        <li>Event times are shown in your own time zone.</li>
      </ul>
      <h2>Known limitations</h2>
      <p>
        Recordings of past events may not yet have captions or transcripts. [DRAFT: update when captioning is in place.]
      </p>
      <h2>Tell us about a barrier</h2>
      <p>
        If something on the site does not work for you, email accessibility@metba.io [DRAFT: confirm address]. We aim to
        reply within five working days.
      </p>
    </PolicyPage>
  );
}
