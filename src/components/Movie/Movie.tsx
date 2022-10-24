import React, {FC, useEffect, useState} from 'react';

import {useNavigate} from "react-router";

import {genresAction} from "../../redux";

import {IGenre, IMovie} from "../../interfaces";

import {useAppDispatch, useAppSelector} from "../../hooks";

import {Rating, Stack} from '@mui/material';

import StarIcon from '@mui/icons-material/Star'

import './Movie.scss'

type IProps = {
  movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
  const {title, genre_ids, release_date, poster_path, vote_average} = movie
  const {genres} = useAppSelector(state => state.genresReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(genresAction.getGenres())
  }, [dispatch])

  const badge = genres.filter(genre => genre_ids.includes(genre.id)).map(item => item.name)
  const navigate = useNavigate()
  badge.length = 2

  return (
    <div className={'movie'}>

      <img className={'movie__poster'}
           src={`https://image.tmdb.org/t/p/original/${poster_path}`}
           alt="Poster"
           onClick={() => navigate('details', {state: movie})}
      />

      <div className="movie__badge">
        {badge.map((item, index) => (
          <p key={index} className="movie__badge-item">{item}</p>
        ))}
      </div>

      <div className="movie__info">
        <h2 className={'movie__info-title'}>{title}</h2>
        <p className={'movie__info-date'}>Release Date: {release_date}</p>
        <p className={'movie__info-rating'}>Rating: {vote_average}</p>
        <Stack spacing={1} className={'movie__info-star'}>
          <Rating
            emptyIcon={<StarIcon style={{
              color: 'white'
            }} fontSize="inherit"/>}
            name="half-rating-read" defaultValue={vote_average} precision={0.1} max={10} size={'large'} readOnly/>
        </Stack>
      </div>

    </div>
  );

};

export {Movie};