import {createSlice} from "@reduxjs/toolkit";

interface IThemeState {
  background: string
  color: string
}

const initialState: IThemeState = {
  background: '#18171B',
  color: 'white',
}

const themePicker = createSlice({
  name: 'themePicker', initialState, reducers: {
    setLightTheme: (state) => {
      state.background = '#ffdead'
      state.color = 'black'
    }, setDarkTheme: (state) => {
      state.background = '#18171B'
      state.color = 'white'
    }
  }
})

const {reducer: themeReducer, actions: {setLightTheme, setDarkTheme}} = themePicker

const themeAction = {
  setLightTheme, setDarkTheme
}


export {themeAction, themeReducer, themePicker}