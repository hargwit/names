import React from 'react'

import { Form, Button, Spinner } from 'react-bootstrap'

import { container, column, alignCenter, justifyEven } from '../layout/styles'
import { useJoinGame } from './api'
import { navigate } from '@reach/router'

const JoinGame = () => {
  const [gameCode, setGameCode] = React.useState('')
  const [joinGame, loading] = useJoinGame()

  const onChange = (event) => {
    setGameCode(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    joinGame(gameCode).then(() => navigate(`/${gameCode}/names`))
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
          <h1>Join a game</h1>
          <div
            style={{
              ...column,
              ...alignCenter,
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formGameCode'>
                <Form.Label>Game code</Form.Label>
                <Form.Control
                  value={gameCode}
                  onChange={onChange}
                  type='text'
                  placeholder='Enter game code'
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Join game
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  )
}

export { JoinGame }
