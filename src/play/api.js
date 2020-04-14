import { useState } from 'react'
import db from '../firebase'

const gameRef = (id) => db.collection('games').doc(id)

const useEndTurn = (gameCode, round) => {
  const [loading, setLoading] = useState(false)

  const endTurn = (names) => {
    setLoading(true)
    return db.runTransaction((transaction) => {
      return transaction.get(gameRef(gameCode)).then((result) => {
        if (!result.exists) {
          throw new Error('No game by this code')
        }

        const game = result.data()

        const newNames = game.names.map((name) => {
          if (names.find((n) => n.id === name.id)) {
            return {
              ...name,
              lastRound: round,
            }
          }
          return name
        })

        transaction.update(gameRef(gameCode), {
          names: newNames,
          currentPlayer: '',
        })
      })
    })
  }

  return [endTurn, loading]
}

export { useEndTurn }
