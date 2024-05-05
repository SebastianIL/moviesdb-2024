import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard'
import { getPopular } from '../../services';
import { IMovieResponse } from '../Popular/types';
import { getTopRated } from '../../services/movies/getTopRatedMovies';
import { getNowPlaying } from '../../services/movies/getNowPlayingMovies';

const Home = () => {
  const [popular, setPopular] = useState<IMovieResponse[]>([]);
  const [topRated, setTopRated] = useState<IMovieResponse[]>([]);
  const [nowPlaying, setNowPlaying] = useState<IMovieResponse[]>([]);
  const getPopularMovies = async() => {
    await getPopular()
    .then((data) => {
      if(data && data.data) {
        setPopular(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getTopRatedMovies = async() => {
    await getTopRated()
    .then((data) => {
      if(data && data.data) {
        setTopRated(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getNowPlayingMovies = async() => {
    await getNowPlaying()
    .then((data) => {
      if(data && data.data) {
        setNowPlaying(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
}, []);

return (
  <div className="App bg-black text-white p-8 border-4 border-gray-800">
    <h2 className="text-4xl font-bold text-red-600 my-4 underline decoration-wavy decoration-red-300">Popular</h2>
    <div className="overflow-x-auto custom-scrollbar">
    <div className="flex space-x-4">
        {popular?.length > 0 &&
        popular.map((movie) => (
          <div key={movie.id} className="min-w-max">
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
    <h2 className="text-4xl font-bold text-yellow-500 my-4 underline decoration-dotted decoration-yellow-300">Top Rated</h2>
    <div className="overflow-x-auto">
      <div className="flex space-x-4">
        {topRated?.length > 0 &&
        topRated.map((movie) => (
          <div key={movie.id} className="min-w-max">
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
    <h2 className="text-4xl font-bold text-green-600 my-4 underline decoration-double decoration-green-300">Now Playing</h2>
    <div className="overflow-x-auto">
      <div className="flex space-x-4">
        {nowPlaying?.length > 0 &&
        nowPlaying.map((movie) => (
          <div key={movie.id} className="min-w-max">
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
  </div>
);

};

export default Home;