import React, {FC, useEffect} from 'react';
import {Paper} from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moviesActions, moviesReducer} from "../../redux";

import './Slider.scss'

const Slider: FC = () => {

  const {popular} = useAppSelector(state => state.moviesReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(moviesActions.getPopular())
  }, [dispatch])

  return (

  <div className="coursel">
    <h1 className={'coursel__title'}>Popular Today</h1>
    <Carousel className={'slider'}>

      {popular.map((item, i) => (
        <Paper className={'slider__item'}>
          <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Movie"
               className={'slider__item-image'}/>
          <h2 className={'slider__item-name'}>{item.title}</h2>
        </Paper>
      ))}
    </Carousel>
  </div>

  );
}


export {Slider}