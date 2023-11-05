import React,{ useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { usePlayer } from '../../contexts'

const Enemy = forwardRef(( props, ref ) => {

  const { loop } = usePlayer()

  const [enemyHp, setEnemyHp] = useState(5)
  const [enemyAtk, setEnemyAtk] = useState(1)

  function randomInt(mid,range){
    const min = mid - range
    const max = mid + range
    return Math.floor(Math.random() * (max-min+1)) + min
  }

  const manipulateHealth = (value) => {
    setEnemyHp(prev => Number(prev) - Number(value))
  }

  useImperativeHandle(ref, () => ({
    manipulateHealth,
    enemyHp,
    setEnemyHp,
    enemyAtk,
    setEnemyAtk
  }),[manipulateHealth,enemyHp,setEnemyHp,enemyAtk,setEnemyAtk])

  useEffect(() => {
    const hpGen = 4 + Math.floor(loop * 1.2)
    const atkGen = 2 + Math.floor(loop * 1.1)

    setEnemyHp(randomInt(hpGen,2))
    setEnemyAtk(randomInt(atkGen,2))

  },[])

  return (
    <div key={props.index} id="enemy">
        <div className="hp">{enemyHp}</div>
        <div className="atk">{enemyAtk}</div>
        <div className={props.doEnemyAnim ? "sprite enemyAttackAnim" : "sprite enemy"} ></div>
    </div>
  )
})

export default Enemy