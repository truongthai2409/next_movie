"use cliet";
import React from "react";
import { useFetchData } from "@/hooks";
import { getVersionEndPointUrl } from "@/utils";
import { HomeMovie } from "@/types";
import Image from "next/image";
import ContentDisplay from "@/components/ui/content/content";
import YouTubeVideo from "@/components/ui/youtube/youtube";
import { BookmarkPlus, Play, Share } from "lucide-react";

const DetailsPage = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError, error } = useFetchData(
    slug,
    getVersionEndPointUrl(`phim/${slug}`)
  );
  if (isLoading) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-neutral-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-neutral-950">
        <div className="text-white text-xl">
          <div>Error: {(error as Error).message}</div>
        </div>
      </div>
    );
  }
  const items: HomeMovie = data?.data?.item;

  return (
    <div>
      <div className="relative w-full h-[600px] text-white">
        {/* Image */}
        <div className="absolute top-0 right-0 h-[250px] w-full md:h-[500px] md:w-4/5">
          {items.trailer_url && items.trailer_url.length > 0 ? (
            <>
              <div>
                <YouTubeVideo
                  trailerUrl={items.trailer_url}
                  posterUrl={items.poster_url}
                  name={items.name}
                />
              </div>
              <div className="absolute h-full w-1/2 top-0 -left-1/2 inset-5 bg-gradient-to-l from-black/50 to-transparent"></div>
            </>
          ) : (
            <Image
              src={`https://img.ophim.live/uploads/movies/${items.poster_url}`}
              alt={items.name}
              fill
              className="object-cover"
            />
          )}

          <div className="absolute h-full top-0 left-0 inset-10 bg-gradient-to-r from-black/100 to-transparent"></div>
          <div className="absolute h-[50%] transform translate-y-full bottom-0 right-0 inset-5 bg-gradient-to-t from-black/100 to-transparent"></div>
        </div>
        {/* Contents */}
        <div className="absolute w-1/3 left-[5%] top-1/2 transform -translate-y-1/2 md:space-y-2">
          {/* Name */}
          <div className="relative space-y-4 ">
            <h1 className="text-2xl md:text-4xl font-bold">{items.name}</h1>
            <h2 className="text-lg md:text-2xl opacity-80">
              {items.origin_name}
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            {items.year && <span>{items.year}</span>}
            {items.quality && (
              <span className="px-2 py-1 bg-white/20 rounded">
                {items.quality}
              </span>
            )}
            {items.lang && <span>{items.lang}</span>}
            {items.tmdb?.type && (
              <span className="capitalize">{items.tmdb.type}</span>
            )}
            {items.tmdb?.vote_average && (
              <span className="text-yellow-400">
                ★ {(items.tmdb.vote_average / 2).toFixed(1)}/5
              </span>
            )}
            {items.episode_current && <span>{items.episode_current}</span>}
          </div>

          {/* Categories and Countries */}
          <div className="flex flex-wrap gap-2 items-center">
            {items.country?.map((country, idx) => (
              <span
                key={idx}
                className="px-1 py-1 text-xs bg-white/30 rounded backdrop-blur-sm"
              >
                {country.name}
              </span>
            ))}
            {items.category?.map((genre, idx) => (
              <span
                key={idx}
                className="px-1 py-1 text-xs bg-white/20 rounded backdrop-blur-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          {/* Director */}
          <div>
            {items?.director &&
              items.director.length > 0 &&
              items.director.some((d) => d !== "") && (
                <>
                  <span className="inline text-sm invisible md:visible md:w-[400px] text-white">
                    Đạo Diễn:{" "}
                  </span>
                  {items.director.map(
                    (x, index) =>
                      x !== "" && (
                        <p
                          key={index}
                          className="inline text-sm invisible md:visible md:w-[400px] text-gray-300"
                        >
                          {x}
                          {index < items.director.length - 1 ? ", " : ""}
                        </p>
                      )
                  )}
                </>
              )}
          </div>
          {/* Actor */}
          <div>
            {items?.actor &&
              items.actor.length > 0 &&
              items.actor.some((d) => d !== "") && (
                <>
                  <span className="inline text-sm invisible md:visible md:w-[400px] text-white">
                    Diễn Viên:{" "}
                  </span>
                  {items.actor.map(
                    (x, index) =>
                      x !== "" && (
                        <p
                          key={index}
                          className="inline text-sm invisible md:visible md:w-[400px] text-gray-300"
                        >
                          {x}
                          {index < items.actor.length - 1 ? ", " : ""}
                        </p>
                      )
                  )}
                </>
              )}
          </div>

          {/* {Content} */}
          <ContentDisplay content={items.content} charLimit={150} />

          {/* Episode info */}
          {items.episode_current && (
            <div className="text-sm">
              Status: {items.episode_current}
              <br></br>
              Total: {items.episode_total}
            </div>
          )}
          <div className="flex space-x-2 pt-4">
            <button className="flex items-center space-x-2 px-6 py-1 bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105">
              <Play className="w-4 h-4" />
              <span>Play Now</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <BookmarkPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-[90%] h-[1px] mx-auto bg-white mb-4"></div>
        <div className="relative text-gray-200 mx-auto px-[5%]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          </div>
          {/* Video */}
          {/* <YouTubeVideo videoId={items.trailer_url} /> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

