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
  createdAt: Date.now(),
})

const useCreateGame = () => {
  const [loading, setLoading] = useState(false)
  const createGame = (userID) => {
    setLoading(true)
    const gameID = createID(4)
    return db
      .collection('games')
      .doc(gameID)
      .set(initialGame(gameID, userID))
      .then(() => gameID)
  }
  return [createGame, loading]
}

const createID = (size) => {
  const letters = []
  for (let i = 0; i < size; i++) {
    const char = Math.floor(Math.random() * 26)
    letters.push(String.fromCharCode(65 + char))
  }
  return letters.join('')
}

export { useCreateGame }
