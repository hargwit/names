import React, { useState } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'

import { column, alignCenter } from '../layout/styles'
import { useJoinGame } from './api'
import { navigate } from '@reach/router'

import { Container } from '../layout/container'

const styles = {
  errorAlert: {
    marginTop: '1rem',
  },
}

const JoinGame = () => {
  const [gameCode, setGameCode] = React.useState('')
  const [joinGame, joining] = useJoinGame()
  const [error, setError] = useState()

  const onChange = (event) => {
    setGameCode(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    joinGame(gameCode)
      .then((id) => navigate(`/${id}`))
      .catch((err) => setError(err))
  }

  return (
    <Container>
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
          <Button disabled={joining} variant='primary' type='submit'>
            {joining ? 'Joining...' : 'Join game'}
          </Button>
          {error && (
            <Alert style={styles.errorAlert} variant='danger'>
              {error.message}
            </Alert>
          )}
        </Form>
      </div>
    </Container>
  )
}

export { JoinGame }
