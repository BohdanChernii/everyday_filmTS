import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router";

import {genresAction, moviesActions} from "../../redux";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";

import {IGenre, IMovie} from "../../interfaces";

import {Rating, Stack} from "@mui/material";
import StarIcon from '@mui/icons-material/Star'

import './Details.scss'

const Details = () => {

  const {state} = useAppLocation<IMovie>()
  const dispatch = useAppDispatch()
  const {genres,genre} = useAppSelector(state => state.genresReducer)
  const {page} = useAppSelector(state => state.moviesReducer)

  const {
    genre_ids, overview, original_language, original_title, popularity, title, vote_average, vote_count, poster_path
  } = state

  useEffect(() => {
    dispatch(genresAction.getGenres())
  }, [dispatch])

  const movieGenres = genres.filter((genre: IGenre) => genre_ids.includes(genre.id))

  const navigate = useNavigate()
  return (
    <div className={'details'}>
      <div className="details__left">
        <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" className={'details__left-poster'}/>
        <div className="details__left-info">
          <p>Language: {original_language}</p>
          <p>Votes: {vote_count}</p>
          <p>Vote Average: {vote_average}</p>
          <Stack spacing={1}>
            <Rating
              emptyIcon={<StarIcon style={{
                color:'white'
              }} fontSize="inherit" />}
              name="half-rating-read"  defaultValue={vote_average} precision={0.1} max={10} size={'large'} readOnly />
          </Stack>
        </div>
      </div>
      <div className="details__right">
        <h1 className="details__right-title">{title}</h1>
        <h3 className="details__right-subtitle">Original: {original_title}</h3>
        <p className="details__right-overview">{overview}</p>
        <div className="details__right-genres">
          {movieGenres?.map(genre => (<p key={genre.id}>{genre.name}</p>))}
        </div>
        <button
          className={'details__right-back'}
          onClick={() => {
            navigate(`/movies/?page=${page}`)

            if (genre !== null) {
              dispatch(moviesActions.getByGenres({page: page, genre: genre.id}))
            }
          }
        }>
          Back
        </button>
        <p className="details__right-popularity">Saw: {popularity}</p>
      </div>
    </div>
  );
};

export {Details};