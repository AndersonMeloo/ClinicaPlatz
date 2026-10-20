import type { MetadataRoute } from "next";
import { clinic } from "@/config/clinic";
import { landingPages } from "@/content/landing-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${clinic.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${clinic.siteUrl}/consulta`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${clinic.siteUrl}/servicos`, changeFrequency: "monthly", priority: 0.9 },
    ...landingPages.map((page) => ({
      url: `${clinic.siteUrl}${page.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${clinic.siteUrl}/contato`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${clinic.siteUrl}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
