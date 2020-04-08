import React, { useEffect } from 'react'
import { GameProvider, useGame } from './game-provider'
import { GAME_STATE } from '../constants'
import { navigate } from '@reach/router'

const Game = ({ gameCode, children }) => (
  <GameProvider gameCode={gameCode}>
    <GameStateNavigation>{children}</GameStateNavigation>
  </GameProvider>
)

const GameStateNavigation = ({ children }) => {
  const game = useGame()

  useEffect(() => {
    switch (game.state) {
      case GAME_STATE.LOBBY:
        navigate(`/${game.id}/lobby`)
        break
      default:
        navigate('/')
    }
  }, [game])

  return children
}

export { Game }
