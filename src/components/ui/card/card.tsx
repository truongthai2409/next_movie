// "use client";
import React from "react";
import Image from "next/image";
import { Movie } from "@/types";
import Link from "next/link";

interface ItemCardProps {
  card: Movie;
}

const Card: React.FC<ItemCardProps> = ({ card }) => {
  const {
    thumb_url,
    origin_name,
    episode_current,
    sub_docquyen,
    quality,
  } = card;

  return (
    <div
      className="relative flex-none w-40 md:w-[180px] mx-2 md:hover:scale-110 hover:cursor-pointer hover:transition-all"
      role="button"
      tabIndex={0}
    >
      <Link href={`/details/${card.slug}`}>
        <div className="relative h-64 rounded-lg overflow-hidden group">
          <Image
            src={`https://img.ophim.live/uploads/movies/${thumb_url}`}
            alt={origin_name || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/192/256";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-medium text-sm line-clamp-2">
                {origin_name}
              </h3>
            </div>
          </div>
          {sub_docquyen && (
            <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
              Độc quyền
            </div>
          )}
          {episode_current && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {episode_current}
            </div>
          )}
          {quality && (
            <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              {quality}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
