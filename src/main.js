import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/foundation.css';
import './stylesheets/app.scss';
import './stylesheets/home.scss';

import App from './components/cards/App';
import Home from './components/home/Home';

// import data from './constants/data.js';
import Week2 from './constants/decks/week2.js'


if(document.getElementById('app')){
  ReactDOM.render(
    <App data = {Week2} />,
    document.getElementById('app')
  );

}else if (document.getElementById('homepage')) {
  ReactDOM.render(
    <Home />,
    document.getElementById('homepage')
  );
}
