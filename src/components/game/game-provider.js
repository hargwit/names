import React, { createContext, useContext, useState, useEffect } from 'react'
import db from '../../firebase'

import { Loading } from 'components/loading'

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
    <Loading />
  ) : (
    <GameContext.Provider value={game}>{children}</GameContext.Provider>
  )
}

const useGame = () => {
  const game = useContext(GameContext)
  return game
}

export { GameProvider, useGame }
