import React from 'react'

import { Button, Spinner } from 'react-bootstrap'
import { navigate } from '@reach/router'

import { useCreateGame } from './api'

import { container, column, alignCenter, justifyEven } from '../layout/styles'

const styles = {
  button: {
    width: '170px',
    marginBottom: '1rem',
  },
}

const Home = () => {
  const [createGame, loading] = useCreateGame()

  function createAGame() {
    createGame().then((id) => navigate(`/${id}/names`))
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
      {loading ? (
        <Spinner animation='border' />
      ) : (
        <>
          <h1>Names</h1>
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
        </>
      )}
    </div>
  )
}

export { Home }
