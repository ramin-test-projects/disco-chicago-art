export type IArtworkSummary = {
  id: number;
  title?: string;
  score?: number;
  thumbnail?: {
    alt_text?: string;
    lqip?: string;
  };
};

export type IArtworksSearchParams = {
  query?: string;
  page?: number;
  limit?: number;
};

export type IArtworksResponse = {
  total: number;
  items: IArtworkSummary[];
};

export type IArtwork = {
  id: number;
  artist_display?: string;
  artist_title?: string;
  department_title?: string;
  description?: string;
  dimensions?: string;
  gallery_title?: string;
  image_id?: string;
  publication_history?: string;
  short_description?: string;
  title?: string;
  updated_at?: string;
  thumbnail?: {
    alt_text?: string;
    lqip?: string;
  };
};
