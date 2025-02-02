import { DetailsPage, MovieList } from "@/components";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { fetchAllMovieData, fetchMovieDetails } from "@/utils";
import { Params } from "@/types";

// Cache the movie details fetch
const getCachedMovieDetails = unstable_cache(
  async (slug: string) => fetchMovieDetails(slug),
  ["movie-details"],
  { revalidate: 3600 }
);

export default async function Page({ params }: { params: Params }) {
  // Fetch both in parallel
  const { slug } = await params;
  const movieDetails = await getCachedMovieDetails(slug);
  // console.log(movieDetails)
  const movieData = await fetchAllMovieData();

  return (
    <div className="bg-black">
      <Suspense
        fallback={
          <div className="h-[600px] w-full flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
          </div>
        }
      >
        <DetailsPage
          slug={slug}
          initialData={movieDetails}
        />
      </Suspense>
      <MovieList movieData={movieData} />
    </div>
  );
}
