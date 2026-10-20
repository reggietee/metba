// Data-access layer. Pages only import from here, so swapping mock data
// for Supabase in Phase 2 does not change any page code.
import { announcement, insights, people, statThresholds, stats } from "@/lib/mock/content";
import { events, recaps } from "@/lib/mock/events";
import { members } from "@/lib/mock/members";
import { topics } from "@/lib/mock/topics";
import type { SiteStats } from "@/lib/types";

export async function getAnnouncement() {
  return announcement;
}

export async function getTopics() {
  return topics;
}

export async function getUpcomingEvents() {
  return [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function getFeaturedEvent() {
  const upcoming = await getUpcomingEvents();
  return upcoming.find((e) => e.featured) ?? upcoming[0] ?? null;
}

export async function getLatestInsights(limit = 3) {
  return [...insights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

export async function getLatestRecap() {
  return [...recaps].sort((a, b) => b.heldAt.localeCompare(a.heldAt))[0] ?? null;
}

export async function getPeople() {
  return people;
}

export async function getMembers() {
  return members;
}

/** Only returns counts that clear their threshold, so small numbers never show. */
export async function getPublicStats(): Promise<Partial<SiteStats>> {
  const out: Partial<SiteStats> = {};
  for (const key of Object.keys(stats) as (keyof SiteStats)[]) {
    if (stats[key] >= statThresholds[key]) out[key] = stats[key];
  }
  return out;
}

export async function getTopicCounts() {
  const counts: Record<string, number> = {};
  for (const item of [...events, ...insights, ...recaps]) {
    for (const t of item.topics) counts[t] = (counts[t] ?? 0) + 1;
  }
  return counts;
}
