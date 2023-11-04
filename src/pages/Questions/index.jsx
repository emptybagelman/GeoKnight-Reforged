import React,{ useState, useEffect } from 'react'
import "./style.scss"
import { useAuth } from "../../contexts"
import { Powerup, Quiz, Battle } from "../../components"
import { PlayerProvider } from "../../contexts"


const Questions = () => {

  const { user } = useAuth()
  const [powerup, setPowerup] = useState(null)
  const [counter,setCounter] = useState(0)

  return (
    <PlayerProvider>

      {counter < 3
      ? 
        <div className="play-wrapper">
          <Powerup setPowerup={setPowerup}/>

          { powerup != null
          ? <Quiz difficulty={powerup} setPowerup={setPowerup} setCounter={setCounter} counter={counter} />
          : ""
          }

        </div>
      : 
        <div className="game-wrapper">
          <Battle />
        </div>
      }
    </PlayerProvider>
  )
}

export default Questions