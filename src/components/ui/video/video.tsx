"use client";
import React, { useState, useEffect } from "react";
import { ListEpisode } from "@/types";

const VideoPlayerLayout = ({
  episodesNew,
  slug,
}: {
  episodesNew: ListEpisode[];
  slug: string;
}) => {
  // Initialize state from localStorage or default to 0
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const savedEpisodes = localStorage.getItem("watchedEpisodes");
      if (savedEpisodes) {
        const episodesData = JSON.parse(savedEpisodes);
        const savedIndex = episodesData[slug];
        // Validate the saved index is within bounds
        return savedIndex !== undefined &&
          savedIndex < episodesNew[0].server_data.length
          ? savedIndex
          : 0;
      }
    }
    return 0;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showEpisodeList, setShowEpisodeList] = useState(false);

  // Update localStorage when episode changes
  useEffect(() => {
    const savedEpisodes = localStorage.getItem("watchedEpisodes");
    const episodesData = savedEpisodes ? JSON.parse(savedEpisodes) : {};

    // Update episode for current slug
    episodesData[slug] = currentEpisodeIndex;

    localStorage.setItem("watchedEpisodes", JSON.stringify(episodesData));
  }, [currentEpisodeIndex, slug]);

  const handleEpisodeChange = async (index: number) => {
    try {
      setIsLoading(true);
      setCurrentEpisodeIndex(index);
      // On mobile, auto-hide episode list after selection
      if (window.innerWidth < 768) {
        setShowEpisodeList(false);
      }
    } catch (error) {
      console.error("Error changing episode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEpisodeList = () => {
    setShowEpisodeList(!showEpisodeList);
  };

  const renderContent = () => {
    if (episodesNew[0].server_data.length > 1) {
      return (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
          {episodesNew[0].server_data.map((_, index) => (
            <button
              key={index}
              onClick={() => handleEpisodeChange(index)}
              className={`p-2 rounded text-center transition-colors
                ${
                  currentEpisodeIndex === index
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              <div>{index + 1}</div>
            </button>
          ))}
        </div>
      );
    } else {
      return (
        <div className="p-4 text-center text-gray-400">Nội dung đặc sắc</div>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white my-5">
      {/* Video Player */}
      <div className="w-full md:flex-grow">
        <div className="relative h-[50vh] md:h-[80vh]">
          <div className="relative w-full h-full bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              </div>
            )}

            <iframe
              key={currentEpisodeIndex}
              src={episodesNew[0].server_data[currentEpisodeIndex].link_embed}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>

      {/* Mobile toggle button */}
      <div className="md:hidden w-full bg-gray-800 p-4 flex justify-center">
        <button
          onClick={toggleEpisodeList}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          {showEpisodeList ? "Hide Episodes" : "Show Episodes"}
        </button>
      </div>

      {/* Episodes List - Hidden on mobile by default */}
      <div
        className={`w-full md:w-80 bg-gray-800 overflow-y-auto scrool-bar ${showEpisodeList ? "block" : "hidden md:block"}`}
      >
        <div className="p-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button className="text-green-500 border-b-2 border-green-500 pb-2">
              Chọn tập
            </button>
            <button className="text-gray-400 border-b-2 border-gray-400 pb-2">
              Nội dung đặc sắc
            </button>
          </div>

          {/* Conditional Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerLayout;
