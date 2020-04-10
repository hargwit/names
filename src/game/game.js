import React, { useEffect } from 'react'
import { GameProvider, useGame } from './game-provider'
import { GAME_STATE } from '../constants'
import { navigate } from '@reach/router'
import { useUserID } from '../user-context/user-provider'

const Game = ({ gameCode, children }) => (
  <GameProvider gameCode={gameCode}>
    <GameStateNavigation>{children}</GameStateNavigation>
  </GameProvider>
)

const GameStateNavigation = ({ children }) => {
  const game = useGame()
  const userID = useUserID()

  useEffect(() => {
    switch (game.state) {
      case GAME_STATE.LOBBY:
        if (game.players[userID].enteredNames) {
          navigate(`/${game.id}/lobby`)
        } else {
          navigate(`/${game.id}/names`)
        }
        break
      case GAME_STATE.PLAYING:
        navigate(`/${game.id}/round/${game.round}`)
        break
      default:
        navigate('/')
    }
  }, [game])

  return children
}

export { Game }
