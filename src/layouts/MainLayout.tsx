import React from 'react';

import {Footer, Header} from "../components";

import {Outlet} from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export {MainLayout};