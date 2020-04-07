import { useState } from 'react'
import db from '../firebase'
import { GAME_STATE } from '../constants'

const initialGame = (id) => ({
  id,
  numPlayers: 1,
  names: [],
  round: 1,
  state: GAME_STATE.LOBBY,
})

const useCreateGame = () => {
  const [loading, setLoading] = useState(false)
  const createGame = () => {
    setLoading(true)
    const id = createID()
    return db
      .collection('games')
      .doc(id)
      .set(initialGame(id))
      .then(() => id)
  }
  return [createGame, loading]
}

const createID = () => Math.random().toString(36).substring(9).toUpperCase()

export { useCreateGame }
