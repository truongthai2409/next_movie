import { DetailsPage, MovieList } from "@/components";
import { unstable_cache } from "next/cache";
import { fetchAllMovieData, fetchMovieDetails } from "@/utils";
import { Params } from "@/types";
import CommentClientWrapper from "@/components/ui/comment/comment_wrapper";

// Cache the movie details fetch
const getCachedMovieDetails = unstable_cache(
  async (slug: string) => fetchMovieDetails(slug),
  ["movie-details"],
  { revalidate: 3600 }, // Revalidate every 1 hour
);

export async function generateMetadata({ params }: { params: Params }) {
  return import("@/utils/metadata/routing_metadata").then(
    ({ generateMetadata }) => generateMetadata({ params }),
  );
}

export default async function Page({ params }: { params: Params }) {
  // Fetch both in parallel
  const { slug } = await params;
  const movieDetails = await getCachedMovieDetails(slug);
  // console.log(movieDetails);
  const movieData = await fetchAllMovieData();

  return (
    <div className="bg-black">
      <DetailsPage slug={slug} initialData={movieDetails} />
      <div className="max-w-4xl mx-auto mt-10 px-4 py-6 bg-white rounded shadow">
        <CommentClientWrapper slug={slug} />
      </div>
      <MovieList movieData={movieData} />
    </div>
  );
}
