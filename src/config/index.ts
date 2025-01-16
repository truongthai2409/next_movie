import TanStackProvider from "./tanstack";

export { TanStackProvider };

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    list: process.env.NEXT_PUBLIC_API_LIST,
    movieEndpoint: process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT,
    versionEndpoint: process.env.NEXT_PUBLIC_API_VERSION_ENDPOINT
  },
  pagination: {
    startIndex: 10,
    endIndex: 15,
  },
} as const;
