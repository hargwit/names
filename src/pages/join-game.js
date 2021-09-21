import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { navigate } from '@reach/router'

import { column, alignCenter } from 'components/layout/styles'
import { Container } from 'components/layout/container'
import { useError } from 'components/error/error-provider'

const styles = {
  errorAlert: {
    marginTop: '1rem',
  },
}

const JoinGame = () => {
  const [gameCode, setGameCode] = useState('')
  const { error } = useError({ clear: true })

  const onChange = (event) => {
    setGameCode(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/join/${gameCode}`)
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
        <Form autoComplete='off' onSubmit={handleSubmit}>
          <Form.Group controlId='formGameCode'>
            <Form.Label>Game code</Form.Label>
            <Form.Control
              value={gameCode}
              onChange={onChange}
              type='text'
              placeholder='Enter game code'
              autoComplete='off'
            />
          </Form.Group>
          <Button
            disabled={gameCode.length !== 4}
            variant='primary'
            type='submit'
          >
            Join game
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