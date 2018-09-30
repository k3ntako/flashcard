import React from 'react';

const CardControl = props => {
  let iClassName = `card-control fas fa-chevron-${props.side}`

  return(
    <div className="card-control">
      <i onClick={props.clickFunc} className={iClassName}></i>
    </div>
  )
}

export default CardControl
