import React from 'react'
import { Link } from 'react-router';


const Home = props => {
  console.log("Home")
  return(
    <div>
        <Link to="/cards"><h2 id="startCards">Start</h2></Link>
    </div>
  )
}


export default Home
