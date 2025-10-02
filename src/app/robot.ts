// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/", "/auth/", "/watch/", "/admin/"],
    },
    host: process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT,
    sitemap:
      `${process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT}/sitemap.xml` ||
      "https://next-imovie.vercel.app/sitemap.xml",
  };
}
