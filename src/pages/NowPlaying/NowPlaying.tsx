import React, {useState, useEffect} from 'react'
import { getNowPlaying } from '../../services/movies/getNowPlayingMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import { IMovieResponse } from './types';

export const NowPlaying: React.FC  = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNowPlayingMovies = async() => {
    await getNowPlaying()
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
    getNowPlayingMovies();
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

export default NowPlaying;