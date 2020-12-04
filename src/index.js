import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import './assets/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/style.css";
import './assets/scss/main.scss';

import App from "./router/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,document.getElementById('root')
);