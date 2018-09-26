import React from 'react';

const TopNavBar = props => {


  return(
    <nav className="nav css-grid-container" id="nav">
      <div className="nav-left">
        <span className="nav-option" onClick={props.clickFuncBack}>Back</span>
      </div>
      <div className="nav-center">
        <span className="nav-option"><a href="/">K3ntako Flashcards</a></span>
      </div>
      <div className="nav-right">
        <span className="nav-option" onClick={props.clickFuncNext}>Next</span>
      </div>
    </nav>
  )
}

export default TopNavBar
