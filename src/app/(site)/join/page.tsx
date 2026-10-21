import type { Metadata } from "next";
import Link from "next/link";

import { ApplicationForm } from "@/components/portal/application-form";
import { PreviewBanner } from "@/components/portal/preview-banner";

export const metadata: Metadata = {
  title: "Join MetBA",
  description: "Apply for free MetBA membership. Open to lawyers, law students and legal professionals.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <>
      <PreviewBanner note="In the product, step 0 is creating your account with email or LinkedIn." />
      <div className="container-site grid gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-kicker text-brand">Membership is free</p>
          <h1 className="text-display-xl mt-5 text-balance">Apply to join MetBA</h1>
          <p className="text-lead mt-6 max-w-md text-graphite">
            Three short steps. An administrator reviews every application, and you can sign in as soon as you are approved.
          </p>
          <ul className="mt-10 space-y-4 border-t border-line pt-6 text-[0.9375rem] text-graphite">
            <li>Live CPD events, with attendance recorded for your CPD log</li>
            <li>The full library of past event recordings</li>
            <li>A profile in the member directory</li>
            <li>A membership badge for your website</li>
          </ul>
          <p className="text-meta mt-10 text-subtle">
            Already a member?{" "}
            <Link href="/sign-in" className="text-ink underline decoration-line-strong underline-offset-4">
              Log in
            </Link>
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ApplicationForm />
        </div>
      </div>
    </>
  );
}
