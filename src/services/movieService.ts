import axios from "axios"
import type { Movie } from "../types/movie";

interface moviesRequestProps {
    page: number;
    results: Movie[];
    total_pages: number
}


export const moviesRequest = async (query: string): Promise<Movie[]> => {
    const { data } = await axios.get<moviesRequestProps>(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
        params: {
            include_adult: false,
            language: "en-US",
            page: 1,
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    });

    return data.results
}
