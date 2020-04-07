import { useState } from 'react'
import db from '../firebase'

const gameRef = (id) => db.collection('games').doc(id)

const useJoinGame = () => {
  const [loading, setLoading] = useState(false)

  const joinGame = (id) => {
    setLoading(true)
    return db
      .runTransaction((transaction) => {
        return transaction.get(gameRef(id)).then((result) => {
          if (!result.exists) {
            throw new Error('No game by this code')
          }
          const numPlayers = result.data().numPlayers + 1
          transaction.update(gameRef(id), { numPlayers })
        })
      })
      .then(() => {
        setLoading(false)
        return true
      })
      .catch((err) => {
        setLoading(false)
        return err
      })
  }
  return [joinGame, loading]
}

export { useJoinGame }
