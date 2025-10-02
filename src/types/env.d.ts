declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_API_LIST: string;
      NEXT_PUBLIC_API_MOVIE_ENDPOINT: string;
      NEXT_PUBLIC_API_VERSION_ENDPOINT: string;
      UNSPLASH_ACCESS_KEY: string;
      // Add other env variables here
    }
  }
}

export {};
