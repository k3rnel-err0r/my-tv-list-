export interface ShowItem {
  title: string;
  link: string;
  year: number;
  seasons: number;
  streamer: string;
  status: 'Complete' | 'In Queue' | 'Dropped' | 'To Catch up' | 'Up to Date';
  category?: 'anime' | 'tvshow';
}

export type SortKey = 'title' | 'year' | 'seasons' | 'streamer' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}
