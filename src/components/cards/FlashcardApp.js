import React, { Component } from 'react';
import CardControl from './CardControl';
import Flashcards from './Flashcards';
import Week2 from '../../constants/decks/week2.js'


class FlashcardApp extends Component {
constructor(props) {
    super(props);

    this.state = {
      activeCardIdx: 0,
      activeDeck: {},
      lastIdx: 0
    };

    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.fetchDeck = this.fetchDeck.bind(this);
  }

  next(){
    if(this.state.activeCardIdx >= this.state.lastIdx){
      this.setState({ activeCardIdx: 0 });
    }else{
      this.setState({ activeCardIdx: this.state.activeCardIdx + 1 });
    }


  }
  back(){
    if(this.state.activeCardIdx <= 0){
      this.setState({ activeCardIdx: this.state.lastIdx });
    }else{

      this.setState({ activeCardIdx: this.state.activeCardIdx - 1 });
    }
  };

  fetchDeck(summary){
    let selectedDeckId = summary.selectedDeckId

    fetch(summary.decks[selectedDeckId].url)
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
      this.setState({activeDeck: data, lastIdx: data.cards.length -1})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  componentDidMount(){
    if(this.props.deckSummary.selectedDeckId){
      this.fetchDeck(this.props.deckSummary)
  }

  }
  componentWillReceiveProps(nextProps){
    this.fetchDeck(nextProps.deckSummary)
  }

  render(){
  let cardsPage = () => "Loading..."

  if(Object.keys(this.state.activeDeck).length > 0){
    cardsPage = () => {
      return (
        <div className="cards-page">
          <CardControl clickFunc={this.back} side="left"/>
          <Flashcards cardData = {this.state.activeDeck} activeIdx = {this.state.activeCardIdx} />
          <CardControl clickFunc={this.next} side="right"/>
        </div>
      )
    }
  }




    return(
      <div>{cardsPage()}</div>


    );
  }
};

export default FlashcardApp
