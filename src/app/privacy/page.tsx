import type { Metadata } from "next";
import Link from "next/link";

import { PolicyPage } from "@/components/page/policy-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How MetBA collects, uses and protects personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      standfirst="How MetBA collects, uses and protects your personal information."
      updated="20 October 2026"
      draftNote="[DRAFT – needs legal review]"
    >
      <p>
        The Metaverse Bar Association (&ldquo;MetBA&rdquo;, &ldquo;we&rdquo;) is a professional community for legal
        professionals. This policy explains what personal information we collect, why, how long we keep it, and the
        choices and rights you have. It is written for an international membership and is intended to meet the
        requirements of the EU and UK General Data Protection Regulation (GDPR) and Canada&apos;s Personal Information
        Protection and Electronic Documents Act (PIPEDA), among others.
      </p>

      <h2>Who is responsible</h2>
      <p>
        MetBA is the controller of the personal information described here. [DRAFT: insert legal entity name, registered
        address and jurisdiction.] You can contact us about privacy at{" "}
        <a href="mailto:privacy@metba.io">privacy@metba.io</a> [DRAFT: confirm address]. [DRAFT: name a privacy officer,
        and an EU and UK representative if required.]
      </p>

      <h2>What we collect</h2>
      <p>We collect only what each feature needs.</p>
      <ul>
        <li>
          <strong>Account:</strong> your name, email address and, if you sign in with LinkedIn, your LinkedIn profile URL and
          photo.
        </li>
        <li>
          <strong>Profile:</strong> the information you choose to add, such as headline, organisation, country and city,
          self-reported jurisdictions, topics, languages, website, short bio and whether you are open to referrals.
        </li>
        <li>
          <strong>Membership review:</strong> information you provide to support your application, such as a LinkedIn URL or
          the domain of your work or university email.
        </li>
        <li>
          <strong>Events:</strong> registrations, waitlist position, attendance, check-in, certificates of attendance and your
          CPD log, including any external activities you add.
        </li>
        <li>
          <strong>Messages:</strong> messages sent through the directory contact form, kept to prevent abuse.
        </li>
        <li>
          <strong>Newsletter:</strong> your email address and confirmation of your subscription.
        </li>
        <li>
          <strong>Technical:</strong> limited information needed to run the site securely, such as session cookies and
          security logs. Our analytics are cookieless and do not identify you.
        </li>
      </ul>

      <h2>Why we use it, and our legal bases</h2>
      <ul>
        <li>
          <strong>To provide membership, the directory and events</strong> you ask for (performance of a contract).
        </li>
        <li>
          <strong>To review applications, prevent spam and abuse, and keep the site secure</strong> (legitimate interests).
        </li>
        <li>
          <strong>To send the newsletter</strong> (consent, which you can withdraw at any time).
        </li>
        <li>
          <strong>To keep records we are required to keep</strong> (legal obligation).
        </li>
      </ul>
      <p>We do not sell personal information, and we do not use it for advertising.</p>

      <h2>Who can see your profile</h2>
      <p>
        You choose your profile&apos;s visibility: hidden, members only (the default), or public. The public only ever
        sees a reduced profile: name, photo, headline, country and topics. Your email address is never shown. Members
        contact each other through a relay form.
      </p>

      <h2>Certificates</h2>
      <p>
        Certificates of attendance carry a unique ID and a verification link. Anyone with the link can confirm the name on
        the certificate, the event, the date and the CPD hours. [DRAFT: confirm what happens to certificates when an
        account is deleted. See PLAN.md Q12.]
      </p>

      <h2>Service providers and international transfers</h2>
      <p>
        We use service providers to run the site, including hosting (Vercel), database and file storage (Supabase), sign-in
        (Clerk), email (Resend) and spam protection (Cloudflare Turnstile). They process information on our instructions.
        Some are located outside your country. Where information is transferred internationally we rely on appropriate
        safeguards, such as adequacy decisions or standard contractual clauses. [DRAFT: confirm providers and regions.]
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Account and profile: while your account is open, then deleted.</li>
        <li>Event registrations and attendance: [DRAFT: period], then anonymised for statistics.</li>
        <li>Contact messages and abuse reports: [DRAFT: period].</li>
        <li>Newsletter: until you unsubscribe.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or export your information, to object
        to or restrict certain uses, and to withdraw consent. You can download your data and delete your account yourself
        from your account settings. For anything else, contact us. You also have the right to complain to your data
        protection authority, for example the Office of the Privacy Commissioner of Canada, the UK Information
        Commissioner&apos;s Office, or the supervisory authority in your EU country.
      </p>

      <h2>Cookies</h2>
      <p>
        We use only the cookies needed to sign you in and keep the site secure. See the{" "}
        <Link href="/cookies">cookie notice</Link>.
      </p>

      <h2>Children</h2>
      <p>MetBA is for adults. We do not knowingly collect information from anyone under 16.</p>

      <h2>Changes</h2>
      <p>
        We will post any changes on this page and update the date above. If a change is significant, we will tell members by
        email.
      </p>
    </PolicyPage>
  );
}
