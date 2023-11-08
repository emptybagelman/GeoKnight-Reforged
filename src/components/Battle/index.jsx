import React,{useState, useEffect,useRef } from 'react'
import "./style.scss"
import { usePlayer } from '../../contexts'
import { Enemy } from "../../components"
import { useNavigate } from 'react-router-dom'

const Battle = ({ setCounter }) => {

    const { maxHp, hp, setHp, atk, score, setScore, loop, setLoop } = usePlayer()

    const navigate = useNavigate()

    const enemyRefs = useRef([])

    const [combatMessage,setCombatMessage] = useState()
    const [currMsg,setCurrMsg] = useState("")
    const [msgIndex, setMsgIndex] = useState(0)
    const [doPlayerAnim, setDoPlayerAnim] = useState(null)
    const [doEnemyAnim, setDoEnemyAnim] = useState(null)
    const [rerender, setRerender] = useState(0)
    const [enemyCounter,setEnemyCounter] = useState(0)
    const [enableButton, setEnableButton] = useState(false)
    const [round,setRound] = useState(0)

    const [fadeAnim, setFadeAnim] = useState({"animationDirection":"normal"})

    const textref = useRef()
    const enemyContainerRef = useRef()

    function adjustDifficulty(){
        return 1 + Math.floor(loop * 0.5)
    }

    
    function runAttacks(){
        setEnableButton(true)
        const frontEnemy = enemyRefs.current[enemyCounter].current

        setDoPlayerAnim(true)
        playerAttack(frontEnemy).then((result) => {
            enemyAttackCheck()
        })
    }

    function sendToLose(){
        if(hp <= 0){
            navigate("/lose")
        }
    }

    function playerAttack(frontEnemy){

        return new Promise((resolve,reject) => {
            frontEnemy.setEnemyHp(prev => {
                const x = prev - atk
                return x
            })
            setCurrMsg("")
            setMsgIndex(0)
            setCombatMessage(`GeoKnight did ${atk} damage to the enemy!`)
    
            setTimeout(() => {
                resolve("Completed successfully")
                setDoPlayerAnim(false)
            },300)
        })
    }

    function enemyAttack(frontEnemy){
        setHp(hp-frontEnemy.enemyAtk)
        setTimeout(() => {
            setDoEnemyAnim(false)
        },300)
    }

    function enemyAttackCheck(){
        const frontEnemy = enemyRefs.current[enemyCounter].current

        if(frontEnemy.enemyHp <= 0){
            updateRefs(frontEnemy)
        }else{
            setTimeout(() => {
                setCurrMsg("")
                setMsgIndex(0)
                setCombatMessage(`Enemy did ${frontEnemy.enemyAtk} damage to GeoKnight!`)
                setDoEnemyAnim(true)
                enemyAttack(frontEnemy)
                setEnableButton(false)
                setRound(prev => prev + 1)
            },2000)

        }
    }

    function updateRefs(frontEnemy){
        // const updatedRefs = [...enemyRefs.current.slice(1,)]
        // enemyRefs.current = updatedRefs
        setEnemyCounter(prev => prev + 1)
        killEnemy()
    }

    function killEnemy(){
        setTimeout(() => {
            setCurrMsg("")
            setMsgIndex(0)
            setCombatMessage(`Enemy died!`)
            enemyContainerRef.current.removeChild(enemyContainerRef.current.firstChild)
            setEnableButton(false)
            endRound()
        },2000)
        setScore(prev => prev + 100)

    }

    function forceRerender(){
        setRerender(prev => prev + 1)
    }

    function endRound(){
        if(enemyContainerRef.current.childNodes.length <= 0){
            setTimeout(() => {
                setCounter(0)
                setLoop(prev => prev + 1)
            },2000)
        }
    }

    useEffect(() => {
        try {
            if(msgIndex < combatMessage.length){
                const timeout = setTimeout(() => {
                    setCurrMsg(prev => prev + combatMessage[msgIndex])
                    setMsgIndex(prev => prev + 1)
                },40)
            return () => clearTimeout(timeout)
            }

        } catch (error) {
            console.log("");
        }
        
    },[msgIndex,combatMessage])


    useEffect(() => {        
        if(rerender === 0){
            const diff = adjustDifficulty()
            for(let i=0; i<diff;i++){
                const newRef = React.createRef()
                enemyRefs.current.push(newRef)
            }
            forceRerender()
        }
    },[])

    useEffect(() => {
        setTimeout(() => {
            setCurrMsg("")
            setMsgIndex(0)
            setCombatMessage(`GeoKnight, uh, fainted!`)
            sendToLose()
        },4000)
    },[round])

    return (
        <div id="battle-wrapper">
            <div className="fadein" style={fadeAnim}></div>
            <p id='score'>{score}</p>
            <div id="sprite-wrapper">
                <div id="s-left">
                    <div id="player">
                        <div className="hp">{hp}</div>
                        <div className="atk">{atk}</div>
                        <div className={doPlayerAnim ? "sprite playerAttackAnim" : "sprite player"} ></div>
                    </div>
                </div>
                <div id="s-right" ref={enemyContainerRef}>
                    { enemyRefs.current.length > 0 && enemyRefs.current.map((ref,index) => (
                            <Enemy ref={ref} props={{ doEnemyAnim, index }}/>
                        ))
                    }
                </div>
            </div>
            <div id="typewriter">
                <p ref={textref}>{currMsg}</p>
            </div>
            <button className="attack" onClick={runAttacks} disabled={enableButton ? true : false } >ATTACK</button>
        </div>
    )
}

export default Battle