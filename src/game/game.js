import React, { useEffect, useState } from 'react'
import { GameProvider, useGame } from './game-provider'
import { GAME_STATE } from '../constants'
import { navigate } from '@reach/router'
import { useUserID } from '../user-context/user-provider'
import { Loading } from '../loading/loading'

const styles = {
  gameCode: {
    marginLeft: '4px',
  },
}

const Game = ({ gameCode, children }) => (
  <GameProvider gameCode={gameCode}>
    <GameStateNavigation>
      <>
        <strong style={styles.gameCode}>{gameCode}</strong>
        {children}
      </>
    </GameStateNavigation>
  </GameProvider>
)

const GameStateNavigation = ({ children }) => {
  const game = useGame()
  const userID = useUserID()
  const [navigating, setNavigating] = useState(true)

  function doNavigate(url) {
    setNavigating(false)
    navigate(url)
  }

  useEffect(() => {
    if (!game) {
      navigate('/')
      return
    }

    switch (game.state) {
      case GAME_STATE.LOBBY:
        if (game.players[userID].enteredNames) {
          doNavigate(`/${game.id}/lobby`)
        } else {
          doNavigate(`/${game.id}/names`)
        }
        break
      case GAME_STATE.PLAYING:
        if (game.currentPlayer === userID) {
          doNavigate(`/${game.id}/round/${game.round}/play`)
        } else {
          doNavigate(`/${game.id}/round/${game.round}`)
        }
        break
      case GAME_STATE.END_GAME:
      default:
        doNavigate('/')
    }
  }, [game, userID])

  return navigating ? <Loading /> : children
}

export { Game }
