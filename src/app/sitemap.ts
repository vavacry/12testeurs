import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((a) => ({
      url: `${site.url}/blog/${a.slug}`,
      lastModified: a.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/cgv`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
