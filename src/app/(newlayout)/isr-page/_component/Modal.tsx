"use client";

import { useRouter } from "next/navigation";
import { UnsplashImage } from "../page";

interface ModalProps {
  image: UnsplashImage;
  onClose?: () => void;
}

export default function Modal({ image, onClose }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative">
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close modal"
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <h2 id="modal-title" className="text-xl font-semibold mb-2">
            {image.alt_description || "Image"}
          </h2>
          <p className="text-gray-600 mb-4">
            Photo by <span className="font-medium">{image.user.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={image.urls.full}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Full Size
            </a>
            <a
              href={`https://unsplash.com/photos/${image.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              View on Unsplash
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
