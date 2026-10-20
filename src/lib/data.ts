// Data-access layer. Pages only import from here, so swapping mock data
// for Supabase in Phase 2 does not change any page code.
import {
  announcement,
  insights,
  membershipFaqs,
  people,
  statThresholds,
  stats,
} from "@/lib/mock/content";
import { events, recaps } from "@/lib/mock/events";
import { members } from "@/lib/mock/members";
import { topicBySlug, topics } from "@/lib/mock/topics";
import type { SiteStats, TopicSlug } from "@/lib/types";

const byDateDesc = <T,>(key: (t: T) => string) => (a: T, b: T) => key(b).localeCompare(key(a));

export async function getAnnouncement() {
  return announcement;
}

// Topics
export async function getTopics() {
  return topics;
}
export async function getTopic(slug: string) {
  return topicBySlug[slug as TopicSlug] ?? null;
}

// Events. In Phase 3 "upcoming" vs "past" is decided by the clock; mock data is split by hand.
export async function getUpcomingEvents() {
  return [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
export async function getFeaturedEvent() {
  const upcoming = await getUpcomingEvents();
  return upcoming.find((e) => e.featured) ?? upcoming[0] ?? null;
}
export async function getEvent(slug: string) {
  return events.find((e) => e.slug === slug) ?? null;
}
export async function getRecaps() {
  return [...recaps].sort(byDateDesc((r) => r.heldAt));
}
export async function getRecap(slug: string) {
  return recaps.find((r) => r.eventSlug === slug) ?? null;
}
export async function getLatestRecap() {
  return (await getRecaps())[0] ?? null;
}
export async function getEventSlugs() {
  return [...events.map((e) => e.slug), ...recaps.map((r) => r.eventSlug)];
}

// Insights
export async function getInsights() {
  return [...insights].sort(byDateDesc((i) => i.publishedAt));
}
export async function getLatestInsights(limit = 3) {
  return (await getInsights()).slice(0, limit);
}
export async function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug) ?? null;
}

// Everything tagged to one topic.
export async function getTopicContent(slug: TopicSlug) {
  const has = (t: { topics: TopicSlug[] }) => t.topics.includes(slug);
  return {
    events: (await getUpcomingEvents()).filter(has),
    insights: (await getInsights()).filter(has),
    recaps: (await getRecaps()).filter(has),
    members: members.filter((m) => m.status === "verified" && m.visibility === "public" && has(m)),
  };
}

// People and membership
export async function getPeople() {
  return people;
}
export async function getMembershipFaqs() {
  return membershipFaqs;
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
