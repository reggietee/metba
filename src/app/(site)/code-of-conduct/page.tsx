import type { Metadata } from "next";

import { PolicyPage } from "@/components/page/policy-page";

export const metadata: Metadata = {
  title: "Code of conduct",
  description: "The standards MetBA members agree to at events, in the directory and online.",
  alternates: { canonical: "/code-of-conduct" },
};

export default function CodeOfConductPage() {
  return (
    <PolicyPage
      title="Code of conduct"
      standfirst="MetBA brings together people with different backgrounds, jurisdictions and views. These standards keep it useful and respectful for everyone."
      updated="20 October 2026"
      draftNote="[DRAFT]"
    >
      <h2>We expect members to</h2>
      <ul>
        <li>Treat others with respect, at events, in messages and online.</li>
        <li>Represent themselves accurately, including their role and the jurisdictions they list.</li>
        <li>Respect confidentiality, including the Chatham House rule where an event uses it.</li>
        <li>Disagree on substance, not on people.</li>
      </ul>
      <h2>We do not allow</h2>
      <ul>
        <li>Harassment, discrimination or intimidation of any kind.</li>
        <li>Using the directory or contact form for unsolicited marketing or recruitment campaigns.</li>
        <li>Claiming that MetBA membership is a licence, a certification or an endorsement.</li>
        <li>Recording or sharing events without permission.</li>
      </ul>
      <h2>Reporting</h2>
      <p>
        Use the &ldquo;Report this profile&rdquo; link on any profile, or write to conduct@metba.io [DRAFT: confirm
        address]. Reports are handled confidentially by MetBA administrators.
      </p>
      <h2>What happens next</h2>
      <p>
        Administrators may contact the people involved, and may warn, suspend or remove a member. Serious concerns about a
        lawyer&apos;s professional conduct should also be raised with their regulator.
      </p>
    </PolicyPage>
  );
}
