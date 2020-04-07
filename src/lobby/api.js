import { useState } from 'react'
import db from '../firebase'
import { GAME_STATE } from '../constants'

const useStartGame = (id) => {
  const [starting, setStarting] = useState(false)

  const startGame = () => {
    setStarting(true)
    return db
      .collection('games')
      .doc(id)
      .set({
        state: GAME_STATE.PLAYING,
      })
      .then(() => {
        setStarting(false)
        return
      })
      .catch((error) => {
        setStarting(false)
        return error
      })
  }

  return [startGame, starting]
}

export { useStartGame }
