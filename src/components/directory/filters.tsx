"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useId, useRef, useTransition } from "react";

import { Button } from "@/components/ui/button";
import type { DirectoryFilters } from "@/lib/directory";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };
type Field = { name: keyof DirectoryFilters; label: string; options: Option[] };

const selectClass =
  "h-11 w-full appearance-none rounded-md border border-input bg-surface bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pr-9 pl-3.5 text-[0.9375rem] text-ink";
const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")";

/**
 * A plain GET form, so search works without JavaScript. With JavaScript, selects apply
 * as soon as they change and the URL stays shareable.
 */
export function DirectoryFiltersForm({
  values,
  fields,
  showReferrals,
  preview,
  view,
}: {
  values: DirectoryFilters;
  fields: Field[];
  showReferrals: boolean;
  preview?: string;
  view?: string;
}) {
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const form = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  const apply = () => {
    if (!form.current) return;
    const data = new FormData(form.current);
    const params = new URLSearchParams();
    for (const [k, v] of data.entries()) if (typeof v === "string" && v.trim()) params.set(k, v.trim());
    startTransition(() => router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  const active = Object.entries(values).some(([k, v]) => k !== "q" && v);

  return (
    <form
      ref={form}
      role="search"
      action={pathname}
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
      className={cn("transition-opacity", pending && "opacity-70")}
      aria-busy={pending}
    >
      {preview ? <input type="hidden" name="as" value={preview} /> : null}
      {view ? <input type="hidden" name="view" value={view} /> : null}
      <label htmlFor={`${id}-q`} className="sr-only">
        Search by name, firm, country or topic
      </label>
      <div className="flex items-end gap-4 border-b-2 border-ink pb-3 focus-within:border-brand">
        <Search aria-hidden className="mb-2 size-5 shrink-0 text-subtle md:mb-3" />
        <input
          id={`${id}-q`}
          name="q"
          type="search"
          defaultValue={values.q ?? ""}
          placeholder="Name, firm, country or topic"
          className="w-full min-w-0 bg-transparent font-display text-3xl tracking-[0.005em] text-ink placeholder:text-subtle focus-visible:outline-none md:text-[2.5rem]"
        />
        <Button type="submit" size="lg" className="shrink-0">
          Search
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`${id}-${f.name}`} className="text-meta mb-2 block text-subtle">
              {f.label}
            </label>
            <select
              id={`${id}-${f.name}`}
              name={f.name}
              defaultValue={values[f.name] ?? ""}
              onChange={apply}
              className={selectClass}
              style={{ backgroundImage: chevron }}
            >
              <option value="">All</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        {showReferrals ? (
          <div className="flex items-end">
            <label className="flex h-11 cursor-pointer items-center gap-3 text-[0.9375rem] text-ink">
              <input
                type="checkbox"
                name="referrals"
                value="1"
                defaultChecked={values.referrals === "1"}
                onChange={apply}
                className="size-4 accent-[var(--brand)]"
              />
              Open to referrals
            </label>
          </div>
        ) : null}
      </div>

      {active || values.q ? (
        <button
          type="button"
          onClick={() => {
            form.current?.reset();
            for (const el of Array.from(form.current?.elements ?? [])) {
              if (el instanceof HTMLSelectElement) el.value = "";
              if (el instanceof HTMLInputElement && el.type === "search") el.value = "";
              if (el instanceof HTMLInputElement && el.type === "checkbox") el.checked = false;
            }
            apply();
          }}
          className="text-kicker mt-5 inline-flex items-center gap-1.5 text-graphite hover:text-ink"
        >
          <X aria-hidden className="size-4" /> Clear search and filters
        </button>
      ) : null}
    </form>
  );
}
