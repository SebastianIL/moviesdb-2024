import React from 'react';
import Slider from 'react-slick';
import MovieCard from '../../components/MovieCard/MovieCard'
import { movies } from '../../constants/moviesMock'

const Home = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="App">
        {movies.map((movie, index) => (
          <div key={index}>
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
  );
};

export default Home;
