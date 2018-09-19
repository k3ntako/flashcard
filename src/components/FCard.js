import React, { Component } from 'react';
import FlashcardSection from "./FlashcardSection"
import NavButton from './NavButton';

class FCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: this.props.cardData,
      activeCardIdx: 0,
      lastIdx: this.props.cardData.length - 1
    };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);

  }
  next(){

    if(this.state.activeCardIdx < this.state.lastIdx){
      this.setState({ activeCardIdx: 0 });
    }else{
      this.setState({ activeCardIdx: this.state.activeCardIdx + 1 });
    }


  }
  back(){
    if(this.state.activeCardIdx < 0){
      this.setState({ activeCardIdx: this.state.lastIdx });
    }else{
      this.setState({ activeCardIdx: this.state.activeCardIdx - 1 });
    }

  }
  render(){
    let activeIdx = this.state.activeCardIdx
    let activeCardInfo = this.state.cardData.cards[activeIdx]
    console.log("hello", activeIdx, activeCardInfo)
    let key0 = activeIdx + "-" + "0"
    let key1 = activeIdx + "-" + "1"
    let key2 = activeIdx + "-" + "2"
    let key3 = activeIdx + "-" + "3"


    return(

      <div className="grid-y bob">
        <div className = "fcard cell small-11 large-10 grid-x grid-margin-x grid-margin-y">
          <FlashcardSection key = {key0} type={"Term"} cardInfo = {activeCardInfo}/>
          <FlashcardSection key = {key1} type={"Definition_1"} cardInfo = {activeCardInfo}/>
          <FlashcardSection key = {key2}type={"Definition_2"} cardInfo = {activeCardInfo}/>
          <FlashcardSection key = {key3} type={"Definition_3"} cardInfo = {activeCardInfo}/>
        </div>
        <div className="grid-x cell small-1 large-2 grid-margin-x">
          <NavButton direction={"back"} classNa={"small-4"} clickFunc={this.back}/>
          <NavButton direction={"home"} classNa={"small-4"}/>
          <NavButton direction={"next"} classNa={"small-4"} clickFunc={this.next}/>
        </div>
      </div>

    );
  }

};

export default FCard;
