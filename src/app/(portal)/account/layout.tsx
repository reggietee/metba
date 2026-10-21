import type { Metadata } from "next";

import { PortalShell } from "@/components/portal/portal-shell";
import { currentMember } from "@/lib/mock/portal";

export const metadata: Metadata = {
  title: { default: "Member portal", template: "%s | Member portal | MetBA" },
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <PortalShell
      tone="paper"
      label="Member portal"
      items={[
        { href: "/account", label: "Dashboard", icon: "Home", exact: true },
        { href: "/account/events", label: "Events and CPD", icon: "CalendarDays" },
        { href: "/account/live/tokenized-funds-across-jurisdictions", label: "Live room", icon: "Radio", badge: "Live" },
        { href: "/account/library", label: "CPD library", icon: "BookOpen" },
        { href: "/account/cpd", label: "CPD log", icon: "ScrollText" },
        { href: "/account/profile", label: "Profile", icon: "UserRound" },
        { href: "/account/badge", label: "Membership badge", icon: "Award" },
      ]}
      user={{ name: currentMember.fullName, detail: "Verified MetBA member", photo: currentMember.photo }}
      footerLink={{ href: "/", label: "Back to metba.io" }}
    >
      {children}
    </PortalShell>
  );
}
