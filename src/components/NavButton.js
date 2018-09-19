import React from 'react';

const NavButton = props => {
  let buttonText = props.direction.charAt(0).toUpperCase() + props.direction.slice(1)

  let classN = "nav-button cell nav-bar " + props.classNa

  return(
    <div className = {classN} id={props.direction} onClick={props.clickFunc}>
      {buttonText}
    </div>
  );
};

export default NavButton;
