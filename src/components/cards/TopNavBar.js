import React from 'react';

const TopNavBar = props => {


  let iClassName = `fas fa-chevron-${props.side}`
  return(

    <div className="cardControls">
      <i onClick={props.clickFunc} className={iClassName}></i>
    </div>


  )
}

export default TopNavBar

// {props.text}
