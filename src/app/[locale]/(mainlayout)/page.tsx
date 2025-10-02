import { Footer, Header, HeroSlider, MovieList } from "@/components";
import { fetchAllMovieData } from "@/utils";
import { Analytics } from "@vercel/analytics/next";

export default async function LocalizedHome() {
  const movieData = await fetchAllMovieData();
  return (
    <>
      <Header />
      <div className="bg-neutral-950">
        <Analytics />
        <HeroSlider />
        <MovieList movieData={movieData} />
      </div>
      <Footer />
    </>
  );
}
