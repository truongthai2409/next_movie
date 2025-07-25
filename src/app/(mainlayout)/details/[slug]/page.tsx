import { DetailsPage, LoadingVideo, MovieList } from "@/components";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { fetchAllMovieData, fetchMovieDetails } from "@/utils";
import { Params } from "@/types";
import CommentClientWrapper from "@/components/ui/comment/comment_wrapper";

// Cache the movie details fetch
const getCachedMovieDetails = unstable_cache(
  async (slug: string) => fetchMovieDetails(slug),
  ["movie-details"],
  { revalidate: 3600 } // Revalidate every 1 hour
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
          <div className="h-[600px] lg:h-[80vh] w-full flex items-center justify-center">
            {/* <div className="text-white text-xl">Loading...</div> */}
            {/* <video
              src="/LoadingAnimation.webm"
              autoPlay
              loop
              muted
              className="w-32 h-32"
            /> */}
            <LoadingVideo/>
          </div>
        }
      >
        <DetailsPage slug={slug} initialData={movieDetails} />
      </Suspense>
      <div className="max-w-4xl mx-auto mt-10 px-4 py-6 bg-white rounded shadow">
        <CommentClientWrapper slug={slug} />
      </div>
      <MovieList movieData={movieData} />
    </div>
  );
}
