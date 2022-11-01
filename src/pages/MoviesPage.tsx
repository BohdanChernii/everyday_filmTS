import React, {FC} from 'react';

import {Genres, Movies, Slider,} from "../components";


const MoviesPage: FC = () => {
  return (
    <div>
      <Slider/>
      <Genres/>
      <Movies/>
    </div>
  );
};

export {MoviesPage};