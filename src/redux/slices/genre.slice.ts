import {createAsyncThunk, createSlice, Dispatch} from "@reduxjs/toolkit";

import {genresService} from "../../service";
import {AxiosError} from "axios";
import {IGenre} from "../../interfaces";


interface IGenresState<IGenre> {
  genres: IGenre[]
  genre: IGenre | null
  loading: boolean
}

const initialState: IGenresState<IGenre> = {
  genres: [],
  genre: null,
  loading: false,
}


const getGenres = createAsyncThunk<IGenre[], void>(
  'genresSlice/getGenres',

  async (_, {rejectWithValue}) => {
    try {
      const {data} = await genresService.get()
      return data.genres
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err.response?.data)
    }
  }
)

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {
      getGenre: (state, action) => {
        state.genre = action.payload
      }
    },

    extraReducers: builder =>
      builder
        .addCase(getGenres.fulfilled, (state, action) => {
          state.genres = action.payload
          state.loading = false
        })
        .addCase(getGenres.pending, (state) => {
          state.loading = true
        })
        .addCase(getGenres.rejected, (state) => {
          state.loading = false
        })
  }
)
const {reducer: genresReducer, actions: {getGenre}} = genresSlice

const genresAction = {
  getGenres,
  getGenre
}
export {genresReducer, genresSlice, genresAction}