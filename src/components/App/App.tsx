import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import Pagination from "../ReactPaginate/ReactPaginate";

export default function App() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", topic, currentPage],
    queryFn: () => fetchMovies(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const handleSubmit = (topic: string) => {
    setCurrentPage(1);
    setTopic(topic);
    console.log(data);
  };

  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const handleSelect = (movie: Movie) => {
    setMovie(movie);
  };

  const closeModal = () => {
    setMovie(null);
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {data && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={data.results} />
      )}
      {movie && <MovieModal movie={movie} onClose={closeModal} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.total_pages > 1 && (
        <Pagination
          totalPages={data?.total_pages}
          page={currentPage}
          setPage={setCurrentPage}
        />
      )}

      <Toaster />
    </>
  );
}
