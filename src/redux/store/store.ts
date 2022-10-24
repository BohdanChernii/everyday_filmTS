import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {genresReducer} from "../slices/genre.slice";

import {moviesReducer} from "../slices/movies.slice";

import {themeReducer} from "../slices/theme.slice";

const rootReducer = combineReducers({
  genresReducer,
  moviesReducer,
  themeReducer
})

const setUpStore = () => configureStore({
  reducer: rootReducer
})

export {
  setUpStore
}

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setUpStore>
type AppDispatch = AppStore['dispatch']

export type {
  AppDispatch,
  RootState,
  AppStore,
}


