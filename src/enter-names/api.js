import db from '../firebase'
import { useState } from 'react'

const gameRef = (id) => db.collection('games').doc(id)

const useSubmitNames = (gameCode) => {
  const [loading, setLoading] = useState(false)

  const submitNames = (names) => {
    setLoading(true)
    return db
      .runTransaction((transaction) => {
        return transaction.get(gameRef(gameCode)).then((result) => {
          if (!result.exists) {
            throw new Error('No game by this code')
          }
          const newNames = [...result.data().names, ...names]
          transaction.update(gameRef(gameCode), { names: newNames })
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
