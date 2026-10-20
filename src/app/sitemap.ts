import type { MetadataRoute } from "next";

import { getEventSlugs, getInsights, getTopics } from "@/lib/data";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, topics, eventSlugs] = await Promise.all([getInsights(), getTopics(), getEventSlugs()]);
  const staticRoutes = [
    "",
    "/about",
    "/membership",
    "/join",
    "/events",
    "/events/past",
    "/insights",
    "/topics",
    "/directory",
    "/for-students",
    "/for-the-public",
    "/privacy",
    "/terms",
    "/code-of-conduct",
    "/accessibility",
    "/cookies",
  ];
  return [
    ...staticRoutes.map((p) => ({ url: `${site.url}${p}` })),
    ...eventSlugs.map((s) => ({ url: `${site.url}/events/${s}` })),
    ...insights.map((i) => ({ url: `${site.url}/insights/${i.slug}`, lastModified: i.publishedAt })),
    ...topics.map((t) => ({ url: `${site.url}/topics/${t.slug}` })),
  ];
}
