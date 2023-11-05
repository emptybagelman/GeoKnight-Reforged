import React,{useState, useEffect,useRef } from 'react'
import "./style.scss"
import { usePlayer } from '../../contexts'
import { Enemy } from "../../components"

const Battle = () => {

    const { maxHp, hp, setHp, atk, score, setScore, loop, setLoop } = usePlayer()

    const enemyRefs = useRef([])

    const [combatMessage,setCombatMessage] = useState()
    const [currMsg,setCurrMsg] = useState("")
    const [msgIndex, setMsgIndex] = useState(0)

    const [doPlayerAnim, setDoPlayerAnim] = useState(null)
    const [doEnemyAnim, setDoEnemyAnim] = useState(null)

    const [rerender, setRerender] = useState(0)

    const textref = useRef()
    const playerref = useRef()

    function adjustDifficulty(){
        return 1 + Math.floor(loop * 0.5)
    }

    
    function runAttacks(){
        const frontEnemy = enemyRefs.current[0].current

        setDoPlayerAnim(true)
        playerAttack(frontEnemy).then((result) => {
            enemyAttackCheck()
            console.log(result);
        })

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

        const frontEnemy = enemyRefs.current[0].current

        if(frontEnemy.enemyHp <= 0){
            updateRefs(frontEnemy)
        }else{
            setTimeout(() => {
                setCurrMsg("")
                setMsgIndex(0)
                setCombatMessage(`Enemy did ${frontEnemy.enemyAtk} damage to GeoKnight!`)
                setDoEnemyAnim(true)
                enemyAttack(frontEnemy)
            },2000)
        }
    }

    function updateRefs(frontEnemy){
        const updatedRefs = [...enemyRefs.current.slice(1)]
        enemyRefs.current = updatedRefs
        killEnemy(frontEnemy)
    }

    function killEnemy(frontEnemy){
        setTimeout(() => {
            setCurrMsg("")
            setMsgIndex(0)
            setCombatMessage(`Enemy died!`)
        },2000)
        setScore(prev => prev + 100)
    }

    function forceRerender(){
        setRerender(prev => prev + 1)
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

    return (
        <div id="battle-wrapper">
            <div className="fadein"></div>
            <p id='score'>{score}</p>
            <div id="sprite-wrapper">
                <div id="s-left">
                    <div id="player">
                        <div className="hp">{hp}</div>
                        <div className="atk">{atk}</div>
                        <div className={doPlayerAnim ? "sprite playerAttackAnim" : "sprite player"} ></div>
                    </div>
                </div>
                <div id="s-right">
                    { enemyRefs.current.length > 0 && enemyRefs.current.map((ref,index) => (
                            <Enemy ref={ref} props={{ doEnemyAnim, index }}/>
                        ))
                    }
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