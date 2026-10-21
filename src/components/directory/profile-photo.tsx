import Image from "next/image";

import { AvatarInitials } from "@/components/brand/avatar-initials";
import { cn } from "@/lib/utils";

/** Member photo, falling back to initials when no photo has been uploaded. */
export function ProfilePhoto({
  photo,
  initials,
  name,
  size,
  className,
  priority,
}: {
  photo?: string;
  initials: string;
  name: string;
  size: number;
  className?: string;
  priority?: boolean;
}) {
  if (!photo) return <AvatarInitials initials={initials} className={className} />;
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-secondary", className)}>
      <Image
        src={photo}
        alt={`Photo of ${name}`}
        fill
        sizes={`${size}px`}
        preload={priority}
        className="object-cover"
      />
    </span>
  );
}
