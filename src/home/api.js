import { useState } from 'react'
import db from '../firebase'
import { GAME_STATE } from '../constants'

const initialGame = (gameID, userID) => ({
  id: gameID,
  players: {
    [userID]: {
      enteredNames: false,
    },
  },
  names: [],
  round: 0,
  state: GAME_STATE.LOBBY,
  currentPlayer: '',
})

const useCreateGame = () => {
  const [loading, setLoading] = useState(false)
  const createGame = (userID) => {
    setLoading(true)
    const gameID = createID()
    return db
      .collection('games')
      .doc(gameID)
      .set(initialGame(gameID, userID))
      .then(() => gameID)
  }
  return [createGame, loading]
}

const createID = () => Math.random().toString(36).substring(9).toUpperCase()

export { useCreateGame }
