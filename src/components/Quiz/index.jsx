import React,{ useState, useEffect, useRef } from 'react'
import { PlayerCard } from "../../components"
import axiosInstance from '../../helpers'
import "./style.scss"

const Quiz = ({ difficulty, setPowerup, setCounter, counter }) => {

    const [question,setQuestion] = useState(null)
    const [answers,setAnswers] = useState(null)

    const [focus,setFocus] = useState(null)

    const a1 = useRef()
    const a2 = useRef()
    const a3 = useRef()
    const a4 = useRef()
    const questionsRef = useRef()

    function selectFocus(ref){
        setFocus(ref)
    }

    function submitAnswer(){
        const focusValue = focus.current
        const corrAns = question.correct_answer

        if(answers[corrAns] == focusValue.textContent){
            setStyle(focusValue, corrStyle)
        }else{
            setStyle(focusValue, incorrStyle)

            const a = [a1,a2,a3,a4]
            a.forEach((ans,index) => {
                if(ans.current.textContent == answers[question.correct_answer]){
                    setStyle(ans.current,corrStyle)
                }
            })
        }

        setTimeout(() => {
            setPowerup(null)
            setCounter(counter + 1)
        },2000)

    }

    function setStyle(focused, styleDict) {
        focused.style.backgroundColor = styleDict.backgroundColor
        focused.style.boxShadow = styleDict.boxShadow
        focused.style.color = styleDict.color
    }

    const focusStyle = {
        "backgroundColor":"var(--hover)",
        "boxShadow":"0 -5px 0 0 var(--hover-shadow) inset",
        "color":"black"
    }

    const defaultStlye = {
        "backgroundColor":"var(--orange)",
        "boxShadow":"0 -5px 0 0 var(--orange-shadow) inset",
        "color":"white"
    }

    const corrStyle = {
        "backgroundColor":"var(--corr)",
        "boxShadow":"0 -5px 0 0 var(--corr-shadow) inset",
        "color":"white"
    }

    const incorrStyle ={
        "backgroundColor":"var(--incorr)",
        "boxShadow":"0 -5px 0 0 var(--incorr-shadow) inset",
        "color":"black"
    }

    useEffect(() => {
        async function getRandomQuestion() {
            const regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g
            const resp = await axiosInstance.get(`/questions/random/${difficulty}`).then(data => {
                const jsondata = data.data.questions
                setQuestion(jsondata)
                const x = jsondata.answers.split("'")
                const ansArr = [];
                for(let i=0;i<x.length;i++){
                    if(regex.test(x[i])){
                        ansArr.push(x[i])
                    }
                }
                setAnswers(ansArr)
            })
        }

        getRandomQuestion()
    },[])

  return (
    <div className="questions-wrapper">
        {/* <div className="questions">
            <div className="cont">
                <h2>Question</h2>
                <p>{question.question}</p>
                <div className="answers">
                    <p>answer1</p>
                    <p>answer2</p>
                    <p>answer3</p>
                    <p>answer4</p>
                </div>
                <button id="btn-submit">Submit</button>
            </div>
        </div> */}

        { question 
        ? 
        <div className="questions" ref={questionsRef}>
            <div className="cont">
                <h2>Question</h2>
                <p>{question.question}</p>
                <div className="answers">
                    <p ref={a1} onClick={() => selectFocus(a1)} style={focus == a1 ? focusStyle : {}} >{answers[0]}</p>
                    <p ref={a2} onClick={() => selectFocus(a2)} style={focus == a2 ? focusStyle : {}} >{answers[1]}</p>
                    <p ref={a3} onClick={() => selectFocus(a3)} style={focus == a3 ? focusStyle : {}} >{answers[2]}</p>
                    <p ref={a4} onClick={() => selectFocus(a4)} style={focus == a4 ? focusStyle : {}} >{answers[3]}</p>
                </div>
                <button id="btn-submit" onClick={submitAnswer}>Submit</button>
            </div>
        </div>
        : ""
        }

        <PlayerCard />
    </div>
  )
}

export default Quiz