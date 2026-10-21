"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Upload } from "lucide-react";

import { VerifiedBadge } from "@/components/brand/verified-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { topicBySlug, topics } from "@/lib/mock/topics";
import type { TopicSlug } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PreviewNote } from "./preview-banner";

type Profile = {
  fullName: string;
  photo: string;
  headline: string;
  organisation: string;
  city: string;
  country: string;
  jurisdictions: string[];
  topics: TopicSlug[];
  languages: string[];
  bio: string;
  social: { linkedin?: string; x?: string; website?: string };
  visibility: "hidden" | "members" | "public";
  openToReferrals: boolean;
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] text-ink">
        {label}
      </label>
      {children(id)}
      {hint ? <p className="mt-1.5 text-sm text-subtle">{hint}</p> : null}
    </div>
  );
}

export function ProfileEditor({ initial }: { initial: Profile }) {
  const [p, setP] = useState(initial);
  const [view, setView] = useState<"public" | "member">("public");
  const [saved, setSaved] = useState(false);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => {
    setSaved(false);
    setP((x) => ({ ...x, [k]: v }));
  };

  return (
    <div className="grid gap-12 xl:grid-cols-[1.25fr_1fr]">
      <form
        className="space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <fieldset className="space-y-5">
          <legend className="font-display text-[1.5rem]">Photo</legend>
          <div className="flex items-center gap-5">
            <span className="relative size-24 shrink-0 overflow-hidden rounded-full bg-secondary">
              <Image src={p.photo} alt="Your current photo" fill sizes="96px" className="object-cover" />
            </span>
            <div className="space-y-2">
              <Button type="button" variant="outline" size="sm">
                <Upload aria-hidden /> Upload a new photo
              </Button>
              <p className="text-sm text-subtle">A clear headshot works best. JPG or PNG, at least 600 × 600.</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-line pt-8">
          <legend className="font-display text-[1.5rem]">About you</legend>
          <Field label="Full name">{(id) => <Input id={id} value={p.fullName} onChange={(e) => set("fullName", e.target.value)} />}</Field>
          <Field label="Headline" hint="One line, for example your role and focus.">
            {(id) => <Input id={id} value={p.headline} maxLength={80} onChange={(e) => set("headline", e.target.value)} />}
          </Field>
          <Field label="Organisation" hint="Shown to signed-in members only.">
            {(id) => <Input id={id} value={p.organisation} onChange={(e) => set("organisation", e.target.value)} />}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City">{(id) => <Input id={id} value={p.city} onChange={(e) => set("city", e.target.value)} />}</Field>
            <Field label="Country">{(id) => <Input id={id} value={p.country} onChange={(e) => set("country", e.target.value)} />}</Field>
          </div>
          <Field label="Jurisdictions" hint="Self-reported, separated by commas. MetBA does not verify licences.">
            {(id) => (
              <Input
                id={id}
                value={p.jurisdictions.join(", ")}
                onChange={(e) => set("jurisdictions", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
              />
            )}
          </Field>
          <Field label="Bio" hint="Shown to signed-in members. Up to 600 characters.">
            {(id) => (
              <textarea
                id={id}
                rows={4}
                maxLength={600}
                value={p.bio}
                onChange={(e) => set("bio", e.target.value)}
                className="w-full rounded-md border border-input bg-surface px-3.5 py-3 text-base text-ink"
              />
            )}
          </Field>
        </fieldset>

        <fieldset className="border-t border-line pt-8">
          <legend className="font-display text-[1.5rem]">Practice areas</legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {topics.map((t) => {
              const on = p.topics.includes(t.slug);
              return (
                <label
                  key={t.slug}
                  className={cn(
                    "inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                    on ? "border-ink bg-ink text-paper" : "border-line text-graphite hover:border-control",
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on}
                    onChange={() => set("topics", on ? p.topics.filter((x) => x !== t.slug) : [...p.topics, t.slug])}
                  />
                  {t.short}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-line pt-8">
          <legend className="font-display text-[1.5rem]">Social links</legend>
          <Field label="LinkedIn">{(id) => <Input id={id} type="url" value={p.social.linkedin ?? ""} onChange={(e) => set("social", { ...p.social, linkedin: e.target.value })} />}</Field>
          <Field label="X">{(id) => <Input id={id} type="url" value={p.social.x ?? ""} placeholder="https://x.com/yourname" onChange={(e) => set("social", { ...p.social, x: e.target.value })} />}</Field>
          <Field label="Website">{(id) => <Input id={id} type="url" value={p.social.website ?? ""} onChange={(e) => set("social", { ...p.social, website: e.target.value })} />}</Field>
        </fieldset>

        <fieldset className="border-t border-line pt-8">
          <legend className="font-display text-[1.5rem]">Directory visibility</legend>
          <div className="mt-5 space-y-2">
            {(
              [
                ["public", "Public", "Anyone can see your public profile. Members see the full profile."],
                ["members", "Members only", "Only signed-in MetBA members can find you."],
                ["hidden", "Hidden", "You are not listed in the directory."],
              ] as const
            ).map(([v, l, d]) => (
              <label
                key={v}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-sm border p-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                  p.visibility === v ? "border-ink bg-surface" : "border-line",
                )}
              >
                <input type="radio" name="visibility" checked={p.visibility === v} onChange={() => set("visibility", v)} className="mt-1 size-4 accent-[var(--brand)]" />
                <span>
                  <span className="block text-[0.9375rem] text-ink">{l}</span>
                  <span className="text-sm text-subtle">{d}</span>
                </span>
              </label>
            ))}
          </div>
          <label className="mt-5 flex items-center gap-3 text-[0.9375rem] text-ink">
            <input
              type="checkbox"
              checked={p.openToReferrals}
              onChange={(e) => set("openToReferrals", e.target.checked)}
              className="size-4 accent-[var(--brand)]"
            />
            Open to referrals from other lawyers
          </label>
        </fieldset>

        <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center gap-4 border-t border-line bg-paper/95 px-5 py-4 backdrop-blur-sm md:-mx-10 md:px-10">
          <Button type="submit" size="lg">
            Save changes
          </Button>
          {saved ? <PreviewNote>Preview: changes are not saved.</PreviewNote> : null}
        </div>
      </form>

      <aside className="xl:sticky xl:top-8 xl:self-start">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-kicker text-ink">Preview</h2>
          <span className="inline-flex rounded-sm border border-line p-0.5">
            {(["public", "member"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn("text-meta h-7 rounded-sm px-2.5", view === v ? "bg-ink text-paper" : "text-graphite hover:text-ink")}
              >
                {v === "public" ? "Public view" : "Member view"}
              </button>
            ))}
          </span>
        </div>
        {p.visibility === "hidden" || (p.visibility === "members" && view === "public") ? (
          <div className="rounded-sm border border-dashed border-control p-8 text-center text-[0.9375rem] text-graphite">
            {p.visibility === "hidden" ? "Your profile is hidden from the directory." : "The public cannot see your profile."}
          </div>
        ) : (
          <article className="rounded-sm border border-line bg-surface p-6">
            <div className="flex gap-5">
              <span className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-sm">
                <Image src={p.photo} alt="" fill sizes="112px" className="object-cover" />
              </span>
              <div className="min-w-0">
                <VerifiedBadge />
                <p className="mt-2 font-display text-[1.75rem] leading-tight">{p.fullName || "Your name"}</p>
                <p className="mt-1 text-[0.9375rem] text-graphite">
                  {p.headline}
                  {view === "member" && p.organisation ? <span className="text-subtle">, {p.organisation}</span> : null}
                </p>
                <p className="text-meta mt-2 text-subtle">
                  {p.city}, {p.country}
                </p>
              </div>
            </div>
            <dl className="mt-6 border-t border-line text-[0.9375rem]">
              <div className="grid grid-cols-3 gap-3 border-b border-line py-3">
                <dt className="text-meta text-subtle">Jurisdictions</dt>
                <dd className="col-span-2">
                  {p.jurisdictions.join(", ") || "None listed"} <span className="text-subtle">(self-reported)</span>
                </dd>
              </div>
              {view === "member" ? (
                <div className="grid grid-cols-3 gap-3 border-b border-line py-3">
                  <dt className="text-meta text-subtle">Languages</dt>
                  <dd className="col-span-2">{p.languages.join(", ")}</dd>
                </div>
              ) : null}
            </dl>
            <p className="text-meta mt-4 text-brand">{p.topics.map((t) => topicBySlug[t].short).join(" · ") || "No practice areas"}</p>
            {view === "member" && p.bio ? <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">{p.bio}</p> : null}
          </article>
        )}
      </aside>
    </div>
  );
}
