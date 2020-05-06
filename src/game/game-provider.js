import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react'
import db from '../firebase'

import { Loading } from '../loading/loading'

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
  const value = useContext(GameContext)

  if (!value) {
    throw new Error('useGame must be used within a GameProvider')
  }

  return value
}

const useGameListener = () => {
  const value = useGame()
  const [game, setGame] = useState(value)
  const mounted = useRef(true)

  useEffect(() => {
    if (mounted.current) {
      setGame(value)
    }

    return () => {
      mounted.current = false
    }
  }, [value, setGame])

  return game
}

export { GameProvider, useGameListener }
