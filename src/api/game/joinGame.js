import { useState } from 'react'
import db from '../..//firebase'
import { GAME_STATE } from 'constants/game-state'

const gameRef = (id) => db.collection('games').doc(id)

const useJoinGame = (userID) => {
  const [loading, setLoading] = useState(false)

  const joinGame = (id) => {
    setLoading(true)
    return db
      .runTransaction((transaction) => {
        return transaction.get(gameRef(id)).then((result) => {
          if (!result.exists) {
            throw new Error(`No game by code ${id}, please try another`)
          }
          const game = result.data()
          if (game.state === GAME_STATE.END_GAME) {
            throw new Error(`The game ${id} has ended, please try another`)
          }
          if (!game.players[userID]) {
            transaction.update(gameRef(id), {
              players: { ...game.players, [userID]: { enteredNames: false } },
            })
          }
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
