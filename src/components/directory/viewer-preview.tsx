import Link from "next/link";

import { previewAllowed, type Viewer } from "@/lib/viewer";
import { cn } from "@/lib/utils";

/**
 * Review aid until sign-in exists: switch between what the public and members see.
 * Renders nothing unless previews are allowed (development, or ALLOW_VIEWER_PREVIEW=1).
 */
export function ViewerPreview({ viewer, path, params }: { viewer: Viewer; path: string; params: URLSearchParams }) {
  if (!previewAllowed()) return null;
  const href = (as: "public" | "member") => {
    const p = new URLSearchParams(params);
    if (as === "member") p.set("as", "member");
    else p.delete("as");
    const qs = p.toString();
    return qs ? `${path}?${qs}` : path;
  };
  const item = (as: "public" | "member", label: string) => {
    const active = viewer.kind === as;
    return (
      <Link
        href={href(as)}
        aria-current={active ? "true" : undefined}
        className={cn(
          "inline-flex h-8 items-center rounded-sm px-3 transition-colors",
          active ? "bg-ink text-paper" : "text-graphite hover:text-ink",
        )}
      >
        {label}
      </Link>
    );
  };
  return (
    <div className="text-meta flex flex-wrap items-center gap-3 border border-dashed border-control px-4 py-3">
      <span className="text-subtle">Review preview, until sign-in exists. View as:</span>
      <span className="inline-flex rounded-sm border border-line p-0.5">
        {item("public", "Public")}
        {item("member", "Signed-in member")}
      </span>
    </div>
  );
}
