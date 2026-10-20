import { PageHeader } from "@/components/page/page-header";
import { Prose } from "@/components/page/prose";

/** Shared layout for policy pages. Every policy is a draft until reviewed. */
export function PolicyPage({
  title,
  standfirst,
  updated,
  draftNote,
  children,
}: {
  title: string;
  standfirst?: string;
  updated: string;
  draftNote: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader kicker="Policies" title={title} standfirst={standfirst} />
      <div className="container-site grid gap-10 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-8">
        <aside className="lg:col-span-3">
          <p className="text-meta text-subtle">Last updated {updated}</p>
          <p className="text-meta mt-3 inline-block rounded-sm bg-secondary px-2.5 py-1.5 text-ink">{draftNote}</p>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5">
          <Prose>{children}</Prose>
        </div>
      </div>
    </>
  );
}
