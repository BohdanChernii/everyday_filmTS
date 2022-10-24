import React, {useState, useEffect, FC} from 'react';
import {useSearchParams} from "react-router-dom";

import {genresAction, moviesActions} from "../../redux";

import {useAppDispatch, useAppSelector} from "../../hooks";

import {Movie} from "../Movie/Movie";
import {Pagination} from "../Pagination/Pagination";

import './Movies.scss'

const Movies: FC = () => {
  const {page, loading, filterParam} = useAppSelector(state => state.moviesReducer)
  const {movies} = useAppSelector(state => state.moviesReducer)
  const {genre} = useAppSelector(state => state.genresReducer)

  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page")
  const dispatch = useAppDispatch()

  useEffect(() => {
    moviesActions.setPage(queryPage)
    dispatch(moviesActions.getMovies({page: queryPage}))

    if(filterParam){
      dispatch(moviesActions.getBySearchParam({page: queryPage, searchParam: filterParam}))
    }

    if (filterParam === '') {
      dispatch(moviesActions.getMovies({page: queryPage}))
    }

    if (genre !== null) {
      dispatch(moviesActions.getByGenres({page: queryPage, genre: genre.id}))
    }

  }, [dispatch, page, queryPage,filterParam, queryPage,genre ])

  return (
    <>
      {loading
        ? (<div className={'loader'}></div>)
        : (<div className={'movies'}>
        {movies.map(movie => (<Movie
          key={movie.id} movie={movie}/>))}
      </div>)}
      {filterParam !== '' &&
        <div className={'movies__reset'}>
          <button
            onClick={() => dispatch(moviesActions.setFilterParam(''))}>
            Go to movies
          </button>
        </div>
      }
      <Pagination queryPage={queryPage}/>
      <a href="#" target="_top" className={'moveUp'}>Move Up</a>
    </>
  );
};

export {Movies};