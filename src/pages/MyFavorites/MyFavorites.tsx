import React, {useEffect} from "react";
import { IMovieDetail } from "./types";
import MovieCard from "../../components/MovieCard/MovieCard";
import {getDetails} from "../../services/movies/getDetails";

const MyFavorites = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [shows, setShows] = React.useState<IMovieDetail[]>([]);
    const favorites : string = localStorage.getItem("favorites") || "";

    const runGetFavorites = async () => {
        if(favorites.length){
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(favoritesArray.map(async (favorite: string) => {
                return getDetails(String(favorite)).then((res) => {
                    if(res && res.data){
                        return res.data;
                    }
            }).catch((err) => {
                console.log(err);
            });
        }));
        setShows(newShows);
        setLoading(false);
    }};

    useEffect(() => {
        runGetFavorites();
    }, []);

    return (
        <div className="App bg-black text-white p-8 border-4 border-gray-800">
          <h2 className="text-4xl font-bold text-blue-600 decoration-double decoration-blue-300">My favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {!loading ? (
              favorites && favorites.length > 0 ? (
                shows.map((show: IMovieDetail) => (
                  <div key={show.id} className="p-2">
                    <MovieCard
                      title={show.title}
                      genreId={show.genres[0].id}
                      movieId={show.id}
                      voteAverage={show.vote_average}
                      posterpath={show.poster_path}
                    />
                  </div>
                ))
              ) : (
                <div>No hay favoritos</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      );
      
};

export default MyFavorites;