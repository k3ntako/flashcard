import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/foundation.css';
import './stylesheets/app.scss';


import FCard from './components/FCard';
import NavButton from './components/NavButton';

ReactDOM.render(
  <FCard />,
  document.getElementById('app')
);

ReactDOM.render(
  <NavButton direction={"back"}/>,
  document.getElementById('nav-back')
);

ReactDOM.render(
  <NavButton direction={"show"}/>,
  document.getElementById('nav-show')
);

ReactDOM.render(
  <NavButton direction={"next"}/>,
  document.getElementById('nav-next')
);
