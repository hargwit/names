import React from 'react'
import { useGame } from '../game/game-provider'
import { Container } from '../layout/container'
import { column, alignCenter } from '../layout/styles'
import { Button } from 'react-bootstrap'
import { useUserID } from '../user-context/user-provider'
import { useTakeTurn } from './api'
import { Loading } from '../loading/loading'

const styles = {
  button: {
    width: '200px',
    marginBottom: '1rem',
  },
}

const Round = ({ round }) => {
  const game = useGame()
  const userID = useUserID()
  const [takeTurn, loading] = useTakeTurn(userID)

  const namesLeft = game.names.filter((name) => name.lastRound !== round).length

  return loading ? (
    <Loading />
  ) : (
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
          onClick={() => takeTurn(game.id)}
        >
          Take my turn
        </Button>
      )}
    </Container>
  )
}

export { Round }
