import { config } from '@/config';

export const getApiUrl = (endpoint: string) => {
  return `${config.api.baseUrl}/${endpoint}`;
};

export const getMovieDetailUrl = (slug: string) => {
  return `${config.api.baseUrl}/${config.api.movieEndpoint}/${slug}`;
};