import React, {useState, useEffect} from 'react'
import { getPopular } from '../../services';
import MovieCard from '../../components/MovieCard/MovieCard';
import { IMovieResponse } from './types';

export const Popular: React.FC  = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  const getPopularMovies = async() => {
    await getPopular()
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
    getPopularMovies();
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

export default Popular;