// src/lib/movies.ts
"use cache";

import { fetchMovieDetails } from "@/utils";

export async function getMovieMetadata(slug: string) {
  return fetchMovieDetails(slug);
}
