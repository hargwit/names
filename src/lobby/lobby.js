import React from 'react'
import { navigate } from '@reach/router'
import { useGame } from '../game/game-provider'
import { container, column, alignCenter, justifyEven } from '../layout/styles'
import { Button } from 'react-bootstrap'
import { useStartGame } from './api'

const styles = {
  button: {
    width: '170px',
    marginBottom: '1rem',
  },
}

const Lobby = () => {
  const game = useGame()
  const [startGame, starting] = useStartGame(game.id)

  const start = () => {
    startGame().then(() => navigate(`/round/${game.round}`))
  }

  return (
    <div
      style={{
        ...container,
        ...column,
        ...alignCenter,
        ...justifyEven,
      }}
    >
      <h1>Game {game.id}</h1>
      <div
        style={{
          ...column,
          ...alignCenter,
        }}
      >
        <p>
          Number of players: <strong>{game.numPlayers}</strong>
        </p>
        <p>
          Number of names: <strong>{game.names.length}</strong>
        </p>
      </div>
      <Button
        disabled={starting}
        onClick={start}
        style={styles.button}
        variant='primary'
        size='lg'
      >
        {starting ? 'Starting...' : 'Start game'}
      </Button>
    </div>
  )
}

export { Lobby }
