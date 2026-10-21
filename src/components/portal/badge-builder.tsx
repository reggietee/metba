"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MembershipBadge, type BadgeStyle } from "./membership-badge";

const styles: { value: BadgeStyle; label: string; note: string }[] = [
  { value: "light", label: "Light", note: "For light footers" },
  { value: "dark", label: "Dark", note: "For dark footers" },
  { value: "compact", label: "Compact", note: "Small square mark" },
];

export function BadgeBuilder({ slug, name }: { slug: string; name: string }) {
  const [style, setStyle] = useState<BadgeStyle>("light");
  const [copied, setCopied] = useState(false);
  const [w, h] = style === "compact" ? [72, 72] : [236, 64];
  const snippet = `<a href="https://metba.io/verify/${slug}" title="Verified MetBA member">
  <img src="https://metba.io/badge/${slug}.svg?style=${style}"
       alt="${name} is a verified member of the Metaverse Bar Association"
       width="${w}" height="${h}" loading="lazy">
</a>`;

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1.1fr] [&>*]:min-w-0">
      <div>
        <fieldset>
          <legend className="text-kicker mb-3 text-ink">Style</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {styles.map((s) => (
              <label
                key={s.value}
                className={cn(
                  "cursor-pointer rounded-sm border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                  style === s.value ? "border-ink bg-surface" : "border-line hover:border-control",
                )}
              >
                <input
                  type="radio"
                  name="badge-style"
                  value={s.value}
                  checked={style === s.value}
                  onChange={() => setStyle(s.value)}
                  className="sr-only"
                />
                <span className="block text-[0.9375rem] text-ink">{s.label}</span>
                <span className="text-meta text-subtle">{s.note}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <h2 className="text-kicker mt-8 mb-3 text-ink">How it looks on your website</h2>
        <div className={cn("rounded-sm border border-line", style === "dark" ? "dark bg-night" : "bg-surface")}>
          <div className="border-b border-line px-5 py-3">
            <span className="text-meta text-subtle">yourfirm.com, website footer</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6 px-5 py-8">
            <div className="space-y-1">
              <p className="text-[0.9375rem] text-ink">Okafor &amp; Partners</p>
              <p className="text-meta text-subtle">Lagos · Privacy · Terms</p>
            </div>
            <MembershipBadge style={style} year={2026} />
          </div>
        </div>
        <p className="text-meta mt-3 text-subtle">
          If your membership lapses, the same code automatically shows &ldquo;Membership not current&rdquo;:
        </p>
        <div className="mt-2 inline-block rounded-sm border border-dashed border-control p-3">
          <MembershipBadge style={style === "compact" ? "compact" : "light"} year={2026} active={false} />
        </div>
      </div>

      <div>
        <h2 className="text-kicker mb-3 text-ink">Your code</h2>
        <div className="dark relative rounded-sm bg-night">
          <pre tabIndex={0} aria-label="Badge embed code" className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-ink">
            <code>{snippet}</code>
          </pre>
          <Button
            variant="inverse"
            size="sm"
            className="absolute top-3 right-3"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(snippet);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {}
            }}
          >
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />} {copied ? "Copied" : "Copy code"}
          </Button>
        </div>
        <ol className="mt-6 space-y-3 text-[0.9375rem] leading-relaxed text-graphite">
          <li>
            <span className="text-ink">1.</span> Copy the code.
          </li>
          <li>
            <span className="text-ink">2.</span> Paste it into your website&apos;s footer. In WordPress, Squarespace, Wix or
            Webflow, use a &ldquo;Custom HTML&rdquo; or &ldquo;Embed code&rdquo; block.
          </li>
          <li>
            <span className="text-ink">3.</span> Done. The badge updates itself every year and links to your verification
            page on metba.io.
          </li>
        </ol>
        <p className="text-meta mt-6 border-t border-line pt-4 text-subtle">
          The badge confirms MetBA membership only. It must not be presented as a licence, certification or
          accreditation.
        </p>
      </div>
    </div>
  );
}
