import React from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { column, alignCenter } from '../layout/styles'
import { Button } from 'react-bootstrap'

const styles = {
  button: {
    width: '200px',
    marginBottom: '1rem',
  },
}

const Round = ({ round }) => {
  const game = useGame()

  const namesLeft = game.names.filter((name) => name.lastRound !== round).length

  return (
    <Container>
      <h1>Round {round}</h1>
      <div
        style={{
          ...column,
          ...alignCenter,
        }}
      >
        <p>
          Total names: <strong>{game.names.length}</strong>
        </p>
        <p>
          Names left: <strong>{namesLeft}</strong>
        </p>
      </div>
      {namesLeft === 0 ? (
        <Button style={styles.button} variant='primary' size='lg'>
          End round
        </Button>
      ) : (
        <Button
          disabled={!!game.currentPlayer}
          style={styles.button}
          variant='primary'
          size='lg'
        >
          Take my turn
        </Button>
      )}
    </Container>
  )
}

export { Round }
