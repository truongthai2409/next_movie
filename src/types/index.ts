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
