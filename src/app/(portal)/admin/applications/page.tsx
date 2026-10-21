import { ApplicationsQueue } from "@/components/portal/applications-queue";
import { PortalHeader } from "@/components/portal/portal-shell";
import { applications } from "@/lib/mock/portal";

export const metadata = { title: "Applications" };

export default function ApplicationsPage() {
  return (
    <>
      <PortalHeader
        title="Applications"
        description={`${applications.length} waiting for review. Oldest first is recommended; target turnaround is 3 working days.`}
      />
      <ApplicationsQueue items={[...applications].sort((a, b) => a.submittedAt.localeCompare(b.submittedAt))} />
    </>
  );
}
