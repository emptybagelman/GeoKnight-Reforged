import React,{ useState, useEffect } from 'react'
import "./style.scss"
import { useAuth } from "../../contexts"
import { Powerup, Quiz } from "../../components"


const Questions = () => {

  const { user } = useAuth()
  const [powerup, setPowerup] = useState(null)
  const [counter,setCounter] = useState(0)

  return (
    <div className="play-wrapper">
      <Powerup setPowerup={setPowerup}/>

      { powerup != null
      ? <Quiz difficulty={powerup} setPowerup={setPowerup} setCounter={setCounter} counter={counter} />
      : ""
       }

    </div>
  )
}

export default Questions