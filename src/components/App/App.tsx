import toast, { Toaster } from 'react-hot-toast'
import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'
import 'modern-normalize'
import { useState } from 'react'
import { moviesRequest } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import MovieGrid from '../MovieGrid/MovieGrid'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieModal from '../MovieModal/MovieModal'
export default function App() {

  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (query: string) => {
    try {
      setIsError(false)
      setMovies([])
      setIsLoading(true)

      const moviesObject = await moviesRequest(query);

      if (!(moviesObject.length > 0)) {
        toast.error('No movies found for your request.')
        return
      }

      setMovies(moviesObject)

    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }

  }
  const selectMovie = (movie: Movie | null) => {
    setSelectedMovie(movie)
  }

  const closeModal = () => {
    selectMovie(null)
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieGrid movies={movies} onSelect={selectMovie} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </>
  )
}