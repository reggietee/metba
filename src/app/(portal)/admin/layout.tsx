import type { Metadata } from "next";

import { PortalShell } from "@/components/portal/portal-shell";
import { applications, currentAdmin } from "@/lib/mock/portal";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin | MetBA" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <PortalShell
      tone="night"
      label="Admin"
      items={[
        { href: "/admin", label: "Overview", icon: "LayoutDashboard", exact: true },
        { href: "/admin/applications", label: "Applications", icon: "Inbox", badge: String(applications.length) },
        { href: "/admin/events", label: "Events", icon: "CalendarDays", exact: true },
        { href: "/admin/events/tokenized-funds-across-jurisdictions/live", label: "Live control", icon: "Radio" },
        { href: "/admin#members", label: "Members", icon: "Users" },
        { href: "/admin#library", label: "Library", icon: "BookOpen" },
        { href: "/admin#settings", label: "Settings", icon: "Settings" },
      ]}
      user={{ name: currentAdmin.fullName, detail: currentAdmin.role }}
      footerLink={{ href: "/account", label: "Member portal" }}
    >
      {children}
    </PortalShell>
  );
}
