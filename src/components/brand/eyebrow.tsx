import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "brand",
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "subtle" | "inverse";
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        "text-kicker",
        tone === "brand" && "text-brand",
        tone === "subtle" && "text-subtle",
        tone === "inverse" && "text-brass",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
