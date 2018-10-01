import React, { Component } from 'react';
import DeckTile from './DeckTile'

class DeckList extends Component {
constructor(props) {
    super(props);

    this.state = {

    };
  }

  render(){
    let userDecks = [
      {
        id : 1,
        name: "Week 1",
        mastery: {
          none: 0,
          learning: 0,
          almost: 0,
          mastered: 0
        }
      },
      {
        id : 2,
        name: "Week 2",
        mastery: {
          none: 0,
          learning: 0,
          almost: 0,
          mastered: 0
        }
      },
      {
        id : 3,
        name: "Week 3",
        mastery: {
          none: 0,
          learning: 0,
          almost: 0,
          mastered: 0
        }
      }
    ]

    let deckList = userDecks.map(deck => {
      let handleClick = () => { this.props.selectDeckFunc(deck.id) }

      let divId;
      if (this.props.selectedDeck === deck.id){
        divId = "deck-selected"
      }

      return(
        <DeckTile key={deck.id} divId= {divId} deckName = {deck.name} clickFunc={handleClick}/>
      )
    })
    return(
      <div>
        {deckList}
      </div>
    );
  }
};

export default DeckList
