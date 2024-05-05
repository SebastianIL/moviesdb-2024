import React from 'react'
import {IMoviecard } from './types'
import Pill from '../Pill/pill'
import { IMAGE_SOURCE } from '../../constants/moviesMock'
import genres from '../../constants/genres.json'
import { useNavigate } from 'react-router-dom'
import {ROUTES} from '../../routes/constants'
const MovieCard: React.FC<IMoviecard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterpath,
}) => {
    const navigate = useNavigate();
    // state
    const poster = IMAGE_SOURCE + posterpath;
    const getGenre = (genreId: number) => {
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);
        if (key) {
            return key.name;
        }
        return "Not classified";
    }
    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, { state: { movieName } }); // /show/82
    }
    return (
        <div className="w-64 rounded overflow-hidden shadow-lg" 
            onClick={() => {
                navigateMovies(movieId, title);
            }}>
            <img className="w-full rounded transition-all duration-700 hover:scale-105" src={poster} alt='poster' />
            <div className="p-2">
                <p className="text-gray-600 text-xs"><Pill genre={getGenre(genreId)} /></p>
                <p className="text-lg font-semibold">{title}</p>
                <p className="text-gray-500 text-xs">* {voteAverage} / 10</p>
            </div>
        </div>
    )
}

export default MovieCard;
