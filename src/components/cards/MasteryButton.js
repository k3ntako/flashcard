import React from 'react';

const MasteryButton = props => {
  let buttonText = props.direction.charAt(0).toUpperCase() + props.direction.slice(1)

  let classN = "card-control-button"

  let buttonId = props.direction + "-button"
  return(
    <div className = {classN} id={buttonId} onClick={props.clickFunc}>
      {buttonText}
    </div>
  );
};

export default MasteryButton;
