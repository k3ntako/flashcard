import React from 'react';

const TopNavBar = props => {


  return(
    <nav className="nav grid-x" id="nav">
      <div onClick={props.clickFuncBack} className="cell small-4 nav-left">
        Back
      </div>
      <div className="cell small-4 nav-center">
        K3ntako Flashcards
      </div>
      <div onClick={props.clickFuncNext} className className="cell small-4 nav-right">
        Next
      </div>
    </nav>
  )
}

export default TopNavBar
