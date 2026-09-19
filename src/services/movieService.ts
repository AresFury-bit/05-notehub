import axios from "axios";
import type { Movie } from "../types/movie"



interface MoviesHttpResponse{
  results: Movie[];
  total_pages: number;
}

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;


export const fetchMovies = async(topic:string, page:number) => {
  
  const response = await axios.get<MoviesHttpResponse>("https://api.themoviedb.org/3/search/movie", {
    params: {
      query: topic,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`, 
    }
  })
  return response.data
  
}