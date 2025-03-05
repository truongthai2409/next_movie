"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Play, BookmarkPlus } from "lucide-react";
import type { Movie, MovieResponse } from "@/types";
import { API_LIST, getApiUrl, getMovieDetailUrl } from "@/utils";
import Image from "next/image";

interface MovieDetail {
  movie: Movie;
}

const fetchMovies = async (): Promise<MovieDetail[]> => {
  const response = await fetch(
    getApiUrl(`${API_LIST}/phim-moi-cap-nhat?page=1`)
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: MovieResponse = await response.json();
  const itemsData = await Promise.all(
    data.items.slice(10, 15).map(async (item) => {
      const detailResponse = await fetch(getMovieDetailUrl(item.slug));
      const detailData: MovieDetail = await detailResponse.json();
      return detailData;
    })
  );
  return itemsData;
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data?.length) return;

    const timer = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % Math.min(data.length, 5));
    }, 4000);

    return () => clearInterval(timer);
  }, [data?.length]);

  const handleSlideChange = (getNextSlide: (prev: number) => number) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentSlide(getNextSlide);
      setIsChanging(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-neutral-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-neutral-950">
        <div className="text-white text-xl">Error loading movies</div>
      </div>
    );
  }

  if (!data) return null;

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + data.length) % data.length);
  };

  const goToSlide = (index: number) => {
    handleSlideChange(() => index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides container */}
      <div className="relative h-[250px] md:h-[600px] w-full">
        {data.map((movieData, index) => (
          <div
            key={movieData.movie._id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out
              ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            
            <Image
              src={movieData.movie.poster_url || movieData.movie.thumb_url}
              alt={movieData.movie.name}
              fill
              className={`w-full h-full object-cover transition-transform duration-700 ease-out scale-${
                isChanging ? "105" : "100"
              }`}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent blur-lg -bottom-4"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            {/* Content */}
            <div
              className={`absolute bottom-0 left-0 p-8 text-white transition-all duration-500 ease-in-out
                ${
                  currentSlide === index && !isChanging
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
            >
              <div className="md:space-y-4 md:pl-6">
                {/* Title and Original Title */}
                <div className="space-y-2">
                  <h1 className="text-xl md:text-5xl font-bold">
                    {movieData.movie.name}
                  </h1>
                  <h2 className="text-base md:text-2xl opacity-80">
                    {movieData.movie.origin_name}
                  </h2>
                </div>

                {/* Metadata */}
                <div className="flex items-center space-x-4 text-xs md:text-sm ">
                  {movieData.movie.year && <span>{movieData.movie.year}</span>}
                  {movieData.movie.quality && (
                    <span className="px-2 py-1 bg-white/20 rounded">
                      {movieData.movie.quality}
                    </span>
                  )}
                  {movieData.movie.lang && <span>{movieData.movie.lang}</span>}
                  {movieData.movie.tmdb?.type && (
                    <span className="uppercase">
                      {movieData.movie.tmdb.type}
                    </span>
                  )}
                  {movieData.movie.tmdb?.vote_average && (
                    <span className="text-yellow-400">
                      ★ {(movieData.movie.tmdb.vote_average / 2).toFixed(1)}/5
                    </span>
                  )}
                </div>
                {/* Categories and Countries */}
                <div className="hidden md:flex flex-wrap gap-2 items-center">
                  {movieData.movie.country?.map((country, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs md:text-sm  bg-white/30 rounded backdrop-blur-sm"
                    >
                      {country.name}
                    </span>
                  ))}
                  {movieData.movie.category?.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs md:text-sm bg-white/20 rounded backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* {Content} */}
                {movieData.movie.content && (
                  <p className="text-sm hidden md:flex md:w-[400px] text-gray-300 line-clamp-2">
                    {movieData.movie.content.slice(0, 150)}...
                  </p>
                )}

                {/* Episode info */}
                {movieData.movie.episode_current && (
                  <div className="text-xs md:text-sm">
                    Status: {movieData.movie.episode_current}
                    <br></br>
                    Total: {movieData.movie.episode_total}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex space-x-4 pt-4 h-12 md:h-16">
                  <button className="flex items-center text-xs md:text-base space-x-2 px-3 md:px-6 md:py-6 bg-green-500 rounded-3xl md:rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-105">
                    <Play className="w-3 h-3 md:w-5 md:h-5" />
                    <span>Play Now</span>
                  </button>
                  <button className="p-2 md:p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    <BookmarkPlus className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm z-20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm z-20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-4 right-8 flex space-x-2 z-20">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
