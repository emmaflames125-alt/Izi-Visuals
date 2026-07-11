import React from "react";

import ReactDOM from "react-dom/client";


import {
  BrowserRouter
} from "react-router-dom";


import App from "./App.jsx";


import Providers from "./context/providers.jsx";


import "./index.css";

import "./components/components.css";





/*
|--------------------------------------------------------------------------
| Application Entry Point
|--------------------------------------------------------------------------
*/


ReactDOM

  .createRoot(

    document.getElementById(
      "root"
    )

  )

  .render(


    <React.StrictMode>


      <BrowserRouter>


        <Providers>


          <App />


        </Providers>


      </BrowserRouter>


    </React.StrictMode>


  );