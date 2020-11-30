import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'bootstrap/dist/css/bootstrap.css';

import App from "./router/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,document.getElementById('root')
);