import React,{useState, useEffect,useRef } from 'react'
import "./style.scss"
import { usePlayer } from '../../contexts'

const Battle = () => {

    const { maxHp, hp, setHp, atk, score, setScore, loop, setLoop } = usePlayer()
    const [enemy, setEnemy] = useState({
        "id":0,
        "hp":10,
        "maxHp":10,
        "atk":3
    })
    const [combatMessage,setCombatMessage] = useState()
    const [currMsg,setCurrMsg] = useState("")
    const [msgIndex, setMsgIndex] = useState(0)

    const [doPlayerAnim, setDoPlayerAnim] = useState(null)
    const [doEnemyAnim, setDoEnemyAnim] = useState(null)

    const textref = useRef()
    const playerref = useRef()
    const enemyref = useRef()

    function playerAttack(){
        enemy.hp -= atk
        setEnemy(enemy)
        setCurrMsg("")
        setMsgIndex(0)
        setCombatMessage(`GeoKnight did ${atk} damage to the enemy!`)

        setTimeout(() => {
            setDoPlayerAnim(false)
        },300)
    }

    function enemyAttack(){
        setHp(hp-enemy.atk)
        setTimeout(() => {
            setDoEnemyAnim(false)
        },300)
    }

    useEffect(() => {
        try {
            if(msgIndex < combatMessage.length){
                const timeout = setTimeout(() => {
                    setCurrMsg(prev => prev + combatMessage[msgIndex])
                    setMsgIndex(prev => prev + 1)
                },50)
            return () => clearTimeout(timeout)
            }

        } catch (error) {
            console.log("");
        }
        
    },[msgIndex,combatMessage])

    function runAttacks(){
        setDoPlayerAnim(true)
        playerAttack()

        if(enemy.hp <= 0){
            enemyref.current.style.display = "none"
            setTimeout(() => {
                setCurrMsg("")
                setMsgIndex(0)
                setCombatMessage(`Enemy died!`)
            },2000)
            setScore(prev => prev + 100)
        }else{
            setTimeout(() => {
                setCurrMsg("")
                setMsgIndex(0)
                setCombatMessage(`Enemy did ${enemy.atk} damage to GeoKnight!`)
                setDoEnemyAnim(true)
                enemyAttack()
            },2000)
        }
    }

    return (
        <div id="battle-wrapper">
            <div className="fadein"></div>
            <p id='score'>{score}</p>
            <div id="sprite-wrapper">
                <div id="s-left">
                    <div id="player">
                        <div className="hp">{hp}</div>
                        <div className={doPlayerAnim ? "sprite playerAttackAnim" : "sprite player"} ></div>
                    </div>
                </div>
                <div id="s-right">
                    <div id="enemy" ref={enemyref}>
                        <div className="hp">{enemy.hp}</div>
                        <div className={doEnemyAnim ? "sprite enemyAttackAnim" : "sprite enemy"} ></div>
                    </div>
                </div>
            </div>
            <div id="typewriter">
                <p ref={textref}>{currMsg}</p>
            </div>
            <button className="attack" onClick={runAttacks}>ATTACK</button>
        </div>
    )
}

export default Battle