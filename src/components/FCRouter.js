import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';

import Home from './home/Home';
import FlashcardApp from './cards/FlashcardApp';
import Edit from './edit/edit';


class FCRouter extends Component {
constructor(props) {
    super(props);
    this.state = {
      // selectedDeck: null,
      summary: {}
    };
    this.setSelectedDeck = this.setSelectedDeck.bind(this);
    this.fetchSummary = this.fetchSummary.bind(this);
  }

  setSelectedDeck(id){
    // this.setState({selectedDeck: id})
    this.saveSummaryToFile(id)
  }

  fetchSummary(){
    fetch("/api/v1/decks/summary")
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      console.log('response.status:', response.status);
      console.log('response.statusText:', response.statusText);
      return response.json();
    })
    .then(data => {
      this.setState({summary: data})
      // console.log(data)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  saveSummaryToFile(selectedDeckId){
    let updatedDeck = this.state.summary
    updatedDeck.selectedDeckId = selectedDeckId
    let jsonStringData = JSON.stringify(updatedDeck);

    fetch("/api/v1/decks/summary", {
      method: 'post',
      body: jsonStringData
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({summary: body});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    this.fetchSummary()
  }

  render(){
    return(
      <Router history={browserHistory}>
        <Route path='/' component={NavBar} >
          <IndexRoute component={() =>
            <Home
              selectDeckFunc={this.setSelectedDeck}
              selectedDeck= {this.state.summary.selectedDeckId}
              />
            }
          />
          <Route path="/cards" component={() =>
            <FlashcardApp
              selectedDeck = {this.state.summary.selectedDeckId}
              deckSummary = {this.state.summary}
              />
            }
          />
        <Route path="/edit" component={() =>
            <Edit
              selectedDeck = {this.state.summary.selectedDeckId}
              deckSummary = {this.state.summary}
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
