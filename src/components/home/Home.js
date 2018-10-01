import React from 'react'
import { Link } from 'react-router';
import DeckList from './DeckList'


const Home = props => {
  console.log("Home")
  return(
    <div className = "homepage">
      <DeckList
        selectDeckFunc={props.selectDeckFunc}
        selectedDeck={props.selectedDeck}
        />
      <Link to="/cards"><h2 id="startCards">Start</h2></Link>
    </div>
  )
}


export default Home
