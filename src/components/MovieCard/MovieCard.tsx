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
    const getGenre = (genreId: number)=>{
        const key= Object.values(genres.genres).find(genre => genre.id ===genreId);
        if(key){
            return key.name;
        }
        return "Not classified";
    }
    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, {state: {movieName}}); // /show/82
    }
  return (

    <div className="max-w-sm rounded overflow-hidden shadow-lg" 
        onClick={()=> {
            navigateMovies(movieId,title);
        }}>
 
        <img className="rounded transition-all duration-700 hover:scale-105" src={poster} alt='poster' />
        <div className="p-1">
            <p className="text-gray-600 text-sm"><Pill genre={getGenre(genreId)}/></p>
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-gray-500 text-sm">* {voteAverage} / 10</p>
        </div>
    </div>
    // <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-3">
    //     <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-x1 transform-gpu">
    // <img
    //     className="absolute inset-0 h-full w-full object-cover object-center transition hover:scale-110"
    //     src={poster}
    //     alt="poster"
    // />
    // <div className="absolute inset-0 bg-black/0"></div>
    //     <div className="p-6 relative flex flex-col justify-end">
    //         <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
    //           <Pill genre={getGenre(genreId)}/>
    //         </h4>
    //         <h3 className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
    //             {title}
    //         </h3>
    //         <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">
    //             * {voteAverage} / 10
    //         </h4>
    //     </div>
    //     </div>
    // </div>

  )
}

export default MovieCard;
