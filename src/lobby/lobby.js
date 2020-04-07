import React from 'react'
import { useGame } from '../game/game-provider'
import { container, column, alignCenter, justifyEven } from '../layout/styles'
import { Button } from 'react-bootstrap'

const styles = {
  button: {
    width: '170px',
    marginBottom: '1rem',
  },
}

const Lobby = () => {
  const game = useGame()

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
      <Button style={styles.button} variant='primary' size='lg'>
        Start game
      </Button>
    </div>
  )
}

export { Lobby }
