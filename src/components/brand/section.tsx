import { cn } from "@/lib/utils";

/**
 * Page section. `tone="night"` renders a dark feature section in both
 * colour modes by scoping the dark token set to the element.
 */
export function Section({
  children,
  className,
  tone = "paper",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "night";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "night" && "dark bg-night text-ink dark:border-y dark:border-line",
        "py-20 md:py-28",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  intro,
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  id?: string;
  intro?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-kicker mb-5 text-brand">{eyebrow}</p> : null}
        <h2 id={id} className="text-display-lg text-balance">
          {title}
        </h2>
        {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
