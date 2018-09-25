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

    let className = "fsection cell small-12 large-6 " + this.props.mastery



    return(
    <div className = {className} onClick={this.flipCard}>
      <h1>{innerT}</h1>
    </div>
  );
  }
};

export default FlashcardSection;
