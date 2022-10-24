import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {moviesService} from "../../service";

import {AxiosError} from "axios";

import {IGenre, IMovie} from "../../interfaces";

interface IState<IMovie> {
  page: number
  movies: IMovie[] | []
  loading: boolean
  filterParam: string
}

interface IGet {
  page: string | null
}

interface IGenreFilter {
  page: number | string | null,
  genre: number | null,
}

interface ISearchParamFilter {
  page: number | string | null,
  searchParam: string
}

const initialState: IState<IMovie> = {
  page: 1,
  movies: [],
  loading: false,
  filterParam: '',
}

const getMovies = createAsyncThunk<IMovie[], IGet>(
  'moviesSlice/getMovies',
  async ({page}, {rejectWithValue}) => {
    try {
      const {data} = await moviesService.changePage(page)
      return data.results
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err.response?.data)
    }
  }
)

const getByGenres = createAsyncThunk<IMovie[], IGenreFilter>(
  'moviesSlice/getByGenres',
  async ({page, genre}, {rejectWithValue}) => {
    try {
      if (genre) {
        const {data} = await moviesService.getByGenres(page, genre)
        return data.results
      }
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err.response?.data)
    }
  }
)


const getBySearchParam = createAsyncThunk<IMovie[], ISearchParamFilter>(
  'moviesSlice/getBySearchParams',
  async ({page, searchParam}, {rejectWithValue}) => {
    try {
      const {data} = await moviesService.getBySearchParams(page, searchParam)
      return data.results
    } catch (e) {
      const err = e as AxiosError
      return rejectWithValue(err.response?.data)
    }
  }
)


const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1
    },
    prevPage: (state) => {
      state.page -= 1
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setFilterParam: (state, action) => {
      state.filterParam = action.payload
    },

  },
  extraReducers: builder =>
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload
      state.loading = false
    }).addCase(getMovies.pending, (state, action) => {
      state.loading = true
    }).addCase(getBySearchParam.fulfilled, (state, action) => {
      state.movies = action.payload
    })
      .addCase(getByGenres.fulfilled, (state, action) => {
        state.movies = action.payload
        state.loading = false
      }).addCase(getByGenres.pending, (state) => {
      state.loading = true
    })

})

const {
  reducer: moviesReducer,
  actions: {nextPage, prevPage, setPage, setFilterParam,}
} = moviesSlice

const moviesActions = {
  nextPage,
  prevPage,
  getMovies,
  setPage,
  setFilterParam,
  getBySearchParam,
  getByGenres
}
export {moviesActions, moviesSlice, moviesReducer}