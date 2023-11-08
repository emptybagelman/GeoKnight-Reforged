import React,{ useEffect } from 'react'

const ScoreRow = ({ currentUser, username, score, keyIdx }) => {

  return (
    <tr key={keyIdx} style={

      currentUser == username
      ? {"backgroundColor":"rgb(39, 31, 111)"}
      : {}

    }>
        <td>{username}</td>
        <td>{score}</td>
    </tr>
  )
}

export default ScoreRow