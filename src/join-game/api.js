import { useState } from 'react'
import db from '../firebase'
import { GAME_STATE } from '../constants'

const gameRef = (id) => db.collection('games').doc(id)

const useJoinGame = () => {
  const [loading, setLoading] = useState(false)

  const joinGame = (id) => {
    setLoading(true)
    return db
      .runTransaction((transaction) => {
        return transaction.get(gameRef(id)).then((result) => {
          if (!result.exists) {
            throw new Error('No game by this code, please try another')
          }
          const game = result.data()
          if (game.state === GAME_STATE.END_GAME) {
            throw new Error('This game has ended, please try another')
          }
          const numPlayers = result.data().numPlayers + 1
          transaction.update(gameRef(id), { numPlayers })
        })
      })
      .then(() => {
        setLoading(false)
        return id
      })
      .catch((err) => {
        setLoading(false)
        throw err
      })
  }
  return [joinGame, loading]
}

export { useJoinGame }
