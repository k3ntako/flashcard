import React, { Component } from 'react';
import Card from "./Card"
import MasteryButton from './MasteryButton';

class Flashcards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.props.cardData
    };
    this.setMastery = this.setMastery.bind(this);
    this.saveToFile = this.saveToFile.bind(this);
  }

  setMastery(event) {
    let buttonId = event.target.attributes.id.value;
    let newMastery = buttonId.replace(/-button/g,"")

    let json = this.state.deck
    json.cards[this.props.activeIdx].Mastery = newMastery

    this.saveToFile(json)
  }

  saveToFile(updatedDeck){
    let jsonStringData = JSON.stringify(updatedDeck);

    fetch("/api/v1/decks/week2", {
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
      this.setState({deck: body});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let key0 = activeIdx + "-" + "0"
    let key1 = activeIdx + "-" + "1"
    let key2 = activeIdx + "-" + "2"
    let key3 = activeIdx + "-" + "3"

    let activeIdx = this.props.activeIdx
    let activeCardInfo = this.state.deck.cards[activeIdx];
    let mastery = activeCardInfo.Mastery;

    let definitionCards = Object.keys(activeCardInfo.Definitions).map(objectKey => {
      let uniqueKey = activeIdx + objectKey
      return(
        <Card
          key={uniqueKey}
          type={objectKey}
          cardInfo = {activeCardInfo.Definitions}
          show = {false}
        />
      )
    })

    return(
      <div className="css-grid-container cards-container">
        <div className = "flashcards">
          <Card
            key = {key0}
            type={"Term"}
            cardInfo = {activeCardInfo}
            show = {true}
            mastery={mastery}
            idName="term"
          />

          {definitionCards}
        </div>

        <div className="css-grid-container card-control-bar">
          <MasteryButton direction={"learning"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"almost"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"mastered"} clickFunc={this.setMastery}/>
        </div>
      </div>

    );
  }

};

export default Flashcards;
