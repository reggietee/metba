/** Shown on every Phase 1 preview screen so nobody mistakes it for the working product. */
export function PreviewBanner({ note }: { note?: string }) {
  return (
    <div role="note" className="border-b border-dashed border-control bg-secondary">
      <p className="text-meta mx-auto flex max-w-[90rem] flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2.5 text-graphite md:px-8">
        <span className="rounded-sm bg-ink px-2 py-0.5 text-paper">Preview</span>
        <span>For founding partner review. Buttons and forms do not save anything.</span>
        {note ? <span className="text-subtle">{note}</span> : null}
      </p>
    </div>
  );
}

/** Small inline acknowledgement when a preview button is pressed. */
export function PreviewNote({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="text-meta rounded-sm border border-dashed border-control px-3 py-2 text-graphite">
      {children}
    </p>
  );
}
