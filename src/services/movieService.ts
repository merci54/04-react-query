import axios from 'axios';
import type { Movie } from '../types/movie';

interface moviesRequestProps {
  page: number;
  results: Movie[];
  total_pages: number;
}

export const moviesRequest = async (
  query: string,
  page: number
): Promise<moviesRequestProps> => {
  const { data } = await axios.get<moviesRequestProps>(
    `https://api.themoviedb.org/3/search/movie?`,
    {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return data;
};
