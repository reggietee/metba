"use client";

import { useActionState, useId } from "react";

import { reportProfile, sendContactMessage, type FormState } from "@/app/(site)/directory/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initial: FormState = { status: "idle" };

function Status({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      className={state.status === "error" ? "text-[0.9375rem] text-destructive" : "rounded-sm bg-secondary px-4 py-3 text-[0.9375rem] text-ink"}
    >
      {state.message}
    </p>
  );
}

/** Honeypot field: hidden from people, filled in by most bots. */
function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px]">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function ContactForm({ slug, name, preview }: { slug: string; name: string; preview?: string }) {
  const id = useId();
  const [state, action, pending] = useActionState(sendContactMessage, initial);
  const err = state.fieldErrors ?? {};
  return (
    <form action={action} className="relative space-y-5" noValidate>
      <input type="hidden" name="slug" value={slug} />
      {preview ? <input type="hidden" name="as" value={preview} /> : null}
      <Honeypot />
      <div>
        <label htmlFor={`${id}-reply`} className="mb-2 block text-[0.9375rem] text-ink">
          Your email address
        </label>
        <Input
          id={`${id}-reply`}
          name="replyTo"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!err.replyTo}
          aria-describedby={`${id}-reply-hint`}
        />
        <p id={`${id}-reply-hint`} className={err.replyTo ? "mt-2 text-sm text-destructive" : "mt-2 text-sm text-subtle"}>
          {err.replyTo ?? `${name} will see this so they can reply. Their address is never shown to you.`}
        </p>
      </div>
      <div>
        <label htmlFor={`${id}-msg`} className="mb-2 block text-[0.9375rem] text-ink">
          Message
        </label>
        <textarea
          id={`${id}-msg`}
          name="message"
          required
          rows={6}
          maxLength={2000}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? `${id}-msg-err` : undefined}
          className="w-full rounded-md border border-input bg-surface px-3.5 py-3 text-base text-ink placeholder:text-subtle aria-invalid:border-destructive"
        />
        {err.message ? (
          <p id={`${id}-msg-err`} className="mt-2 text-sm text-destructive">
            {err.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending" : `Send to ${name.split(" ")[0]}`}
      </Button>
      <Status state={state} />
    </form>
  );
}

export function ReportForm({ slug }: { slug: string }) {
  const id = useId();
  const [state, action, pending] = useActionState(reportProfile, initial);
  return (
    <form action={action} className="relative mt-4 space-y-4">
      <input type="hidden" name="slug" value={slug} />
      <Honeypot />
      <fieldset>
        <legend className="mb-2 text-[0.9375rem] text-ink">What is wrong with this profile?</legend>
        <div className="space-y-2">
          {[
            ["impersonation", "It impersonates someone"],
            ["misleading", "It contains misleading claims"],
            ["spam", "It is spam or advertising"],
            ["other", "Something else"],
          ].map(([v, l]) => (
            <label key={v} className="flex items-center gap-3 text-[0.9375rem] text-graphite">
              <input type="radio" name="reason" value={v} className="size-4 accent-[var(--brand)]" /> {l}
            </label>
          ))}
        </div>
        {state.fieldErrors?.reason ? <p className="mt-2 text-sm text-destructive">{state.fieldErrors.reason}</p> : null}
      </fieldset>
      <div>
        <label htmlFor={`${id}-detail`} className="mb-2 block text-[0.9375rem] text-ink">
          Details (optional)
        </label>
        <textarea
          id={`${id}-detail`}
          name="detail"
          rows={3}
          maxLength={1000}
          className="w-full rounded-md border border-input bg-surface px-3.5 py-3 text-base text-ink"
        />
      </div>
      <Button type="submit" variant="outline" disabled={pending}>
        Send report
      </Button>
      <Status state={state} />
    </form>
  );
}
