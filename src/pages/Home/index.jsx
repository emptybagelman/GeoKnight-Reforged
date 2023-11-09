import React,{ useState, useEffect } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts'
import { usePlayer } from '../../contexts'

const Home = () => {

  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const { setHp, setMaxHp, setAtk, setScore, setLoop } = usePlayer()

  function navToHome(){
    navigate("/play")
  }

  function navToScore(){
    navigate("/lose")
  }

  function reset(){
    setHp(10)
    setMaxHp(10)
    setAtk(5)
    setScore(0)
    setLoop(1)
  }

  useEffect(() => {
    function isUser(){
      if(!user){

        const random1 = Date.now()
        const random2 = Math.random().toString().substring(2,2)

        const guestName = `guest${random1}${random2}`
        setUser(guestName)
      }
    }
    isUser()
    reset()
  }, [])



  return (
    <div id='home-wrapper'>
      <div id="home-left">
        <img src="./src/assets/home_bg.png" alt="geoknight" />
      </div>
      <div id="home-right">
        <img src="./src/assets/logo_s.png" alt="logo" />
        <div className="btn-container">
          
          <button id="btn-start" onClick={navToHome}>Start</button>
          <button id="btn-scoreboard" onClick={navToScore}>Scoreboard</button>
          <button id="btn-rules">Rules</button>
        </div>
      </div>
    </div>
  )
}

export default Home