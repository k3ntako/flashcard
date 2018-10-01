import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';

import Home from './home/Home';
import FlashcardApp from './cards/FlashcardApp';

class FCRouter extends Component {
constructor(props) {
    super(props);
    this.state = {
      selectedDeck: null
    };
    this.setSelectedDeck = this.setSelectedDeck.bind(this);
  }

  setSelectedDeck(id){
    this.setState({selectedDeck: id})
  }

  render(){
    return(
      <Router history={browserHistory}>
        <Route path='/' component={NavBar} >
          <IndexRoute component={() =>
            <Home
              selectDeckFunc={this.setSelectedDeck}
              selectedDeck= {this.state.selectedDeck}
              />
            }
          />
          <Route path="/cards" component={() =>
            <FlashcardApp
              selectedDeck = {this.state.selectedDeck}
              />
            }
          />
          <Route path="*" component={ErrorPage}/>
        </Route>
      </Router>
    )
  }
}

//Seems like there is a better way to pass props in React-Router v4
//https://tylermcginnis.com/react-router-pass-props-to-components/



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

const ErrorPage = props => {
  return(
    <div className="error-page">
      <h1>Error 404</h1>
      <h3 className="error-message">Page was not found. Go back to <Link to="/">K3ntako Flashcards</Link>.</h3>
    </div>
  )
}
