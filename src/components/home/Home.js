import React from 'react'

const Home = props => {
  console.log("Home")
  return(
    <div className="grid-x">
      <nav className="nav grid-x cell small-12">
        <div className="cell small-12 nav-center">
          K3ntako Flashcards
        </div>
      </nav>
      <div className = "cell small-2 small-offset-5 startCards">
        <a href="cards.html"><h2 id="startCards">Start</h2></a>
      </div>

    </div>
  )
}


export default Home
