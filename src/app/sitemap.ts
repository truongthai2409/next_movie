import { HOST_PRODUCTION } from "@/utils";
import type { MetadataRoute } from "next";

type SiteMapType = MetadataRoute.Sitemap | null;

export default function sitemap(): SiteMapType {
  if (process.env.DISABLE_SITEMAP === "true") {
    return [];
  }
  const NEW_END_POINT =
    HOST_PRODUCTION || ("https://next-imovie.vercel.app" as string);

  return [
    {
      url: NEW_END_POINT,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: NEW_END_POINT,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: NEW_END_POINT,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}

// app/sitemap.ts
// tạo sitemap động

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const res = await fetch('https://api.example.com/movies')
//   const movies = await res.json()

//   return movies.map((movie: { slug: string, updatedAt: string }) => ({
//     url: `https://example.com/movies/${movie.slug}`,
//     lastModified: new Date(movie.updatedAt),
//   }))
// }
