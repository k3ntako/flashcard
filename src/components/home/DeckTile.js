import React from 'react';

const DeckTile = props => {

  return(
    <div className = "deck-tile" id={props.divId} onClick={props.clickFunc}>
      <h2 id={props.id}>{props.deckName}</h2>
    </div>
  );
};

export default DeckTile;
