declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_API_VERSION: string;
      NEXT_PUBLIC_API_MOVIE_ENDPOINT: string;
      // Add other env variables here
    }
  }
}

export {};
