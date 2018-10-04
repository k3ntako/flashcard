import React from 'react'
import { Link } from 'react-router';
import DeckList from './DeckList'


const Home = props => {
  return(
    <div className = "homepage">
      <DeckList
        selectDeckFunc={props.selectDeckFunc}
        selectedDeck={props.selectedDeck}
        />
      <h1 id="startCards"><Link to="/cards">Start</Link></h1>
      <h1 id="startCards"><Link to="/edit">Edit</Link></h1>

    </div>
  )
}


export default Home
