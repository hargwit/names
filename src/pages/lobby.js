import React from 'react'
import { useGame } from '../components/game/game-provider'
import { column, alignCenter } from '../layout/styles'
import { Button } from 'react-bootstrap'
import { useStartGame, useEndGame } from '../api/startGame'

import { Container } from '../layout/container'
import { NEXT_ROUND_NAME } from '../constants'

const styles = {
  button: {
    width: '200px',
    marginBottom: '1rem',
  },
}

const Lobby = () => {
  const game = useGame()
  const [startGame, starting] = useStartGame(game.id)
  const [endGame, ending] = useEndGame(game.id)

  const start = () => {
    startGame(game.round + 1)
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
        <p>
          Round: <strong>{game.round}</strong>
        </p>
      </div>
      {game.round > 2 ? (
        <Button
          disabled={ending}
          onClick={endGame}
          style={styles.button}
          variant='primary'
          size='lg'
        >
          {ending ? 'Ending...' : 'End game'}
        </Button>
      ) : (
        <Button
          disabled={starting}
          onClick={start}
          style={styles.button}
          variant='primary'
          size='lg'
        >
          {starting
            ? 'Starting...'
            : `Start ${NEXT_ROUND_NAME[game.round]} round`}
        </Button>
      )}
    </Container>
  )
}

export { Lobby }
