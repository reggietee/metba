import type { Metadata } from "next";
import Link from "next/link";

import { PolicyPage } from "@/components/page/policy-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply to using metba.io and MetBA membership.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of use" updated="20 October 2026" draftNote="[DRAFT – needs legal review]">
      <p>
        These terms apply to your use of metba.io and to MetBA membership. By creating an account you agree to them and to
        the <Link href="/code-of-conduct">code of conduct</Link>.
      </p>
      <h2>No legal advice</h2>
      <p>
        Content on this site, including insights, event materials and recaps, is general information. It is not legal
        advice, and no lawyer-client relationship is created by using the site or contacting a member through it.
      </p>
      <h2>Membership and verification</h2>
      <p>
        Membership is free and at MetBA&apos;s discretion. &ldquo;Verified MetBA member&rdquo; means an administrator has
        approved the membership. MetBA does not verify anyone&apos;s licence or right to practise, and jurisdictions shown on
        profiles are self-reported. We may suspend or remove a membership that breaches these terms or the code of conduct.
      </p>
      <h2>Your profile and content</h2>
      <p>
        You are responsible for the accuracy of your profile. You keep ownership of what you post and give MetBA permission
        to display it on the site in line with your visibility settings.
      </p>
      <h2>Directory</h2>
      <p>
        The directory is for professional networking. Do not use it to send unsolicited marketing, to collect data about
        members, or for any unlawful purpose.
      </p>
      <h2>Events and CPD</h2>
      <p>
        CPD eligibility depends on your regulator&apos;s rules. Where an event is accredited, the event page names the
        regulator and reference. Otherwise you are responsible for deciding whether and how to report it.
      </p>
      <h2>Liability</h2>
      <p>[DRAFT: limitation of liability, governing law and jurisdiction, to be drafted by counsel.]</p>
      <h2>Changes</h2>
      <p>We may update these terms. We will post changes here and tell members of significant changes by email.</p>
    </PolicyPage>
  );
}
