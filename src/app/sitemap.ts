import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:
        process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT ||
        "https://next-imovie.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url:
        process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT ||
        "https://next-imovie.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url:
        process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT ||
        "https://next-imovie.vercel.app",
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
