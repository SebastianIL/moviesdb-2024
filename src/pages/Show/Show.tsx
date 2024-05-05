import { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { getDetails } from '../../services/movies/getDetails';
import { IMovieDetail } from '../MyFavorites/types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { getRecommendations } from '../../services/movies/getRecommendations';
import { IMovieResponse } from '../Popular/types';
import MovieCard from '../../components/MovieCard/MovieCard';
const Show = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [isfavorite, setIsFavorite] = useState<boolean>();
    
    const [favorites, setFavorites] = useState<string>('');
    const [details, setDetails] = useState<IMovieDetail>();
    const [recommendations, setRecommendations] = useState<IMovieResponse[]>([]);

    const goBack = ()=> {
        navigate(-1);
    };

    const addFavorite = () => {
          const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
          const newFavorites = [...favs, id];
          setFavorites(JSON.stringify(newFavorites));
          setIsFavorite(true);
          localStorage.setItem('favorites', JSON.stringify(newFavorites) )
    };

    const getDetailsData = async() => {
        await getDetails(String(id))
        .then((data) => {
          if(data && data.data) {
            setDetails(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      };
    
    const getRecommendationsMovies = async() => {
        await getRecommendations(String(id))
        .then((data) => {
          if(data && data.data) {
            setRecommendations(data.data.results);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [] ;
        let newFavorites = [...favs];
        newFavorites =  newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites) )
    };



    useEffect(()=>{
        const favs = localStorage.getItem('favorites') ||'';
        setFavorites(favs);
        if(favs.includes(String(id))){
            setIsFavorite(true);
        }
        getDetailsData();
        getRecommendationsMovies();
    })
    return (
      <div className="bg-black text-white p-8">
      <div className="movie-details-container max-w-6xl mx-auto flex flex-wrap md:flex-nowrap">
        <div className="movie-poster flex-shrink-0 w-full md:w-1/3">
          <img src={IMAGE_SOURCE + details?.poster_path} alt={`${details?.title} poster`} className="rounded-lg shadow-md mb-4 md:mb-0" />
        </div>
        <div key={details?.id} className="movie-detail-card bg-gray-800 p-4 rounded-lg shadow-lg w-full md:w-2/3 md:ml-8">
          <h2 className="movie-title text-3xl font-bold text-red-600 mb-2">{details?.title}</h2>
          <p className="movie-tagline italic text-gray-400">{details?.tagline}</p>
          <p className="movie-overview mb-4">{details?.overview}</p>
          <div className="movie-additional-details space-y-2">
            <span className="movie-genres block">
              Genres: <span className="text-red-500">{details?.genres.map((genre) => genre.name).join(', ')}</span>
            </span>
            <span className="movie-runtime block">Runtime: <span className="text-red-500">{details?.runtime} minutes</span></span>
            <span className="movie-release-date block">Release Date: <span className="text-red-500">{details?.release_date}</span></span>
            <span className="movie-vote-average block">Rating: <span className="text-red-500">{details?.vote_average} / 10</span></span>
          </div>
        </div>
      </div>
          <div className="flex justify-center space-x-4 my-4">
            <button onClick={goBack} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">Go Back</button>
            {isfavorite ? (
              <button onClick={removeFavorite} className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition duration-300">Remove from Favorites</button>
            ) : (
              <button onClick={addFavorite} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition duration-300">Add to Favorites</button>
            )}
          </div>
          <h2 className="text-4xl font-bold text-grey-600 decoration-double decoration-grey-300">Recommendations</h2>
          <br/>
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {recommendations?.length > 0 &&
                recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="min-w-max">
                    <MovieCard
                      title={recommendation.title}
                      genreId={recommendation.genre_ids[0]}
                      movieId={recommendation.id}
                      voteAverage={recommendation.vote_average}
                      posterpath={recommendation.poster_path}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    
}

export default Show