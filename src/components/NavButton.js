import React from 'react';

const NavButton = props => {
  let buttonText = props.direction.charAt(0).toUpperCase() + props.direction.slice(1)
  return(
    <div className = "nav-button" id={props.direction}>
      {buttonText}
    </div>
  );
};

export default NavButton;
