import { useState } from 'react'
import db from '../../firebase'
import { GAME_STATE } from '../../constants'

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
    return createUniqueID(4).then((gameID) => {
      return db
        .collection('games')
        .doc(gameID)
        .set(initialGame(gameID, userID))
        .then(() => gameID)
    })
  }
  return [createGame, loading]
}

function createUniqueID(size) {
  return db
    .collection('games')
    .get()
    .then((querySnapshot) => {
      const ids = querySnapshot.docs.map((doc) => doc.id)
      let gameID = getSafeID(size)
      while (ids.includes(gameID)) {
        gameID = getSafeID(size)
      }
      return gameID
    })
}

const getSafeID = (size) => {
  let id = createID(size)
  while (profanities.includes(id.toLowerCase())) {
    id = createID(size)
  }
  return id
}

const createID = (size) => {
  const letters = []
  for (let i = 0; i < size; i++) {
    const char = Math.floor(Math.random() * 26)
    letters.push(String.fromCharCode(65 + char))
  }
  return letters.join('')
}

const profanities = [
  'arse',
  'bint',
  'butt',
  'cock',
  'cunt',
  'crap',
  'damn',
  'dick',
  'gays',
  'gayz',
  'fany',
  'feck',
  'fuck',
  'fukc',
  'fukk',
  'jizz',
  'niga',
  'piss',
  'rape',
  'shag',
  'shit',
  'slag',
  'slut',
  'tart',
  'tits',
  'twat',
  'wank',
]

export { useCreateGame }
