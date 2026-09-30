import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/attempts/", "/dashboard/", "/login/", "/preview/", "/reset-password/", "/studio/"],
    },
    sitemap: "https://matholympiad.uz/sitemap.xml",
    host: "https://matholympiad.uz",
  };
}
