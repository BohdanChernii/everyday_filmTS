import React from 'react';

import {setUpStore} from "./redux";

import {Provider} from "react-redux";

import {BrowserRouter} from "react-router-dom";

import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

const store = setUpStore()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>

);

