import type { MetadataRoute } from "next";
import { clinic } from "@/config/clinic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${clinic.siteUrl}/sitemap.xml`,
  };
}
