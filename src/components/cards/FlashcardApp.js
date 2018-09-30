import React, { Component } from 'react';
import CardControl from './CardControl';
import Flashcards from './Flashcards';
import Week2 from '../../constants/decks/week2.js'


class FlashcardApp extends Component {
constructor(props) {
    super(props);

    this.state = {
      activeCardIdx: 0,
      lastIdx: Week2.cards.length - 1
    };

    this.next = this.next.bind(this);
    this.back = this.back.bind(this);

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



  render(){

    if (localStorage.length === 0){
      localStorage.setItem("Test", JSON.stringify(Week2))
    };
    let deck = JSON.parse(localStorage.Test)



    return(
      <div className="cards-page">
        <CardControl clickFunc={this.back} side="left"/>
        <Flashcards cardData = {deck} activeIdx = {this.state.activeCardIdx} />
        <CardControl clickFunc={this.next} side="right"/>
      </div>
    );
  }
};

export default FlashcardApp
