import { Movie, MovieDetail, MovieListResponse, MoviesData } from "@/types";

export const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const MOVIE_END_POINT = process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT;
export const API_LIST = process.env.NEXT_PUBLIC_API_LIST;
export const VERSION_END_POINT = process.env.NEXT_PUBLIC_API_VERSION_ENDPOINT;

// get endpoint
export const getApiUrl = (endpoint: string) => {
  return `${BASEURL}/${endpoint}`;
};
// "/phim" in hero section
export const getMovieDetailUrl = (slug: string) => {
  return `${BASEURL}/${MOVIE_END_POINT}/${slug}`;
};
// v1/api
export const getVersionEndPointUrl = (slug: string) => {
  return `${BASEURL}/${VERSION_END_POINT}/${slug}`;
};

export const extractItems = (jsonData: JSON) => {
  try {
    const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    return data?.data?.items || [];
  } catch (error) {
    console.error("Error extracting items:", error);
    return [];
  }
};

export async function fetchMovieData(
  category: string,
  endpoint: string
): Promise<MovieListResponse> {
  const response = await fetch(getVersionEndPointUrl(endpoint), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} data`);
  }
  const data = await response.json();

  // Only return necessary data
  return {
    items: data.data.items.map((item: Movie) => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      origin_name: item.origin_name,
      poster_url: item.poster_url,
      thumb_url: item.thumb_url,
      year: item.year,
      quality: item.quality,
      lang: item.lang,
      episode_current: item.episode_current,
      tmdb: {
        type: item.tmdb?.type,
        vote_average: item.tmdb?.vote_average,
      },
    })),
  };
}

export async function fetchAllMovieData(): Promise<MoviesData> {
  const categories = [
    { key: "phimmoi", endpoint: "danh-sach/phim-moi" },
    { key: "phimle", endpoint: "danh-sach/phim-le" },
    { key: "phimbo", endpoint: "danh-sach/phim-bo" },
    { key: "tvshow", endpoint: "danh-sach/tv-shows" },
    { key: "hoathinh", endpoint: "danh-sach/hoat-hinh" },
    { key: "theloai", endpoint: "danh-sach/hanh-dong" },
    { key: "quocgia", endpoint: "quoc-gia/han-quoc" },
  ] as const;

  const results = await Promise.all(
    categories.map(async ({ key, endpoint }) => {
      const data = await fetchMovieData(key, endpoint);
      return { key, data };
    })
  );

  return results.reduce((acc, { key, data }) => {
    acc[key] = data;
    return acc;
  }, {} as MoviesData);
}

export async function fetchMovieDetails(slug: string): Promise<MovieDetail> {
  // console.log(getVersionEndPointUrl(`phim/${slug}`))
  const response = await fetch(getVersionEndPointUrl(`phim/${slug}`), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ${slug}`);
  }

  const data = await response.json();
  return data;
}
