"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { topics } from "@/lib/mock/topics";
import { cn } from "@/lib/utils";

const steps = ["About you", "Your practice", "Agreements"];

function Field({ label, hint, children }: { label: string; hint?: string; children: (id: string) => React.ReactNode }) {
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

/** Three-step application. Preview only: the final step goes to the status page without saving. */
export function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [type, setType] = useState("lawyer");
  const [picked, setPicked] = useState<string[]>(["ai-governance"]);

  return (
    <div>
      <ol className="mb-10 grid grid-cols-3 gap-2" aria-label="Application steps">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1 rounded-full", i <= step ? "bg-ink" : "bg-secondary")} />
            <span className={cn("text-meta mt-2 block", i === step ? "text-ink" : "text-subtle")}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) setStep(step + 1);
          else router.push("/join/status");
        }}
        className="space-y-6"
      >
        {step === 0 ? (
          <>
            <fieldset>
              <legend className="mb-3 text-[0.9375rem] text-ink">I am a</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  ["lawyer", "Lawyer"],
                  ["student", "Law student"],
                  ["associate", "Legal professional"],
                ].map(([v, l]) => (
                  <label
                    key={v}
                    className={cn(
                      "flex h-12 cursor-pointer items-center gap-3 rounded-sm border px-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                      type === v ? "border-ink bg-surface" : "border-line",
                    )}
                  >
                    <input type="radio" name="type" checked={type === v} onChange={() => setType(v)} className="size-4 accent-[var(--brand)]" />
                    {l}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field label="Full name">{(id) => <Input id={id} autoComplete="name" defaultValue="Jonas Becker" />}</Field>
            <Field label={type === "student" ? "University" : "Organisation"}>{(id) => <Input id={id} defaultValue="Becker Legal" />}</Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="City">{(id) => <Input id={id} defaultValue="Berlin" />}</Field>
              <Field label="Country">{(id) => <Input id={id} autoComplete="country-name" defaultValue="Germany" />}</Field>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <Field label="Jurisdictions" hint="Where you are qualified or practise. Self-reported; MetBA does not verify licences.">
              {(id) => <Input id={id} defaultValue="Germany" />}
            </Field>
            <fieldset>
              <legend className="mb-3 text-[0.9375rem] text-ink">Practice areas</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const on = picked.includes(t.slug);
                  return (
                    <label
                      key={t.slug}
                      className={cn(
                        "inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-[0.9375rem] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand",
                        on ? "border-ink bg-ink text-paper" : "border-line text-graphite",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={() => setPicked(on ? picked.filter((x) => x !== t.slug) : [...picked, t.slug])}
                      />
                      {t.short}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <Field label="LinkedIn profile" hint="Optional, but it helps us review your application faster.">
              {(id) => <Input id={id} type="url" placeholder="https://www.linkedin.com/in/…" />}
            </Field>
          </>
        ) : (
          <>
            <fieldset className="space-y-3">
              <legend className="mb-3 text-[0.9375rem] text-ink">Directory visibility</legend>
              {[
                ["members", "Members only (recommended)"],
                ["public", "Public"],
                ["hidden", "Hidden"],
              ].map(([v, l], i) => (
                <label key={v} className="flex items-center gap-3 text-[0.9375rem]">
                  <input type="radio" name="vis" defaultChecked={i === 0} className="size-4 accent-[var(--brand)]" /> {l}
                </label>
              ))}
              <p className="text-sm text-subtle">You can change this at any time after you are approved.</p>
            </fieldset>
            <div className="space-y-3 border-t border-line pt-6">
              {["I agree to the code of conduct", "I agree to the terms of use", "I have read the privacy policy"].map((l) => (
                <label key={l} className="flex items-center gap-3 text-[0.9375rem]">
                  <input type="checkbox" required className="size-4 accent-[var(--brand)]" /> {l}
                </label>
              ))}
            </div>
            <p className="rounded-sm bg-secondary p-4 text-[0.9375rem] leading-relaxed text-graphite">
              An administrator reviews every application, usually within 3 working days. Approval confirms MetBA
              membership only. It is not a check of your licence or right to practise.
            </p>
          </>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft aria-hidden /> Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" size="lg">
            {step < 2 ? (
              <>
                Continue <ArrowRight aria-hidden />
              </>
            ) : (
              <>
                <Check aria-hidden /> Submit application
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
