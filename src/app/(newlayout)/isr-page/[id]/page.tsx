"use client";

import { useEffect, useState } from "react";
import { UnsplashImage } from "../page";
import { LoadingSkeleton } from "../_component/LoadingSkeleton";
import { ErrorModal } from "../_component/Error";
import Link from "next/link";

export default function ImagePage({
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
    <div className="p-8 mt-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Image Details</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Unsplash Image"}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {image.alt_description || "Image"}
            </h2>
            <p className="text-gray-600 mb-4">
              Photo by <span className="font-medium">{image.user.name}</span>
            </p>
            <div className="flex gap-4">
              <Link
                href={image.urls.full}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Full Size
              </Link>
              <Link
                href={`https://unsplash.com/photos/${image.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View on Unsplash
              </Link>
              <Link
                href="/isr-page"
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
