import db from '../firebase'
import { useState } from 'react'

const gameRef = (id) => db.collection('games').doc(id)

const useSubmitNames = (gameCode) => {
  const [loading, setLoading] = useState(false)

  const submitNames = (names, userID) => {
    setLoading(true)
    return db
      .runTransaction((transaction) => {
        return transaction.get(gameRef(gameCode)).then((result) => {
          if (!result.exists) {
            throw new Error('No game by this code')
          }
          const game = result.data()

          const latestID = game.names
            .map((name) => name.id)
            .reduce((prev, curr) => {
              if (curr > prev) {
                return curr
              } else {
                return prev
              }
            }, 1)

          const newNames = [
            ...game.names,
            ...names.map((name, i) => ({
              id: latestID + i,
              value: name,
              lastRound: 0,
            })),
          ]

          const newPlayers = {
            ...game.players,
            [userID]: {
              ...game.players[userID],
              enteredNames: true,
            },
          }

          transaction.update(gameRef(gameCode), {
            names: newNames,
            players: newPlayers,
          })
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
  return [submitNames, loading]
}

export { useSubmitNames }
