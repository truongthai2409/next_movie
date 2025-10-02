// app/ssg-example/page.tsx

export const dynamic = "force-static"; // 💡 Bắt buộc Next.js generate statically
type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
};

async function fetchUnsplashPhotos(): Promise<UnsplashPhoto[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/photos?per_page=10&client_id=${accessKey}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error("Failed to fetch Unsplash photos");
  const data = await res.json();
  return data;
}

export default async function SSGExamplePage() {
  const photos = await fetchUnsplashPhotos();

  return (
    <div className="max-w-3xl mx-auto p-4 mt-12">
      <h1 className="text-2xl font-bold mb-4">📷 Unsplash SSG Example Page</h1>
      <ul className="space-y-4">
        {photos.map((photo) => (
          <li
            key={photo.id}
            className="p-3 bg-gray-100 rounded flex items-center space-x-4"
          >
            <img
              src={photo.urls.small}
              alt={photo.alt_description ?? "Unsplash Photo"}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <strong>{photo.alt_description ?? "Untitled"}</strong>
              <p className="text-sm text-gray-600">By {photo.user.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
