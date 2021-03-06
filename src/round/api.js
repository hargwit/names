import { useState } from 'react'
import db from '../firebase'
import { GAME_STATE } from '../constants'

const useTakeTurn = (gameCode, userID) => {
  const [loading, setLoading] = useState(false)

  const takeTurn = () => {
    setLoading(true)
    return db
      .collection('games')
      .doc(gameCode)
      .update({
        currentPlayer: userID,
      })
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }

  return [takeTurn, loading]
}

const useEndRound = (gameCode) => {
  const [loading, setLoading] = useState(false)

  const endRound = () => {
    setLoading(true)
    return db
      .collection('games')
      .doc(gameCode)
      .update({
        state: GAME_STATE.LOBBY,
      })
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }

  return [endRound, loading]
}

export { useTakeTurn, useEndRound }
