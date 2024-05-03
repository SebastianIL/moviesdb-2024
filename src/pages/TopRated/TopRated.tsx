import React, {useState, useEffect} from 'react'
import { getTopRated } from '../../services/movies/getTopRatedMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import { IMovieResponse } from './types';

export const TopRated: React.FC  = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  const getTopRatedMovies = async() => {
    await getTopRated()
    .then((data) => {
      if(data && data.data) {
        setMovies(data.data.results);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getTopRatedMovies();
}, []);

  return (
    <div>
      {movies?.length > 0 && movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          genreId={movie.genre_ids[0]}
          movieId={movie.id}
          voteAverage={movie.vote_average}
          posterpath={movie.poster_path}
        />
      ))}
    </div>
  );
}

export default TopRated;