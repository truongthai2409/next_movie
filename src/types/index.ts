export interface Tmdb {
  id: number;
  type: string;
  season: number;
  vote_average: number;
  vote_count: number;
}
export interface HomeMovie {
  tmdb: Tmdb;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  poster_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: false;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: [
    {
      name: string;
    }
  ];
  country: [
    {
      name: string;
    }
  ];
}
export interface MovieResponse {
  items: HomeMovie[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CardProps {
  _id: number;
  name?: string;
  origin_name?: string;
  poster_url?: string;
  thumb_url?: string;
  slug?: string;
  subtitle?: string;
  tag?: string;
  episodeInfo?: string;
  episode_current: string;
  sub_docquyen: string;
  quality: string;
}
