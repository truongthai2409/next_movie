export type Params = Promise<{ slug: string }>;
interface Tmdb {
  id: number;
  type: string;
  season: number;
  vote_average: number;
  vote_count: number;
}
interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}
export interface ListEpisode {
  server_name: string;
  server_data: Episode[];
}

export interface PropsVideo {
  servers: ListEpisode[];
}
export interface MovieResponse {
  item: Movie;
  items: Movie[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface MovieDetail {
  data: MovieResponse;
}
export interface DetailsPageProps {
  slug: string;
  initialData: MovieDetail; 
}
export interface Movie {
  _id: number;
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  trailer_url: string;
  year?: number;
  quality: string;
  lang?: string;
  chieurap: false;
  view: number;
  type: string;
  status: string;
  time: string;
  episode_current: string;
  sub_docquyen?: string;
  episodeInfo?: string;
  episode_total?: string;
  content: string;
  tmdb?: Tmdb;
  country?: Array<{ name: string }>;
  category?: Array<{ name: string }>;
  director: string[];
  actor: string[];
  episodes: ListEpisode[];
}
export interface MovieListResponse {
  items: Movie[];
}
export interface MoviesData {
  phimmoi: MovieListResponse;
  phimle: MovieListResponse;
  phimbo: MovieListResponse;
  tvshow: MovieListResponse;
  hoathinh: MovieListResponse;
  theloai: MovieListResponse;
  quocgia: MovieListResponse;
}
