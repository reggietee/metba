import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { PreviewBanner } from "@/components/portal/preview-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default function SignInPage() {
  return (
    <>
      <PreviewBanner />
      <div className="container-site grid min-h-[70svh] content-center py-16 md:py-24">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-display-lg">Log in</h1>
          <p className="text-body mt-4 text-graphite">For approved MetBA members. No password needed.</p>

          <form className="mt-10 space-y-4">
            <label htmlFor="email" className="block text-[0.9375rem] text-ink">
              Email address
            </label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@firm.com" />
            <Button type="button" size="lg" className="w-full">
              <Mail aria-hidden /> Email me a sign-in link
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-meta text-subtle">or</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <Button type="button" variant="outline" size="lg" className="w-full">
            Continue with LinkedIn
          </Button>

          <p className="text-meta mt-10 text-subtle">
            Not a member yet?{" "}
            <Link href="/join" className="text-ink underline decoration-line-strong underline-offset-4">
              Apply to join
            </Link>
          </p>

          <div className="mt-12 rounded-sm border border-dashed border-control p-5">
            <p className="text-meta text-subtle">Preview shortcuts for founding partners</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/account">Enter as a member</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/admin">Enter as an admin</Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link href="/join/status">Pending applicant</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
