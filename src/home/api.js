import { useState } from 'react'
import db from '../firebase'

const useCreateGame = () => {
  const [loading, setLoading] = useState(false)
  const createGame = () => {
    setLoading(true)
    const id = createID()
    return db
      .collection('games')
      .doc(id)
      .set({
        id,
        numPlayers: 1,
        names: [],
        round: 1,
      })
      .then(() => id)
  }
  return [createGame, loading]
}

const createID = () => Math.random().toString(36).substring(9).toUpperCase()

export { useCreateGame }
