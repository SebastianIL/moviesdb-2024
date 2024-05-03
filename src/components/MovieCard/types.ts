export interface IMoviecard{
    /**
     * Title of the Movie
     */
    title: string;
    /**
     * Genre of the Movie
     */
    genreId: number;
    /**
     * Id of the Movie
     */
    movieId: number;
    /**
     * VoteAverage of the Movie
     */
    voteAverage: number;
    /**
     * Posterpath of the Movie
     */
    posterpath: string;
}

export interface IGenre {
    id: number;
    name: string;
}