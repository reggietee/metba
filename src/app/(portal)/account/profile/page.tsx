import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { PortalHeader, PortalSection } from "@/components/portal/portal-shell";
import { ProfileEditor } from "@/components/portal/profile-editor";
import { Button } from "@/components/ui/button";
import { currentMember } from "@/lib/mock/portal";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <>
      <PortalHeader
        title="Your profile"
        description="This is how you appear in the member directory. You choose who can see it."
        actions={
          <Button asChild variant="outline">
            <Link href={`/directory/${currentMember.slug}`}>
              View in directory <ExternalLink aria-hidden />
            </Link>
          </Button>
        }
      />
      <PortalSection>
        <ProfileEditor initial={{ ...currentMember }} />
      </PortalSection>
    </>
  );
}
