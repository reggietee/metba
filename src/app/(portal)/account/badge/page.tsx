import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { BadgeBuilder } from "@/components/portal/badge-builder";
import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { currentMember } from "@/lib/mock/portal";

export const metadata = { title: "Membership badge" };

export default function BadgePage() {
  return (
    <>
      <PortalHeader
        title="Membership badge"
        description="Show visitors to your website that you are an active MetBA member. Paste one line of code into your footer."
        actions={
          <Button asChild variant="outline">
            <Link href={`/verify/${currentMember.slug}`}>
              Your verification page <ExternalLink aria-hidden />
            </Link>
          </Button>
        }
      />
      <PortalSection>
        <BadgeBuilder slug={currentMember.slug} name={currentMember.fullName} />
      </PortalSection>
    </>
  );
}
