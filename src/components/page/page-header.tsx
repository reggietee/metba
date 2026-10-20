import { cn } from "@/lib/utils";

/** Editorial page opening: kicker, large headline, standfirst, optional aside. */
export function PageHeader({
  kicker,
  title,
  standfirst,
  aside,
  className,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("pt-14 pb-16 md:pt-20 md:pb-24", className)}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          {kicker ? <p className="text-kicker motion-rise mb-6 text-brand">{kicker}</p> : null}
          <h1 className="text-display-xl motion-rise max-w-[20ch] text-balance">{title}</h1>
        </div>
        {standfirst || aside ? (
          <div className="motion-rise lg:col-span-4 lg:pb-2" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {standfirst ? <p className="text-lead max-w-md text-graphite">{standfirst}</p> : null}
            {aside}
          </div>
        ) : null}
      </div>
    </header>
  );
}

/** Two-column section: label on the left, content on the right. */
export function SplitSection({
  title,
  id,
  intro,
  children,
  className,
}: {
  title: React.ReactNode;
  id: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("border-t border-line py-16 md:py-24", className)}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id={id} className="text-display-md text-balance">
            {title}
          </h2>
          {intro ? <p className="text-body mt-4 max-w-sm text-graphite">{intro}</p> : null}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
