"use client";
import { useState } from "react";
import YouTube from "react-youtube";
import Image from "next/image";

const YouTubeVideo = ({ trailerUrl, posterUrl, name }: {trailerUrl: string, posterUrl: string, name: string}) => {
  const [showImage, setShowImage] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  

  const handleVideoEnd = () => {
    setShowImage(true);
  };
  
  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-[250px] lg:h-[500px]">
      {!showImage && trailerUrl ? (
        <div>
          <YouTube
            videoId={getYouTubeVideoId(trailerUrl)}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                control: 0,
                mute: 1,
              },
            }}
            onReady={(event) => setPlayer(event.target)}
            onStateChange={(event) => {
              if (event.data === 0) {
                handleVideoEnd();
              }
            }}
            className="absolute w-full h-full"
          />
          <button
            onClick={toggleMute}
            className="absolute z-30 bottom-2 right-4 lg:right-16 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md"
          >
            {isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          </button>
        </div>
      ) : (
        <Image
          src={`https://img.ophim.live/uploads/movies/${posterUrl}`}
          alt={name}
          fill
          className="object-cover"
        />
      )}
    </div>
  );
};

// Helper function to get video ID from YouTube URL
const getYouTubeVideoId = (url: string) => {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : undefined;
};

export default YouTubeVideo;