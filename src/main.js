import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/foundation.css';
import './stylesheets/app.scss';


import FCard from './containers/FCard';
import TopNavBar from './containers/TopNavBar';


import data from './constants/data.js';


class Flashcards extends Component {
constructor(props) {
    super(props);

    this.state = {
      activeCardIdx: 0,
      lastIdx: data.cards.length - 1
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
    return(
      <div>
        <TopNavBar clickFuncNext={this.next} clickFuncBack={this.back}/>
        <FCard cardData = {data} activeIdx = {this.state.activeCardIdx}/>
      </div>
    );
  }
};

ReactDOM.render(
  <Flashcards />,
  document.getElementById('app')
);
