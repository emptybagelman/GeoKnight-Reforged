import React,{ useState, useEffect } from 'react'
import "./style.scss"

const Home = () => {
  return (
    <div id='home-wrapper'>
      <div id="home-left">
        <img src="./src/assets/home_bg.png" alt="geoknight" />
      </div>
      <div id="home-right">
        <img src="./src/assets/logo_s.png" alt="logo" />
        <div className="btn-container">
          <button id="btn-start">Start</button>
          <button id="btn-scoreboard">Scoreboard</button>
          <button id="btn-rules">Rules</button>
        </div>
      </div>
    </div>
  )
}

export default Home