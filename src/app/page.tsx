import { HeroSlider, MovieList } from "@/components";
import { fetchAllMovieData } from "@/utils";
import { Analytics } from "@vercel/analytics/next"

export default async function Home() {
  const movieData = await fetchAllMovieData();
  return (
    <div className="bg-neutral-950">
      <Analytics />
      <HeroSlider />
      <MovieList movieData={movieData} />
    </div>
  );
}
