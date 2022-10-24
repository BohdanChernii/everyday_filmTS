import React, {FC} from 'react';

import {Navigate, Route, Routes} from "react-router";

import {MainLayout} from "./layouts";

import {DetailsPage, MoviesPage} from "./pages";

import {useAppSelector} from "./hooks";

import './App.css';

const App: FC = () => {
  const {background, color} = useAppSelector(state => state.themeReducer)
  return (
    <div className="App" style={{color:color,background:background}}>
      <div className="page">
        <Routes>
          <Route  path={'/'} element={<MainLayout/>}>
            <Route index element={<Navigate to={'/movies'}/>}/>
            <Route path={'/movies'} element={<MoviesPage/>}/>
            <Route path={'/movies/details'} element={<DetailsPage/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
