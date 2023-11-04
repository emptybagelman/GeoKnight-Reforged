import React from 'react'
import "./style.scss"
import { usePlayer } from '../../contexts'

const PlayerCard = () => {

  const { maxHp, hp, atk } = usePlayer()


  return (
    <div id="player-card">
        <div id="sprite"></div>
        <div id="hp">HP {hp}/{maxHp}</div>
        <div id="dmg">DMG {atk}</div>
    </div>
  )
}

export default PlayerCard