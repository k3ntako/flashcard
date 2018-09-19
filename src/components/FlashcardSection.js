import React, { Component } from 'react';

class FlashcardSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerText: this.props.type,
      type: this.props.type,
      cardText: this.props.cardInfo[this.props.type],
      show: false
    };
    this.karmaAlert = this.karmaAlert.bind(this);
  }


// const FlashcardSection = props => {
//   let sectionInfo = [
//     {
//       key: "1",
//       iconName: "Article",
//       fontAwesomeSymbol: 'fa-file-text-o',
//       description: "Article Description"
//     }
//   ]



  karmaAlert(event) {
    if (this.state.show){
      this.setState({ innerText: this.state.type, show:false });
    }else{
      this.setState({ innerText: this.state.cardText, show:true });
    }
  }

  render(){
    let innerT = this.state.innerText.replace(/_/g," ")
    return(
    <div className = "fsection cell small-12 large-6" onClick={this.karmaAlert}>
      <h1>{innerT}</h1>
    </div>
  );
  }
};

export default FlashcardSection;
