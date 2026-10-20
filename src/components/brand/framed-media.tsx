import Image from "next/image";

import { cn } from "@/lib/utils";

/** Harvey-style framed image panel: 1px frame, inset, faint grain. */
export function FramedMedia({
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  inset = true,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  inset?: boolean;
}) {
  return (
    <div className={cn("rounded-md border border-line bg-surface", inset && "p-2 md:p-3", className)}>
      <div className={cn("grain relative overflow-hidden rounded-sm", aspect)}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={priority} className="object-cover" />
      </div>
    </div>
  );
}
