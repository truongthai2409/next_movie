"use client";

import { useEffect, useState } from "react";
import { UnsplashImage } from "../../page";
import { LoadingSkeleton } from "../../_component/LoadingSkeleton";
import { ErrorModal } from "../../_component/Error";

export default function ImageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/unsplash/image/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch image: ${res.status}`);
        }

        const imageData = await res.json();
        setImage(imageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) <LoadingSkeleton />;

  if (error) <ErrorModal />;

  if (!image) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative">
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={() => window.history.back()}
              className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">
            {image.alt_description || "Image"}
          </h2>
          <p className="text-gray-600">
            Photo by <span className="font-medium">{image.user.name}</span>
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={image.urls.full}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View Full Size
            </a>
            <a
              href={`https://unsplash.com/photos/${image.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              View on Unsplash
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
