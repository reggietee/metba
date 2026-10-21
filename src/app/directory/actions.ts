"use server";

import { getProfile } from "@/lib/directory";
import { viewerFromSearch } from "@/lib/viewer";

export type FormState = { status: "idle" | "error" | "preview"; message?: string; fieldErrors?: Record<string, string> };

const clean = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Contact relay. Validates on the server today. Phase 2 adds sign-in, Turnstile,
 * per-sender and per-recipient rate limits, logging to contact_messages, and the email itself.
 */
export async function sendContactMessage(_: FormState, data: FormData): Promise<FormState> {
  const viewer = viewerFromSearch(clean(data.get("as")));
  const profile = await getProfile(clean(data.get("slug")), viewer);
  if (!profile) return { status: "error", message: "This profile is not available." };
  if (viewer.kind !== "member") return { status: "error", message: "Log in to contact members." };
  if (clean(data.get("website"))) return { status: "preview" }; // honeypot: pretend success

  const fieldErrors: Record<string, string> = {};
  const replyTo = clean(data.get("replyTo"));
  const message = clean(data.get("message"));
  if (!isEmail(replyTo)) fieldErrors.replyTo = "Enter the email address the member should reply to.";
  if (message.length < 20) fieldErrors.message = "Write at least 20 characters so the member knows why you are in touch.";
  if (message.length > 2000) fieldErrors.message = "Keep your message under 2,000 characters.";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors };

  return {
    status: "preview",
    message: `Preview only: your message passed validation but was not sent. Message relay to ${profile.fullName} goes live with member accounts.`,
  };
}

/** Report this profile. Phase 2 stores reports for the admin queue. */
export async function reportProfile(_: FormState, data: FormData): Promise<FormState> {
  const reason = clean(data.get("reason"));
  if (!reason) return { status: "error", fieldErrors: { reason: "Choose a reason." } };
  if (clean(data.get("website"))) return { status: "preview" };
  return {
    status: "preview",
    message: "Preview only: thank you. Reports will go to MetBA administrators once the admin queue is live.",
  };
}
