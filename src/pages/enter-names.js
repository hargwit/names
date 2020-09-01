import React, { useState } from 'react'
import { useGame } from '../game/game-provider'

import { column, alignCenter } from '../layout/styles'
import { Form, Button } from 'react-bootstrap'
import { useSubmitNames } from '../api/enterNames'

import { Container } from '../layout/container'
import { Loading } from '../loading/loading'
import { useUserID } from '../user-context/user-provider'

const styles = {
  button: {
    marginBottom: '4px',
  },
}

const EnterNames = () => {
  const userID = useUserID()
  const game = useGame()

  const [submitNames, loading] = useSubmitNames(game.id)
  const [names, setNames] = useState(['', '', '', '', ''])

  const updateNames = (index, name) => {
    const newNames = [...names]
    newNames[index] = name
    setNames(newNames)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitNames(names, userID)
  }

  const disableButton =
    !!names[0] && !!names[1] && !!names[2] && !!names[3] && !!names[4]

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <h1>Enter names</h1>
      <div
        style={{
          ...column,
          ...alignCenter,
        }}
      >
        <Form autoComplete='nope' onSubmit={handleSubmit}>
          <Form.Group controlId={`${game.id}-Name1`}>
            <Form.Label>Name 1</Form.Label>
            <Form.Control
              value={names[0]}
              onChange={(event) => updateNames(0, event.target.value)}
              type='text'
              placeholder='Enter name 1'
              autoComplete='nope'
            />
          </Form.Group>

          <Form.Group controlId={`${game.id}-Name2`}>
            <Form.Label>Name 2</Form.Label>
            <Form.Control
              value={names[1]}
              onChange={(event) => updateNames(1, event.target.value)}
              type='text'
              placeholder='Enter name 2'
              autoComplete='nope'
            />
          </Form.Group>

          <Form.Group controlId={`${game.id}-Name3`}>
            <Form.Label>Name 3</Form.Label>
            <Form.Control
              value={names[2]}
              onChange={(event) => updateNames(2, event.target.value)}
              type='text'
              placeholder='Enter name 3'
              autoComplete='nope'
            />
          </Form.Group>

          <Form.Group controlId={`${game.id}-Name4`}>
            <Form.Label>Name 4</Form.Label>
            <Form.Control
              value={names[3]}
              onChange={(event) => updateNames(3, event.target.value)}
              type='text'
              placeholder='Enter name 4'
              autoComplete='nope'
            />
          </Form.Group>

          <Form.Group controlId={`${game.id}-Name5`}>
            <Form.Label>Name 5</Form.Label>
            <Form.Control
              value={names[4]}
              onChange={(event) => updateNames(4, event.target.value)}
              type='text'
              placeholder='Enter name 5'
              autoComplete='nope'
            />
          </Form.Group>

          <Button
            style={styles.button}
            variant='primary'
            type='submit'
            disabled={!disableButton}
          >
            Submit names
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export { EnterNames }
