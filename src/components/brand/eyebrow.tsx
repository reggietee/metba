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
        "text-label",
        tone === "brand" && "text-brand",
        tone === "subtle" && "text-subtle",
        tone === "inverse" && "text-[#a8a49c]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
