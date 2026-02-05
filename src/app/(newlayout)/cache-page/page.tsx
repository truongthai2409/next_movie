import { UnsplashPhoto } from "../ssg-page/page";
import PhotoList from "./PhotoList";

async function fetchUnsplashPhotos(): Promise<UnsplashPhoto[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/photos?per_page=10&client_id=${accessKey}`,
  );
  if (!res.ok) throw new Error("Failed to fetch Unsplash photos");
  const data = await res.json();
  return data;
}

export default async function CachePage() {
  "use cache";
  const photos = await fetchUnsplashPhotos();
  return (
    <div className="max-w-3xl mx-auto p-4 mt-12">
      <h1 className="text-2xl font-bold mb-4">🗄️ Cache Page Example</h1>
      <p className="text-gray-700">
        This page demonstrates the use of Next.js caching strategies. The data
        on this page is cached to improve performance and reduce load times.
      </p>
      <PhotoList photos={photos} />
    </div>
  );
}
