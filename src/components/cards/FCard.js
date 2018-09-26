import React, { Component } from 'react';
import FlashcardSection from "./FlashcardSection"
import MasteryButton from './MasteryButton';

class FCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.props.cardData
    };
    this.setMastery = this.setMastery.bind(this);
  }



  setMastery(event) {
    let buttonId = event.target.attributes.id.value;
    let newMastery = buttonId.replace(/-button/g,"")


    let json = JSON.parse(localStorage.Test)
    json.cards[this.props.activeIdx].Mastery = newMastery
    localStorage.setItem("Test", JSON.stringify(json))


    this.setState({deck: json});
  }

  render(){

    let activeIdx = this.props.activeIdx
    let activeCardInfo = this.state.deck.cards[activeIdx]
    let mastery = activeCardInfo.Mastery



    let key0 = activeIdx + "-" + "0"
    let key1 = activeIdx + "-" + "1"
    let key2 = activeIdx + "-" + "2"
    let key3 = activeIdx + "-" + "3"


    let definitionCards = Object.keys(activeCardInfo.Definitions).map(objectKey => {

      let uniqueKey = activeIdx + objectKey
      return(
          <FlashcardSection key={uniqueKey} type={objectKey} cardInfo = {activeCardInfo.Definitions} show = {false}/>
      )

    })
    console.log("A",activeCardInfo)

    return(
      <div className="css-grid-container container">

        <div className = "fcard">
          <FlashcardSection key = {key0} type={"Term"} cardInfo = {activeCardInfo} show = {true} mastery={mastery} idName="term"/>

          {definitionCards}

        </div>



        <div className="css-grid-container nav-bar">
          <MasteryButton direction={"learning"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"almost"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"mastered"} clickFunc={this.setMastery}/>
        </div>
      </div>

    );
  }

};

export default FCard;
