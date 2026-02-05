// app/robots.ts
import { HOST_PRODUCTION } from "@/utils";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/", "/auth/", "/watch/", "/admin/"],
    },
    host: HOST_PRODUCTION,
    sitemap:
      `${HOST_PRODUCTION}/sitemap.xml` ||
      "https://next-imovie.vercel.app/sitemap.xml",
  };
}
