import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, usePlayer } from '../../contexts'
import axiosInstance from '../../helpers'
import { ScoreRow } from "../../components"


const LoseComponent = () => {

  const navigate = useNavigate()

    const { user } = useAuth()
    const { score,loop } = usePlayer()
  
    const [scoreboardData,setScoreboardData] = useState(null)
  
    const [sbLength,getSbLength] = useState(20)

    const [update,setUpdate] = useState(0)

    function home(){
      navigate("/")
    }

    async function postToScoreboard(){
        const data = JSON.stringify({"username":String(user),"score":Number(score)})
        try {
            const resp = await axiosInstance.post("/scoreboard",data,{
                headers: {
                    'Content-Type': 'application/json'
                  }
              })
              console.log(resp.data);
        } catch (error) {
            console.log("error posting to scoreboard table: ",error);
        }
    }

    async function getScoreboardData(){
        try {
          const resp = await axiosInstance.get(`/scoreboard/top/${sbLength}`)
          const data = resp.data.top_values
          setScoreboardData(data)
  
        } catch (error) {
          console.log("fetch error: ",error.message);
        }
      }

    async function userCheck(){
        let username = undefined;

        try {
            const resp = await axiosInstance.get(`/scoreboard/user/${user}`)
            username = await resp.data.username
            return username
            
        } catch (error) {
            return username
        }
    }

    async function newEntry(){
      getScoreboardData()
        userCheck().then((resp) => {
            if(resp == undefined && user != undefined && score > 0){
                postToScoreboard()
            }
        })
    }
  
    useEffect(() => {  
      newEntry().then((resp) => {
        setUpdate(prev => prev + 1)
      })
    },[])

    useEffect(() => {getScoreboardData();console.log("");},[update])

  return (
    <div className="lose-wrapper">

      { score > 0 
      ? 
      <div id="headstone">
      <img src="./src/assets/headstone.png" alt="headstone" />
      <div className="text">
        <h2>RIP</h2>
        <h3>{user}</h3>
        <h4>{score}</h4>
      </div>
    </div>
    : ""}

      <div className="scoreboard" style={score > 0 ? {} : {"width":"90vw"}}>
        <div className="table-sec">
          <h2>Scoreboard</h2>
          <table>
            <thead>
              <tr className="headers">
                <th>{"Username"}</th>
                <th>{"Score"}</th>
              </tr>
            </thead>
            <tbody>
              {
                scoreboardData && scoreboardData.map((score,index) => (
                  <ScoreRow currentUser={user} username={score.username} score={score.score} keyIdx={index} />
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="close-sec">
          <button id="home" onClick={home}>Home</button>
        </div>
      </div>
    </div>
  )
}

export default LoseComponent