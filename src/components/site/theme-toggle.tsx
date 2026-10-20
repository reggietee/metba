"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

const subscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  return (
    <fieldset className={cn("inline-flex rounded-md border border-line p-0.5", className)}>
      <legend className="sr-only">Colour theme</legend>
      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <label
            key={value}
            className={cn(
              "relative inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-subtle transition-colors hover:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
              active && "bg-accent text-ink",
            )}
          >
            <input
              type="radio"
              name="theme"
              value={value}
              checked={active}
              onChange={() => setTheme(value)}
              className="sr-only"
            />
            <Icon aria-hidden className="size-4" />
            <span className="sr-only">{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
