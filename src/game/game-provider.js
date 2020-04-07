import React, { createContext, useContext, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import db from '../firebase'
import { container, column, alignCenter, justifyEven } from '../layout/styles'

const GameContext = createContext()

const GameProvider = ({ gameCode, children }) => {
  const [game, setGame] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return db
      .collection('games')
      .doc(gameCode)
      .onSnapshot((snapshot) => {
        setGame(snapshot.data())
        setLoading(false)
      })
  }, [gameCode])

  return loading ? (
    <div
      style={{
        ...container,
        ...column,
        ...alignCenter,
        ...justifyEven,
      }}
    >
      <Spinner animation='border' />
    </div>
  ) : (
    <GameContext.Provider value={game}>{children}</GameContext.Provider>
  )
}

const useGame = () => {
  const game = useContext(GameContext)
  return game
}

export { GameProvider, useGame }
