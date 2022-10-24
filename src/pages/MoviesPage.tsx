import React, {FC} from 'react';

import {Genres, Movies} from "../components";

const MoviesPage: FC = () => {
  return (
    <div>
      <Genres/>
      <Movies/>
    </div>
  );
};

export {MoviesPage};