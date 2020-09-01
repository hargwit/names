import React from 'react'

import { Button } from 'react-bootstrap'
import { navigate } from '@reach/router'

import { useCreateGame } from '../api/game/create-game'

import { column, alignCenter } from '../layout/styles'

import { Container } from '../layout/container'

import { Loading } from '../loading/loading'
import { useUserID } from '../user-context/user-provider'

const styles = {
  button: {
    width: '170px',
    marginBottom: '1rem',
  },
  title: {
    textAlign: 'center',
  },
  hat: {
    fontSize: '80px',
    marginTop: '1rem',
  },
}

const Home = () => {
  const userID = useUserID()
  const [createGame, loading] = useCreateGame()

  function createAGame() {
    createGame(userID).then((id) => navigate(`/${id}`))
  }

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <h1 style={styles.title}>
        Names in a <br />
        <span aria-label='Image of a top hat' role='img' style={styles.hat}>
          🎩
        </span>
      </h1>
      <div
        style={{
          ...column,
          ...alignCenter,
        }}
      >
        <Button
          onClick={createAGame}
          style={styles.button}
          variant='primary'
          size='lg'
        >
          Create a game
        </Button>
        <Button
          style={styles.button}
          variant='secondary'
          size='lg'
          href='/join'
        >
          Join a game
        </Button>
      </div>
    </Container>
  )
}

export { Home }
