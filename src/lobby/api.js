import { useState } from 'react'
import db from '../firebase'
import { GAME_STATE } from '../constants'

const useStartGame = (id) => {
  const [starting, setStarting] = useState(false)

  const startGame = (nextRound) => {
    setStarting(true)
    return db
      .collection('games')
      .doc(id)
      .update({
        round: nextRound,
        state: GAME_STATE.PLAYING,
      })
      .then(() => {
        setStarting(false)
      })
      .catch((error) => {
        setStarting(false)
      })
  }

  return [startGame, starting]
}

export { useStartGame }
