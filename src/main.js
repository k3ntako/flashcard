import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/foundation.css';
import './stylesheets/standard.scss';
import './stylesheets/app.scss';
import './stylesheets/home.scss';

import FCRouter from './components/FCRouter';


ReactDOM.render(
    <FCRouter />,
    document.getElementById('app')
  );
