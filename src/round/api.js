import { useState } from 'react'
import db from '../firebase'

const useTakeTurn = (userID) => {
  const [loading, setLoading] = useState(false)

  const takeTurn = (gameCode) => {
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

export { useTakeTurn }
