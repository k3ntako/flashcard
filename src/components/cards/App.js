import React, { Component } from 'react';
import TopNavBar from './TopNavBar';
import FCard from './FCard';

class App extends Component {
constructor(props) {
    super(props);

    this.state = {
      activeCardIdx: 0,
      lastIdx: props.data.cards.length - 1
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
      localStorage.setItem("Test", JSON.stringify(this.props.data))
    };
    let deck = JSON.parse(localStorage.Test)



    return(
      <div className="containerOverall">
        <TopNavBar clickFuncNext={this.next} clickFuncBack={this.back}/>
        <FCard cardData = {deck} activeIdx = {this.state.activeCardIdx} />
      </div>
    );
  }
};

export default App
