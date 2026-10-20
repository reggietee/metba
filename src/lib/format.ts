import type { CpdCategory, EventCpd, EventFormat, MemberType } from "@/lib/types";

export const formatLabels: Record<EventFormat, string> = {
  webinar: "Webinar",
  in_person: "In person",
  hybrid: "Hybrid",
  virtual_venue: "Virtual venue",
};

export const memberTypeLabels: Record<MemberType, string> = {
  lawyer: "Lawyer",
  student: "Law student",
  associate: "Legal professional",
};

export const cpdCategoryLabels: Record<CpdCategory, string> = {
  substantive: "Substantive",
  professionalism: "Professionalism",
  ethics: "Ethics",
  practice_management: "Practice management",
  other: "Other",
};

export const SELF_REPORTED_CPD =
  "May be eligible for self-reported CPD. Check your regulator's rules.";

/**
 * The only place CPD accreditation wording is produced.
 * Accreditation is stated only when an admin has entered both the
 * regulator and the reference. Everything else gets the self-reported line.
 */
export function cpdStatement(cpd: EventCpd): string {
  if (cpd.accreditationStatus === "accredited" && cpd.regulator?.trim() && cpd.accreditationRef?.trim()) {
    return `Accredited by ${cpd.regulator.trim()}, ref ${cpd.accreditationRef.trim()}`;
  }
  return SELF_REPORTED_CPD;
}

export function formatHours(hours: number) {
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} CPD ${hours === 1 ? "hour" : "hours"}`;
}

/** Deterministic server-side formatting in a given timezone. */
export function formatEventDate(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(new Date(iso));
}

export function formatEventTime(startIso: string, endIso: string, timeZone: string) {
  const f = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  });
  const start = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(
    new Date(startIso),
  );
  return `${start} to ${f.format(new Date(endIso))}`;
}

export function formatShortDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso),
  );
}

export function formatCount(n: number) {
  return new Intl.NumberFormat("en-GB").format(n);
}
