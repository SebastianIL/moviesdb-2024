import { Meta, StoryFn } from '@storybook/react';
import { IMoviecard } from './types';
import MovieCard from './MovieCard';
import React from 'react'

const meta: Meta = {
    title: 'Components/MovieCard',
    component: MovieCard,
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: false,
                description: 'A MovieCard component',
                iFrameHeight: 400,
            },
        },
    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        voteAverage: { control: 'number' },
        posterpath: { control: 'text' },
    },
};

export default meta;

const Template: StoryFn<IMoviecard> = (args) => <MovieCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    posterpath: 'https://image.tmdb.org/t/p/w500/a2tys4sD7xzVaogPntGsT1ypVoT.jpg',
    title: 'Cocaine Bear',
    genreId: 53,
    movieId: 804150,
    voteAverage: 6.5,
};