import React,{ useState, useEffect } from 'react'
import "./style.scss"
import { useAuth } from "../../contexts"


const Questions = () => {

  const { user } = useAuth()

  return (
    <div id="choice-screen">
      <div id="powerup-wrapper">
        <h2>Power-Ups</h2>

        <div className="powerup">
          <img src="./src/assets/rejuvenate.png" alt="heal" />
          <h3>Recover</h3>
        </div>

        <div className="powerup">
          <img src="./src/assets/polish.png" alt="shield" />
          <h3>Polish</h3>
        </div>

        <div className="powerup">
          <img src="./src/assets/sharpen.png" alt="damage" />
          <h3>Sharpen</h3>
        </div>

      </div>

      <div id="player-card">
        <div id="sprite"></div>
        <div id="hp">HP</div>
        <div id="dmg">DMG</div>
      </div>
    </div>
  )
}

export default Questions