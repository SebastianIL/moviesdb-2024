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
        <div className="flex justify-center">
            {!loading ? (
                <div>
                    <div>Favoritos</div>
                    {favorites && favorites.length > 0 ? (
                        <div>
                            {shows && shows.map((show: IMovieDetail) => (
                                <MovieCard
                                    key={show.id}
                                    title={show.title}
                                    genreId={show.genres[0].id}
                                    movieId={show.id}
                                    voteAverage={show.vote_average}
                                    posterpath={show.poster_path}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>No hay favoritos</div>
                    )}
                </div>
            ):(
                <div>Loading...</div>
            )}
        </div>
    );
};

export default MyFavorites;