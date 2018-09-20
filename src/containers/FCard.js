import React, { Component } from 'react';
import FlashcardSection from "../Components/FlashcardSection"
import MasteryButton from '../Components/MasteryButton';

class FCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mastery:  this.props.cardData.cards[this.props.activeIdx].Mastery
      // cardData: this.props.cardData,
      // activeCardIdx: 0,
      // lastIdx: this.props.cardData.cards.length - 1
    };
    this.setMastery = this.setMastery.bind(this);
  }

  setMastery(event) {
    let buttonId = event.target.attributes.id.value;
    let newMastery = " " + buttonId.replace(/-button/g,"")

    this.setState({mastery: newMastery});
  }

  render(){
    let activeIdx = this.props.activeIdx
    let activeCardInfo = this.props.cardData.cards[activeIdx]

    let key0 = activeIdx + "-" + "0"
    let key1 = activeIdx + "-" + "1"
    let key2 = activeIdx + "-" + "2"
    let key3 = activeIdx + "-" + "3"

    console.log(this.props.cardData.cards[this.props.activeIdx].Mastery)

    return(


      <div className="grid-y container">



        <div className = "fcard cell small-10 large-10 grid-x grid-margin-x grid-margin-y">
          <FlashcardSection key = {key0} type={"Term"} cardInfo = {activeCardInfo} show = {true} mastery={this.state.mastery}/>
          <FlashcardSection key = {key1} type={"Definition_1"} cardInfo = {activeCardInfo} show = {false}/>
          <FlashcardSection key = {key2}type={"Definition_2"} cardInfo = {activeCardInfo} show = {false}/>
          <FlashcardSection key = {key3} type={"Definition_3"} cardInfo = {activeCardInfo} show = {false}/>
        </div>


        <div className="grid-x cell small-1 large-1 grid-margin-x nav-bar">
          <MasteryButton direction={"learning"} classNa={"small-4"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"almost"} classNa={"small-4"} clickFunc={this.setMastery}/>
          <MasteryButton direction={"mastered"} classNa={"small-4"} clickFunc={this.setMastery}/>
        </div>
      </div>

    );
  }

};

export default FCard;
