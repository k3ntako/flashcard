import React, { Component } from 'react';
import Card from "./Card"
import MasteryButton from './MasteryButton';

class Flashcards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.props.cardData,
      showAll: false
    };
    this.setMastery = this.setMastery.bind(this);
    this.saveToFile = this.saveToFile.bind(this);
    this.toggleShow = this.toggleShow.bind(this);

  }

  setMastery(event) {
    let buttonId = event.target.attributes.id.value;
    let newMastery = buttonId.replace(/-button/g,"")

    let json = this.state.deck
    json.cards[this.props.activeIdx].Mastery = newMastery

    this.saveToFile(json)
  }

  saveToFile(updatedDeck){
    console.log("fc save", updatedDeck)
    let jsonStringData = JSON.stringify(updatedDeck);

    fetch(updatedDeck.url, {
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

  toggleShow(){
    console.log("hello")
    this.setState({showAll: !this.state.showAll})
  }

componentWillReceiveProps(){
  this.setState({showAll: false})

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
      console.log("Inside", this.state.showAll)
      return(
        <Card
          key={uniqueKey}
          type={objectKey}
          cardInfo = {activeCardInfo.Definitions}
          show = {this.state.showAll}
        />
      )
    })

    let toggleClass = "far "
    if(this.state.showAll){
      toggleClass += "fa-eye-slash"
    }else{
      toggleClass += "fa-eye"
    }

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

        <div id="toggle">
          <i onClick={this.toggleShow} className={toggleClass} title="Toggle Show"></i>
        </div>
      </div>

    );
  }

};

export default Flashcards;
