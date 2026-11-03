import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { CONDITIONS } from "@/content/conditions";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["/", "/about-dr-mohit-jain/", "/conditions/", "/faq/", "/contact/"];
  return [
    ...fixed.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...CONDITIONS.map((c) => ({ url: `${SITE_URL}/${c.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
