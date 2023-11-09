import React,{ useState, useEffect } from 'react'
import "./style.scss"

const HealthBar = ({ maxhp, hp, atk }) => {

    const [hpPercent, sethpPercent] = useState(null)
    const [hpColor,sethpColor] = useState(null)

    useEffect(() => {
        sethpPercent({"width":`${(hp/maxhp)*100}%`})
        if((hp/maxhp)*100 <= 50){
            sethpColor({"backgroundColor":"var(--orange)"})
        }
        if((hp/maxhp)*100 <= 15){
            sethpColor({"backgroundColor":"var(--incorr)"})
        }
    },[hp])



  return (
    <div className="healthbar-wrapper">
        <div className="health">
            <div className="hp" style={hpPercent && {...hpPercent,...hpColor}}></div>
        </div>
        <div className="atk">
            <img src="./src/assets/sword.png" alt="" />
            <div id="num">{atk}</div>
        </div>
    </div>
  )
}

export default HealthBar