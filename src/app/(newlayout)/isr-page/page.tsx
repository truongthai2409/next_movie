import Link from "next/link";
import React from "react";
// ISR (Incremental Static Regeneration) trong Next.js cho phép bạn cập nhật nội dung trang mà không cần phải xây dựng lại toàn bộ ứng dụng.

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
    [key: string]: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

export const metadata = {
  title: "Blog Gallery (ISR)",
  description:
    "A blog page displaying images from Unsplash with ISR in Next.js",
};

async function getImages() {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?count=12&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    throw new Error(`Unsplash API error: ${res.status}`);
  }
  return res.json();
}

export default async function BlogPage() {
  const images: UnsplashImage[] = await getImages();

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Blog Gallery (ISR)
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="rounded overflow-hidden shadow-lg">
            <Link href={`/isr-page/${img.id}`}>
              <img
                src={img.urls.small}
                alt={img.alt_description || "Unsplash Image"}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 border-2 border-gray-200 shadow-md hover:shadow-xl"
              />
            </Link>
            <div className="p-4">
              <p className="text-sm text-gray-700">{img.user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
