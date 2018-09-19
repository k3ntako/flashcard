import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/foundation.css';
import './stylesheets/app.scss';


import FCard from './components/FCard';

import data from './constants/data.js';
// import NavButton from './components/NavButton';

ReactDOM.render(
  <FCard cardData = {data}/>,
  document.getElementById('app')
);
