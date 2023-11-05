import React, { useState, useContext, createContext } from "react"

const AuthContext = createContext()
const PlayerContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const PlayerProvider = ({ children }) => {
  const [maxHp, setMaxHp] = useState(30)
  const [hp, setHp] = useState(30)
  const [atk, setAtk] = useState(5)
  const [score, setScore] = useState(0)
  const [loop, setLoop] = useState(1)

  return (
    <PlayerContext.Provider value={{ maxHp, setMaxHp, hp,setHp, atk,setAtk, score, setScore, loop, setLoop }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export const usePlayer = () => useContext(PlayerContext)