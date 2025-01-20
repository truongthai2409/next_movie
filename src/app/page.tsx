import { HeroSlider, MovieList } from "@/components";
import { fetchAllMovieData } from "@/utils";

export default async function Home() {
  const movieData = await fetchAllMovieData();
  return (
    <div className="bg-neutral-950">
      <HeroSlider />
      <MovieList movieData={movieData} />
    </div>
  );
}
