import TanStackProvider from "./tanstack";

export { TanStackProvider };

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    version: process.env.NEXT_PUBLIC_API_VERSION,
    movieEndpoint: process.env.NEXT_PUBLIC_API_MOVIE_ENDPOINT,
  },
  pagination: {
    startIndex: 10,
    endIndex: 15,
  },
} as const;
