"use client";

import Carousel from "@/components/ui/carousel/carousel";
import { MoviesData } from "@/types";

interface MovieListProps {
  movieData: MoviesData;
}

const MovieList = ({ movieData }: MovieListProps) => {
  return (
    <div className="pb-10">
      <Carousel title="Phim Mới" items={movieData.phimmoi.items} />
      <Carousel title="Hàn Quốc" items={movieData.hoathinh.items} />
      <Carousel title="Phim Lẻ" items={movieData.phimle.items} />
      <Carousel title="TV Shows" items={movieData.tvshow.items} />
      <Carousel title="Phim Bộ" items={movieData.phimbo.items} />
      <Carousel title="Hoạt Hình" items={movieData.theloai.items} />
      <Carousel title="Hành Động" items={movieData.quocgia.items} />
    </div>
  );
};

export default MovieList;
