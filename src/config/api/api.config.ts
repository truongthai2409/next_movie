export const API_UNSPLASH_CONFIG = {
  baseURL: process.env.UNSPLASH_BASE_URL,
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
  endpoints: {
    photos: "/photos",
    search: "/search/photos",
    randomPhoto: "/photos/random",
    photoDetails: (id: string) => `/photos/${id}`,
  },
  defaultParams: {
    per_page: 10,
  },
};
export const API_MOVIE_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL.trim(),
  endpoints: {
    listMovie: "/danh-sach/phim-moi-cap-nhat",
  },
};
