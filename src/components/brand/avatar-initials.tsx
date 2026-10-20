import { cn } from "@/lib/utils";

export function AvatarInitials({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-display text-lg text-graphite",
        className,
      )}
    >
      {initials}
    </span>
  );
}
