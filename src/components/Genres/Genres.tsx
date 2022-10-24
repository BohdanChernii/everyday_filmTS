import React, {useEffect, useState} from 'react';

import {genresAction, moviesActions} from "../../redux";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faXmark} from '@fortawesome/free-solid-svg-icons'

import {useAppDispatch, useAppSelector} from "../../hooks";

import {useNavigate} from "react-router";

import './Genres.scss'

const Genres = () => {
  const [collapse, setCollapse] = useState(false)
  const {genre, genres} = useAppSelector(state => state.genresReducer)

  const dispatch = useAppDispatch()
  const {color} = useAppSelector(state => state.themeReducer)

  useEffect(() => {
    dispatch(genresAction.getGenres())
  }, [dispatch])

  const navigate = useNavigate()

  return (

    <div className={'genres'}>
      <div className="genres__title">
        <h1 className={'genres__title-title'}>Choose genre </h1>
        {!collapse
          ? (<FontAwesomeIcon
            className={'genres__title-btn show'}
            icon={faXmark}
            onClick={() => setCollapse(!collapse)}/>)
          : (<FontAwesomeIcon
            className={'genres__title-btn close'}
            icon={faXmark}
            onClick={() => setCollapse(!collapse)}/>)}
      </div>
      {collapse && <div className="genres__container">
        {genres.map(genre => (
          <button
            style={{color: color}}
            key={genre.id}
            className="genres__container-btn"
            onClick={() => {
              navigate('/movies?page=1')
              dispatch(genresAction.getGenre(genre))
            }}>
            {genre.name}
          </button>
        ))}
        <div className="genres__container-reset">
          <button
            style={{color: color}}
            className="genres__container-btn"
            onClick={() => {
              dispatch(genresAction.getGenre(null))
              dispatch(moviesActions.setPage(1))
              navigate('/')
            }}>Reset
          </button>
        </div>

      </div>}
    </div>
  );
};

export {Genres};