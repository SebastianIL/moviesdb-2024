import React, {useState, useEffect} from 'react'
import { getNowPlaying } from '../../services/movies/getNowPlayingMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import { IMovieResponse } from './types';

export const NowPlaying: React.FC  = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);

  const getNowPlayingMovies = async() => {
    await getNowPlaying()
    .then((data) => {
      if(data && data.data) {
        setMovies(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getNowPlayingMovies();
}, []);

  return (
    <div className="App bg-black text-white p-8 border-4 border-gray-800">
      <h2 className="text-4xl font-bold text-green-600 my-4 underline decoration-double decoration-green-300">Now Playing</h2>     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies?.length > 0 &&
        movies.map((movie) => (
          <div key={movie.id} className="w-48 p-2">
            <MovieCard
              title={movie.title}
              genreId={movie.genre_ids[0]}
              movieId={movie.id}
              voteAverage={movie.vote_average}
              posterpath={movie.poster_path}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export default NowPlaying;