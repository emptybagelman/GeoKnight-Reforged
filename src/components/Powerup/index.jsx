import React from 'react'
import { PlayerCard } from "../../components"
import "./style.scss"

const Powerup = ({ setPowerup }) => {
  return (
    <div id="choice-screen">
        <div id="powerup-wrapper">
        <h2>Power-Ups</h2>

        <div className="powerup" onClick={() => setPowerup("easy")} >
            <img src="./src/assets/rejuvenate.png" alt="heal" />
            <h3>Recover</h3>
        </div>

        <div className="powerup" onClick={() => setPowerup("medium")}>
            <img src="./src/assets/polish.png" alt="shield" />
            <h3>Polish</h3>
        </div>

        <div className="powerup" onClick={() => setPowerup("hard")}>
            <img src="./src/assets/sharpen.png" alt="damage" />
            <h3>Sharpen</h3>
        </div>

        </div>

        <PlayerCard />

    </div>
  )
}

export default Powerup