"use cache";

import { UnsplashPhoto } from "../ssg-page/page";

type Props = {
  photos: UnsplashPhoto[];
};

export default async function PhotoList({ photos }: Props) {
  return (
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
  );
}
