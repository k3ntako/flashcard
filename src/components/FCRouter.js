import React from 'react';
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';

import Home from './home/Home';
import FlashcardApp from './cards/FlashcardApp';






const FCRouter = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar} >
        <IndexRoute component={Home} />
        <Route path="/cards" component={FlashcardApp}/>
      </Route>
    </Router>
  )
}

export default FCRouter;


const NavBar = props => {
  return(
    <div>
      <nav className="nav">
        <div className="nav-center">
          <Link className="nav-k3ntako" to="/">K3ntako Flashcards</Link>
        </div>
      </nav>
      {props.children}
    </div>
  )
}
