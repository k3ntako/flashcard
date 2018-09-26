import React, { Component } from 'react';

class FlashcardSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };

    this.type = this.props.type.replace(/_/g," ")
    this.cardText = this.props.cardInfo[this.props.type]
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    if (this.state.show){
      this.setState({ show:false });
    }else{
      this.setState({ show:true });
    }
  }




  render(){
    let innerT
    if(this.state.show){
      innerT = this.props.cardInfo[this.props.type];
    }else{
      innerT = this.type;
    }

    let className = "fsection"
    if (this.props.mastery){
      className += ` ${this.props.mastery}`
    }
    let idName = "";
    if (this.props.idName){
      idName += `${this.props.idName}`
      className += ` ${this.props.idName}`
    }



    // <div className = {className} id={idName} onClick={this.flipCard}>
    //   <h1 id={idName}>{innerT}</h1>
    // </div>

    return(
    <div className = {className} id={idName} onClick={this.flipCard}>
      <h1 id={idName}>{innerT}</h1>
    </div>
  );
  }
};

export default FlashcardSection;
