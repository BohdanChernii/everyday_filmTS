import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';

import {FC, useEffect, useState} from "react";
import {moviesActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const Slider: FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);


  const dispatch = useAppDispatch()

  const {popular} = useAppSelector(state => state.moviesReducer)

  const maxSteps = popular.length;

  useEffect(() => {
    dispatch(moviesActions.getPopular())
  }, [dispatch])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <h1 style={{
        marginLeft: '8%'
      }}>Popular Today</h1>

      <Box sx={{
        maxWidth: '1000px',
        height: '500px',
        position: 'relative',
        flexGrow: 1,
        width: '100%',
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'centre',
      }
      }>

        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {popular.map((step, index) => (
            <>
              <Typography
                sx={{
                  width: '100%',
                  height: '500px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '5%',
                  background: 'rgba(0,0,0,0.6)',
                  position: 'absolute',
                  color: 'red',
                  fontWeight: '900',
                  fontSize: '30px',

                }}
              >{step.title}</Typography>
              <Box
                sx={{
                  width: '100%',
                }}
              >

              </Box>
              <div key={step.title}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      objectFit: 'cover',
                      maxHeight: 500,
                      display: 'block',
                      maxWidth: '1000px',
                      overflow: 'hidden',
                      textAlign: 'centre',
                      width: '100%',
                    }}
                    src={`https://image.tmdb.org/t/p/original/${step.poster_path}`}
                  />
                ) : null}
              </div>
            </>
          ))}
        </AutoPlaySwipeableViews>

      </Box>
    </>);
}

export {Slider};