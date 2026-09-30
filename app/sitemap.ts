import type { MetadataRoute } from "next";
import { contentHref, type ContentCard } from "@/lib/platform-types";

const siteUrl = "https://matholympiad.uz";
export const revalidate = 3600;

async function publishedContent(): Promise<ContentCard[]> {
  const headers: Record<string, string> = {};
  if (process.env.BACKEND_PROXY_SECRET) headers["x-matholympiad-gateway"] = process.env.BACKEND_PROXY_SECRET;
  try {
    const backend = (process.env.BACKEND_URL || "http://127.0.0.1:4000").replace(/\/$/, "");
    const response = await fetch(`${backend}/api/public/catalog`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return [];
    return (await response.json()) as ContentCard[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/problems/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/tests/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/learn/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/legal/`, changeFrequency: "monthly", priority: 0.3 },
  ];
  const items = await publishedContent();
  return [
    ...staticPages,
    ...items.map((item) => ({
      url: `${siteUrl}${contentHref(item)}`,
      lastModified: item.updated_at,
      changeFrequency: "monthly" as const,
      priority: item.kind === "problem" ? 0.8 : 0.7,
    })),
  ];
}
