import React from 'react'
import { navigate } from '@reach/router'
import { useGame } from '../game/game-provider'
import { column, alignCenter } from '../layout/styles'
import { Button } from 'react-bootstrap'
import { useStartGame } from './api'

import { Container } from '../layout/container'

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
    <Container>
      <h1>Game {game.id}</h1>
      <div
        style={{
          ...column,
          ...alignCenter,
        }}
      >
        <p>
          Number of players: <strong>{Object.keys(game.players).length}</strong>
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
    </Container>
  )
}

export { Lobby }
