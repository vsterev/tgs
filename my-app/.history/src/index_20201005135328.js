import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/home';
import RepsAll from './components/reps-all';
import Login from './components/users/login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>{/* <Home />
    <RepsAll /> */}</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();