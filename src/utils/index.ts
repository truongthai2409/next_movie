import { config } from "@/config";
// import { GetServerSideProps } from "next";

export const BASEURL = config.api.baseUrl;
export const MOVIE_END_POINT = config.api.movieEndpoint;
export const API_LIST = config.api.list;
export const VERSION_END_POINT = config.api.versionEndpoint;

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

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await fetch('https://ophim1.com/v1/api/phim/ngoi-nha-bi-mat');
//     const data = await res.json();

//     return {
//       props: {
//         data: {
//           status: data.status,
//           message: data.message,
//           movie: data.movie,
//           episodes: data.episodes
//         }
//       }
//     };
//   } catch (error) {
//     return {
//       props: {
//         data: null,
//         error: 'Failed to fetch movie data'
//       }
//     };
//   }
// }
// getServerSideProps()
